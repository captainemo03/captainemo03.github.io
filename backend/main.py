from __future__ import annotations

from datetime import datetime
import json
import os
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

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
    version="0.1.0",
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

DATA_DIR = Path(__file__).resolve().parent / "data"
STORE_PATH = DATA_DIR / "focusea_store.json"


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


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "service": "focusea-backend",
        "time": datetime.now().isoformat(timespec="seconds"),
        "modules": [
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
    return {
        "source": "python-fastapi",
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "providers": [
            {
                "name": "AIS live traffic",
                "status": "licensed-required",
                "env": "FOCUSEA_AIS_ENDPOINT",
                "connected": bool(os.getenv("FOCUSEA_AIS_ENDPOINT")),
                "note": "Use a licensed AIS provider before showing global traffic as live.",
            },
            {
                "name": "Baltic-style market indexes",
                "status": "licensed-required",
                "env": "FOCUSEA_BALTIC_ENDPOINT",
                "connected": bool(os.getenv("FOCUSEA_BALTIC_ENDPOINT")),
                "note": "Do not label BDI/BDTI/BCTI as live without licensed data.",
            },
            {
                "name": "Bunker prices",
                "status": "api-ready",
                "env": "FOCUSEA_BUNKER_ENDPOINT",
                "connected": bool(os.getenv("FOCUSEA_BUNKER_ENDPOINT")),
                "note": "Verified snapshot or paid feed should include source and timestamp.",
            },
            {
                "name": "OCR / document extraction",
                "status": "backend-ready",
                "env": "FOCUSEA_OCR_WORKER",
                "connected": bool(os.getenv("FOCUSEA_OCR_WORKER")),
                "note": "Production OCR needs a worker and malware scanning before parsing.",
            },
        ],
    }


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
    return data_trust_center()


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
