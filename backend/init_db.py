from backend.core.db import engine, Base
from backend.api.models.database_models import Platform, PlatformStat, PlatformCapability, Asset, Feature, ConversionTask, PDFOperation
import datetime

def init_db():
    print("Initializing Database with Aura Platform Architecture...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")
    
    # Check if a platform already exists
    from backend.core.db import SessionLocal
    db = SessionLocal()
    if not db.query(Platform).first():
        print("Provisioning initial platform data...")
        new_platform = Platform(
            name="Aura Engine V2",
            username="dheena_pro",
            mission="Universal AI Orchestration and Synthesis",
            location="Chennai, IN",
            plan="Enterprise Plus"
        )
        db.add(new_platform)
        db.flush()
        
        new_stats = PlatformStat(
            platform_id=new_platform.id,
            active_users=1542,
            integrated_models=48,
            core_services=16,
            active_projects=82
        )
        db.add(new_stats)
        
        # Provision default assets
        mock_assets = [
            {"name": "Aura_Launch_Trailer_Final.mp4", "type": "video", "url": "/media/aura_launch.mp4", "size": "124.5MB", "is_generated": True, "tags": ["Cinematic", "Promo"]},
            {"name": "Ambient_Space_Loop.wav", "type": "audio", "url": "/media/ambient.wav", "size": "12.8MB", "is_generated": True, "tags": ["Music", "Atmospheric"]},
            {"name": "Hero_Visual_v2.png", "type": "image", "url": "/media/hero.png", "size": "4.2MB", "is_generated": False, "tags": ["Design", "Brand"]},
        ]
        
        db.commit()
        print("Initial data provisioned.")
    else:
        print("Database already provisioned with platform info.")
        
    if not db.query(Feature).first():
        print("Provisioning default features...")
        mock_features = [
            {"feature_id": "pdf-merge", "name": "Expert PDF Merge", "status": "Stable", "category": "pdf"},
            {"feature_id": "pdf-optimize", "name": "Engine Optimization", "status": "Stable", "category": "pdf"},
            {"feature_id": "pdf-protect", "name": "AES-256 Security", "status": "Stable", "category": "pdf"},
            {"feature_id": "pdf-split", "name": "Dynamic Split", "status": "Stable", "category": "pdf"},
            {"feature_id": "image-gen", "name": "Neural Synthesis", "status": "Beta", "category": "image"},
            {"feature_id": "image-convert", "name": "Image Format Hub", "status": "Stable", "category": "image"},
            {"feature_id": "video-convert", "name": "Universal Video Transcoder", "status": "Stable", "category": "video"},
            {"feature_id": "audio-convert", "name": "High Fidelity Audio Engine", "status": "Stable", "category": "audio"},
            {"feature_id": "ocr-intelligence", "name": "AI Intelligence", "status": "Coming Soon", "category": "text"},
            {"feature_id": "voice-clone", "name": "Voice Cloning", "status": "Alpha", "category": "audio"}
        ]
        
        for feature in mock_features:
            db.add(Feature(**feature))
            
        db.commit()
        print("Features data provisioned.")
    else:
        print("Features already provisioned.")
        
    db.close()

if __name__ == "__main__":
    init_db()
