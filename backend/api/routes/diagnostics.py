"""
Aura Platform: Error Diagnostics API Routes
Provides error analysis, pattern aggregation, and remediation guidance.
"""

from fastapi import APIRouter, Query
from typing import Optional
import json
from pathlib import Path
from backend.core.error_diagnostics import analyze_error, aggregate_errors

router = APIRouter(tags=["Diagnostics"])

@router.post("/api/diagnostics/analyze-error")
async def analyze_client_error(
    error_name: str = Query(...),
    error_message: str = Query(...),
    stack: Optional[str] = Query(None)
):
    """
    Analyze a single error and provide remediation guidance.
    
    Args:
        error_name: Error type (e.g., TypeError, ReferenceError)
        error_message: Error message text
        stack: Full stack trace (optional for better source extraction)
    
    Returns:
        Analysis object with causes, remediation steps, and docs link
    """
    
    analysis = analyze_error(error_name, error_message, stack)
    
    return {
        "status": "success",
        "analysis": analysis
    }


@router.get("/api/diagnostics/error-patterns")
async def get_error_patterns(limit: int = Query(100, ge=1, le=500)):
    """
    Get aggregated error patterns and statistics.
    
    Returns:
        Patterns by error type, route, and message frequency
    """
    
    report_file = Path(__file__).parent.parent / "client_error_reports.jsonl"
    
    if not report_file.exists():
        return {
            "total_errors": 0,
            "patterns": {},
            "by_type": {},
            "by_route": {}
        }
    
    errors = []
    try:
        with report_file.open("r", encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    try:
                        error = json.loads(line)
                        errors.append(error)
                    except json.JSONDecodeError:
                        pass
    except Exception:
        pass
    
    # Limit to most recent
    errors = errors[-limit:] if len(errors) > limit else errors
    
    aggregation = aggregate_errors(errors)
    
    return {
        "status": "success",
        "aggregation": aggregation
    }
