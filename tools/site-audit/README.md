# Site Audit

Run this before publishing Focusea changes:

```powershell
node tools/site-audit/site-audit.js
```

The audit checks:

- Required public pages exist
- Local HTML href/src references point to existing files
- Duplicate IDs in HTML pages
- Sitemap includes public pages
- Service worker cached assets exist
- Service worker cache version is current