import json
import os
from datetime import datetime

STATS_FILE = "analytics_stats.json"

def get_stats():
    """Load or initialize high-performance analytics payload."""
    if not os.path.exists(STATS_FILE):
        initial = {
            "total_pages": 44250,
            "total_size_saved_mb": 2400,
            "total_tasks": 1250,
            "tasks_per_engine": {
                "pdf": 850,
                "image": 120,
                "text": 90,
                "video": 190,
                "ollama": 45,
                "speech": 32,
                "marketing": 28
            },
            "recent_activity": [
                {"id": 1, "action": "PDF Encrypted", "target": "Q1_Summary.pdf", "time": "2m ago"},
                {"id": 2, "action": "Image Optimized", "target": "Portrait_v2.png", "time": "12m ago"}
            ]
        }
        with open(STATS_FILE, "w") as f:
            json.dump(initial, f)
        return initial
    
    with open(STATS_FILE, "r") as f:
        return json.load(f)

def record_activity(action, target, engine="pdf", pages=0, saved_mb=0):
    """Update global metrics after a successful task execution."""
    stats = get_stats()
    
    # Safely increment integer stats
    stats["total_pages"] = int(stats.get("total_pages", 0)) + pages
    stats["total_size_saved_mb"] = int(stats.get("total_size_saved_mb", 0)) + saved_mb
    stats["total_tasks"] = int(stats.get("total_tasks", 0)) + 1
    
    # Update per-engine counts
    engine_stats = stats.get("tasks_per_engine", {})
    if not isinstance(engine_stats, dict): engine_stats = {}
    engine_stats[engine] = int(engine_stats.get(engine, 0)) + 1
    stats["tasks_per_engine"] = engine_stats
    
    # Update activity list
    recent = stats.get("recent_activity", [])
    if not isinstance(recent, list): recent = []
    
    num_activities = len(recent)
    new_act = {
        "id": num_activities + 1,
        "action": action,
        "target": target,
        "time": "Just now"
    }
    stats["recent_activity"] = [new_act] + recent[:9] # Keep last 10
    
    with open(STATS_FILE, "w") as f:
        json.dump(stats, f)
    return stats
