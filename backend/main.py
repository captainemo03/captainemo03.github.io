from __future__ import annotations

from collections import defaultdict, deque
from datetime import datetime, timezone
from email.message import EmailMessage
import hashlib
import hmac
import io
import json
import os
from pathlib import Path
import re
import smtplib
import sqlite3
from time import monotonic
from typing import Any
from urllib.request import Request as UrlRequest, urlopen

from fastapi import Depends, FastAPI, File, Header, HTTPException, Query, Request, Response, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .database import connect, get_db, init_db, row_dict
from .providers import fetch_aisstream_snapshot, fetch_provider, provider_status
from .security import expiry_iso, hash_password, iso_now, new_token, token_hash, validate_username, verify_password

from .engines import (
    ai_autopilot,
    ai_copilot,
    ai_knowledge_graph,
    clause_diff,
    agency_workspace,
    alarm_pack,
    broker_daily_brief,
    carbon_estimate,
    compare_fixtures,
    data_trust_center,
    client_portal_pack,
    document_safety,
    document_room_analyze,
    evaluate_stability,
    generate_broker_mail,
    make_pdf_bytes,
    performance_analytics,
    parse_offer_text,
    report_text,
    calculate_laytime,
    score_counterparty,
    voyage_estimate,
)


app = FastAPI(
    title="Focusea Backend Engine",
    version="1.0.0",
    description="Broker, chartering, laytime, report and loadicator backend for Focusea.",
)

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("FOCUSEA_ALLOWED_ORIGINS", "http://127.0.0.1:8000,http://localhost:8000,https://captainemo03.github.io").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

AUTH_RATE_BUCKETS: dict[str, deque[float]] = defaultdict(deque)
AUTH_RATE_WINDOW_SECONDS = 300
AUTH_RATE_LIMIT = 20


@app.middleware("http")
async def security_middleware(request: Request, call_next):
    if request.url.path.startswith("/api/auth/"):
        client = request.client.host if request.client else "unknown"
        bucket = AUTH_RATE_BUCKETS[client]
        now = monotonic()
        while bucket and now - bucket[0] > AUTH_RATE_WINDOW_SECONDS:
            bucket.popleft()
        if len(bucket) >= AUTH_RATE_LIMIT:
            return Response(content='{"detail":"Too many authentication requests. Try again later."}', status_code=429, media_type="application/json")
        bucket.append(now)
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    if request.url.path.startswith(("/api/auth/", "/api/deals", "/api/workflow")):
        response.headers["Cache-Control"] = "no-store"
    return response


DATA_DIR = Path(__file__).resolve().parent / "data"
STORE_PATH = DATA_DIR / "focusea_store.json"
UPLOAD_DIR = DATA_DIR / "uploads"
MAX_UPLOAD_BYTES = 8 * 1024 * 1024
ALLOWED_UPLOAD_TYPES = {
    "application/pdf",
    "text/plain",
    "text/csv",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
}

init_db()


class TextRequest(BaseModel):
    text: str


class SofRequest(BaseModel):
    sof_text: str
    allowed_hours: float = 72
    demurrage_rate: float = 18000
    dispatch_rate: float = 9000


class VoyageRequest(BaseModel):
    cargo_type: str = "coal"
    cargo_qty: float = 50000
    freight_rate: float = 18.5
    distance: float = 5800
    speed: float = 13
    sea_cons: float = 28
    port_cons: float = 4
    port_days: float = 5
    bunker_price: float = 620
    port_costs: float = 68000
    canal_costs: float = 0
    daily_hire: float = 14500
    commission: float = 2.5


class ClauseDiffRequest(BaseModel):
    original_clause: str
    revised_clause: str


class StabilityRequest(BaseModel):
    loads_text: str = ""
    vessel: dict[str, Any] = Field(default_factory=dict)


class WorkspaceSaveRequest(BaseModel):
    bucket: str = "fixtures"
    item: dict[str, Any]


class ReportRequest(BaseModel):
    title: str = "Focusea Report"
    data: dict[str, Any] = Field(default_factory=dict)


class AuditRequest(BaseModel):
    event: str = "decision"
    actor: str = "demo-user"
    scope: str = "fixture"
    reference: str = "FX-DEMO"
    source: str = "user input"
    confidence: float = 70
    details: dict[str, Any] = Field(default_factory=dict)


class CounterpartyRequest(BaseModel):
    company: str = "Atlas Commodities"
    role: str = "Charterer"
    payment: str = "Unknown"
    past_fixtures: float = 0
    open_claims: float = 0


class AgencyRequest(BaseModel):
    port: str = "Mersin"
    eta_days: float = 7
    berth_window: float = 36
    pda: float = 68000


class MailRequest(BaseModel):
    mail_type: str = "Counter offer"
    recipient: str = "all"
    deal_text: str = ""


class FixtureComparisonRequest(BaseModel):
    deal_a: str = ""
    deal_b: str = ""
    deal_c: str = ""


class DocumentSafetyRequest(BaseModel):
    filename: str = "pasted-text.txt"
    text: str = ""


class AlarmRequest(BaseModel):
    subject_hours: float = 18
    canceling_days: float = 12
    time_bar_days: float = 90
    invoice_days: float = 21


class CarbonRequest(BaseModel):
    gt: float = 38000
    fuel_tons: float = 420
    distance: float = 3150
    cargo_qty: float = 50000
    eu_share: float = 50
    eua_price: float = 72
    year: int = 2026


class DocumentRoomRequest(BaseModel):
    document_pack: str = ""


class DailyBriefRequest(BaseModel):
    fixture_text: str = ""
    gt: float = 38000
    fuel_tons: float = 420
    distance: float = 3150
    cargo_qty: float = 50000
    eu_share: float = 50
    eua_price: float = 72
    year: int = 2026


class ClientPortalRequest(BaseModel):
    client: str = "Atlas Commodities"
    status: str = "On subjects"
    access: str = "View summary"


class AiAutopilotRequest(BaseModel):
    deal_text: str = ""
    mode: str = "Broker autopilot"
    target_tce: float = 22000
    bunker_price: float = 686.5
    daily_hire: float = 14500


class AiCopilotRequest(BaseModel):
    question: str = "Should we fix this fixture?"
    deal_text: str = ""
    target_tce: float = 22000


class AiKnowledgeGraphRequest(BaseModel):
    deal_text: str = ""
    target_tce: float = 22000


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    username_or_email: str
    password: str


class ForgotPasswordRequest(BaseModel):
    email: str


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


class ProgressRequest(BaseModel):
    last_page: str = "dashboard"


class DealRoomCreateRequest(BaseModel):
    title: str = "New fixture"
    reference: str = ""
    status: str = "new"
    fixture_text: str = ""


class DealRoomUpdateRequest(BaseModel):
    title: str | None = None
    status: str | None = None
    fixture_text: str | None = None


class FixtureWorkflowRequest(BaseModel):
    fixture_text: str
    title: str = ""
    target_tce: float = 22000
    bunker_price: float = 686.5
    daily_hire: float = 14500
    save_deal: bool = True


def load_store() -> dict[str, Any]:
    if not STORE_PATH.exists():
        return {"fixtures": [], "crm": [], "documents": [], "reports": [], "audit": []}
    try:
        store = json.loads(STORE_PATH.read_text(encoding="utf-8"))
        store.setdefault("fixtures", [])
        store.setdefault("crm", [])
        store.setdefault("documents", [])
        store.setdefault("reports", [])
        store.setdefault("audit", [])
        return store
    except json.JSONDecodeError:
        return {"fixtures": [], "crm": [], "documents": [], "reports": [], "audit": []}


def save_store(store: dict[str, Any]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    STORE_PATH.write_text(json.dumps(store, indent=2), encoding="utf-8")


EMAIL_RULE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def normalize_email(value: str) -> str:
    email = value.strip().lower()
    if not EMAIL_RULE.fullmatch(email):
        raise HTTPException(status_code=422, detail="Enter a valid email address.")
    return email


def public_user(row: sqlite3.Row | dict[str, Any]) -> dict[str, Any]:
    user = dict(row)
    return {key: user.get(key) for key in ("id", "username", "email", "status", "last_page", "created_at", "last_login_at")}


def require_user(
    authorization: str = Header(default=""),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Bearer token required.")
    raw_token = authorization.split(" ", 1)[1].strip()
    row = db.execute(
        """
        SELECT users.* FROM sessions
        JOIN users ON users.id = sessions.user_id
        WHERE sessions.token_hash = ? AND sessions.expires_at > ? AND users.status = 'active'
        """,
        (token_hash(raw_token), iso_now()),
    ).fetchone()
    if not row:
        raise HTTPException(status_code=401, detail="Session is invalid or expired.")
    return dict(row)


def audit_event(
    db: sqlite3.Connection,
    event: str,
    source: str,
    confidence: float,
    details: dict[str, Any],
    user_id: int | None = None,
    deal_id: int | None = None,
) -> None:
    db.execute(
        "INSERT INTO audit_events (user_id, deal_id, event, source, confidence, details_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (user_id, deal_id, event, source, confidence, json.dumps(details), iso_now()),
    )


def queue_notification(db: sqlite3.Connection, user_id: int | None, subject: str, payload: dict[str, Any]) -> None:
    status = "queued"
    webhook = os.getenv("FOCUSEA_OWNER_WEBHOOK", "").strip()
    if webhook:
        try:
            request = UrlRequest(
                webhook,
                data=json.dumps({"subject": subject, **payload}).encode("utf-8"),
                headers={"Content-Type": "application/json", "User-Agent": "Focusea/1.0"},
                method="POST",
            )
            with urlopen(request, timeout=8) as response:
                status = f"delivered:{response.status}"
        except Exception as error:
            status = f"failed:{type(error).__name__}"
    db.execute(
        "INSERT INTO notifications (user_id, channel, subject, payload_json, delivery_status, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        (user_id, "webhook" if webhook else "admin-inbox", subject, json.dumps(payload), status, iso_now()),
    )


def send_reset_email(recipient: str, reset_token: str) -> bool:
    host = os.getenv("FOCUSEA_SMTP_HOST", "").strip()
    username = os.getenv("FOCUSEA_SMTP_USERNAME", "").strip()
    password = os.getenv("FOCUSEA_SMTP_PASSWORD", "").strip()
    sender = os.getenv("FOCUSEA_SMTP_FROM", username).strip()
    if not all((host, username, password, sender)):
        return False
    reset_base = os.getenv("FOCUSEA_RESET_URL", "https://captainemo03.github.io/#accountPage")
    separator = "&" if "?" in reset_base else "?"
    message = EmailMessage()
    message["Subject"] = "Reset your Focusea password"
    message["From"] = sender
    message["To"] = recipient
    message.set_content(f"Use this one-time reset link within one hour:\n{reset_base}{separator}reset_token={reset_token}\n")
    port = int(os.getenv("FOCUSEA_SMTP_PORT", "587"))
    with smtplib.SMTP(host, port, timeout=12) as smtp:
        smtp.starttls()
        smtp.login(username, password)
        smtp.send_message(message)
    return True


def safe_filename(filename: str) -> str:
    base = Path(filename or "document.bin").name
    cleaned = re.sub(r"[^A-Za-z0-9._-]+", "-", base).strip(".-")
    return cleaned[:120] or "document.bin"


def extract_document_text(content: bytes, filename: str, media_type: str) -> str:
    if media_type.startswith("text/") or filename.lower().endswith((".txt", ".csv")):
        return content.decode("utf-8", errors="replace")[:250_000]
    if media_type == "application/pdf" or filename.lower().endswith(".pdf"):
        try:
            from pypdf import PdfReader

            reader = PdfReader(io.BytesIO(content))
            return "\n".join((page.extract_text() or "") for page in reader.pages)[:250_000]
        except Exception:
            return ""
    return ""


def serialize_deal(row: sqlite3.Row | dict[str, Any]) -> dict[str, Any]:
    item = dict(row)
    item["parsed"] = json.loads(item.pop("parsed_json", "{}") or "{}")
    return item


def next_reference() -> str:
    return f"FX-{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}"


def require_admin(x_focusea_admin_key: str = Header(default="")) -> None:
    expected = os.getenv("FOCUSEA_ADMIN_KEY", "").strip()
    if not expected or not secrets_compare(x_focusea_admin_key, expected):
        raise HTTPException(status_code=403, detail="Valid admin key required.")


def secrets_compare(left: str, right: str) -> bool:
    return hmac.compare_digest(hashlib.sha256(left.encode("utf-8")).digest(), hashlib.sha256(right.encode("utf-8")).digest())


@app.get("/api/admin/notifications")
def api_admin_notifications(
    _: None = Depends(require_admin),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    rows = db.execute("SELECT id, user_id, channel, subject, payload_json, delivery_status, created_at FROM notifications ORDER BY created_at DESC LIMIT 100").fetchall()
    notifications = [{**dict(row), "payload": json.loads(row["payload_json"] or "{}") } for row in rows]
    for item in notifications:
        item.pop("payload_json", None)
    return {"ok": True, "notifications": notifications}


@app.post("/api/auth/register", status_code=201)
def api_register(request: RegisterRequest, db: sqlite3.Connection = Depends(get_db)) -> dict[str, Any]:
    try:
        username = validate_username(request.username)
        password_hash = hash_password(request.password)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    email = normalize_email(request.email)
    now = iso_now()
    try:
        cursor = db.execute(
            "INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
            (username, email, password_hash, now),
        )
        user_id = int(cursor.lastrowid)
    except sqlite3.IntegrityError as error:
        field = "username" if db.execute("SELECT 1 FROM users WHERE username = ?", (username,)).fetchone() else "email"
        raise HTTPException(status_code=409, detail=f"This {field} is already registered.") from error
    raw_token = new_token()
    db.execute(
        "INSERT INTO sessions (user_id, token_hash, created_at, expires_at) VALUES (?, ?, ?, ?)",
        (user_id, token_hash(raw_token), now, expiry_iso(24 * 14)),
    )
    audit_event(db, "account-created", "user-input", 100, {"username": username}, user_id=user_id)
    queue_notification(db, user_id, "New Focusea registration", {"username": username, "email": email, "created_at": now})
    db.commit()
    user = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    return {"ok": True, "token": raw_token, "token_type": "bearer", "user": public_user(user)}


@app.post("/api/auth/login")
def api_login(request: LoginRequest, db: sqlite3.Connection = Depends(get_db)) -> dict[str, Any]:
    identity = request.username_or_email.strip()
    row = db.execute("SELECT * FROM users WHERE username = ? OR email = ?", (identity, identity.lower())).fetchone()
    if not row or not verify_password(request.password, row["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid username/email or password.")
    if row["status"] != "active":
        raise HTTPException(status_code=403, detail="Account is not active.")
    raw_token = new_token()
    now = iso_now()
    db.execute(
        "INSERT INTO sessions (user_id, token_hash, created_at, expires_at) VALUES (?, ?, ?, ?)",
        (row["id"], token_hash(raw_token), now, expiry_iso(24 * 14)),
    )
    db.execute("UPDATE users SET last_login_at = ? WHERE id = ?", (now, row["id"]))
    audit_event(db, "login", "authenticated-session", 100, {}, user_id=row["id"])
    db.commit()
    user = db.execute("SELECT * FROM users WHERE id = ?", (row["id"],)).fetchone()
    return {"ok": True, "token": raw_token, "token_type": "bearer", "user": public_user(user)}


@app.post("/api/auth/logout")
def api_logout(
    authorization: str = Header(default=""),
    user: dict[str, Any] = Depends(require_user),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    raw_token = authorization.split(" ", 1)[1].strip()
    db.execute("DELETE FROM sessions WHERE token_hash = ? AND user_id = ?", (token_hash(raw_token), user["id"]))
    audit_event(db, "logout", "authenticated-session", 100, {}, user_id=user["id"])
    db.commit()
    return {"ok": True}


@app.post("/api/auth/forgot-password")
def api_forgot_password(request: ForgotPasswordRequest, db: sqlite3.Connection = Depends(get_db)) -> dict[str, Any]:
    email = normalize_email(request.email)
    row = db.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    response: dict[str, Any] = {"ok": True, "message": "If the address is registered, a reset message has been queued."}
    if not row:
        return response
    raw_token = new_token()
    db.execute("DELETE FROM password_resets WHERE user_id = ? OR expires_at <= ?", (row["id"], iso_now()))
    db.execute(
        "INSERT INTO password_resets (user_id, token_hash, created_at, expires_at) VALUES (?, ?, ?, ?)",
        (row["id"], token_hash(raw_token), iso_now(), expiry_iso(1)),
    )
    delivered = False
    try:
        delivered = send_reset_email(email, raw_token)
    except Exception:
        delivered = False
    queue_notification(db, row["id"], "Password reset requested", {"email": email, "smtp_delivered": delivered})
    db.commit()
    response["delivery"] = "email" if delivered else "admin-inbox"
    if os.getenv("FOCUSEA_DEV_EXPOSE_RESET_TOKEN") == "1":
        response["development_reset_token"] = raw_token
    return response


@app.post("/api/auth/reset-password")
def api_reset_password(request: ResetPasswordRequest, db: sqlite3.Connection = Depends(get_db)) -> dict[str, Any]:
    try:
        password_hash = hash_password(request.new_password)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    row = db.execute(
        "SELECT * FROM password_resets WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?",
        (token_hash(request.token), iso_now()),
    ).fetchone()
    if not row:
        raise HTTPException(status_code=400, detail="Reset token is invalid or expired.")
    db.execute("UPDATE users SET password_hash = ? WHERE id = ?", (password_hash, row["user_id"]))
    db.execute("UPDATE password_resets SET used_at = ? WHERE id = ?", (iso_now(), row["id"]))
    db.execute("DELETE FROM sessions WHERE user_id = ?", (row["user_id"],))
    audit_event(db, "password-reset", "email-reset", 100, {}, user_id=row["user_id"])
    db.commit()
    return {"ok": True, "message": "Password updated. Sign in again."}


@app.get("/api/auth/me")
def api_me(user: dict[str, Any] = Depends(require_user)) -> dict[str, Any]:
    return {"ok": True, "user": public_user(user)}


@app.put("/api/auth/progress")
def api_save_progress(
    request: ProgressRequest,
    user: dict[str, Any] = Depends(require_user),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    page = re.sub(r"[^A-Za-z0-9_-]+", "", request.last_page)[:60] or "dashboard"
    db.execute("UPDATE users SET last_page = ? WHERE id = ?", (page, user["id"]))
    db.commit()
    return {"ok": True, "last_page": page}


@app.get("/api/deals")
def api_list_deals(
    user: dict[str, Any] = Depends(require_user),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    rows = db.execute("SELECT * FROM deal_rooms WHERE user_id = ? ORDER BY updated_at DESC LIMIT 200", (user["id"],)).fetchall()
    return {"ok": True, "deals": [serialize_deal(row) for row in rows]}


@app.post("/api/deals", status_code=201)
def api_create_deal(
    request: DealRoomCreateRequest,
    user: dict[str, Any] = Depends(require_user),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    reference = re.sub(r"[^A-Za-z0-9_-]+", "-", request.reference.strip())[:48] or f"{next_reference()}-{new_token()[:4].upper()}"
    title = request.title.strip()[:140] or "New fixture"
    parsed_pack = parse_offer_text(request.fixture_text) if request.fixture_text else {"parsed": {}, "risk": {"score": 0}}
    now = iso_now()
    try:
        cursor = db.execute(
            "INSERT INTO deal_rooms (user_id, reference, title, status, fixture_text, parsed_json, risk_score, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (user["id"], reference, title, request.status[:40], request.fixture_text, json.dumps(parsed_pack.get("parsed", {})), parsed_pack.get("risk", {}).get("score", 0), now, now),
        )
    except sqlite3.IntegrityError as error:
        raise HTTPException(status_code=409, detail="Deal reference already exists for this account.") from error
    deal_id = int(cursor.lastrowid)
    audit_event(db, "deal-created", "user-input", 90, {"reference": reference}, user_id=user["id"], deal_id=deal_id)
    db.commit()
    return {"ok": True, "deal": serialize_deal(db.execute("SELECT * FROM deal_rooms WHERE id = ?", (deal_id,)).fetchone())}


@app.get("/api/deals/{deal_id}")
def api_get_deal(
    deal_id: int,
    user: dict[str, Any] = Depends(require_user),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    row = db.execute("SELECT * FROM deal_rooms WHERE id = ? AND user_id = ?", (deal_id, user["id"])).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Deal Room not found.")
    documents = db.execute("SELECT id, filename, media_type, size_bytes, sha256, created_at FROM documents WHERE deal_id = ? ORDER BY created_at DESC", (deal_id,)).fetchall()
    events = db.execute("SELECT event, source, confidence, details_json, created_at FROM audit_events WHERE deal_id = ? ORDER BY created_at DESC LIMIT 100", (deal_id,)).fetchall()
    audit = [{**dict(event), "details": json.loads(event["details_json"] or "{}") } for event in events]
    return {"ok": True, "deal": serialize_deal(row), "documents": [dict(item) for item in documents], "audit": audit}


@app.patch("/api/deals/{deal_id}")
def api_update_deal(
    deal_id: int,
    request: DealRoomUpdateRequest,
    user: dict[str, Any] = Depends(require_user),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    row = db.execute("SELECT * FROM deal_rooms WHERE id = ? AND user_id = ?", (deal_id, user["id"])).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Deal Room not found.")
    title = request.title.strip()[:140] if request.title is not None else row["title"]
    status = request.status.strip()[:40] if request.status is not None else row["status"]
    fixture_text = request.fixture_text if request.fixture_text is not None else row["fixture_text"]
    parsed_pack = parse_offer_text(fixture_text) if fixture_text else {"parsed": {}, "risk": {"score": 0}}
    db.execute(
        "UPDATE deal_rooms SET title = ?, status = ?, fixture_text = ?, parsed_json = ?, risk_score = ?, updated_at = ? WHERE id = ?",
        (title, status, fixture_text, json.dumps(parsed_pack.get("parsed", {})), parsed_pack.get("risk", {}).get("score", 0), iso_now(), deal_id),
    )
    audit_event(db, "deal-updated", "authenticated-user", 100, {"status": status}, user_id=user["id"], deal_id=deal_id)
    db.commit()
    return {"ok": True, "deal": serialize_deal(db.execute("SELECT * FROM deal_rooms WHERE id = ?", (deal_id,)).fetchone())}


@app.post("/api/workflow/fixture")
def api_fixture_workflow(
    request: FixtureWorkflowRequest,
    user: dict[str, Any] = Depends(require_user),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    parsed_pack = parse_offer_text(request.fixture_text)
    autopilot = ai_autopilot({
        "deal_text": request.fixture_text,
        "target_tce": request.target_tce,
        "bunker_price": request.bunker_price,
        "daily_hire": request.daily_hire,
    })
    document_review = document_room_analyze(request.fixture_text)
    deal = None
    deal_id = None
    if request.save_deal:
        reference = f"{next_reference()}-{new_token()[:4].upper()}"
        title = request.title.strip()[:140] or f"{parsed_pack['parsed'].get('cargo_label', 'Fixture')} - {parsed_pack['parsed'].get('route') or 'Route TBC'}"
        now = iso_now()
        cursor = db.execute(
            "INSERT INTO deal_rooms (user_id, reference, title, status, fixture_text, parsed_json, risk_score, tce, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (user["id"], reference, title, "review", request.fixture_text, json.dumps(parsed_pack["parsed"]), autopilot["risk_score"], autopilot["voyage"]["tce"], now, now),
        )
        deal_id = int(cursor.lastrowid)
        audit_event(db, "fixture-workflow-completed", "rules-engine", 78, {"decision": autopilot["decision"], "risk_score": autopilot["risk_score"]}, user_id=user["id"], deal_id=deal_id)
        db.commit()
        deal = serialize_deal(db.execute("SELECT * FROM deal_rooms WHERE id = ?", (deal_id,)).fetchone())
    return {
        "ok": True,
        "deal": deal,
        "offer": parsed_pack,
        "voyage": autopilot["voyage"],
        "decision": {"label": autopilot["decision"], "risk_score": autopilot["risk_score"], "explain": autopilot["explain"]},
        "clause": autopilot["clause"],
        "document_review": document_review,
        "recap": parsed_pack.get("recap", ""),
        "counter_mail": autopilot["mail"],
        "actions": autopilot["actions"],
        "provider_status": provider_status(),
        "disclaimer": "Decision support only. Commercial, legal and operational review remains required.",
    }


@app.post("/api/deals/{deal_id}/documents", status_code=201)
async def api_upload_document(
    deal_id: int,
    file: UploadFile = File(...),
    user: dict[str, Any] = Depends(require_user),
    db: sqlite3.Connection = Depends(get_db),
) -> dict[str, Any]:
    deal = db.execute("SELECT id FROM deal_rooms WHERE id = ? AND user_id = ?", (deal_id, user["id"])).fetchone()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal Room not found.")
    filename = safe_filename(file.filename or "document.bin")
    media_type = (file.content_type or "application/octet-stream").lower()
    if media_type not in ALLOWED_UPLOAD_TYPES:
        raise HTTPException(status_code=415, detail="Unsupported document type.")
    content = await file.read(MAX_UPLOAD_BYTES + 1)
    if len(content) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Document exceeds the 8 MB limit.")
    if filename.lower().endswith(".pdf") and not content.startswith(b"%PDF"):
        raise HTTPException(status_code=400, detail="PDF signature is invalid.")
    digest = hashlib.sha256(content).hexdigest()
    folder = UPLOAD_DIR / str(user["id"]) / str(deal_id)
    folder.mkdir(parents=True, exist_ok=True)
    storage_name = f"{digest[:16]}-{filename}"
    storage_path = folder / storage_name
    storage_path.write_bytes(content)
    extracted = extract_document_text(content, filename, media_type)
    safety = document_safety({"filename": filename, "text": extracted})
    cursor = db.execute(
        "INSERT INTO documents (user_id, deal_id, filename, media_type, size_bytes, sha256, storage_path, extracted_text, safety_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (user["id"], deal_id, filename, media_type, len(content), digest, str(storage_path), extracted, json.dumps(safety), iso_now()),
    )
    document_id = int(cursor.lastrowid)
    audit_event(db, "document-uploaded", "user-upload", safety.get("score", 60), {"document_id": document_id, "filename": filename, "sha256": digest}, user_id=user["id"], deal_id=deal_id)
    db.commit()
    analysis = document_room_analyze(extracted) if extracted else {"findings": [{"level": "Info", "text": "No embedded text was extracted; OCR worker required for image-only documents."}]}
    return {"ok": True, "document": {"id": document_id, "filename": filename, "media_type": media_type, "size_bytes": len(content), "sha256": digest, "text_extracted": bool(extracted)}, "safety": safety, "analysis": analysis}


@app.get("/api/providers/status")
def api_live_provider_status() -> dict[str, Any]:
    return {"ok": True, "providers": provider_status(), "generated_at": iso_now()}


@app.get("/api/providers/{provider_id}")
async def api_provider_data(
    provider_id: str,
    imo: str = Query(default="", max_length=16),
    area: str = Query(default="", max_length=80),
    symbol: str = Query(default="", max_length=32),
    lat: str = Query(default="", max_length=24),
    lon: str = Query(default="", max_length=24),
    min_lat: str = Query(default="", max_length=24),
    min_lon: str = Query(default="", max_length=24),
    max_lat: str = Query(default="", max_length=24),
    max_lon: str = Query(default="", max_length=24),
    seconds: str = Query(default="", max_length=8),
    max_vessels: str = Query(default="", max_length=8),
    user: dict[str, Any] = Depends(require_user),
) -> dict[str, Any]:
    params = {
        "imo": imo,
        "area": area,
        "symbol": symbol,
        "lat": lat,
        "lon": lon,
        "min_lat": min_lat,
        "min_lon": min_lon,
        "max_lat": max_lat,
        "max_lon": max_lon,
        "seconds": seconds,
        "max_vessels": max_vessels,
    }
    try:
        if provider_id == "aisstream":
            return await fetch_aisstream_snapshot(params)
        return fetch_provider(provider_id, params)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=502, detail=f"Provider request failed: {type(error).__name__}") from error


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "service": "focusea-backend",
        "time": datetime.now().isoformat(timespec="seconds"),
        "modules": [
            "secure-auth",
            "sqlite-storage",
            "deal-rooms",
            "document-vault",
            "licensed-provider-gateway",
            "broker-parser",
            "sof-laytime",
            "voyage-estimate",
            "cp-diff",
            "counterparty-score",
            "agency-workspace",
            "mail-generator",
            "fixture-comparison",
            "document-safety",
            "document-room",
            "data-trust-center",
            "carbon-estimate",
            "alarm-ics",
            "client-portal",
            "daily-brief",
            "performance-analytics",
            "ai-autopilot",
            "ai-copilot",
            "ai-knowledge-graph",
            "stability",
            "pdf",
            "audit-trail",
            "provider-status",
        ],
        "allowed_origins": ALLOWED_ORIGINS,
    }


@app.get("/api/provider-status")
def api_provider_status() -> dict[str, Any]:
    return {"source": "python-fastapi", "generated_at": iso_now(), "providers": provider_status()}

@app.post("/api/broker/parse-offer")
def api_parse_offer(request: TextRequest) -> dict[str, Any]:
    return parse_offer_text(request.text)


@app.post("/api/laytime/sof")
def api_sof_laytime(request: SofRequest) -> dict[str, Any]:
    return calculate_laytime(
        request.sof_text,
        request.allowed_hours,
        request.demurrage_rate,
        request.dispatch_rate,
    )


@app.post("/api/voyage/estimate")
def api_voyage_estimate(request: VoyageRequest) -> dict[str, Any]:
    return voyage_estimate(request.model_dump())


@app.post("/api/charterparty/diff")
def api_clause_diff(request: ClauseDiffRequest) -> dict[str, Any]:
    return clause_diff(request.original_clause, request.revised_clause)


@app.post("/api/counterparty/score")
def api_counterparty_score(request: CounterpartyRequest) -> dict[str, Any]:
    return score_counterparty(request.model_dump())


@app.post("/api/agency/workspace")
def api_agency_workspace(request: AgencyRequest) -> dict[str, Any]:
    return agency_workspace(request.model_dump())


@app.post("/api/mail/generate")
def api_mail_generate(request: MailRequest) -> dict[str, Any]:
    return generate_broker_mail(request.model_dump())


@app.post("/api/fixtures/compare")
def api_fixtures_compare(request: FixtureComparisonRequest) -> dict[str, Any]:
    return compare_fixtures(request.model_dump())


@app.post("/api/documents/safety")
def api_document_safety(request: DocumentSafetyRequest) -> dict[str, Any]:
    return document_safety(request.model_dump())


@app.post("/api/alarms/ics")
def api_alarms_ics(request: AlarmRequest) -> dict[str, Any]:
    return alarm_pack(request.model_dump())


@app.get("/api/data-trust/center")
def api_data_trust_center() -> dict[str, Any]:
    trust = data_trust_center()
    trust["providers"] = provider_status()
    trust["generated_at"] = iso_now()
    return trust


@app.post("/api/carbon/estimate")
def api_carbon_estimate(request: CarbonRequest) -> dict[str, Any]:
    return carbon_estimate(request.model_dump())


@app.post("/api/document-room/analyze")
def api_document_room_analyze(request: DocumentRoomRequest) -> dict[str, Any]:
    return document_room_analyze(request.document_pack)


@app.post("/api/daily-brief")
def api_daily_brief(request: DailyBriefRequest) -> dict[str, Any]:
    return broker_daily_brief(request.model_dump())


@app.post("/api/client-portal/pack")
def api_client_portal_pack(request: ClientPortalRequest) -> dict[str, Any]:
    return client_portal_pack(request.model_dump())


@app.post("/api/ai/autopilot")
def api_ai_autopilot(request: AiAutopilotRequest) -> dict[str, Any]:
    return ai_autopilot(request.model_dump())


@app.post("/api/ai/copilot")
def api_ai_copilot(request: AiCopilotRequest) -> dict[str, Any]:
    return ai_copilot(request.model_dump())


@app.post("/api/ai/knowledge-graph")
def api_ai_knowledge_graph(request: AiKnowledgeGraphRequest) -> dict[str, Any]:
    return ai_knowledge_graph(request.model_dump())


@app.get("/api/analytics/performance")
def api_performance_analytics() -> dict[str, Any]:
    return performance_analytics(load_store())


@app.post("/api/stability/evaluate")
def api_stability(request: StabilityRequest) -> dict[str, Any]:
    return evaluate_stability(request.loads_text, request.vessel)


@app.post("/api/workspace/save")
def api_workspace_save(request: WorkspaceSaveRequest) -> dict[str, Any]:
    store = load_store()
    bucket = request.bucket if request.bucket in store else "fixtures"
    item = {**request.item, "saved_at": datetime.now().isoformat(timespec="seconds")}
    store[bucket].insert(0, item)
    store[bucket] = store[bucket][:200]
    save_store(store)
    return {"ok": True, "bucket": bucket, "count": len(store[bucket]), "item": item}


@app.get("/api/workspace")
def api_workspace() -> dict[str, Any]:
    return load_store()


@app.post("/api/audit")
def api_audit(request: AuditRequest) -> dict[str, Any]:
    store = load_store()
    event = {
        "id": f"AUD-{int(datetime.now().timestamp())}",
        "created_at": datetime.now().isoformat(timespec="seconds"),
        "event": request.event,
        "actor": request.actor,
        "scope": request.scope,
        "reference": request.reference,
        "source": request.source,
        "confidence": request.confidence,
        "details": request.details,
        "disclaimer": "Decision support only; professional review required before commercial, legal, insurance or operational action.",
    }
    store["audit"].insert(0, event)
    store["audit"] = store["audit"][:500]
    save_store(store)
    return {"ok": True, "event": event, "count": len(store["audit"])}


@app.post("/api/reports/{report_type}")
def api_report(report_type: str, request: ReportRequest) -> dict[str, Any]:
    text = report_text(f"Focusea {report_type} report", request.data)
    store = load_store()
    store["reports"].insert(0, {
        "type": report_type,
        "title": request.title,
        "created_at": datetime.now().isoformat(timespec="seconds"),
        "text": text,
    })
    store["reports"] = store["reports"][:50]
    save_store(store)
    return {"ok": True, "report_type": report_type, "text": text}


@app.post("/api/reports/{report_type}/pdf")
def api_report_pdf(report_type: str, request: ReportRequest) -> Response:
    text = report_text(f"Focusea {report_type} report", request.data)
    pdf = make_pdf_bytes(request.title or f"Focusea {report_type}", text)
    filename = f"focusea-{report_type}-report.pdf"
    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
