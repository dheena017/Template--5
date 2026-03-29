from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.core.db import get_db
from backend.api.models.database_models import Platform

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.get("/me")
def get_user_profile(db: Session = Depends(get_db)):
    """Retrieve verified platform profile data."""
    platform = db.query(Platform).first()
    if not platform:
        return {
            "display_name": "Aura Engine (Provisioning)",
            "username": "aura_guest",
            "bio": "Initialize system for full profile.",
            "creator_tier": "Alpha Plan"
        }
        
    return {
        "display_name": platform.name,
        "username": platform.username,
        "bio": platform.mission,
        "location": platform.location,
        "email": platform.support_email,
        "website": platform.website,
        "status": "online",
        "creator_tier": platform.plan,
        "joined_date": platform.joined_at,
        "uptime": platform.uptime_streak
    }
