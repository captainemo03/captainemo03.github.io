# Focusea Production API

FastAPI service for authenticated Focusea accounts, Deal Rooms, fixture workflows, document vaults, reports and licensed maritime data adapters.

## Local run

```powershell
python -m pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload
```

Open `http://127.0.0.1:8000/docs`. The static website can use `http://127.0.0.1:8000` as its API base.

## Production modules

- PBKDF2-SHA256 passwords with unique username and email constraints
- revocable bearer sessions and one-hour password reset tokens
- optional Gmail/SMTP password reset delivery
- new-account owner notification queue and optional webhook
- SQLite Deal Rooms, documents, reports and audit trail
- fixture message -> parse -> voyage/TCE -> risk -> clause review -> counter mail -> Deal Room
- PDF/text extraction, MIME/size/PDF-signature checks and SHA-256 document fingerprints
- free AISStream snapshot adapter, MET Norway global forecasts, NWS alerts, EIA indicators and official UN/LOCODE/WPI source links
- commercial AIS, Baltic and bunker adapters that remain locked until licensed endpoints are configured
- security headers, no-store responses for private endpoints and auth rate limiting

## Important endpoints

- `POST /api/auth/register`, `/login`, `/logout`, `/forgot-password`, `/reset-password`
- `GET /api/auth/me`, `PUT /api/auth/progress`
- `GET|POST /api/deals`, `GET|PATCH /api/deals/{id}`
- `POST /api/workflow/fixture`
- `POST /api/deals/{id}/documents`
- `GET /api/providers/status`
- `GET /api/providers/{aisstream|met_norway|nws|eia|unlocode|wpi}`
- `GET /api/providers/{ais|baltic|bunker}` for optional commercial feeds
- existing calculation, laytime, voyage, stability and report endpoints remain available

## Configuration

Copy `backend/.env.example` values into your hosting provider's secret environment settings. Never commit `.env`, API keys or SMTP passwords.

Gmail password resets require an app password or approved SMTP credential. Set `FOCUSEA_SMTP_HOST`, `FOCUSEA_SMTP_USERNAME`, `FOCUSEA_SMTP_PASSWORD` and `FOCUSEA_SMTP_FROM`.

AISStream and EIA need free API keys. MET Norway, NWS, UN/LOCODE and WPI do not need keys. Commercial AIS and Baltic data are not bundled; without licensed credentials those adapters return `licensed-required` and no invented data.

## Deploy

`Dockerfile` and `render.yaml` are included. GitHub Pages hosts only the frontend; deploy the API separately and enter its HTTPS base URL in Focusea's Connected Backend screen.

For multi-instance production, move SQLite and uploaded files to managed PostgreSQL/object storage. Configure backups, malware scanning and an OCR worker before accepting sensitive commercial documents.

## Tests

```powershell
python -m pip install -r backend/requirements-dev.txt
python -m pytest backend/tests -q
```
### Render storage note

The included blueprint attaches a persistent disk because SQLite and uploaded documents cannot survive on an ephemeral free web-service filesystem. Use paid persistent storage or migrate to managed PostgreSQL/object storage before real users upload data.