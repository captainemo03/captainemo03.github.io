# Report Builder Tools

This folder keeps the local Python helpers used to generate and audit maritime report documents for Focusea-related deliverables.

These scripts are intentionally separated from the public GitHub Pages site files so the project root stays clean while the source remains versioned.

Typical use from the repository root:

```powershell
python tools/report-builders/build_reports.py
python tools/report-builders/audit_reports.py
```

Generated private document outputs belong in `teslim/`, which is ignored by Git.