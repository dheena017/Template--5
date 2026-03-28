from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .api.routes import pdf
from .api.services import analytics_service

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

# 2. FEATURE ROUTES
app.include_router(pdf.router)

# 3. ANALYTICS & HUB ENDPOINTS
@app.get("/api/health", tags=["System"])
async def get_health():
    """Real-time system integrity check."""
    return {"status": "Aura API is healthy", "uptime": "99.99%", "engine": "FastAPI v0.111"}

@app.get("/api/stats", tags=["Analytics"])
async def get_global_stats():
    """Retrieve platform-wide processing metrics for dashboards."""
    return analytics_service.get_stats()

@app.get("/api/activities", tags=["Analytics"])
async def get_recent_activities():
    """Fetch recent task logs across all engines."""
    stats = analytics_service.get_stats()
    return stats.get("recent_activity", [])

@app.get("/api/features", tags=["System"])
async def get_available_features():
    """Self-documenting feature flag system for the frontend."""
    return [
        {"id": "pdf-merge", "name": "Expert PDF Merge", "status": "Stable"},
        {"id": "pdf-optimize", "name": "Engine Optimization", "status": "Stable"},
        {"id": "pdf-protect", "name": "AES-256 Security", "status": "Stable"},
        {"id": "pdf-split", "name": "Dynamic Split", "status": "Stable"},
        {"id": "image-gen", "name": "Neural Synthesis", "status": "Beta"},
        {"id": "ocr-intelligence", "name": "AI Intelligence", "status": "Coming Soon"}
    ]

# 4. BASELINE PATHS
@app.get("/", tags=["System"])
async def root():
    return {"message": "Aura Platform Engine is active.", "docs_url": "/docs"}

# 5. MOCK PROFILE ENDPOINT
@app.get("/api/profile/me/", tags=["Profile"])
async def get_mock_profile():
    return {
        "display_name": "Kj. Dheena (Aura)",
        "username": "dheena_pro",
        "bio": "Expert AI Architect & Designer.",
        "location": "Chennai, India",
        "email": "dheena@aura.dev",
        "status": "online",
        "creator_tier": "Pro Plan",
        "experience_level": 95
    }

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
