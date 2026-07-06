from __future__ import annotations

from datetime import datetime
import math
import re
from typing import Any


CARGO_PROFILES: dict[str, dict[str, Any]] = {
    "coal": {"label": "Coal", "unit": "mt", "freight_multiplier": 1.02, "bunker_multiplier": 1.0, "port_cost_multiplier": 1.08},
    "grain": {"label": "Grain", "unit": "mt", "freight_multiplier": 1.0, "bunker_multiplier": 0.98, "port_cost_multiplier": 1.03},
    "container": {"label": "Container", "unit": "TEU", "freight_multiplier": 1.18, "bunker_multiplier": 1.12, "port_cost_multiplier": 1.22},
    "ironOre": {"label": "Iron Ore", "unit": "mt", "freight_multiplier": 0.96, "bunker_multiplier": 1.05, "port_cost_multiplier": 1.1},
    "crudeOil": {"label": "Crude Oil", "unit": "mt", "freight_multiplier": 1.24, "bunker_multiplier": 1.08, "port_cost_multiplier": 1.18},
    "lng": {"label": "LNG", "unit": "cbm", "freight_multiplier": 1.38, "bunker_multiplier": 1.16, "port_cost_multiplier": 1.35},
    "chemicals": {"label": "Chemicals", "unit": "mt", "freight_multiplier": 1.28, "bunker_multiplier": 1.04, "port_cost_multiplier": 1.24},
    "projectCargo": {"label": "Project Cargo", "unit": "mt", "freight_multiplier": 1.45, "bunker_multiplier": 1.02, "port_cost_multiplier": 1.4},
}


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def number(value: Any, fallback: float = 0) -> float:
    try:
      return float(str(value).replace(",", ""))
    except (TypeError, ValueError):
      return fallback


def cargo_type_from_text(text: str) -> str:
    normalized = text.lower()
    if "lng" in normalized:
        return "lng"
    if "crude" in normalized or "oil" in normalized:
        return "crudeOil"
    if "iron" in normalized:
        return "ironOre"
    if "container" in normalized or "teu" in normalized:
        return "container"
    if "grain" in normalized or "wheat" in normalized:
        return "grain"
    if "chemical" in normalized:
        return "chemicals"
    if "project" in normalized:
        return "projectCargo"
    return "coal"


def parse_offer_text(text: str) -> dict[str, Any]:
    source = text or ""
    cargo_type = cargo_type_from_text(source)
    qty_match = re.search(r"\b(\d+(?:[.,]\d+)?)\s*k\b", source, re.I)
    qty = number(qty_match.group(1), 0) * 1000 if qty_match else 0
    if not qty:
        mt_match = re.search(r"\b(\d+(?:[,\d]*)(?:\.\d+)?)\s*(?:mt|mts|tons?|teu|cbm)\b", source, re.I)
        qty = number(mt_match.group(1), 0) if mt_match else 0

    route_match = re.search(r"\b([A-Z][A-Za-z .'-]+?)\s+(?:to|/|-)\s+([A-Z][A-Za-z .'-]+?)(?:,|\s+laycan|\s+freight|$)", source)
    laycan_match = re.search(r"laycan\s+([0-9]{1,2}\s*/\s*[0-9]{1,2}\s*[A-Za-z]+|[0-9]{1,2}\s*[-/]\s*[0-9]{1,2}\s*[A-Za-z]+|[0-9]{1,2}\s*[-/]\s*[0-9]{1,2})", source, re.I)
    freight_match = re.search(r"freight[^0-9]*(\d+(?:[.,]\d+)?)", source, re.I)
    dem_match = re.search(r"dem(?:urrage)?[^0-9]*(\d+(?:[,\d]*)(?:\.\d+)?)", source, re.I)
    comm_match = re.search(r"commission[^0-9]*(\d+(?:[.,]\d+)?)", source, re.I)
    vessel_match = re.search(r"\b(Supramax|Panamax|Capesize|Handymax|MR|Aframax|Suezmax|VLCC|Feeder|Container)\b", source, re.I)

    parsed = {
        "cargo_type": cargo_type,
        "cargo_label": CARGO_PROFILES[cargo_type]["label"],
        "quantity": round(qty, 2),
        "load_port": route_match.group(1).strip() if route_match else "",
        "discharge_port": route_match.group(2).strip() if route_match else "",
        "route": f"{route_match.group(1).strip()} / {route_match.group(2).strip()}" if route_match else "",
        "laycan": laycan_match.group(1).strip() if laycan_match else "",
        "freight_rate": number(freight_match.group(1), 0) if freight_match else 0,
        "demurrage_rate": number(dem_match.group(1), 0) if dem_match else 0,
        "commission": number(comm_match.group(1), 0) if comm_match else 0,
        "vessel_size": vessel_match.group(1).title() if vessel_match else "",
        "subjects": "subjects" in source.lower(),
    }

    missing = [
        key for key in ["quantity", "route", "laycan", "freight_rate", "demurrage_rate"]
        if not parsed.get(key)
    ]
    risk_score = int(clamp(18 + len(missing) * 14 + (16 if parsed["subjects"] else 0), 0, 100))
    verdict = "Counter needed" if missing else "Recap ready"
    if risk_score >= 65:
        verdict = "Watch before fixing"

    return {
        "parsed": parsed,
        "missing": missing,
        "risk": {"score": risk_score, "label": verdict},
        "recap": build_fixture_recap(parsed),
        "source": "python-fastapi",
    }


def build_fixture_recap(parsed: dict[str, Any]) -> str:
    return "\n".join([
        "FOCUSEA FIXTURE RECAP DRAFT",
        f"Cargo: {parsed.get('quantity') or 'TBC'} {parsed.get('cargo_label', 'Cargo')}",
        f"Route: {parsed.get('route') or 'TBC'}",
        f"Laycan: {parsed.get('laycan') or 'TBC'}",
        f"Freight: {parsed.get('freight_rate') or 'TBC'} per {CARGO_PROFILES.get(parsed.get('cargo_type', 'coal'), CARGO_PROFILES['coal'])['unit']}",
        f"Demurrage: USD {parsed.get('demurrage_rate') or 'TBC'} per day pro rata",
        f"Commission: {parsed.get('commission') or 'TBC'} pct total",
        "Subjects: stem / receiver / management approval to be confirmed",
    ])


def month_index(value: str) -> int:
    months = {
        "jan": 1, "feb": 2, "mar": 3, "apr": 4, "may": 5, "jun": 6,
        "jul": 7, "aug": 8, "sep": 9, "oct": 10, "nov": 11, "dec": 12,
    }
    return months.get(value[:3].lower(), 1)


def parse_event_date(day: str, month: str, time_value: str) -> datetime:
    raw = str(time_value or "0000").zfill(4)
    return datetime(datetime.now().year, month_index(month), int(day), int(raw[:2]), int(raw[2:4]))


def extract_sof_events(text: str) -> dict[str, Any]:
    patterns = [
        ("nor", "NOR tendered", r"nor\s+tendered[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})"),
        ("berthed", "Berthed", r"berth(?:ed)?[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})"),
        ("started", "Operation started", r"(?:loading|discharging|operation)[^\n.]*started[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})"),
        ("completed", "Completed", r"(?:completed|completion|loading completed|discharging completed)[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})"),
    ]
    events = []
    for key, label, pattern in patterns:
        match = re.search(pattern, text, re.I)
        if match:
            date = parse_event_date(match.group(1), match.group(2), match.group(3))
            events.append({"key": key, "label": label, "date": date, "display": date.strftime("%d %b %H:%M")})

    stoppages = []
    for match in re.finditer(r"rain\s*(?:stop|stopped|delay|period)?[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})\s*-\s*(\d{4})", text, re.I):
        start = parse_event_date(match.group(1), match.group(2), match.group(3))
        end = parse_event_date(match.group(1), match.group(2), match.group(4))
        hours = max(0.0, (end - start).total_seconds() / 3600)
        stoppages.append({
            "label": "Rain stoppage",
            "start": start.strftime("%d %b %H:%M"),
            "end": end.strftime("%d %b %H:%M"),
            "hours": round(hours, 2),
        })
    return {"events": events, "stoppages": stoppages}


def calculate_laytime(sof_text: str, allowed_hours: float, demurrage_rate: float, dispatch_rate: float) -> dict[str, Any]:
    extracted = extract_sof_events(sof_text)
    events = extracted["events"]
    start = next((item["date"] for item in events if item["key"] == "started"), None)
    start = start or next((item["date"] for item in events if item["key"] == "berthed"), None)
    start = start or next((item["date"] for item in events if item["key"] == "nor"), None)
    end = next((item["date"] for item in events if item["key"] == "completed"), None)
    used_hours = max(0.0, (end - start).total_seconds() / 3600) if start and end else 0.0
    excluded_hours = sum(item["hours"] for item in extracted["stoppages"])
    net_hours = max(0.0, used_hours - excluded_hours)
    balance_hours = net_hours - allowed_hours
    demurrage = balance_hours / 24 * demurrage_rate if balance_hours > 0 else 0.0
    dispatch = abs(balance_hours) / 24 * dispatch_rate if balance_hours < 0 else 0.0
    verdict = "DEMURRAGE" if demurrage > 0 else "DISPATCH" if dispatch > 0 else "BALANCED"
    return {
        "events": [{k: v for k, v in item.items() if k != "date"} for item in events],
        "stoppages": extracted["stoppages"],
        "allowed_hours": round(allowed_hours, 2),
        "used_hours": round(used_hours, 2),
        "excluded_hours": round(excluded_hours, 2),
        "net_hours": round(net_hours, 2),
        "balance_hours": round(balance_hours, 2),
        "demurrage_amount": round(demurrage, 2),
        "dispatch_amount": round(dispatch, 2),
        "verdict": verdict,
        "source": "python-fastapi",
    }


def voyage_estimate(payload: dict[str, Any]) -> dict[str, Any]:
    cargo_type = payload.get("cargo_type") or "coal"
    profile = CARGO_PROFILES.get(cargo_type, CARGO_PROFILES["coal"])
    speed = max(number(payload.get("speed"), 1), 1)
    distance = number(payload.get("distance"), 0)
    port_days = number(payload.get("port_days"), 0)
    sea_days = distance / speed / 24
    total_days = sea_days + port_days
    bunker_tons = (
        sea_days * number(payload.get("sea_cons"), 0)
        + port_days * number(payload.get("port_cons"), 0)
    ) * profile["bunker_multiplier"]
    bunker_cost = bunker_tons * number(payload.get("bunker_price"), 0)
    gross_freight = number(payload.get("cargo_qty"), 0) * number(payload.get("freight_rate"), 0) * profile["freight_multiplier"]
    brokerage = gross_freight * number(payload.get("commission"), 0) / 100
    port_costs = number(payload.get("port_costs"), 0) * profile["port_cost_multiplier"]
    canal_costs = number(payload.get("canal_costs"), 0)
    hire_cost = total_days * number(payload.get("daily_hire"), 0)
    net_before_hire = gross_freight - brokerage - bunker_cost - port_costs - canal_costs
    pnl = net_before_hire - hire_cost
    tce = net_before_hire / total_days if total_days else 0
    return {
        "cargo": profile["label"],
        "sea_days": round(sea_days, 2),
        "total_days": round(total_days, 2),
        "bunker_tons": round(bunker_tons, 2),
        "bunker_cost": round(bunker_cost, 2),
        "gross_freight": round(gross_freight, 2),
        "brokerage": round(brokerage, 2),
        "port_costs": round(port_costs, 2),
        "canal_costs": round(canal_costs, 2),
        "hire_cost": round(hire_cost, 2),
        "tce": round(tce, 2),
        "pnl": round(pnl, 2),
        "verdict": "PROFITABLE" if pnl >= 0 else "LOSS WATCH",
        "source": "python-fastapi",
    }


def clause_diff(original_clause: str, revised_clause: str) -> dict[str, Any]:
    original = original_clause.lower()
    revised = revised_clause.lower()
    findings = []
    if "whether in berth" in revised and "whether in berth" not in original:
        findings.append("NOR widened to WIBON style wording.")
    if "waiting for berth" in revised and "waiting for berth" not in original:
        findings.append("Waiting time now counts toward laytime; owner-favouring change.")
    if "unless used" in revised and "unless used" not in original:
        findings.append("Weather exception narrowed by unless-used wording.")
    if "demurrage" in revised and "pro rata" not in revised:
        findings.append("Demurrage wording should confirm pro rata basis.")
    risk_score = int(clamp(28 + len(findings) * 18, 0, 100))
    return {
        "findings": findings or ["No major wording shift detected by rule engine."],
        "risk_score": risk_score,
        "posture": "Owner leaning / negotiate" if risk_score >= 64 else "Review wording" if risk_score >= 42 else "Low change risk",
        "counter_wording": "Clarify NOR validity, waiting time, weather exceptions and demurrage pro rata before subjects are lifted.",
        "source": "python-fastapi",
    }


def score_counterparty(payload: dict[str, Any]) -> dict[str, Any]:
    payment = str(payload.get("payment", "Unknown"))
    open_claims = number(payload.get("open_claims"), 0)
    past_fixtures = number(payload.get("past_fixtures"), 0)
    payment_risk = {
        "Clean": 4,
        "Slow payer": 22,
        "Unknown": 18,
        "Dispute history": 34,
    }.get(payment, 18)
    risk_score = int(clamp(34 + payment_risk + open_claims * 14 - min(18, past_fixtures * 3), 0, 100))
    trust_score = int(clamp(100 - risk_score, 0, 100))
    verdict = "Do not lift subjects without protection" if risk_score >= 70 else "Tight subjects / references" if risk_score >= 50 else "Workable counterparty"
    return {
        "company": payload.get("company", "Counterparty"),
        "role": payload.get("role", "Charterer"),
        "risk_score": risk_score,
        "trust_score": trust_score,
        "verdict": verdict,
        "actions": [
            "Confirm payment references and bank details before final recap.",
            "Keep subject deadline, claim evidence and invoice trail in the deal room.",
            "Run sanctions, beneficial owner and cargo-origin checks before fixing.",
        ],
        "source": "python-fastapi",
    }


def agency_workspace(payload: dict[str, Any]) -> dict[str, Any]:
    port = str(payload.get("port", "Mersin"))
    eta_days = number(payload.get("eta_days"), 7)
    berth_window = number(payload.get("berth_window"), 36)
    pda = number(payload.get("pda"), 68000)
    waiting_risk = int(clamp(42 + (18 if berth_window < 24 else 0) + (8 if eta_days < 3 else 0), 0, 100))
    return {
        "port": port,
        "eta_days": eta_days,
        "berth_window_hours": berth_window,
        "pda_estimate": pda,
        "waiting_risk": waiting_risk,
        "timeline": [
            "Request agency PDA, berth window and terminal restrictions.",
            "Confirm free pratique, customs, ISPS and cargo documents.",
            "Line up pilot, tug, berth and NOR readiness.",
            "Collect signed SOF, rain letter, logs and departure documents.",
        ],
        "documents": ["NOR", "SOF", "Cargo manifest", "Crew list", "ISPS declaration", "Rain/weather letter"],
        "source": "python-fastapi",
    }


def generate_broker_mail(payload: dict[str, Any]) -> dict[str, Any]:
    mail_type = str(payload.get("mail_type", "Counter offer"))
    recipient = str(payload.get("recipient", "all"))
    deal = parse_offer_text(str(payload.get("deal_text", "")))
    parsed = deal["parsed"]
    route = parsed.get("route") or "route TBC"
    cargo = parsed.get("cargo_label") or "cargo"
    freight = parsed.get("freight_rate") or "TBC"
    body = [
        f"Subject: {mail_type} - {cargo} - {route}",
        "",
        f"Dear {recipient},",
        "",
    ]
    if mail_type.lower().startswith("claim"):
        body.append("Please provide comments on our laytime position together with signed SOF, NOR, weather logs and terminal records.")
    elif "recap" in mail_type.lower():
        body.append(build_fixture_recap(parsed))
    else:
        body.append(f"We can counter basis {route} at freight {freight}, subject clean recap, CP wording, terminal confirmation and management approval.")
    body.extend(["", f"Focusea parser risk: {deal['risk']['score']}/100.", "", "Best regards,"])
    return {"mail_type": mail_type, "text": "\n".join(body), "parsed": parsed, "source": "python-fastapi"}


def compare_fixtures(payload: dict[str, Any]) -> dict[str, Any]:
    deals = []
    for label in ["A", "B", "C"]:
        parsed_pack = parse_offer_text(str(payload.get(f"deal_{label.lower()}", "")))
        parsed = parsed_pack["parsed"]
        cargo_type = parsed.get("cargo_type") or "coal"
        profile = CARGO_PROFILES.get(cargo_type, CARGO_PROFILES["coal"])
        qty = number(parsed.get("quantity"), 50000)
        freight = number(parsed.get("freight_rate"), 0) or 18
        risk = parsed_pack["risk"]["score"]
        gross = qty * freight * profile["freight_multiplier"]
        tce_proxy = gross / 24 - risk * 180
        score = int(clamp(100 - risk * 0.55 + tce_proxy / 1200, 0, 100))
        deals.append({
            "label": label,
            "cargo": profile["label"],
            "route": parsed.get("route") or "TBC",
            "risk": risk,
            "tce_proxy": round(tce_proxy, 2),
            "score": score,
        })
    deals.sort(key=lambda item: item["score"], reverse=True)
    return {"winner": deals[0], "deals": deals, "source": "python-fastapi"}


def evaluate_stability(loads_text: str, vessel: dict[str, Any] | None = None) -> dict[str, Any]:
    vessel = vessel or {}
    pattern = re.compile(r"(H\d)\s+([a-z]+)?\s*(\d+(?:[.,]\d+)?)\s*mt\s*x\s*(-?\d+(?:[.,]\d+)?)\s*y\s*(-?\d+(?:[.,]\d+)?)\s*kg\s*(\d+(?:[.,]\d+)?)", re.I)
    loads = []
    for match in pattern.finditer(loads_text):
        loads.append({
            "hold": match.group(1),
            "cargo": match.group(2) or "cargo",
            "weight": number(match.group(3)),
            "x": number(match.group(4)),
            "y": number(match.group(5)),
            "kg": number(match.group(6)),
        })
    if not loads:
        loads = [
            {"hold": "H1", "cargo": "coal", "weight": 8500, "x": -72, "y": -1, "kg": 8.5},
            {"hold": "H2", "cargo": "coal", "weight": 9500, "x": -36, "y": 1, "kg": 8.2},
            {"hold": "H3", "cargo": "containers", "weight": 5200, "x": 0, "y": 3, "kg": 15.8},
            {"hold": "H4", "cargo": "grain", "weight": 7800, "x": 35, "y": -2, "kg": 9.4},
            {"hold": "H5", "cargo": "project", "weight": 2600, "x": 71, "y": 4, "kg": 13.5},
        ]
    total_weight = sum(item["weight"] for item in loads)
    lcg = sum(item["weight"] * item["x"] for item in loads) / max(total_weight, 1)
    tcg = sum(item["weight"] * item["y"] for item in loads) / max(total_weight, 1)
    kg = sum(item["weight"] * item["kg"] for item in loads) / max(total_weight, 1)
    km = number(vessel.get("km"), 14.2)
    displacement = number(vessel.get("displacement"), 65000)
    gm = km - kg
    trim_m = lcg * total_weight / max(displacement, 1) / 6.8
    heel_deg = math.degrees(math.atan2(tcg, max(gm, 0.2)))
    heaviest = max(loads, key=lambda item: item["weight"])
    verdict = "ALERT" if gm < 0.8 or abs(heel_deg) > 5 or abs(trim_m) > 2.5 else "WATCH" if gm < 1.4 or abs(heel_deg) > 3 else "PASS"
    return {
        "loads": loads,
        "total_weight": round(total_weight, 2),
        "kg": round(kg, 2),
        "km": round(km, 2),
        "gm": round(gm, 2),
        "lcg": round(lcg, 2),
        "tcg": round(tcg, 2),
        "trim_m": round(trim_m, 2),
        "heel_deg": round(heel_deg, 2),
        "shear_force_proxy": round(abs(lcg) * total_weight / 100, 2),
        "bending_moment_proxy": round(sum(abs(item["x"]) * item["weight"] for item in loads) / 1000, 2),
        "verdict": verdict,
        "recommendation": f"{heaviest['hold']} is the heaviest hold. Move high KG cargo toward midship and correct port/stbd offset with ballast.",
        "source": "python-fastapi",
    }


def report_text(title: str, data: dict[str, Any]) -> str:
    lines = [title.upper(), f"Generated: {datetime.now().isoformat(timespec='seconds')}", ""]
    for key, value in data.items():
        lines.append(f"{key}: {value}")
    return "\n".join(lines)


def sanitize_pdf_text(value: str) -> str:
    return re.sub(r"[^\x09\x0A\x0D\x20-\x7E]", "?", value)


def make_pdf_bytes(title: str, body: str) -> bytes:
    text = sanitize_pdf_text(f"{title}\nGenerated: {datetime.now().isoformat(timespec='seconds')}\n\n{body}")
    raw_lines = []
    for line in text.splitlines():
        while len(line) > 92:
            raw_lines.append(line[:92])
            line = line[92:]
        raw_lines.append(line)
    pages = [raw_lines[index:index + 46] for index in range(0, len(raw_lines), 46)] or [[]]
    objects: list[str] = ["<< /Type /Catalog /Pages 2 0 R >>"]
    font_object_id = 3 + len(pages) * 2
    kids = " ".join(f"{3 + index * 2} 0 R" for index in range(len(pages)))
    objects.append(f"<< /Type /Pages /Kids [{kids}] /Count {len(pages)} >>")
    for index, lines in enumerate(pages):
        page_id = 3 + index * 2
        content_id = page_id + 1
        escaped = [line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)") for line in lines]
        stream = "\n".join(["BT", "/F1 10 Tf", "50 800 Td", "14 TL", *[f"({line}) Tj T*" for line in escaped], "ET"])
        objects.append(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 {font_object_id} 0 R >> >> /Contents {content_id} 0 R >>")
        objects.append(f"<< /Length {len(stream.encode('latin-1', 'replace'))} >>\nstream\n{stream}\nendstream")
    objects.append("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    pdf = "%PDF-1.4\n"
    offsets = [0]
    for index, obj in enumerate(objects, start=1):
        offsets.append(len(pdf.encode("latin-1")))
        pdf += f"{index} 0 obj\n{obj}\nendobj\n"
    xref = len(pdf.encode("latin-1"))
    pdf += f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n"
    for offset in offsets[1:]:
        pdf += f"{offset:010d} 00000 n \n"
    pdf += f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF"
    return pdf.encode("latin-1", "replace")
