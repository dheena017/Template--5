"""
Aura Platform: Structured Logging Service
Centralized logging with file persistence and JSON formatting for observability.
"""

import json
import logging
import logging.handlers
from pathlib import Path
from datetime import datetime
from typing import Any, Dict, Optional

# Create logs directory if it doesn't exist
LOGS_DIR = Path(__file__).parent.parent / "logs"
LOGS_DIR.mkdir(exist_ok=True)

def create_logger(name: str, log_file: Optional[str] = None, level=logging.INFO):
    """Create a logger with JSON and stream handlers."""
    logger = logging.getLogger(name)
    logger.setLevel(level)

    # JSON formatter for structured logs
    class JSONFormatter(logging.Formatter):
        def format(self, record):
            log_data = {
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "level": record.levelname,
                "logger": record.name,
                "message": record.getMessage(),
                "module": record.module,
                "function": record.funcName,
                "line": record.lineno,
            }
            
            if record.exc_info:
                log_data["exception"] = self.formatException(record.exc_info)
            
            # Check for custom context data (added at runtime)
            if hasattr(record, "extra_data"):  # type: ignore
                extra = getattr(record, "extra_data", None)  # type: ignore
                if isinstance(extra, dict):
                    log_data.update(extra)
            
            return json.dumps(log_data, ensure_ascii=True)

    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(logging.Formatter(
        fmt="[%(asctime)s] %(levelname)-8s [%(name)s] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    ))
    logger.addHandler(console_handler)

    # File handler with rotation
    if log_file:
        log_path = LOGS_DIR / log_file
        log_path.parent.mkdir(parents=True, exist_ok=True)
        
        file_handler = logging.handlers.RotatingFileHandler(
            log_path,
            maxBytes=10 * 1024 * 1024,  # 10MB
            backupCount=5,
            encoding="utf-8"
        )
        file_handler.setFormatter(JSONFormatter())
        logger.addHandler(file_handler)

    return logger


def log_with_context(logger: logging.Logger, level: str, message: str, **context):
    """Log a message with additional context data."""
    log_method = getattr(logger, level.lower(), logger.info)
    
    # Create a custom record with extra context
    record = logger.makeRecord(
        logger.name, logging.getLevelName(level.upper()),
        "", 0, message, (), None
    )
    record.extra_data = context  # type: ignore
    log_method(record)
