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
- `POST /api/broker/parse-offer`
- `POST /api/laytime/sof`
- `POST /api/voyage/estimate`
- `POST /api/charterparty/diff`
- `POST /api/stability/evaluate`
- `POST /api/workspace/save`
- `GET /api/workspace`
- `POST /api/reports/{report_type}`
- `POST /api/reports/{report_type}/pdf`

## Notes

GitHub Pages can only host the static frontend. Deploy this backend separately on a Python host such as Render, Railway, Fly.io, a VPS, or another FastAPI-compatible service.
