# Focusea Python Backend

This backend turns the static Focusea interface into an API-ready broker and loadicator workspace.

## Run locally

```powershell
python -m pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

Then open the site and go to `#pythonEngine`. The API base should stay:

```text
http://127.0.0.1:8000
```

## Endpoints

- `GET /health`
- `GET /api/provider-status`
- `POST /api/broker/parse-offer`
- `POST /api/laytime/sof`
- `POST /api/voyage/estimate`
- `POST /api/charterparty/diff`
- `POST /api/counterparty/score`
- `POST /api/agency/workspace`
- `POST /api/mail/generate`
- `POST /api/fixtures/compare`
- `POST /api/documents/safety`
- `POST /api/document-room/analyze`
- `GET /api/data-trust/center`
- `POST /api/carbon/estimate`
- `POST /api/alarms/ics`
- `POST /api/client-portal/pack`
- `POST /api/daily-brief`
- `POST /api/ai/autopilot`
- `POST /api/ai/copilot`
- `POST /api/ai/knowledge-graph`
- `GET /api/analytics/performance`
- `POST /api/stability/evaluate`
- `POST /api/workspace/save`
- `GET /api/workspace`
- `POST /api/audit`
- `POST /api/reports/{report_type}`
- `POST /api/reports/{report_type}/pdf`

## Production gates

Use environment variables to make the demo production-safe:

```text
FOCUSEA_ALLOWED_ORIGINS=https://captainemo03.github.io,https://your-domain.example
FOCUSEA_AIS_ENDPOINT=https://licensed-ais-provider.example/feed
FOCUSEA_BALTIC_ENDPOINT=https://licensed-market-provider.example/indexes
FOCUSEA_BUNKER_ENDPOINT=https://verified-bunker-provider.example/prices
FOCUSEA_OCR_WORKER=https://your-worker.example/ocr
```

Provider status stays explicit: AIS and Baltic-style indexes are `licensed-required` until a real licensed endpoint is configured.
Audit records include source, confidence, actor, reference and the decision-support disclaimer.

## Notes

GitHub Pages can only host the static frontend. Deploy this backend separately on a Python host such as Render, Railway, Fly.io, a VPS, or another FastAPI-compatible service.
