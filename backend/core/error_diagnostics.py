"""
Aura Platform: Error Diagnostics & Remediation Guide
Helps developers triage client-side errors and apply fixes.
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# Error patterns and their likely causes + remediation
ERROR_PATTERNS = {
    "Failed to fetch dynamically imported module": {
        "category": "Vite Code Splitting",
        "likely_causes": [
            "Module file missing or path incorrect",
            "Build artifact not generated (missing dist/)",
            "Module syntax error preventing load",
            "Network error fetching chunk",
        ],
        "remediation": [
            "Run: npm run build (ensure dist assets exist)",
            "Check browser DevTools Network tab for 404s or failed requests",
            "Run: npm run dev and check for build errors in terminal",
            "Verify file path matches import statement",
            "Clear browser cache and hard refresh (Ctrl+Shift+R)",
        ],
        "docs": "https://vitejs.dev/guide/ssr.html#handling-hydration-mismatch",
    },
    
    "Cannot read properties of undefined": {
        "category": "Null Reference",
        "likely_causes": [
            "Component prop not passed or undefined",
            "API response missing expected field",
            "useState value not initialized",
            "Optional chaining (?.) not used",
        ],
        "remediation": [
            "Check component props: DefaultProps, propTypes, JSDoc",
            "Verify API response structure matches code expectations",
            "Use optional chaining: obj?.field ?? defaultValue",
            "Add guards: if (data) { ... }",
            "Check console for network errors (API call failed)",
        ],
        "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
    },
    
    "is not a function": {
        "category": "Type Mismatch",
        "likely_causes": [
            "Function not imported or exported correctly",
            "Variable named same as function (shadowing)",
            "Callback passed as value instead of function",
            "Module import failed silently",
        ],
        "remediation": [
            "Verify import statement: import { funcName } from 'path'",
            "Check that export is named export (not default)",
            "Ensure callbacks are arrow functions: onClick={() => func()}",
            "Check for circular imports or import order issues",
            "Run lint: npm run lint to catch static errors",
        ],
        "docs": "https://developer.mozilla.org/en-US/docs/Glossary/Function",
    },
    
    "Maximum update depth exceeded": {
        "category": "Infinite Loop",
        "likely_causes": [
            "setState in render or effect without dependency array",
            "Effect dependency missing, runs every render",
            "setState triggered by state change (not isomorphic)",
            "Recursive component mounting",
        ],
        "remediation": [
            "Add dependency array to useEffect: useEffect(() => {...}, [])",
            "Check: if dependencies change, does it trigger setState that changes deps?",
            "Use: useCallback to memoize callback to prevent re-renders",
            "Review render function for setState calls (should be in effects only)",
            "Use React DevTools Profiler to find re-render loops",
        ],
        "docs": "https://react.dev/reference/react/useEffect#removing-unnecessary-dependencies",
    },
    
    "Chunk load failed": {
        "category": "Asset Loading",
        "likely_causes": [
            "Production build assets not deployed correctly",
            "CDN or static file server misconfigured",
            "Manifest.json or asset references broken",
            "Build hash mismatch (old HTML, new assets)",
        ],
        "remediation": [
            "Verify build output: ls dist/assets/",
            "Check that HTML references correct asset paths",
            "Hard refresh browser and clear service worker cache",
            "Ensure static server serves correct Content-Type headers",
            "Check CORS headers if assets on different domain",
        ],
        "docs": "https://vitejs.dev/guide/backend-integration.html",
    },
    
    "ReferenceError": {
        "category": "Undefined Variable",
        "likely_causes": [
            "Variable declared in wrong scope",
            "Typo in variable name",
            "Variable used before declaration",
            "Missing import or require",
        ],
        "remediation": [
            "Check variable name spelling (case-sensitive)",
            "Ensure variable is declared before use",
            "Verify import statement exists at top of file",
            "Check block scope (if, for, function, arrow functions)",
            "Run: npm run lint to catch static errors",
        ],
        "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined",
    },
}

def analyze_error(error_name: str, error_message: str, stack: Optional[str] = None) -> Dict:
    """
    Analyze an error and return remediation guidance.
    
    Args:
        error_name: Error type (TypeError, ReferenceError, etc.)
        error_message: Error message text
        stack: Full stack trace (optional)
    
    Returns:
        Dict with analysis, causes, and remediation steps
    """
    
    combined = f"{error_name}: {error_message}".lower()
    
    # Find matching pattern
    best_match = None
    best_priority = 0
    
    for pattern_key, pattern_data in ERROR_PATTERNS.items():
        if pattern_key.lower() in combined:
            best_match = pattern_data
            best_priority = len(pattern_key)  # Longer matches are more specific
            break
    
    # Fallback to generic error category based on error_name
    if not best_match:
        if "TypeError" in error_name:
            best_match = ERROR_PATTERNS["Cannot read properties of undefined"]
        elif "ReferenceError" in error_name:
            best_match = ERROR_PATTERNS["ReferenceError"]
        else:
            best_match = {
                "category": error_name,
                "likely_causes": ["Unknown error type"],
                "remediation": [
                    "Check browser console for additional context",
                    "Search error message in project codebase",
                    "Review recent commits for changes to affected module",
                ],
                "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
            }
    
    # Extract relevant stack frame
    primary_source = "Unknown"
    if stack:
        match = re.search(r'at\s+(\S+)\s+\(([^)]+)', stack)
        if match:
            primary_source = f"{match.group(2)}"
    
    return {
        "error_type": error_name,
        "message": error_message,
        "category": best_match.get("category", "Unknown"),
        "likely_causes": best_match.get("likely_causes", []),
        "remediation_steps": best_match.get("remediation", []),
        "documentation": best_match.get("docs", ""),
        "primary_source": primary_source,
    }

def aggregate_errors(errors: List[Dict]) -> Dict:
    """Aggregate multiple errors to find patterns."""
    
    by_type = {}
    by_route = {}
    by_message = {}
    
    for error in errors:
        error_type = error.get("errorName", "Unknown")
        route = error.get("route", "/")
        message = error.get("errorMessage", "")
        
        # By type
        if error_type not in by_type:
            by_type[error_type] = []
        by_type[error_type].append(error)
        
        # By route
        if route not in by_route:
            by_route[route] = []
        by_route[route].append(error)
        
        # By message pattern
        msg_pattern = message[:50] if message else "Unknown"
        if msg_pattern not in by_message:
            by_message[msg_pattern] = []
        by_message[msg_pattern].append(error)
    
    return {
        "total_errors": len(errors),
        "by_type": {k: len(v) for k, v in by_type.items()},
        "by_route": {k: len(v) for k, v in by_route.items()},
        "most_common_message": max(by_message.items(), key=lambda x: len(x[1]))[0] if by_message else "None",
        "message_frequency": {k: len(v) for k, v in by_message.items()},
    }
