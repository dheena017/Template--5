"""
ConversionHistory Service - Manages storage and retrieval of conversion history
"""

from sqlalchemy.orm import Session
from sqlalchemy import desc, and_
from datetime import datetime, timedelta
from backend.api.models.database_models import ConversionHistory
from typing import List, Optional, Dict
import hashlib

class ConversionHistoryService:
    """Service for managing conversion history and cache metadata."""
    
    @staticmethod
    def save_conversion(
        db: Session,
        conversion_key: str,
        from_format: str,
        to_format: str,
        file_name: str,
        file_size_bytes: Optional[int] = None,
        input_hash: Optional[str] = None,
        output_url: Optional[str] = None,
        output_size_bytes: Optional[int] = None,
        status: str = "SUCCESS",
        error_message: Optional[str] = None,
        processing_time_ms: Optional[int] = None
    ) -> ConversionHistory:
        """Save a conversion record to history."""
        try:
            record = ConversionHistory(
                conversion_key=conversion_key,
                from_format=from_format,
                to_format=to_format,
                file_name=file_name,
                file_size_bytes=file_size_bytes,
                input_hash=input_hash,
                output_url=output_url,
                output_size_bytes=output_size_bytes,
                status=status,
                error_message=error_message,
                processing_time_ms=processing_time_ms
            )
            db.add(record)
            db.commit()
            db.refresh(record)
            return record
        except Exception as e:
            db.rollback()
            raise e

    @staticmethod
    def get_recent_conversions(
        db: Session,
        conversion_key: Optional[str] = None,
        limit: int = 20,
        days: int = 30
    ) -> List[ConversionHistory]:
        """Retrieve recent conversions, optionally filtered by conversion_key."""
        try:
            cutoff_date = datetime.utcnow() - timedelta(days=days)
            
            query = db.query(ConversionHistory).filter(
                ConversionHistory.created_at >= cutoff_date
            )
            
            if conversion_key:
                query = query.filter(ConversionHistory.conversion_key == conversion_key)
            
            return query.order_by(desc(ConversionHistory.created_at)).limit(limit).all()
        except Exception as e:
            print(f"Error retrieving conversion history: {e}")
            return []

    @staticmethod
    def get_conversion_by_hash(
        db: Session,
        input_hash: str,
        conversion_key: str
    ) -> Optional[ConversionHistory]:
        """Find a cached conversion by input hash."""
        try:
            return db.query(ConversionHistory).filter(
                and_(
                    ConversionHistory.input_hash == input_hash,
                    ConversionHistory.conversion_key == conversion_key,
                    ConversionHistory.status == "SUCCESS"
                )
            ).order_by(desc(ConversionHistory.accessed_at)).first()
        except Exception as e:
            print(f"Error finding cached conversion: {e}")
            return None

    @staticmethod
    def update_accessed_at(db: Session, history_id: int) -> bool:
        """Update the accessed_at timestamp for a conversion."""
        try:
            record = db.query(ConversionHistory).filter(
                ConversionHistory.id == history_id
            ).first()
            
            if record:
                record.accessed_at = datetime.utcnow()
                db.commit()
                return True
            return False
        except Exception as e:
            db.rollback()
            print(f"Error updating accessed_at: {e}")
            return False

    @staticmethod
    def delete_old_entries(
        db: Session,
        days: int = 90
    ) -> int:
        """Delete conversion history older than specified days."""
        try:
            cutoff_date = datetime.utcnow() - timedelta(days=days)
            deleted = db.query(ConversionHistory).filter(
                ConversionHistory.created_at < cutoff_date
            ).delete()
            db.commit()
            return deleted
        except Exception as e:
            db.rollback()
            print(f"Error deleting old entries: {e}")
            return 0

    @staticmethod
    def get_stats(db: Session) -> Dict:
        """Get statistics about conversion history."""
        try:
            total = db.query(ConversionHistory).count()
            successful = db.query(ConversionHistory).filter(
                ConversionHistory.status == "SUCCESS"
            ).count()
            failed = db.query(ConversionHistory).filter(
                ConversionHistory.status == "FAILED"
            ).count()
            
            # Get most used conversions
            from sqlalchemy import func
            top_conversions = db.query(
                ConversionHistory.conversion_key,
                func.count(ConversionHistory.id).label('count')
            ).group_by(ConversionHistory.conversion_key).order_by(
                desc(func.count(ConversionHistory.id))
            ).limit(5).all()
            
            return {
                'total_conversions': total,
                'successful': successful,
                'failed': failed,
                'success_rate': (successful / total * 100) if total > 0 else 0,
                'top_conversions': [
                    {'key': k, 'count': c} for k, c in top_conversions
                ]
            }
        except Exception as e:
            print(f"Error getting stats: {e}")
            return {}

    @staticmethod
    def calculate_file_hash(file_bytes: bytes) -> str:
        """Calculate SHA256 hash of file contents for cache matching."""
        return hashlib.sha256(file_bytes).hexdigest()
