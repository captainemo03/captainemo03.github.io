from __future__ import annotations

import asyncio
from datetime import datetime, timezone
import json
import os
import ssl
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen

import certifi


PROVIDERS: dict[str, dict[str, Any]] = {
    "ais": {
        "label": "Commercial AIS vessel traffic",
        "kind": "rest",
        "endpoint_env": "FOCUSEA_AIS_ENDPOINT",
        "key_env": "FOCUSEA_AIS_API_KEY",
        "status": "licensed-required",
        "setup": "Licensed endpoint and server-side key required.",
    },
    "baltic": {
        "label": "Baltic market data",
        "kind": "rest",
        "endpoint_env": "FOCUSEA_BALTIC_ENDPOINT",
        "key_env": "FOCUSEA_BALTIC_API_KEY",
        "status": "licensed-required",
        "setup": "Baltic display or redistribution licence required.",
    },
    "bunker": {
        "label": "Bunker prices",
        "kind": "rest",
        "endpoint_env": "FOCUSEA_BUNKER_ENDPOINT",
        "key_env": "FOCUSEA_BUNKER_API_KEY",
        "status": "verified-provider-required",
        "setup": "Verified bunker-price endpoint required.",
    },
    "aisstream": {
        "label": "AISStream community live AIS",
        "kind": "websocket",
        "endpoint_env": "FOCUSEA_AISSTREAM_ENDPOINT",
        "default_endpoint": "wss://stream.aisstream.io/v0/stream",
        "key_env": "FOCUSEA_AISSTREAM_API_KEY",
        "status": "free-key-required",
        "source_url": "https://aisstream.io/documentation",
        "setup": "Free AISStream API key required; coverage and continuity are not guaranteed.",
    },
    "met_norway": {
        "label": "MET Norway global forecast",
        "kind": "rest",
        "endpoint_env": "FOCUSEA_MET_ENDPOINT",
        "default_endpoint": "https://api.met.no/weatherapi/locationforecast/2.0/compact",
        "status": "free-open-data",
        "source_url": "https://api.met.no/",
        "setup": "No key required. Focusea identifies itself with a server-side User-Agent.",
    },
    "nws": {
        "label": "NWS active weather alerts",
        "kind": "rest",
        "endpoint_env": "FOCUSEA_NWS_ENDPOINT",
        "default_endpoint": "https://api.weather.gov/alerts/active",
        "status": "free-open-data-us",
        "source_url": "https://www.weather.gov/documentation/services-web-api",
        "setup": "No key required; official coverage is United States and territories.",
    },
    "eia": {
        "label": "EIA energy market indicators",
        "kind": "rest",
        "endpoint_env": "FOCUSEA_EIA_ENDPOINT",
        "default_endpoint": "https://api.eia.gov/v2/petroleum/pri/spt/data/",
        "key_env": "FOCUSEA_EIA_API_KEY",
        "key_query": "api_key",
        "status": "free-key-required",
        "source_url": "https://www.eia.gov/opendata/",
        "setup": "Free EIA API key required. Values are energy indicators, not direct bunker quotes.",
        "default_params": {
            "frequency": "monthly",
            "data[0]": "value",
            "sort[0][column]": "period",
            "sort[0][direction]": "desc",
            "length": "12",
        },
    },
    "unlocode": {
        "label": "UN/LOCODE port and trade locations",
        "kind": "resource",
        "status": "free-official-download",
        "source_url": "https://unece.org/trade/cefact/unlocode-code-list-country-and-territory",
        "setup": "Official downloadable dataset; attribution and release date should be retained.",
    },
    "wpi": {
        "label": "NGA World Port Index",
        "kind": "resource",
        "status": "free-official-download",
        "source_url": "https://msi.nga.mil/Publications/WPI",
        "setup": "Official downloadable port dataset; import the current release into Port Intelligence.",
    },
}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _endpoint(config: dict[str, Any]) -> str:
    env_name = config.get("endpoint_env", "")
    return (os.getenv(env_name, "").strip() if env_name else "") or config.get("default_endpoint", "")


def _configured(config: dict[str, Any]) -> tuple[bool, bool, str]:
    endpoint = _endpoint(config)
    key_env = config.get("key_env", "")
    key_configured = bool(os.getenv(key_env, "").strip()) if key_env else True
    kind = config.get("kind")
    if kind == "resource":
        return True, True, "available"
    if config.get("status") == "free-key-required" and not key_configured:
        return False, False, "free-key-required"
    if endpoint:
        return True, key_configured, "connected"
    return False, key_configured, config["status"]


def provider_status() -> list[dict[str, Any]]:
    generated = _now()
    output: list[dict[str, Any]] = []
    for provider_id, config in PROVIDERS.items():
        connected, key_configured, status = _configured(config)
        output.append(
            {
                "id": provider_id,
                "name": config["label"],
                "status": status,
                "connected": connected,
                "kind": config.get("kind", "rest"),
                "endpoint_env": config.get("endpoint_env", ""),
                "key_configured": key_configured,
                "source_url": config.get("source_url", ""),
                "setup": config.get("setup", ""),
                "checked_at": generated,
            }
        )
    return output


def fetch_provider(provider_id: str, params: dict[str, str] | None = None) -> dict[str, Any]:
    if provider_id not in PROVIDERS:
        raise ValueError("Unknown provider")
    config = PROVIDERS[provider_id]
    if config.get("kind") == "websocket":
        raise ValueError("Use the AISStream snapshot endpoint for websocket traffic.")
    if config.get("kind") == "resource":
        return {
            "ok": True,
            "provider": provider_id,
            "status": "free-official-download",
            "checked_at": _now(),
            "source_url": config["source_url"],
            "data": {"name": config["label"], "setup": config["setup"]},
        }

    endpoint = _endpoint(config)
    api_key = os.getenv(config.get("key_env", ""), "").strip() if config.get("key_env") else ""
    if not endpoint or (config.get("status") == "free-key-required" and not api_key):
        return {
            "ok": False,
            "provider": provider_id,
            "status": config["status"],
            "message": config.get("setup", f"{config['label']} is not connected."),
            "source_url": config.get("source_url", ""),
            "data": None,
        }

    query_values = dict(config.get("default_params", {}))
    query_values.update({key: value for key, value in (params or {}).items() if value})
    if api_key and config.get("key_query"):
        query_values[config["key_query"]] = api_key
    query = urlencode(query_values)
    url = f"{endpoint}{'&' if '?' in endpoint else '?'}{query}" if query else endpoint
    contact = os.getenv("FOCUSEA_DATA_CONTACT", "admin@focusea.example")
    headers = {"Accept": "application/json", "User-Agent": f"Focusea/1.1 ({contact})"}
    if api_key and not config.get("key_query"):
        header_name = os.getenv(f"{config['key_env']}_HEADER", "Authorization")
        header_prefix = os.getenv(f"{config['key_env']}_PREFIX", "Bearer ")
        headers[header_name] = f"{header_prefix}{api_key}"
    request = Request(url, headers=headers)
    tls_context = ssl.create_default_context(cafile=certifi.where())
    with urlopen(request, timeout=12, context=tls_context) as response:
        body = response.read(2_000_000)
        content_type = response.headers.get("Content-Type", "")
    if "json" not in content_type.lower() and not body.lstrip().startswith((b"{", b"[")):
        raise ValueError("Provider did not return JSON")
    return {
        "ok": True,
        "provider": provider_id,
        "status": "live-free" if provider_id in {"met_norway", "nws", "eia"} else "live-verified",
        "checked_at": _now(),
        "source_url": config.get("source_url", ""),
        "data": json.loads(body),
    }


def _number(value: Any, fallback: float) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return fallback


async def fetch_aisstream_snapshot(params: dict[str, Any] | None = None) -> dict[str, Any]:
    config = PROVIDERS["aisstream"]
    api_key = os.getenv(config["key_env"], "").strip()
    if not api_key:
        return {
            "ok": False,
            "provider": "aisstream",
            "status": "free-key-required",
            "message": config["setup"],
            "source_url": config["source_url"],
            "data": None,
        }

    values = params or {}
    min_lat = max(-90.0, min(90.0, _number(values.get("min_lat"), 40.70)))
    min_lon = max(-180.0, min(180.0, _number(values.get("min_lon"), 28.50)))
    max_lat = max(-90.0, min(90.0, _number(values.get("max_lat"), 41.30)))
    max_lon = max(-180.0, min(180.0, _number(values.get("max_lon"), 29.50)))
    if min_lat >= max_lat or min_lon >= max_lon:
        raise ValueError("AIS bounding box minimums must be lower than maximums.")
    seconds = max(1.0, min(8.0, _number(values.get("seconds"), 4.0)))
    max_vessels = max(1, min(500, int(_number(values.get("max_vessels"), 200))))

    try:
        from websockets.asyncio.client import connect
    except ImportError as error:
        raise RuntimeError("websockets dependency is not installed") from error

    subscription = {
        "APIKey": api_key,
        "BoundingBoxes": [[[min_lat, min_lon], [max_lat, max_lon]]],
        "FilterMessageTypes": ["PositionReport", "StandardClassBPositionReport", "ExtendedClassBPositionReport"],
    }
    vessels: dict[str, dict[str, Any]] = {}
    endpoint = _endpoint(config)
    loop = asyncio.get_running_loop()
    deadline = loop.time() + seconds
    tls_context = ssl.create_default_context(cafile=certifi.where())
    async with connect(endpoint, open_timeout=10, ping_interval=20, max_size=2_000_000, ssl=tls_context) as socket:
        await socket.send(json.dumps(subscription))
        while len(vessels) < max_vessels and loop.time() < deadline:
            try:
                raw = await asyncio.wait_for(socket.recv(), timeout=max(0.1, deadline - loop.time()))
            except asyncio.TimeoutError:
                break
            payload = json.loads(raw)
            metadata = payload.get("MetaData") or {}
            message = payload.get("Message") or {}
            report = next((item for item in message.values() if isinstance(item, dict)), {})
            mmsi = str(metadata.get("MMSI") or report.get("UserID") or report.get("MMSI") or "").strip()
            lat = metadata.get("latitude", metadata.get("Latitude", report.get("Latitude")))
            lon = metadata.get("longitude", metadata.get("Longitude", report.get("Longitude")))
            if not mmsi or lat is None or lon is None:
                continue
            vessels[mmsi] = {
                "mmsi": mmsi,
                "name": str(metadata.get("ShipName") or "AIS vessel").strip(),
                "lat": lat,
                "lon": lon,
                "speed": report.get("Sog", report.get("SpeedOverGround")),
                "course": report.get("Cog", report.get("CourseOverGround")),
                "heading": report.get("TrueHeading"),
                "time_utc": metadata.get("time_utc"),
                "message_type": payload.get("MessageType"),
            }

    return {
        "ok": True,
        "provider": "aisstream",
        "status": "live-free-community",
        "checked_at": _now(),
        "source_url": config["source_url"],
        "coverage_note": "Community AIS reception varies by region; this snapshot is not guaranteed complete.",
        "bounds": [[min_lat, min_lon], [max_lat, max_lon]],
        "data": list(vessels.values()),
        "count": len(vessels),
    }