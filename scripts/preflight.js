#!/usr/bin/env node

/**
 * Aura Platform: Pre-flight Validation
 * Checks system readiness before launching backend and frontend.
 * Used by start-full.js and dev.ps1 to fail fast on missing dependencies.
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '..');
const frontendCwd = path.join(rootPath, 'frontend');

let hasError = false;

function log(level, section, message) {
    const prefix = `[${section}]`;
    if (level === 'error') {
        console.error(`\x1b[31m${prefix} ERROR: ${message}\x1b[0m`);
        hasError = true;
    } else if (level === 'warn') {
        console.warn(`\x1b[33m${prefix} WARN: ${message}\x1b[0m`);
    } else {
        console.log(`\x1b[32m${prefix} ${message}\x1b[0m`);
    }
}

function checkNodeVersion() {
    try {
        const version = process.version;
        const nodeVersion = parseInt(version.slice(1), 10);
        if (nodeVersion < 18) {
            log('error', 'Node.js', `Version ${version} is too old; minimum v18.x required`);
            return;
        }
        log('ok', 'Node.js', `${version}`);
    } catch (err) {
        log('error', 'Node.js', `Version check failed: ${err.message}`);
    }
}

function checkPythonVersion() {
    try {
        const winVenvPython = path.join(rootPath, '.venv', 'Scripts', 'python.exe');
        const unixVenvPython = path.join(rootPath, '.venv', 'bin', 'python');
        let pythonCmd = process.platform === 'win32' ? 'python' : 'python3';

        if (process.platform === 'win32' && fs.existsSync(winVenvPython)) {
            pythonCmd = winVenvPython;
        } else if (process.platform !== 'win32' && fs.existsSync(unixVenvPython)) {
            pythonCmd = unixVenvPython;
        }

        const version = execSync(`"${pythonCmd}" --version`, { encoding: 'utf8' }).trim();
        const versionMatch = version.match(/(\d+)\.(\d+)/);

        if (!versionMatch) {
            log('error', 'Python', `Unable to parse version: ${version}`);
            return;
        }

        const major = parseInt(versionMatch[1], 10);
        const minor = parseInt(versionMatch[2], 10);

        if (major < 3 || (major === 3 && minor < 11)) {
            log('error', 'Python', `Version ${version} is too old; minimum v3.11 required`);
            return;
        }

        log('ok', 'Python', `${version} (${pythonCmd})`);
    } catch (err) {
        log('error', 'Python', `Version check failed: ${err.message}`);
    }
}

function checkVirtualEnv() {
    const winVenvPython = path.join(rootPath, '.venv', 'Scripts', 'python.exe');
    const unixVenvPython = path.join(rootPath, '.venv', 'bin', 'python');

    if (process.platform === 'win32' && fs.existsSync(winVenvPython)) {
        log('ok', 'Python venv', 'Windows venv found');
        return;
    }

    if (process.platform !== 'win32' && fs.existsSync(unixVenvPython)) {
        log('ok', 'Python venv', 'Unix venv found');
        return;
    }

    log('error', 'Python venv', 'Virtual environment not found; run: python -m venv .venv');
}

function checkFrontendDeps() {
    const nodeModules = path.join(frontendCwd, 'node_modules');
    if (!fs.existsSync(nodeModules)) {
        log('error', 'Frontend', 'node_modules missing; run: cd frontend && npm install');
        return;
    }

    const packageJson = path.join(frontendCwd, 'package.json');
    if (!fs.existsSync(packageJson)) {
        log('error', 'Frontend', 'package.json missing');
        return;
    }

    log('ok', 'Frontend', 'Dependencies installed');
}

function checkBackendDeps() {
    const requirementsTxt = path.join(rootPath, 'backend', 'requirements.txt');
    if (!fs.existsSync(requirementsTxt)) {
        log('warn', 'Backend', 'requirements.txt not found');
        return;
    }

    try {
        const pythonCmd = process.platform === 'win32'
            ? path.join(rootPath, '.venv', 'Scripts', 'python.exe')
            : path.join(rootPath, '.venv', 'bin', 'python');

        execSync(`"${pythonCmd}" -c "import uvicorn, fastapi, sqlalchemy"`, {
            stdio: 'ignore'
        });

        log('ok', 'Backend', 'Core dependencies installed');
    } catch {
        log('error', 'Backend', 'Core dependencies missing; run: pip install -r backend/requirements.txt');
    }
}

function checkBackendDotEnv() {
    const envPath = path.join(rootPath, 'backend', '.env');
    if (!fs.existsSync(envPath)) {
        log('warn', 'Backend .env', 'File not found (optional; uses example.env as fallback)');
        return;
    }

    log('ok', 'Backend .env', 'Configuration file exists');
}

function runAllChecks() {
    console.log('--- Aura Platform: Pre-flight Check ---\n');

    checkNodeVersion();
    checkPythonVersion();
    checkVirtualEnv();
    checkFrontendDeps();
    checkBackendDeps();
    checkBackendDotEnv();

    console.log('');

    if (hasError) {
        console.error('Pre-flight check failed. Please fix the errors above and retry.');
        process.exit(1);
    }

    console.log('✓ Pre-flight check passed. Ready to launch.');
    process.exit(0);
}

runAllChecks();
