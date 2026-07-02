from __future__ import annotations

from datetime import datetime
import json
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .engines import (
    clause_diff,
    evaluate_stability,
    make_pdf_bytes,
    parse_offer_text,
    report_text,
    calculate_laytime,
    voyage_estimate,
)


app = FastAPI(
    title="Focusea Backend Engine",
    version="0.1.0",
    description="Broker, chartering, laytime, report and loadicator backend for Focusea.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


def load_store() -> dict[str, Any]:
    if not STORE_PATH.exists():
        return {"fixtures": [], "crm": [], "documents": [], "reports": []}
    try:
        return json.loads(STORE_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"fixtures": [], "crm": [], "documents": [], "reports": []}


def save_store(store: dict[str, Any]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    STORE_PATH.write_text(json.dumps(store, indent=2), encoding="utf-8")


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "service": "focusea-backend",
        "time": datetime.now().isoformat(timespec="seconds"),
        "modules": ["broker-parser", "sof-laytime", "voyage-estimate", "cp-diff", "stability", "pdf"],
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
