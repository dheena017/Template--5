from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.core.db import Base

class Platform(Base):
    __tablename__ = "platforms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), default="Aura Platform Engine")
    username = Column(String(128), default="aura_pro")
    mission = Column(Text, default="High-performance AI orchestration microservice")
    location = Column(String(128), default="Chennai, India")
    website = Column(String(256), default="https://aura.dev")
    support_email = Column(String(128), default="dheena@aura.dev")
    plan = Column(String(64), default="Pro Plan")
    uptime_streak = Column(String(64), default="99.99%")
    joined_at = Column(DateTime, default=datetime.utcnow)
    visibility = Column(String(32), default="public")
    
    stats = relationship("PlatformStat", back_populates="platform", uselist=False)
    capabilities = relationship("PlatformCapability", back_populates="platform")

class PlatformStat(Base):
    __tablename__ = "platform_stats"
    id = Column(Integer, primary_key=True, index=True)
    platform_id = Column(Integer, ForeignKey("platforms.id", ondelete="CASCADE"))
    active_users = Column(Integer, default=1240)
    integrated_models = Column(Integer, default=32)
    core_services = Column(Integer, default=12)
    active_projects = Column(Integer, default=45)
    
    platform = relationship("Platform", back_populates="stats")

class PlatformCapability(Base):
    __tablename__ = "platform_capabilities"
    id = Column(Integer, primary_key=True, index=True)
    platform_id = Column(Integer, ForeignKey("platforms.id", ondelete="CASCADE"))
    capability = Column(String(128), nullable=False)
    
    platform = relationship("Platform", back_populates="capabilities")

class Asset(Base):
    """Assets model for the Files dashboard."""
    __tablename__ = "assets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    type = Column(String(128), nullable=False)  # 'image', 'video', 'audio', 'document'
    url = Column(String(512), nullable=False)
    size = Column(String(64))
    is_generated = Column(Boolean, default=False)
    tags = Column(JSON, default=[])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Feature(Base):
    """Platform features and capabilities."""
    __tablename__ = "features"
    id = Column(Integer, primary_key=True, index=True)
    feature_id = Column(String(128), unique=True, index=True, nullable=False)
    name = Column(String(256), nullable=False)
    status = Column(String(64), nullable=False, default="Stable")
    category = Column(String(128), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ConversionTask(Base):
    """Tracks all media conversions across audio, video, image formats."""
    __tablename__ = "conversion_tasks"
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(String(128), unique=True, index=True, nullable=False)
    file_name = Column(String(256), nullable=False)
    from_format = Column(String(64), nullable=False)
    to_format = Column(String(64), nullable=False)
    status = Column(String(64), default="PENDING") # PENDING, PROCESSING, COMPLETED, FAILED
    progress = Column(Integer, default=0)
    quality = Column(String(64), default="high")
    category = Column(String(128)) # 'audio', 'video', 'image', 'document'
    result_url = Column(String(512), nullable=True)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

class PDFOperation(Base):
    """Tracks advanced PDF specific telemetry and operations."""
    __tablename__ = "pdf_operations"
    id = Column(Integer, primary_key=True, index=True)
    operation_type = Column(String(128), nullable=False) # merge, split, compress, protect, extract-pages, remove-pages, rotate, unlock
    file_count = Column(Integer, default=1)
    file_size_mb = Column(Float, nullable=True)
    status = Column(String(64), default="SUCCESS")
    created_at = Column(DateTime, default=datetime.utcnow)
