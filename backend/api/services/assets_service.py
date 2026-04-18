from sqlalchemy.orm import Session
from backend.api.models.database_models import Asset
from backend.core.db import SessionLocal
from backend.core.logger import create_logger
import os

logger = create_logger(__name__)

def register_ai_asset(name: str, type: str, url: str, is_generated: bool = True, tags: list = None):
    """
    Registers an AI-generated asset globally into the Aura Workspace.
    This ensures assets appear in the Media Vault across all creative hubs.
    """
    db = SessionLocal()
    try:
        # Avoid duplicates if possible (simple check by name/url)
        existing = db.query(Asset).filter(Asset.url == url).first()
        if existing:
            return existing
            
        new_asset = Asset(
            name=name,
            type=type,
            url=url,
            is_generated=is_generated,
            tags=tags or ["AI Generated", "Aura Synth"],
            size="Network Stream"
        )
        db.add(new_asset)
        db.commit()
        db.refresh(new_asset)
        logger.info(f"[AssetService] Registered new {type} asset: {name}")
        return new_asset
    except Exception as e:
        db.rollback()
        logger.error(f"[AssetService] Failed to register asset {name}: {str(e)}")
        return None
    finally:
        db.close()

def get_all_assets(db: Session, asset_type: str = None):
    query = db.query(Asset)
    if asset_type:
        query = query.filter(Asset.type == asset_type)
    return query.order_by(Asset.created_at.desc()).all()
