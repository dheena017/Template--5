# Aura Platform Runbook

This is the shortest practical workflow for running, checking, and fixing the platform.

## 1. Start

Recommended on Windows:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
```

What this does:
- Clears stale launcher environment variables
- Runs pre-flight validation
- Starts backend and frontend
- Shows readiness and health-check status

If you want to preview without starting services:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1 -DryRun
```

## 2. Monitor

Use the admin CLI in a second terminal:
```bash
node scripts/admin.js status
node scripts/admin.js logs 50
node scripts/admin.js stats
node scripts/admin.js errors 20
```

What each command is for:
- `status`: verify backend health and basic system state
- `logs 50`: inspect recent backend log lines
- `stats`: view platform processing metrics
- `errors 20`: view recent frontend crash reports

## 3. Diagnose Frontend Crashes

When ErrorBoundary shows a Support ID, analyze it directly:
```bash
node scripts/analyze-error.js V4KFIPCB
```

What you get:
- error category
- likely causes
- recommended fixes
- docs link

## 4. Common Fixes

If startup fails immediately:
```powershell
Remove-Item Env:STARTUP_TIMEOUT_MS
Remove-Item Env:HEALTHCHECK_TIMEOUT_MS
```

If the frontend shows a dynamic import failure:
- Hard refresh the browser
- Run `cd frontend; npm run build`
- Check for missing files or bad exports in the module path shown in the error

If the backend is unreachable:
- Confirm `scripts/start-full.js` or `scripts/dev.ps1` is running
- Check `node scripts/admin.js status`
- Review `backend/logs/backend.log`

## 5. Quick Daily Loop

```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
node scripts/admin.js status
node scripts/admin.js logs 50
```

If something breaks:
```bash
node scripts/analyze-error.js <SupportID>
```

### 3-Command Daily Workflow

```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
node scripts/admin.js status
node scripts/analyze-error.js <SupportID>
```

Use this when you want the shortest practical loop:
1. Start the platform.
2. Confirm the backend is healthy.
3. Analyze any ErrorBoundary Support ID you see in the browser.

## 6. Reference Docs

- [Launcher Commands](START_FULL_COMMANDS.md)
- [Error Analysis Guide](ERROR_ANALYSIS.md)
- [Documentation Hub](README.md)
- [Project Overview](../README.md)

## 7. What `start-full.js` Uses

### Required at startup
- [scripts/start-full.js](../scripts/start-full.js): launcher entrypoint
- [scripts/preflight.js](../scripts/preflight.js): dependency and environment validation
- [backend/main.py](../backend/main.py): FastAPI backend app
- [frontend/src/App.jsx](../frontend/src/App.jsx): main React app shell and lazy routes
- [frontend/src/pages/dashboards/Dashboard.jsx](../frontend/src/pages/dashboards/Dashboard.jsx): dashboard route used by the lazy import that failed in the crash report

### Helpful, but not required for boot
- [scripts/admin.js](../scripts/admin.js): status/logs/stats helper
- [scripts/analyze-error.js](../scripts/analyze-error.js): Support ID error analysis helper
- [backend/core/logger.py](../backend/core/logger.py): structured backend logging
- [backend/core/error_diagnostics.py](../backend/core/error_diagnostics.py): error analysis logic
- [backend/api/routes/diagnostics.py](../backend/api/routes/diagnostics.py): diagnostics API routes

### Documentation only
- [docs/START_FULL_COMMANDS.md](START_FULL_COMMANDS.md)
- [docs/ERROR_ANALYSIS.md](ERROR_ANALYSIS.md)
- [docs/README.md](README.md)
