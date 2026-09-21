from __future__ import annotations

import os
from pathlib import Path
import tempfile
import uuid

from fastapi.testclient import TestClient


TEST_DB = Path(tempfile.gettempdir()) / f"focusea-test-{uuid.uuid4().hex}.db"
os.environ["FOCUSEA_DATABASE_PATH"] = str(TEST_DB)
os.environ["FOCUSEA_DEV_EXPOSE_RESET_TOKEN"] = "1"

from backend.main import app  # noqa: E402


client = TestClient(app)


def auth_headers(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def test_account_deal_workflow_document_and_logout() -> None:
    suffix = uuid.uuid4().hex[:8]
    username = f"broker_{suffix}"
    email = f"{username}@gmail.com"

    weak = client.post("/api/auth/register", json={"username": username, "email": email, "password": "weak"})
    assert weak.status_code == 422

    registered = client.post(
        "/api/auth/register",
        json={"username": username, "email": email, "password": "Strong*Pass9"},
    )
    assert registered.status_code == 201, registered.text
    payload = registered.json()
    token = payload["token"]
    headers = auth_headers(token)
    assert payload["user"]["username"] == username
    assert "password_hash" not in payload["user"]

    os.environ["FOCUSEA_ADMIN_KEY"] = "test-admin-key"
    denied_notifications = client.get("/api/admin/notifications")
    assert denied_notifications.status_code == 403
    notifications = client.get("/api/admin/notifications", headers={"X-Focusea-Admin-Key": "test-admin-key"})
    assert notifications.status_code == 200
    assert any(item["subject"] == "New Focusea registration" for item in notifications.json()["notifications"])

    duplicate = client.post(
        "/api/auth/register",
        json={"username": username, "email": f"other-{email}", "password": "Strong*Pass9"},
    )
    assert duplicate.status_code == 409

    me = client.get("/api/auth/me", headers=headers)
    assert me.status_code == 200
    assert me.json()["user"]["email"] == email

    progress = client.put("/api/auth/progress", headers=headers, json={"last_page": "brokerOS"})
    assert progress.status_code == 200
    assert progress.json()["last_page"] == "brokerOS"

    fixture_text = (
        "50k coal Indonesia to India laycan 10/15 Jul freight 18.50 pmt "
        "demurrage USD 18,000/day Supramax commission 2.5 pct. Subjects stem."
    )
    workflow = client.post(
        "/api/workflow/fixture",
        headers=headers,
        json={"fixture_text": fixture_text, "title": "Indonesia coal fixture", "save_deal": True},
    )
    assert workflow.status_code == 200, workflow.text
    workflow_data = workflow.json()
    assert workflow_data["deal"]["id"] > 0
    assert workflow_data["decision"]["risk_score"] >= 0
    assert workflow_data["provider_status"][0]["connected"] is False
    deal_id = workflow_data["deal"]["id"]

    upload = client.post(
        f"/api/deals/{deal_id}/documents",
        headers=headers,
        files={"file": ("SOF.txt", "NOR tendered 10 July 08:00\nLoading completed 12 July 18:00", "text/plain")},
    )
    assert upload.status_code == 201, upload.text
    assert upload.json()["document"]["text_extracted"] is True

    deal = client.get(f"/api/deals/{deal_id}", headers=headers)
    assert deal.status_code == 200
    assert len(deal.json()["documents"]) == 1
    assert any(event["event"] == "document-uploaded" for event in deal.json()["audit"])

    provider = client.get("/api/providers/ais?imo=1234567", headers=headers)
    assert provider.status_code == 200
    assert provider.json()["status"] == "licensed-required"
    assert provider.json()["data"] is None

    forgot = client.post("/api/auth/forgot-password", json={"email": email})
    assert forgot.status_code == 200
    reset_token = forgot.json()["development_reset_token"]
    reset = client.post("/api/auth/reset-password", json={"token": reset_token, "new_password": "NewStrong*Pass8"})
    assert reset.status_code == 200

    old_session = client.get("/api/auth/me", headers=headers)
    assert old_session.status_code == 401
    login = client.post("/api/auth/login", json={"username_or_email": email, "password": "NewStrong*Pass8"})
    assert login.status_code == 200


def test_health_lists_production_modules() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["ok"] is True