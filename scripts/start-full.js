import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Aura Platform Full-Stack Launcher
 * Orchestrates the Python/FastAPI backend and React/Vite frontend.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '..');

console.log('--- Aura Platform: Booting Full Stack ---');

// 1. Start Python Backend (FastAPI)
const backend = spawn('uvicorn', ['backend.main:app', '--reload', '--port', '8000'], {
    cwd: rootPath,
    stdio: 'inherit',
    shell: true
});

backend.on('error', (err) => {
    console.error('[Backend ERROR] Failed to start:', err.message);
});

// 2. Start React Frontend (Vite)
const frontend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(rootPath, 'frontend'),
    stdio: 'inherit',
    shell: true
});

frontend.on('error', (err) => {
    console.error('[Frontend ERROR] Failed to start:', err.message);
});

process.on('SIGINT', () => {
    console.log('--- Shutting Down Aura Platform ---');
    backend.kill();
    frontend.kill();
    process.exit();
});
