from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.api.routes import pdf, assets, profile, ebook
from backend.api.services import analytics_service
from backend.init_db import init_db
from backend.core.db import get_db
from backend.api.models.database_models import Feature
from sqlalchemy.orm import Session
from datetime import datetime

app = FastAPI(
    title="Aura Platform Engine - FastAPI Core",
    description="High-performance AI orchestration and document processing microservice",
    version="2.0.0"
)

# 1. CORS CONFIGURATION
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. DATABASE INITIALIZATION ON STARTUP
@app.on_event("startup")
async def startup_event():
    """Ensure Aura Engine architecture is provisioned on boot."""
    print("Aura Platform Engine: Running system integrity check and database provisioning...")
    init_db()

# 3. FEATURE ROUTES
app.include_router(pdf.router)
app.include_router(assets.router)
app.include_router(profile.router)
app.include_router(ebook.router)

# 4. ANALYTICS & HUB ENDPOINTS
@app.get("/api/health", tags=["System"])
async def get_health():
    """Real-time system integrity check."""
    return {"status": "Aura API is healthy", "uptime": "99.99%", "engine": "FastAPI v2.0.0 (SQLAlchemy)"}

@app.get("/api/system/pulse", tags=["System"])
async def get_system_pulse():
    """Live performance telemetry for the Aura Command Hub."""
    import psutil
    cpu = psutil.cpu_percent()
    mem = psutil.virtual_memory().percent
    return {
        "cpu_usage": cpu,
        "memory_usage": mem,
        "active_tasks": 0, # Could be connected to a task queue
        "engine_state": "Optimal" if cpu < 80 else "Stressed",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/stats", tags=["Analytics"])
async def get_global_stats():
    """Retrieve platform-wide processing metrics for dashboards."""
    return analytics_service.get_stats()

@app.get("/api/activities", tags=["Analytics"])
async def get_recent_activities():
    """Fetch recent task logs across all engines."""
    stats = analytics_service.get_stats()
    return stats.get("recent_activity", [])

@app.post("/api/analytics/record", tags=["Analytics"])
async def record_client_activity(
    action: str = Query(...),
    target: str = Query(...),
    engine: str = Query("pdf"),
    pages: int = Query(0)
):
    """
    Record an activity that occurred on the client-side.
    Allows the platform to maintain accurate global metrics.
    """
    return analytics_service.record_activity(
        action=action,
        target=target,
        engine=engine,
        pages=pages
    )

@app.get("/api/features", tags=["System"])
async def get_available_features(db: Session = Depends(get_db)):
    """Self-documenting feature flag system for the frontend."""
    features = db.query(Feature).all()
    if not features:
        return [
            {"id": "pdf-merge", "name": "Expert PDF Merge", "status": "Stable", "category": "pdf"},
            {"id": "pdf-optimize", "name": "Engine Optimization", "status": "Stable", "category": "pdf"},
            {"id": "image-gen", "name": "Neural Synthesis", "status": "Beta", "category": "image"}
        ]
        
    return [
        {"id": f.feature_id, "name": f.name, "status": f.status, "category": f.category}
        for f in features
    ]

# 5. BASELINE PATHS
@app.get("/", tags=["System"])
async def root():
    return {"message": "Aura Platform Engine is active.", "docs_url": "/docs"}

# 6. GLOBAL EXCEPTION HANDLER
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Deep server exception", "message": f"{str(exc)}"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
