#!/usr/bin/env node

/**
 * Aura Platform: CLI Admin Tool
 * Quick access to system status, logs, and error reports.
 * Usage: node scripts/admin.js [command] [options]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '..');

const BACKEND_URL = process.env.ADMIN_BACKEND_URL || 'http://127.0.0.1:8000';
const HEALTHCHECK_TIMEOUT_MS = 3000;

class Colors {
    static reset = '\x1b[0m';
    static green = '\x1b[32m';
    static red = '\x1b[31m';
    static yellow = '\x1b[33m';
    static blue = '\x1b[34m';
    static cyan = '\x1b[36m';
    static gray = '\x1b[90m';
}

function log(color, ...args) {
    console.log(color, ...args, Colors.reset);
}

async function checkHealth() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), HEALTHCHECK_TIMEOUT_MS);
        
        const response = await fetch(`${BACKEND_URL}/api/health`, {
            signal: controller.signal
        });
        
        clearTimeout(timeout);
        
        if (response.ok) {
            const data = await response.json();
            return { ok: true, data };
        }
        return { ok: false, error: `HTTP ${response.status}` };
    } catch (err) {
        return { ok: false, error: err.message };
    }
}

async function getSystemPulse() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/system/pulse`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (err) {
        return null;
    }
}

async function getStats() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/stats`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (err) {
        return null;
    }
}

async function getClientErrors(limit = 10, offset = 0, filter = null) {
    try {
        let url = `${BACKEND_URL}/api/client-errors?limit=${limit}&offset=${offset}`;
        if (filter) url += `&filter_error=${encodeURIComponent(filter)}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (err) {
        return null;
    }
}

function getBytesReadable(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function getLogSize() {
    const logPath = path.join(rootPath, 'backend', 'logs', 'backend.log');
    try {
        return fs.statSync(logPath).size;
    } catch {
        return 0;
    }
}

function getErrorReportsSize() {
    const reportsPath = path.join(rootPath, 'backend', 'client_error_reports.jsonl');
    try {
        return fs.statSync(reportsPath).size;
    } catch {
        return 0;
    }
}

async function commandStatus() {
    log(Colors.cyan, '\n=== Aura Platform: System Status ===\n');
    
    const health = await checkHealth();
    
    if (!health.ok) {
        log(Colors.red, `✗ Backend is unreachable (${health.error})`);
        log(Colors.yellow, `  Hint: Run 'node scripts/start-full.js' to start the backend`);
        return;
    }
    
    log(Colors.green, `✓ Backend healthy`);
    log(Colors.gray, `  ${health.data.status}`);
    
    const pulse = await getSystemPulse();
    if (pulse) {
        log(Colors.blue, '\nSystem Resources:');
        log(Colors.gray, `  CPU:    ${pulse.cpu_usage.toFixed(1)}%`);
        log(Colors.gray, `  Memory: ${pulse.memory_usage.toFixed(1)}%`);
        log(Colors.gray, `  State:  ${pulse.engine_state}`);
    }
    
    log(Colors.blue, '\nLog Files:');
    log(Colors.gray, `  Backend:       ${getBytesReadable(getLogSize())}`);
    log(Colors.gray, `  Error Reports: ${getBytesReadable(getErrorReportsSize())}`);
    
    console.log('');
}

async function commandErrors(limit = 10, filter = null) {
    log(Colors.cyan, `\n=== Recent Client Errors (limit: ${limit}) ===\n`);
    
    const health = await checkHealth();
    if (!health.ok) {
        log(Colors.red, `✗ Backend is unreachable`);
        return;
    }
    
    const errors = await getClientErrors(limit, 0, filter);
    
    if (!errors || errors.total === 0) {
        log(Colors.green, '✓ No errors found');
        console.log('');
        return;
    }
    
    log(Colors.yellow, `Found ${errors.total} total errors\n`);
    
    for (let i = 0; i < errors.errors.length; i++) {
        const err = errors.errors[i];
        log(Colors.red, `[${i + 1}] ${err.errorName || 'UnknownError'}`);
        log(Colors.gray, `    Support ID: ${err.supportId}`);
        log(Colors.gray, `    Time: ${err.received_at}`);
        log(Colors.gray, `    Route: ${err.route || '/'}`);
        log(Colors.gray, `    Message: ${(err.errorMessage || '').substring(0, 120)}`);
        
        if (i < errors.errors.length - 1) {
            console.log('');
        }
    }
    
    console.log('');
}

async function commandLogs(lines = 20) {
    log(Colors.cyan, `\n=== Recent Backend Logs (last ${lines} lines) ===\n`);
    
    const logPath = path.join(rootPath, 'backend', 'logs', 'backend.log');
    
    try {
        const content = fs.readFileSync(logPath, 'utf8');
        const allLines = content.split('\n').filter(l => l.trim());
        const recentLines = allLines.slice(-lines);
        
        for (const line of recentLines) {
            try {
                const log_obj = JSON.parse(line);
                const timestamp = log_obj.timestamp?.substring(11, 19) || '';
                const level = log_obj.level || 'INFO';
                const message = log_obj.message || '';
                
                const levelColor = level === 'ERROR' ? Colors.red : Colors.gray;
                log(levelColor, `[${timestamp}] ${level}: ${message}`);
            } catch {
                log(Colors.gray, line);
            }
        }
    } catch (err) {
        log(Colors.yellow, `  Log file not found. Run 'node scripts/start-full.js' first.`);
    }
    
    console.log('');
}

async function commandStats() {
    log(Colors.cyan, '\n=== Platform Statistics ===\n');
    
    const health = await checkHealth();
    if (!health.ok) {
        log(Colors.red, `✗ Backend is unreachable`);
        return;
    }
    
    const stats = await getStats();
    
    if (!stats) {
        log(Colors.yellow, '  Unable to fetch statistics');
        console.log('');
        return;
    }
    
    log(Colors.blue, 'Processing Metrics:');
    log(Colors.gray, `  Total Pages Processed: ${stats.total_pages?.toLocaleString()}`);
    log(Colors.gray, `  Total Size Saved: ${stats.total_size_saved_mb} MB`);
    log(Colors.gray, `  Total Tasks Completed: ${stats.total_tasks?.toLocaleString()}`);
    
    if (stats.tasks_per_engine) {
        log(Colors.blue, '\nBreakdown by Engine:');
        for (const [engine, count] of Object.entries(stats.tasks_per_engine)) {
            log(Colors.gray, `  ${engine}: ${count} tasks`);
        }
    }
    
    console.log('');
}

function printHelp() {
    log(Colors.cyan, '\n=== Aura Platform: Admin CLI ===\n');
    log(Colors.gray, 'Commands:');
    log(Colors.gray, '  status              Show system health and resource usage');
    log(Colors.gray, '  errors [limit]      Show recent client errors (default: 10)');
    log(Colors.gray, '  logs [lines]        Show recent backend logs (default: 20)');
    log(Colors.gray, '  stats               Show platform processing statistics');
    log(Colors.gray, '  help                Show this help message');
    log(Colors.gray, '\nEnvironment:');
    log(Colors.gray, `  ADMIN_BACKEND_URL   Backend endpoint (default: ${BACKEND_URL})`);
    log(Colors.gray, '\nExamples:');
    log(Colors.gray, '  node scripts/admin.js status');
    log(Colors.gray, '  node scripts/admin.js errors 20');
    log(Colors.gray, '  node scripts/admin.js logs 50');
    console.log('');
}

async function main() {
    const [, , command, arg2] = process.argv;
    
    switch (command?.toLowerCase()) {
        case 'status':
            await commandStatus();
            break;
        case 'errors':
            const errorLimit = parseInt(arg2 || '10', 10);
            await commandErrors(Math.min(errorLimit, 100));
            break;
        case 'logs':
            const logLines = parseInt(arg2 || '20', 10);
            await commandLogs(Math.min(logLines, 200));
            break;
        case 'stats':
            await commandStats();
            break;
        case 'help':
        case '-h':
        case '--help':
            printHelp();
            break;
        default:
            if (!command) {
                await commandStatus();
            } else {
                log(Colors.red, `Unknown command: ${command}`);
                printHelp();
                process.exit(1);
            }
    }
}

main().catch(err => {
    log(Colors.red, `Error: ${err.message}`);
    process.exit(1);
});
