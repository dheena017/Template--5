from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from backend.core.db import get_db
from backend.api.models.database_models import Asset
import os
import shutil

router = APIRouter(prefix="/api/files", tags=["Assets"])

@router.get("/")
def get_assets(db: Session = Depends(get_db)):
    """Fetch all files and assets for the library."""
    assets = db.query(Asset).all()
    # Map back to matching frontend data structure
    return [
        {
            "id": a.id,
            "name": a.name,
            "type": a.type,
            "url": a.url,
            "size": a.size,
            "is_generated": a.is_generated,
            "tags": a.tags,
            "date": a.created_at
        } for a in assets
    ]

@router.post("/upload")
async def upload_asset(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Handle file upload and database registration."""
    # Ensure media directory exists
    media_dir = "frontend/public/media"
    os.makedirs(media_dir, exist_ok=True)
    
    file_path = f"{media_dir}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Register in DB
    new_asset = Asset(
        name=file.filename,
        type=file.content_type.split('/')[0],  # Get general type
        url=f"/media/{file.filename}",
        size=f"{os.path.getsize(file_path) / 1024 / 1024:.2f}MB",
        is_generated=False,
        tags=["Uploaded"]
    )
    db.add(new_asset)
    db.commit()
    db.refresh(new_asset)
    
    return {"message": "Upload successful", "file": {
        "id": new_asset.id,
        "name": new_asset.name,
        "type": new_asset.type,
        "url": new_asset.url,
        "size": new_asset.size,
        "is_generated": new_asset.is_generated,
        "tags": new_asset.tags,
        "date": new_asset.created_at
    }}

@router.delete("/{asset_id}")
def delete_asset(asset_id: int, db: Session = Depends(get_db)):
    """Remove asset from library and disk."""
    asset = db.query(Asset).filter(Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset metadata not found")
        
    # Attempt to delete file from disk
    file_path = f"frontend/public{asset.url}"
    if os.path.exists(file_path):
        os.remove(file_path)
        
    db.delete(asset)
    db.commit()
    return {"status": "Asset successfully removed from Aura Engine."}
