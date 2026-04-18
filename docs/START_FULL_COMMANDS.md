# Aura start-full.js Commands

This guide documents development commands for [scripts/start-full.js](../scripts/start-full.js) on Windows PowerShell.

## Quick Start

### Simplest Option: PowerShell Wrapper (Recommended)
```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
```
This launcher automatically clears problematic environment variables and handles service startup. Use `-DryRun` to preview without starting services.

See [dev.ps1 Examples](#devps1-examples) for more options.

### Pre-flight Validation
When you start the launcher, it automatically:
1. Validates Node.js version (≥ v18.0)
2. Validates Python version (≥ v3.11)
3. Checks for virtual environment
4. Verifies frontend dependencies (node_modules)
5. Verifies backend dependencies (uvicorn, fastapi, sqlalchemy)
6. Checks for backend configuration file

If any check fails, the launcher exits with details and remediation steps. To skip this check (not recommended), use `--skip-preflight`.

## Core

`node scripts/start-full.js`
- Start backend and frontend with default behavior (runs preflight validation first).

`node scripts/start-full.js --help`
- Show all flags and environment variables.

`node scripts/start-full.js --skip-preflight`
- Skip dependency/version validation and go straight to launcher startup.

`node scripts/start-full.js --dry-run`
- Print resolved commands and exit without starting services (still runs preflight).

**Note:** If launcher exits immediately with a timeout error, see [Fixing Startup Timeout Errors](#fixing-startup-timeout-errors).

## Log Verbosity

`node scripts/start-full.js --quiet`
- Minimal launcher output.

`node scripts/start-full.js --normal`
- Standard output level (default).

`node scripts/start-full.js --verbose`
- Full backend/frontend stream plus resolved command traces.

## Health Checks

`node scripts/start-full.js --no-healthcheck`
- Skip backend/frontend HTTP health probes.

`$env:START_FULL_HEALTHCHECK="0"; node scripts/start-full.js`
- Disable health checks via environment.

`$env:START_FULL_HEALTHCHECK="1"; node scripts/start-full.js`
- Force health checks enabled.

## Timeouts

**Minimum Values (automatically enforced):**
- `STARTUP_TIMEOUT_MS`: minimum 5000ms (default: 30000ms)
- `HEALTHCHECK_TIMEOUT_MS`: minimum 2000ms (default: 12000ms)

If you set a value smaller than the minimum, the launcher will warn and fall back to the default.

`$env:STARTUP_TIMEOUT_MS="45000"; node scripts/start-full.js`
- Increase total startup timeout to 45s (must be ≥ 5000ms).

`$env:HEALTHCHECK_TIMEOUT_MS="15000"; node scripts/start-full.js`
- Increase health-check timeout to 15s (must be ≥ 2000ms).

## Log File

`node scripts/start-full.js --log-file tmp/start-full.log`
- Write launcher and service logs to a file.

`$env:START_FULL_LOG_FILE="tmp/start-full.log"; node scripts/start-full.js`
- Same behavior controlled by environment.

## Log Rotation

`$env:START_FULL_LOG_MAX_BYTES="2097152"; node scripts/start-full.js --log-file tmp/start-full.log`
- Rotate log when size reaches 2MB.

`$env:START_FULL_LOG_MAX_FILES="5"; node scripts/start-full.js --log-file tmp/start-full.log`
- Keep five rotated files (`.1` to `.5`).

## Combined Examples

`$env:STARTUP_TIMEOUT_MS="45000"; $env:HEALTHCHECK_TIMEOUT_MS="15000"; node scripts/start-full.js --verbose`
- Verbose startup with relaxed timeouts.

`$env:START_FULL_LOG_MODE="quiet"; node scripts/start-full.js --no-healthcheck --log-file tmp/start-full.log`
- Fast startup with quiet console and file logging.

`node scripts/start-full.js --dry-run --verbose --log-file tmp/start-full.log`
- Preview command plan and logging setup without launching services.

## Pre-flight Validation Script

The launcher automatically runs [scripts/preflight.js](../scripts/preflight.js) before startup to catch configuration issues early.

### What It Checks

| Check | Requirement | Error vs Warning |
|-------|-------------|------------------|
| Node.js version | ≥ v18.0 | ERROR |
| Python version | ≥ v3.11 | ERROR |
| Virtual environment | .venv must exist | ERROR |
| Frontend dependencies | node_modules must exist | ERROR |
| Backend dependencies | uvicorn, fastapi, sqlalchemy must be importable | ERROR |
| Backend .env file | Optional configuration | WARNING |

### Running Preflight Manually

```bash
node scripts/preflight.js
```

Output example (all checks passing):
```
--- Aura Platform: Pre-flight Check ---

[Node.js] v24.12.0
[Python] Python 3.14.2 (.venv/Scripts/python.exe)
[Python venv] Windows venv found
[Frontend] Dependencies installed
[Backend] Core dependencies installed
[Backend .env] Configuration file exists

✓ Pre-flight check passed. Ready to launch.
```

### Common Preflight Failures

**"Python venv not found"**
```bash
cd F:\Project\Template--5
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
```

**"Frontend: node_modules missing"**
```bash
cd frontend
npm install
cd ..
```

**"Backend: Core dependencies missing"**
```bash
.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
```

**"Python version too old"**
Upgrade Python to v3.11 or newer, then recreate the venv.

## dev.ps1 Examples

The [scripts/dev.ps1](../scripts/dev.ps1) PowerShell wrapper provides an easier way to start the platform with automatic environment cleanup.

### Basic Usage

`powershell -ExecutionPolicy Bypass -File scripts/dev.ps1`
- Start both services (env vars automatically cleaned).

`powershell -ExecutionPolicy Bypass -File scripts/dev.ps1 -VerboseLogs`
- Start with full output stream.

`powershell -ExecutionPolicy Bypass -File scripts/dev.ps1 -Quiet`
- Start with minimal output.

`powershell -ExecutionPolicy Bypass -File scripts/dev.ps1 -DryRun`
- Preview startup commands without launching.

`powershell -ExecutionPolicy Bypass -File scripts/dev.ps1 -NoHealthcheck`
- Skip health checks (faster startup).

`powershell -ExecutionPolicy Bypass -File scripts/dev.ps1 -NoEnvReset`
- Start without clearing problematic env vars (use if intentionally setting them).

## Fixing Startup Timeout Errors

If you see:
```
[Startup ERROR] Timed out after 1ms waiting for backend/frontend readiness
```

This usually means a problematic environment variable is set (commonly `STARTUP_TIMEOUT_MS=1` or similar).

### Solution 1: Use dev.ps1 (Recommended)
```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
```
This automatically clears all problematic env vars.

### Solution 2: Manual Reset
If the launcher prints:
```
[Startup HINT] PowerShell reset: Remove-Item Env:STARTUP_TIMEOUT_MS
```

Run that command directly:
```powershell
Remove-Item Env:STARTUP_TIMEOUT_MS
Remove-Item Env:HEALTHCHECK_TIMEOUT_MS
```

Then retry:
```powershell
node scripts/start-full.js
```

### Solution 3: Start Fresh Terminal
Open a new PowerShell terminal session, which will have clean environment variables by default.

## Environment Variable Reference

| Variable | Default | Min | Purpose | Example |
|----------|---------|-----|---------|---------|
| STARTUP_TIMEOUT_MS | 30000 | 5000 | Total time to wait for services ready | $env:STARTUP_TIMEOUT_MS="45000" |
| HEALTHCHECK_TIMEOUT_MS | 12000 | 2000 | Time to wait per health check probe | $env:HEALTHCHECK_TIMEOUT_MS="15000" |
| START_FULL_LOG_MODE | normal | — | Verbosity: quiet, normal, verbose | $env:START_FULL_LOG_MODE="verbose" |
| START_FULL_HEALTHCHECK | 1 | — | Enable (1) or disable (0) health checks | $env:START_FULL_HEALTHCHECK="0" |
| START_FULL_LOG_FILE | (none) | — | Optional file path for logging | $env:START_FULL_LOG_FILE="tmp/app.log" |
| START_FULL_LOG_MAX_BYTES | 2097152 | 1024 | Rotate log after this many bytes | $env:START_FULL_LOG_MAX_BYTES="5242880" |
## Environment Variable Reference

| Variable | Default | Min | Purpose | Example |
|----------|---------|-----|---------|---------|
| STARTUP_TIMEOUT_MS | 30000 | 5000 | Total time to wait for services ready | $env:STARTUP_TIMEOUT_MS="45000" |
| HEALTHCHECK_TIMEOUT_MS | 12000 | 2000 | Time to wait per health check probe | $env:HEALTHCHECK_TIMEOUT_MS="15000" |
| START_FULL_LOG_MODE | normal | — | Verbosity: quiet, normal, verbose | $env:START_FULL_LOG_MODE="verbose" |
| START_FULL_HEALTHCHECK | 1 | — | Enable (1) or disable (0) health checks | $env:START_FULL_HEALTHCHECK="0" |
| START_FULL_LOG_FILE | (none) | — | Optional file path for logging | $env:START_FULL_LOG_FILE="tmp/app.log" |
| START_FULL_LOG_MAX_BYTES | 2097152 | 1024 | Rotate log after this many bytes | $env:START_FULL_LOG_MAX_BYTES="5242880" |
| START_FULL_LOG_MAX_FILES | 5 | 1 | Number of rotated logs to keep | $env:START_FULL_LOG_MAX_FILES="3" |

## Monitoring & Observability

Once the platform is running, you can access several monitoring endpoints:

### Admin CLI Tool (Recommended for Development)

The quickest way to check system status and view logs/errors is the admin CLI:

```bash
node scripts/admin.js status       # Show backend health and resource usage
node scripts/admin.js errors 20    # View 20 most recent client errors
node scripts/admin.js logs 50      # View 50 most recent backend log lines
node scripts/admin.js stats        # Show platform processing statistics
```

Typical workflow:
```powershell
# Terminal 1: Start the platform
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1

# Terminal 2: Monitor in real-time
node scripts/admin.js status
node scripts/admin.js errors
node scripts/admin.js logs
```

### Health & Status
- **Backend Health:** http://127.0.0.1:8000/api/health
- **System Pulse (CPU/Memory):** http://127.0.0.1:8000/api/system/pulse
- **Global Stats:** http://127.0.0.1:8000/api/stats
- **API Documentation:** http://127.0.0.1:8000/docs (Swagger UI)

### Error Monitoring

**View Recent Client Errors** (frontend crash reports)
```
GET http://127.0.0.1:8000/api/client-errors?limit=50&offset=0
```

Response includes:
- All client-side render errors captured by ErrorBoundary
- Support IDs for error tracking
- Full stack traces and component stacks
- Browser/viewport information
- Route context and user agent

Example:
```bash
curl "http://127.0.0.1:8000/api/client-errors?limit=10"
```

**Filter by Error Type**
```
GET http://127.0.0.1:8000/api/client-errors?limit=20&filter_error=TypeError
```

### Logs & Persistence

**Backend Logs**
Located in `backend/logs/backend.log` with rotation:
- JSON-formatted structured logs
- Rotates at 10MB per file
- Keeps 5 backup files

**Client Error Reports**
Located in `backend/client_error_reports.jsonl`:
- One JSON object per line (JSONL format)
- Each report includes timestamp, error details, browser context
- Useful for aggregation and analysis

View all reports:
```bash
cat backend/client_error_reports.jsonl | jq '.'
```

View latest 5 errors:
```bash
tail -5 backend/client_error_reports.jsonl | jq '.'
```

### Integration Tips

1. **External Monitoring**: Query `/api/client-errors` regularly to aggregate errors in a log service (Sentry, LogRocket, etc.)
2. **Custom Dashboards**: Build metrics on `/api/stats` and `/api/system/pulse` for operational visibility
3. **Alerting**: Monitor client error rates from the errors endpoint and set thresholds
