#!/usr/bin/env node

/**
 * Aura Platform: Error Analyzer CLI
 * Analyzes client error reports and provides remediation guidance.
 * Usage: node scripts/analyze-error.js [supportId]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '..');

class Colors {
    static reset = '\x1b[0m';
    static green = '\x1b[32m';
    static red = '\x1b[31m';
    static yellow = '\x1b[33m';
    static blue = '\x1b[34m';
    static cyan = '\x1b[36m';
    static gray = '\x1b[90m';
    static magenta = '\x1b[35m';
}

function log(color, ...args) {
    console.log(color, ...args, Colors.reset);
}

// Error remediation database
const RemediationDatabase = {
    "Failed to fetch dynamically imported module": {
        category: "Vite Code Splitting",
        causes: [
            "Module file missing or path incorrect",
            "Build artifact not generated (missing dist/)",
            "Module syntax error preventing load",
            "Network error fetching chunk",
        ],
        fixes: [
            "npm run build (ensure dist assets exist)",
            "Check browser DevTools Network tab for 404s or failed requests",
            "npm run dev and check for build errors in terminal",
            "Verify file path matches import statement",
            "Clear browser cache and hard refresh (Ctrl+Shift+R)",
        ],
        docs: "https://vitejs.dev/guide/ssr.html#handling-hydration-mismatch",
    },
    
    "Cannot read properties of undefined": {
        category: "Null Reference",
        causes: [
            "Component prop not passed or undefined",
            "API response missing expected field",
            "useState value not initialized",
            "Optional chaining (?.) not used",
        ],
        fixes: [
            "Check component props: DefaultProps, propTypes, JSDoc",
            "Verify API response structure matches code expectations",
            "Use optional chaining: obj?.field ?? defaultValue",
            "Add guards: if (data) { ... }",
            "Check console for network errors (API call failed)",
        ],
        docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
    },
    
    "is not a function": {
        category: "Type Mismatch",
        causes: [
            "Function not imported or exported correctly",
            "Variable named same as function (shadowing)",
            "Callback passed as value instead of function",
            "Module import failed silently",
        ],
        fixes: [
            "Verify import statement: import { funcName } from 'path'",
            "Check that export is named export (not default)",
            "Ensure callbacks are arrow functions: onClick={() => func()}",
            "Check for circular imports or import order issues",
            "npm run lint to catch static errors",
        ],
        docs: "https://developer.mozilla.org/en-US/docs/Glossary/Function",
    },
    
    "Maximum update depth exceeded": {
        category: "Infinite Loop",
        causes: [
            "setState in render or effect without dependency array",
            "Effect dependency missing, runs every render",
            "setState triggered by state change (not isomorphic)",
            "Recursive component mounting",
        ],
        fixes: [
            "Add dependency array to useEffect: useEffect(() => {...}, [])",
            "Check: if dependencies change, does it trigger setState that changes deps?",
            "Use: useCallback to memoize callback to prevent re-renders",
            "Review render function for setState calls (should be in effects only)",
            "Use React DevTools Profiler to find re-render loops",
        ],
        docs: "https://react.dev/reference/react/useEffect#removing-unnecessary-dependencies",
    },

    "Chunk load failed": {
        category: "Asset Loading",
        causes: [
            "Production build assets not deployed correctly",
            "CDN or static file server misconfigured",
            "Manifest.json or asset references broken",
            "Build hash mismatch (old HTML, new assets)",
        ],
        fixes: [
            "Verify build output: ls dist/assets/",
            "Check that HTML references correct asset paths",
            "Hard refresh browser and clear service worker cache",
            "Ensure static server serves correct Content-Type headers",
            "Check CORS headers if assets on different domain",
        ],
        docs: "https://vitejs.dev/guide/backend-integration.html",
    },

    "ReferenceError": {
        category: "Undefined Variable",
        causes: [
            "Variable declared in wrong scope",
            "Typo in variable name",
            "Variable used before declaration",
            "Missing import or require",
        ],
        fixes: [
            "Check variable name spelling (case-sensitive)",
            "Ensure variable is declared before use",
            "Verify import statement exists at top of file",
            "Check block scope (if, for, function, arrow functions)",
            "npm run lint to catch static errors",
        ],
        docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined",
    },
};

function findRelevantRemediation(errorName, errorMessage) {
    const combined = `${errorName}: ${errorMessage}`.toLowerCase();
    
    for (const [pattern, remediation] of Object.entries(RemediationDatabase)) {
        if (pattern.toLowerCase().includes(combined) || combined.includes(pattern.toLowerCase())) {
            return remediation;
        }
    }
    
    // Fallback to error type
    if (errorName.includes("TypeError")) {
        return RemediationDatabase["Cannot read properties of undefined"];
    }
    if (errorName.includes("ReferenceError")) {
        return RemediationDatabase["ReferenceError"];
    }
    
    return null;
}

function findErrorInReports(supportId) {
    const reportsPath = path.join(rootPath, 'backend', 'client_error_reports.jsonl');
    
    try {
        const content = fs.readFileSync(reportsPath, 'utf8');
        const lines = content.split('\n').filter(l => l.trim());
        
        for (const line of lines) {
            try {
                const error = JSON.parse(line);
                if (error.supportId === supportId) {
                    return error;
                }
            } catch {
                // Skip invalid JSON lines
            }
        }
    } catch {
        return null;
    }
    
    return null;
}

function formatStack(stack) {
    if (!stack) return '';
    
    const lines = stack.split('\n');
    return lines.slice(0, 5).join('\n    ');
}

async function analyzeError(supportId) {
    if (!supportId) {
        log(Colors.red, 'Usage: node scripts/analyze-error.js <supportId>');
        log(Colors.gray, 'Example: node scripts/analyze-error.js V4KFIPCB');
        return;
    }
    
    const error = findErrorInReports(supportId);
    
    if (!error) {
        log(Colors.red, `Error not found: ${supportId}`);
        log(Colors.yellow, 'View all errors: node scripts/admin.js errors 20');
        return;
    }
    
    // Print error header
    log(Colors.magenta, `\n=== Error Analysis: ${supportId} ===\n`);
    
    // Error type and message
    log(Colors.red, `${error.errorName || 'Error'}`);
    log(Colors.yellow, `${error.errorMessage || 'No message'}`);
    
    // Metadata
    log(Colors.cyan, '\nMetadata:');
    log(Colors.gray, `  Route:     ${error.route || '/'}`);
    log(Colors.gray, `  Time:      ${error.received_at || 'Unknown'}`);
    log(Colors.gray, `  Session:   ${error.sessionToken || 'Unknown'}`);
    log(Colors.gray, `  Browser:   ${error.userAgent ? error.userAgent.substring(0, 80) : 'Unknown'}`);
    log(Colors.gray, `  Viewport:  ${error.viewport || 'Unknown'}`);
    
    // Stack trace (first 5 frames)
    if (error.stack) {
        log(Colors.cyan, '\nStack Trace (first 5 frames):');
        log(Colors.gray, `${formatStack(error.stack)}`);
    }
    
    // Component stack
    if (error.componentStack) {
        log(Colors.cyan, '\nComponent Stack:');
        log(Colors.gray, `${formatStack(error.componentStack)}`);
    }
    
    // Remediation
    const remediation = findRelevantRemediation(error.errorName, error.errorMessage);
    
    if (remediation) {
        log(Colors.cyan, '\nDiagnosis:');
        log(Colors.blue, `  Category: ${remediation.category}`);
        
        log(Colors.cyan, '\nLikely Causes:');
        remediation.causes.forEach((cause, i) => {
            log(Colors.gray, `  ${i + 1}. ${cause}`);
        });
        
        log(Colors.cyan, '\nRecommended Fixes:');
        remediation.fixes.forEach((fix, i) => {
            log(Colors.yellow, `  ${i + 1}. ${fix}`);
        });
        
        log(Colors.cyan, '\nDocumentation:');
        log(Colors.blue, `  ${remediation.docs}`);
    } else {
        log(Colors.yellow, '\nNo specific remediation found for this error type.');
        log(Colors.gray, 'Search error message in project codebase for context.');
    }
    
    console.log('');
}

async function listAllErrors() {
    const reportsPath = path.join(rootPath, 'backend', 'client_error_reports.jsonl');
    
    try {
        const content = fs.readFileSync(reportsPath, 'utf8');
        const lines = content.split('\n').filter(l => l.trim());
        
        if (lines.length === 0) {
            log(Colors.green, 'No errors found');
            return;
        }
        
        log(Colors.magenta, `\n=== All Error Reports (${lines.length} total) ===\n`);
        
        // Show last 10
        const recent = lines.slice(-10).reverse();
        
        for (let i = 0; i < recent.length; i++) {
            try {
                const error = JSON.parse(recent[i]);
                log(Colors.red, `[${i + 1}] ${error.supportId} - ${error.errorName}`);
                log(Colors.gray, `    ${error.errorMessage?.substring(0, 80)}`);
                log(Colors.gray, `    Route: ${error.route || '/'} | Time: ${error.received_at}`);
                console.log('');
            } catch {
                // Skip invalid JSON
            }
        }
        
        log(Colors.cyan, 'To analyze a specific error:');
        log(Colors.gray, '  node scripts/analyze-error.js <supportId>');
    } catch {
        log(Colors.yellow, 'No error reports found. Run node scripts/admin.js errors to capture some first.');
    }
}

async function main() {
    const [, , supportId] = process.argv;
    
    if (supportId?.toLowerCase() === 'help' || supportId?.toLowerCase() === '--help') {
        log(Colors.cyan, '\n=== Aura Platform: Error Analyzer ===\n');
        log(Colors.gray, 'Usage: node scripts/analyze-error.js [supportId]');
        log(Colors.gray, '\nCommands:');
        log(Colors.gray, '  node scripts/analyze-error.js                  List all errors');
        log(Colors.gray, '  node scripts/analyze-error.js <supportId>      Analyze specific error');
        log(Colors.gray, '  node scripts/analyze-error.js help             Show this help');
        console.log('');
        return;
    }
    
    if (supportId) {
        await analyzeError(supportId);
    } else {
        await listAllErrors();
    }
}

main().catch(err => {
    log(Colors.red, `Error: ${err.message}`);
    process.exit(1);
});
