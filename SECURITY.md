# Security Policy

Report suspected security issues privately to the project owner. Do not paste passwords, API keys, identity documents, vessel certificates or fixture documents into public issues.

## Implemented controls

- PBKDF2-SHA256 password hashing with per-password random salts
- unique username and email constraints
- revocable, expiring bearer sessions
- one-time, expiring password reset tokens
- authentication rate limiting
- restrictive API security headers and no-store caching for private responses
- server-side provider keys; keys are never sent to the browser
- upload allowlist, 8 MB limit, safe filenames, PDF signature checks and SHA-256 fingerprints
- per-user Deal Room ownership checks and audit events
- explicit `licensed-required` status when AIS/Baltic data is not connected

## Production responsibilities

Before public document uploads, deploy a malware scanner and image OCR worker, configure encrypted backups, rotate secrets, use HTTPS only, restrict CORS to production domains and migrate database/files to managed durable storage. The upload checks in this repository are a defensive first layer, not a replacement for antivirus scanning.