from __future__ import annotations

from datetime import datetime, timezone
import json
import os
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen


PROVIDERS = {
    "ais": {
        "label": "AIS vessel traffic",
        "endpoint_env": "FOCUSEA_AIS_ENDPOINT",
        "key_env": "FOCUSEA_AIS_API_KEY",
        "status": "licensed-required",
    },
    "baltic": {
        "label": "Baltic market data",
        "endpoint_env": "FOCUSEA_BALTIC_ENDPOINT",
        "key_env": "FOCUSEA_BALTIC_API_KEY",
        "status": "licensed-required",
    },
    "bunker": {
        "label": "Bunker prices",
        "endpoint_env": "FOCUSEA_BUNKER_ENDPOINT",
        "key_env": "FOCUSEA_BUNKER_API_KEY",
        "status": "verified-provider-required",
    },
}


def provider_status() -> list[dict[str, Any]]:
    generated = datetime.now(timezone.utc).isoformat(timespec="seconds")
    return [
        {
            "id": provider_id,
            "name": config["label"],
            "status": "connected" if os.getenv(config["endpoint_env"]) else config["status"],
            "connected": bool(os.getenv(config["endpoint_env"])),
            "endpoint_env": config["endpoint_env"],
            "key_configured": bool(os.getenv(config["key_env"])),
            "checked_at": generated,
        }
        for provider_id, config in PROVIDERS.items()
    ]


def fetch_provider(provider_id: str, params: dict[str, str] | None = None) -> dict[str, Any]:
    if provider_id not in PROVIDERS:
        raise ValueError("Unknown provider")
    config = PROVIDERS[provider_id]
    endpoint = os.getenv(config["endpoint_env"], "").strip()
    if not endpoint:
        return {
            "ok": False,
            "provider": provider_id,
            "status": config["status"],
            "message": f"{config['label']} is not connected. Configure {config['endpoint_env']} on the backend.",
            "data": None,
        }

    query = urlencode({key: value for key, value in (params or {}).items() if value})
    url = f"{endpoint}{'&' if '?' in endpoint else '?'}{query}" if query else endpoint
    headers = {"Accept": "application/json", "User-Agent": "Focusea/1.0"}
    api_key = os.getenv(config["key_env"], "").strip()
    if api_key:
        header_name = os.getenv(f"{config['key_env']}_HEADER", "Authorization")
        header_prefix = os.getenv(f"{config['key_env']}_PREFIX", "Bearer ")
        headers[header_name] = f"{header_prefix}{api_key}"
    request = Request(url, headers=headers)
    with urlopen(request, timeout=12) as response:
        body = response.read(2_000_000)
        content_type = response.headers.get("Content-Type", "")
    if "json" not in content_type.lower() and not body.lstrip().startswith((b"{", b"[")):
        raise ValueError("Provider did not return JSON")
    return {
        "ok": True,
        "provider": provider_id,
        "status": "live-licensed" if provider_id in {"ais", "baltic"} else "live-verified",
        "checked_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "data": json.loads(body),
    }