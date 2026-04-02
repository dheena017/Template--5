import { spawn } from 'child_process';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

/**
 * Aura Platform Full-Stack Launcher
 * Orchestrates the Python/FastAPI backend and React/Vite frontend.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '..');
const frontendCwd = path.join(rootPath, 'frontend');
const shutdownTimeoutMs = 3500;
const defaultStartupTimeoutMs = 30000;
const defaultHealthCheckTimeoutMs = 12000;
const defaultLogMaxBytes = 2 * 1024 * 1024;
const defaultLogMaxFiles = 5;
const validLogModes = ['quiet', 'normal', 'verbose'];
const cliArgs = process.argv.slice(2);

function hasFlag(flag) {
    return cliArgs.includes(flag);
}

function readArgValue(flag) {
    const index = cliArgs.indexOf(flag);
    if (index === -1) {
        return null;
    }
    const value = cliArgs[index + 1];
    if (!value || value.startsWith('--')) {
        return null;
    }
    return value;
}

function printHelp() {
    console.log('Aura Platform Full-Stack Launcher');
    console.log('Usage: node scripts/start-full.js [--quiet|--normal|--verbose] [--no-healthcheck] [--log-file <path>] [--dry-run] [--skip-preflight] [--help]');
    console.log('');
    console.log('Flags:');
    console.log('  --quiet     Minimal launcher output (service stream hidden)');
    console.log('  --normal    Default output level');
    console.log('  --verbose   Full service output stream');
    console.log('  --no-healthcheck  Skip backend/frontend HTTP health probes');
    console.log('  --log-file <path> Append launcher/service logs to a file');
    console.log('  --skip-preflight  Skip dependency/version validation checks');
    console.log('  --dry-run   Print resolved commands and exit without starting services');
    console.log('  --help      Show this help and exit');
    console.log('');
    console.log('Environment Variables:');
    console.log('  STARTUP_TIMEOUT_MS       Startup timeout in ms (default: 30000, min: 5000)');
    console.log('  HEALTHCHECK_TIMEOUT_MS   Health check timeout in ms (default: 12000, min: 2000)');
    console.log('  START_FULL_LOG_MODE      quiet | normal | verbose (used when no CLI log flag is set)');
    console.log('  START_FULL_HEALTHCHECK   1 (default) | 0 to disable health checks');
    console.log('  START_FULL_LOG_FILE      Log file path (used when --log-file is not provided)');
    console.log('  START_FULL_LOG_MAX_BYTES Rotate log when file exceeds this size (default: 2097152, min: 1024)');
    console.log('  START_FULL_LOG_MAX_FILES Number of rotated files to keep (default: 5, min: 1)');
}

function parseLogModeFromArgs(args) {
    if (args.includes('--quiet')) {
        return 'quiet';
    }
    if (args.includes('--verbose')) {
        return 'verbose';
    }
    if (args.includes('--normal')) {
        return 'normal';
    }
    return null;
}

function printEnvResetHint(envName) {
    if (process.platform === 'win32') {
        console.warn(`[Startup HINT] PowerShell reset: Remove-Item Env:${envName}`);
        return;
    }

    console.warn(`[Startup HINT] Shell reset: unset ${envName}`);
}

function parsePositiveIntegerEnv(envName, fallback, minValue = 1) {
    const raw = process.env[envName];
    if (!raw) {
        return fallback;
    }

    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        console.warn(`[Startup WARN] Ignoring invalid ${envName}=${raw}; using ${fallback}`);
        printEnvResetHint(envName);
        return fallback;
    }

    if (parsed < minValue) {
        console.warn(`[Startup WARN] Ignoring too-small ${envName}=${raw}; minimum is ${minValue}, using ${fallback}`);
        printEnvResetHint(envName);
        return fallback;
    }

    return parsed;
}

if (hasFlag('--help') || hasFlag('-h')) {
    printHelp();
    process.exit(0);
}

const startupTimeoutMs = parsePositiveIntegerEnv('STARTUP_TIMEOUT_MS', defaultStartupTimeoutMs, 5000);
const healthCheckTimeoutMs = parsePositiveIntegerEnv('HEALTHCHECK_TIMEOUT_MS', defaultHealthCheckTimeoutMs, 2000);
const logMaxBytes = parsePositiveIntegerEnv('START_FULL_LOG_MAX_BYTES', defaultLogMaxBytes, 1024);
const logMaxFiles = parsePositiveIntegerEnv('START_FULL_LOG_MAX_FILES', defaultLogMaxFiles, 1);
const envHealthcheckRaw = String(process.env.START_FULL_HEALTHCHECK ?? '1').toLowerCase();
const envHealthcheckEnabled = !['0', 'false', 'off', 'no'].includes(envHealthcheckRaw);
const healthChecksEnabled = !hasFlag('--no-healthcheck') && envHealthcheckEnabled;
const cliLogFile = readArgValue('--log-file');
const envLogFile = process.env.START_FULL_LOG_FILE?.trim() || null;
const logFilePath = cliLogFile || envLogFile;
const dryRun = hasFlag('--dry-run');
const cliLogMode = parseLogModeFromArgs(cliArgs);
const rawLogMode = (process.env.START_FULL_LOG_MODE ?? 'normal').toLowerCase();
const envLogMode = validLogModes.includes(rawLogMode) ? rawLogMode : 'normal';
const logMode = cliLogMode ?? envLogMode;
const launchStartedAt = Date.now();

console.log('--- Aura Platform: Booting Full Stack ---');
console.log(`[Startup] Startup timeout: ${startupTimeoutMs}ms`);
console.log(`[Startup] Healthcheck timeout: ${healthCheckTimeoutMs}ms`);
console.log(`[Startup] Healthchecks: ${healthChecksEnabled ? 'enabled' : 'disabled'}`);
console.log(`[Startup] Log mode: ${logMode}`);
if (cliLogMode) {
    console.log('[Startup] Log mode source: CLI flag');
} else {
    console.log('[Startup] Log mode source: START_FULL_LOG_MODE');
}
console.log('[Startup] Backend: 8000 | Frontend: 5173 (Vite default)');
if (dryRun) {
    console.log('[Startup] Dry run: enabled');
}
if (logFilePath) {
    console.log(`[Startup] Log file: ${logFilePath}`);
    console.log(`[Startup] Log rotation: ${logMaxBytes} bytes, ${logMaxFiles} files`);
}

let detectedBackendUrl = null;
let detectedFrontendUrl = null;
let summaryPrinted = false;
let isShuttingDown = false;
let backendReady = false;
let frontendReady = false;
let startupTimeoutHandle = null;
let backend = null;
let frontend = null;
let healthCheckInFlight = false;
let backendHealthy = !healthChecksEnabled;
let frontendHealthy = !healthChecksEnabled;
let logFileEnabled = false;
let logFileWriteFailed = false;

if (!validLogModes.includes(rawLogMode)) {
    console.warn(`[Startup WARN] Ignoring invalid START_FULL_LOG_MODE=${rawLogMode}; using normal`);
}

function stripAnsi(text) {
    return text.replace(/\u001b\[[0-9;]*m/g, '');
}

function appendLogLine(line) {
    if (!logFileEnabled || logFileWriteFailed || !logFilePath) {
        return;
    }

    try {
        fs.appendFileSync(logFilePath, `${line}\n`);
    } catch {
        logFileWriteFailed = true;
        console.warn(`[Startup WARN] Failed writing to log file: ${logFilePath}`);
    }
}

function rotateLogFileIfNeeded(filePath, maxBytes, maxFiles) {
    if (!fs.existsSync(filePath)) {
        return;
    }

    const currentSize = fs.statSync(filePath).size;
    if (currentSize < maxBytes) {
        return;
    }

    const maxRetained = Math.max(1, maxFiles);
    const oldestPath = `${filePath}.${maxRetained}`;
    if (fs.existsSync(oldestPath)) {
        fs.unlinkSync(oldestPath);
    }

    for (let i = maxRetained - 1; i >= 1; i -= 1) {
        const source = `${filePath}.${i}`;
        const destination = `${filePath}.${i + 1}`;
        if (fs.existsSync(source)) {
            fs.renameSync(source, destination);
        }
    }

    fs.renameSync(filePath, `${filePath}.1`);
}

function getErrorMessage(err) {
    if (err instanceof Error) {
        return err.message;
    }

    return String(err);
}

function logLauncherError(scope, message) {
    const line = `[${scope} ERROR] ${message}`;
    console.error(line);
    appendLogLine(line);
}

function logLauncherInfo(scope, message) {
    const line = `[${scope}] ${message}`;
    console.log(line);
    appendLogLine(line);
}

function getElapsedMs() {
    return Date.now() - launchStartedAt;
}

function formatState(flag) {
    return flag ? 'yes' : 'no';
}

function printShutdownSummary(reason, code) {
    console.log('--- Aura Platform: Shutdown Summary ---');
    appendLogLine('--- Aura Platform: Shutdown Summary ---');
    logLauncherInfo('Shutdown', `Reason: ${reason}`);
    logLauncherInfo('Shutdown', `Exit code: ${code}`);
    logLauncherInfo('Shutdown', `Uptime: ${getElapsedMs()}ms`);
    logLauncherInfo('State', `backendReady=${formatState(backendReady)} frontendReady=${formatState(frontendReady)}`);
    logLauncherInfo('State', `backendHealthy=${formatState(backendHealthy)} frontendHealthy=${formatState(frontendHealthy)}`);
    logLauncherInfo('State', `backendUrl=${detectedBackendUrl ?? 'n/a'} frontendUrl=${detectedFrontendUrl ?? 'n/a'}`);
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function withPath(baseUrl, pathSuffix) {
    return `${baseUrl.replace(/\/$/, '')}${pathSuffix}`;
}

async function checkHttpOk(url) {
    try {
        const controller = new AbortController();
        const timeoutHandle = setTimeout(() => controller.abort(), 1500);
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutHandle);
        return response.ok;
    } catch {
        return false;
    }
}

async function waitForHttpOk(url, timeoutMs) {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        if (await checkHttpOk(url)) {
            return true;
        }
        await delay(400);
    }
    return false;
}

function maybePrintServiceSummary() {
    if (summaryPrinted || !detectedBackendUrl || !detectedFrontendUrl || !backendReady || !frontendReady || !backendHealthy || !frontendHealthy) {
        return;
    }

    summaryPrinted = true;
    if (startupTimeoutHandle) {
        clearTimeout(startupTimeoutHandle);
        startupTimeoutHandle = null;
    }

    console.log('--- Aura Platform: Services Ready ---');
    logLauncherInfo('Startup', `Ready in ${getElapsedMs()}ms`);
    logLauncherInfo('Backend', detectedBackendUrl);
    logLauncherInfo('Frontend', detectedFrontendUrl);
}

async function maybeRunHealthChecks() {
    if (!healthChecksEnabled) {
        return;
    }

    if (healthCheckInFlight || summaryPrinted || isShuttingDown) {
        return;
    }

    if (!detectedBackendUrl || !detectedFrontendUrl || !backendReady || !frontendReady) {
        return;
    }

    healthCheckInFlight = true;
    logLauncherInfo('Health', 'Running startup health checks...');

    const backendHealthUrl = withPath(detectedBackendUrl, '/api/health');
    const backendOk = await waitForHttpOk(backendHealthUrl, healthCheckTimeoutMs);
    if (!backendOk) {
        logLauncherError('Health', `Backend health check failed: ${backendHealthUrl}`);
        shutdown('--- Shutting Down Aura Platform (backend health check failed) ---', 1);
        healthCheckInFlight = false;
        return;
    }
    backendHealthy = true;

    const frontendOk = await waitForHttpOk(detectedFrontendUrl, healthCheckTimeoutMs);
    if (!frontendOk) {
        logLauncherError('Health', `Frontend health check failed: ${detectedFrontendUrl}`);
        shutdown('--- Shutting Down Aura Platform (frontend health check failed) ---', 1);
        healthCheckInFlight = false;
        return;
    }
    frontendHealthy = true;
    healthCheckInFlight = false;

    maybePrintServiceSummary();
}

function startStartupTimeout() {
    startupTimeoutHandle = setTimeout(() => {
        if (summaryPrinted || isShuttingDown) {
            return;
        }

        const missing = [];
        if (!backendReady) {
            missing.push('backend readiness');
        }
        if (!frontendReady) {
            missing.push('frontend readiness');
        }

        logLauncherError('Startup', `Timed out after ${startupTimeoutMs}ms waiting for ${missing.join(', ')} (elapsed ${getElapsedMs()}ms)`);
        shutdown('--- Shutting Down Aura Platform (startup timeout) ---', 1);
    }, startupTimeoutMs);

    startupTimeoutHandle.unref();
}

function assertRequiredPath(targetPath, label) {
    if (fs.existsSync(targetPath)) {
        return;
    }

    logLauncherError('Startup', `Missing ${label}: ${targetPath}`);
    process.exit(1);
}

function spawnService(name, command, args, cwd) {
    try {
        return spawn(command, args, {
            cwd,
            stdio: ['ignore', 'pipe', 'pipe']
        });
    } catch (err) {
        logLauncherError(name, `Spawn failed: ${getErrorMessage(err)}`);
        process.exit(1);
    }
}

function terminateChild(child) {
    if (!child || child.killed) {
        return;
    }

    try {
        child.kill('SIGTERM');
    } catch {
        try {
            child.kill();
        } catch {
            return;
        }
    }

    setTimeout(() => {
        if (!child.killed) {
            try {
                child.kill('SIGKILL');
            } catch {
                // Best effort: process may already be gone.
            }
        }
    }, shutdownTimeoutMs).unref();
}

function shutdown(reason, code = 0) {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;
    console.log(reason);
    if (startupTimeoutHandle) {
        clearTimeout(startupTimeoutHandle);
        startupTimeoutHandle = null;
    }
    printShutdownSummary(reason, code);
    terminateChild(backend);
    terminateChild(frontend);

    setTimeout(() => {
        process.exit(code);
    }, shutdownTimeoutMs).unref();
}

function handleServiceExit(name, code, signal) {
    const details = signal ? `signal=${signal}` : `code=${code ?? 'null'}`;

    if (isShuttingDown) {
        return;
    }

    if (code === 0) {
        shutdown(`--- Shutting Down Aura Platform (${name} exited normally: ${details}) ---`, 0);
        return;
    }

    logLauncherError(name, `Exited unexpectedly (${details})`);
    const exitCode = typeof code === 'number' && code !== 0 ? code : 1;
    shutdown(`--- Shutting Down Aura Platform (${name} failed) ---`, exitCode);
}

function attachOutput(processRef, onStdoutLine, scope) {
    const forward = (stream, writer) => {
        if (!stream) {
            return;
        }

        let buffered = '';
        let suppressingShutdownTraceback = false;

        const flushLine = (rawLine) => {
            const normalizedLine = stripAnsi(rawLine);
            const isBlank = normalizedLine.trim() === '';

            if (isShuttingDown && normalizedLine.startsWith('ERROR:    Traceback (most recent call last):')) {
                suppressingShutdownTraceback = true;
                return;
            }

            if (suppressingShutdownTraceback) {
                if (normalizedLine.trim() === '') {
                    suppressingShutdownTraceback = false;
                }
                return;
            }

            onStdoutLine(rawLine);
            appendLogLine(`[${scope}] ${rawLine}`);

            if (logMode === 'quiet') {
                return;
            }
            if (logMode === 'normal' && isBlank) {
                return;
            }

            writer.write(`[${scope}] ${rawLine}\n`);
        };

        stream.on('data', (chunk) => {
            const text = chunk.toString();
            buffered += text;

            const lines = buffered.split(/\r?\n/);
            buffered = lines.pop() ?? '';

            for (const line of lines) {
                flushLine(line);
            }
        });

        stream.on('end', () => {
            if (buffered.trim().length === 0 || suppressingShutdownTraceback) {
                return;
            }

            onStdoutLine(buffered);
            appendLogLine(`[${scope}] ${buffered}`);
            if (logMode !== 'quiet') {
                writer.write(`[${scope}] ${buffered}`);
            }
        });
    };

    forward(processRef.stdout, process.stdout);
    forward(processRef.stderr, process.stderr);
}

async function main() {
    // 0. Pre-flight Validation
    if (!process.argv.includes('--skip-preflight')) {
        try {
            const preflightPath = path.join(rootPath, 'scripts', 'preflight.js');
            if (fs.existsSync(preflightPath)) {
                logLauncherInfo('Startup', 'Running pre-flight validation...');
                execSync(`node "${preflightPath}"`, { stdio: 'inherit', cwd: rootPath });
            }
        } catch (err) {
            logLauncherError('Startup', `Pre-flight check failed`);
            process.exit(1);
        }
    }

    // 1. Start Python Backend (FastAPI)
    // Prefer project venv interpreter so backend runs with expected dependencies.
    const winVenvPython = path.join(rootPath, '.venv', 'Scripts', 'python.exe');
    const unixVenvPython = path.join(rootPath, '.venv', 'bin', 'python');
    let pythonCmd = process.platform === 'win32' ? 'python' : 'python3';

    if (process.platform === 'win32' && fs.existsSync(winVenvPython)) {
        pythonCmd = winVenvPython;
    } else if (process.platform !== 'win32' && fs.existsSync(unixVenvPython)) {
        pythonCmd = unixVenvPython;
    }

    logLauncherInfo('Env', `Node ${process.version}`);
    logLauncherInfo('Env', `Workspace ${rootPath}`);
    logLauncherInfo('Env', `Python ${pythonCmd}`);

    assertRequiredPath(frontendCwd, 'frontend directory');
    assertRequiredPath(path.join(frontendCwd, 'node_modules'), 'frontend dependencies (run "npm install" in frontend)');

    if (logFilePath) {
        try {
            const logDir = path.dirname(logFilePath);
            if (logDir && logDir !== '.') {
                fs.mkdirSync(logDir, { recursive: true });
            }
            rotateLogFileIfNeeded(logFilePath, logMaxBytes, logMaxFiles);
            const bootLine = `\n[Launcher] Session started at ${new Date().toISOString()}`;
            fs.appendFileSync(logFilePath, `${bootLine}\n`);
            logFileEnabled = true;
            appendLogLine(`[Startup] Log file enabled`);
        } catch {
            console.warn(`[Startup WARN] Unable to initialize log file: ${logFilePath}`);
        }
    }

    const backendArgs = [
        '-m',
        'uvicorn',
        'backend.main:app',
        '--reload',
        '--port',
        '8000',
        '--reload-dir',
        'backend',
        '--reload-exclude',
        '.venv',
        '--reload-exclude',
        'frontend',
        '--reload-exclude',
        'node_modules'
    ];

    const frontendCmdLine = process.platform === 'win32'
        ? 'cmd.exe /d /s /c npm run dev'
        : 'npm run dev';

    if (dryRun) {
        console.log('--- Aura Platform: Dry Run ---');
        logLauncherInfo('DryRun', `Backend command: ${pythonCmd} ${backendArgs.join(' ')}`);
        logLauncherInfo('DryRun', `Frontend command: ${frontendCmdLine}`);
        logLauncherInfo('DryRun', `Healthchecks: ${healthChecksEnabled ? 'enabled' : 'disabled'}`);
        logLauncherInfo('DryRun', `Log mode: ${logMode}`);
        return;
    }

    if (logMode === 'verbose') {
        logLauncherInfo('Backend', `Command: ${pythonCmd} ${backendArgs.join(' ')}`);
    }

    backend = spawnService('Backend', pythonCmd, backendArgs, rootPath);

    attachOutput(backend, (line) => {
        const normalizedLine = stripAnsi(line);
        const backendMatch = normalizedLine.match(/Uvicorn running on (https?:\/\/\S+)/i);
        if (backendMatch && !detectedBackendUrl) {
            detectedBackendUrl = backendMatch[1];
            maybePrintServiceSummary();
        }

        if (/Application startup complete\./i.test(normalizedLine)) {
            backendReady = true;
        }

        maybePrintServiceSummary();
        void maybeRunHealthChecks();
    }, 'Backend');

    if (!detectedBackendUrl) {
        detectedBackendUrl = 'http://127.0.0.1:8000';
    }

    backend.on('error', (err) => {
        logLauncherError('Backend', getErrorMessage(err));
        shutdown('--- Shutting Down Aura Platform (backend startup error) ---', 1);
    });

    backend.on('exit', (code, signal) => {
        handleServiceExit('Backend', code, signal);
    });

    // 2. Start React Frontend (Vite)
    if (logMode === 'verbose') {
        logLauncherInfo('Frontend', `Command: ${frontendCmdLine}`);
    }

    frontend = process.platform === 'win32'
        ? spawnService('Frontend', 'cmd.exe', ['/d', '/s', '/c', 'npm run dev'], frontendCwd)
        : spawnService('Frontend', 'npm', ['run', 'dev'], frontendCwd);

    attachOutput(frontend, (line) => {
        const normalizedLine = stripAnsi(line);
        const frontendMatch = normalizedLine.match(/Local:\s*(https?:\/\/\S+)/i);
        if (frontendMatch && !detectedFrontendUrl) {
            detectedFrontendUrl = frontendMatch[1];
            frontendReady = true;
        }

        maybePrintServiceSummary();
        void maybeRunHealthChecks();
    }, 'Frontend');

    frontend.on('error', (err) => {
        logLauncherError('Frontend', getErrorMessage(err));
        shutdown('--- Shutting Down Aura Platform (frontend startup error) ---', 1);
    });

    frontend.on('exit', (code, signal) => {
        handleServiceExit('Frontend', code, signal);
    });

    process.on('SIGINT', () => {
        shutdown('--- Shutting Down Aura Platform (SIGINT) ---', 0);
    });

    process.on('SIGTERM', () => {
        shutdown('--- Shutting Down Aura Platform (SIGTERM) ---', 0);
    });

    process.on('uncaughtException', (err) => {
        logLauncherError('Launcher', `Uncaught exception: ${getErrorMessage(err)}`);
        shutdown('--- Shutting Down Aura Platform (uncaught exception) ---', 1);
    });

    process.on('unhandledRejection', (reason) => {
        logLauncherError('Launcher', `Unhandled promise rejection: ${getErrorMessage(reason)}`);
        shutdown('--- Shutting Down Aura Platform (unhandled rejection) ---', 1);
    });

    startStartupTimeout();
}

await main();
