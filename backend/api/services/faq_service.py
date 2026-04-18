"""
FAQ Support Service Layer
Business logic for FAQ operations
"""

from sqlalchemy.orm import Session
from sqlalchemy import func, desc, and_, or_
from typing import List, Optional, Dict, Any, cast
import uuid
from datetime import datetime, timedelta
from backend.api.models.faq_models import (
    FAQ, FAQCategory, HelpfulVote, FAQComment, 
    UserFAQPreferences, FAQSearchAnalytics, FAQExportLog
)


class FAQService:
    """Service for FAQ CRUD and search operations"""
    
    @staticmethod
    def get_all_faqs(
        db: Session, 
        category_id: Optional[str] = None,
        search_query: Optional[str] = None,
        user_role: Optional[str] = None,
        language: str = 'en',
        skip: int = 0,
        limit: int = 100
    ) -> Dict[str, Any]:
        """Get FAQs with filtering, searching, and ranking"""
        
        query = db.query(FAQ)
        
        # Filter by category
        if category_id:
            query = query.filter(FAQ.category_id == category_id)
        
        # Filter by language
        query = query.filter(FAQ.language == language)

        # Search by question and answer
        if search_query:
            search_term = f"%{search_query}%"
            query = query.filter(
                or_(
                    FAQ.question.ilike(search_term),
                    FAQ.answer.ilike(search_term),
                    FAQ.tags.contains([search_query])
                )
            )
        
        faqs = query.order_by(
            desc(FAQ.popular),
            desc(FAQ.views),
            desc(FAQ.updated_at)
        ).all()

        # Apply role filtering in Python so it works across SQLite/Postgres JSON types
        if user_role:
            faqs = [
                faq for faq in faqs
                if not cast(Any, faq.roles) or 'all' in cast(Any, faq.roles) or user_role in cast(Any, faq.roles)
            ]

        total = len(faqs)
        faqs = faqs[skip:skip + limit]

        faq_data = []
        for faq in faqs:
            item = faq.to_dict()
            item['category'] = faq.category.to_dict() if getattr(faq, 'category', None) else None
            faq_data.append(item)
        
        return {
            'total': total,
            'faqs': faq_data,
            'skip': skip,
            'limit': limit
        }
    
    @staticmethod
    def get_faq_by_id(db: Session, faq_id: str) -> Optional[FAQ]:
        """Get single FAQ and increment view count"""
        
        faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
        
        if faq:
            # Increment views
            faq_obj = cast(Any, faq)
            faq_obj.views = (faq_obj.views or 0) + 1
            db.commit()
        
        return faq
    
    @staticmethod
    def create_faq(
        db: Session,
        question: str,
        answer: str,
        category_id: str,
        difficulty: str = 'easy',
        tips: Optional[str] = None,
        tags: Optional[List[str]] = None,
        multimedia: Optional[Dict] = None,
        article_link: Optional[str] = None
    ) -> FAQ:
        """Create new FAQ"""
        
        new_faq = FAQ(
            id=str(uuid.uuid4()),
            question=question,
            answer=answer,
            category_id=category_id,
            difficulty=difficulty,
            tips=tips,
            tags=tags or [],
            multimedia=multimedia,
            article_link=article_link,
            language='en'
        )
        
        db.add(new_faq)
        db.commit()
        db.refresh(new_faq)
        
        return new_faq
    
    @staticmethod
    def update_faq(
        db: Session,
        faq_id: str,
        **kwargs
    ) -> Optional[FAQ]:
        """Update FAQ fields"""
        
        faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
        
        if not faq:
            return None
        
        allowed_fields = {
            'question', 'answer', 'difficulty', 'tips', 
            'tags', 'roles', 'multimedia', 'article_link', 'popular', 'related_faq_ids', 'language', 'translations'
        }
        
        for field, value in kwargs.items():
            if field in allowed_fields:
                setattr(cast(Any, faq), field, value)
        
        cast(Any, faq).updated_at = datetime.utcnow()
        db.commit()
        db.refresh(faq)
        
        return faq
    
    @staticmethod
    def delete_faq(db: Session, faq_id: str) -> bool:
        """Delete FAQ"""
        
        faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
        
        if not faq:
            return False
        
        db.delete(faq)
        db.commit()
        
        return True


class FAQCategoryService:
    """Service for FAQ category operations"""
    
    @staticmethod
    def get_all_categories(db: Session) -> List[FAQCategory]:
        """Get all categories ordered by sequence"""
        
        return db.query(FAQCategory).order_by(FAQCategory.order).all()
    
    @staticmethod
    def get_category_with_faqs(db: Session, category_id: str) -> Optional[Dict]:
        """Get category with all its FAQs"""
        
        category = db.query(FAQCategory).filter(FAQCategory.id == category_id).first()
        
        if not category:
            return None
        
        faqs = db.query(FAQ).filter(FAQ.category_id == category_id).all()
        
        return {
            'category': category.to_dict(),
            'faqs': [faq.to_dict() for faq in faqs],
            'faq_count': len(faqs)
        }

    @staticmethod
    def get_related_faqs(db: Session, faq_id: str, limit: int = 5) -> List[FAQ]:
        """Get FAQs related to a specific FAQ"""

        faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
        if not faq:
            return []

        related_ids = cast(Any, faq.related_faq_ids) or []
        if related_ids:
            related = db.query(FAQ).filter(FAQ.id.in_(related_ids)).limit(limit).all()
            if related:
                return related

        return (
            db.query(FAQ)
            .filter(FAQ.category_id == faq.category_id, FAQ.id != faq.id)
            .order_by(desc(FAQ.popular), desc(FAQ.views))
            .limit(limit)
            .all()
        )
    
    @staticmethod
    def create_category(
        db: Session,
        name: str,
        icon: Optional[str] = None,
        description: Optional[str] = None,
        order: int = 0
    ) -> FAQCategory:
        """Create new category"""
        
        new_category = FAQCategory(
            id=str(uuid.uuid4()),
            name=name,
            icon=icon,
            description=description,
            order=order
        )
        
        db.add(new_category)
        db.commit()
        db.refresh(new_category)
        
        return new_category


class HelpfulVoteService:
    """Service for tracking helpful votes"""
    
    @staticmethod
    def add_or_update_vote(
        db: Session,
        faq_id: str,
        user_id: str,
        helpful: bool,
        feedback: Optional[str] = None
    ) -> HelpfulVote:
        """Add or update helpful vote"""
        
        # Check if user already voted
        existing_vote = db.query(HelpfulVote).filter(
            and_(
                HelpfulVote.faq_id == faq_id,
                HelpfulVote.user_id == user_id
            )
        ).first()
        
        if existing_vote:
            vote_obj = cast(Any, existing_vote)
            vote_obj.helpful = helpful
            vote_obj.feedback = feedback
            vote_obj.updated_at = datetime.utcnow()
            db.commit()
            db.refresh(existing_vote)
            return existing_vote
        
        new_vote = HelpfulVote(
            id=str(uuid.uuid4()),
            faq_id=faq_id,
            user_id=user_id,
            helpful=helpful,
            feedback=feedback
        )
        
        db.add(new_vote)
        db.commit()
        db.refresh(new_vote)
        
        return new_vote
    
    @staticmethod
    def get_vote_stats(db: Session, faq_id: str) -> Dict[str, Any]:
        """Get vote statistics for an FAQ"""
        
        helpful = db.query(func.count()).filter(
            and_(HelpfulVote.faq_id == faq_id, HelpfulVote.helpful == True)
        ).scalar()
        
        not_helpful = db.query(func.count()).filter(
            and_(HelpfulVote.faq_id == faq_id, HelpfulVote.helpful == False)
        ).scalar()
        
        total_votes = helpful + not_helpful
        helpful_percentage = (helpful / total_votes * 100) if total_votes > 0 else 0
        
        return {
            'helpful': helpful,
            'not_helpful': not_helpful,
            'total_votes': total_votes,
            'helpful_percentage': round(helpful_percentage, 1)
        }


class FAQCommentService:
    """Service for FAQ comments"""
    
    @staticmethod
    def add_comment(
        db: Session,
        faq_id: str,
        user_id: str,
        author_name: str,
        text: str,
        author_avatar: Optional[str] = None
    ) -> FAQComment:
        """Add comment to FAQ"""
        
        new_comment = FAQComment(
            id=str(uuid.uuid4()),
            faq_id=faq_id,
            user_id=user_id,
            author_name=author_name,
            author_avatar=author_avatar,
            text=text
        )
        
        db.add(new_comment)
        db.commit()
        db.refresh(new_comment)
        
        return new_comment
    
    @staticmethod
    def get_comments(
        db: Session,
        faq_id: str,
        approved_only: bool = True,
        skip: int = 0,
        limit: int = 10
    ) -> List[FAQComment]:
        """Get comments for an FAQ"""
        
        query = db.query(FAQComment).filter(FAQComment.faq_id == faq_id)
        
        if approved_only:
            query = query.filter(FAQComment.approved == True)
        
        return query.order_by(
            desc(FAQComment.votes),
            desc(FAQComment.created_at)
        ).offset(skip).limit(limit).all()
    
    @staticmethod
    def upvote_comment(db: Session, comment_id: str) -> Optional[FAQComment]:
        """Upvote a comment"""
        
        comment = db.query(FAQComment).filter(FAQComment.id == comment_id).first()
        
        if comment:
            comment_obj = cast(Any, comment)
            comment_obj.votes = (comment_obj.votes or 0) + 1
            db.commit()
            db.refresh(comment)
        
        return comment
    
    @staticmethod
    def flag_spam(db: Session, comment_id: str) -> Optional[FAQComment]:
        """Flag comment as spam"""
        
        comment = db.query(FAQComment).filter(FAQComment.id == comment_id).first()
        
        if comment:
            comment_obj = cast(Any, comment)
            comment_obj.spam_count = (comment_obj.spam_count or 0) + 1
            
            # Auto-hide if spam count reaches threshold
            if comment_obj.spam_count >= 3:
                comment_obj.spam_flagged = True
            
            db.commit()
            db.refresh(comment)
        
        return comment


class UserFAQPreferencesService:
    """Service for user FAQ preferences"""
    
    @staticmethod
    def get_or_create_preferences(db: Session, user_id: str) -> UserFAQPreferences:
        """Get or create user preferences"""
        
        prefs = db.query(UserFAQPreferences).filter(
            UserFAQPreferences.user_id == user_id
        ).first()
        
        if not prefs:
            prefs = UserFAQPreferences(
                id=str(uuid.uuid4()),
                user_id=user_id
            )
            db.add(prefs)
            db.commit()
            db.refresh(prefs)
        
        return prefs
    
    @staticmethod
    def add_favorite(db: Session, user_id: str, faq_id: str) -> UserFAQPreferences:
        """Add FAQ to favorites"""
        
        prefs = UserFAQPreferencesService.get_or_create_preferences(db, user_id)
        
        if faq_id not in prefs.favorite_faq_ids:
            prefs.favorite_faq_ids.append(faq_id)
            db.commit()
            db.refresh(prefs)
        
        return prefs
    
    @staticmethod
    def remove_favorite(db: Session, user_id: str, faq_id: str) -> UserFAQPreferences:
        """Remove FAQ from favorites"""
        
        prefs = UserFAQPreferencesService.get_or_create_preferences(db, user_id)
        
        if faq_id in prefs.favorite_faq_ids:
            prefs.favorite_faq_ids.remove(faq_id)
            db.commit()
            db.refresh(prefs)
        
        return prefs
    
    @staticmethod
    def subscribe_category(db: Session, user_id: str, category_id: str) -> UserFAQPreferences:
        """Subscribe to category notifications"""
        
        prefs = UserFAQPreferencesService.get_or_create_preferences(db, user_id)
        
        if category_id not in prefs.subscribed_category_ids:
            prefs.subscribed_category_ids.append(category_id)
            db.commit()
            db.refresh(prefs)
        
        return prefs
    
    @staticmethod
    def unsubscribe_category(db: Session, user_id: str, category_id: str) -> UserFAQPreferences:
        """Unsubscribe from category notifications"""
        
        prefs = UserFAQPreferencesService.get_or_create_preferences(db, user_id)
        
        if category_id in prefs.subscribed_category_ids:
            prefs.subscribed_category_ids.remove(category_id)
            db.commit()
            db.refresh(prefs)
        
        return prefs
    
    @staticmethod
    def add_search_history(db: Session, user_id: str, query: str) -> UserFAQPreferences:
        """Add search query to history"""
        
        prefs = UserFAQPreferencesService.get_or_create_preferences(db, user_id)
        
        # Keep only last 10 searches and avoid duplicates
        if query in prefs.search_history:
            history = list(cast(Any, prefs.search_history) or [])
            history.remove(query)
            cast(Any, prefs).search_history = history
        
        history = list(cast(Any, prefs.search_history) or [])
        history.insert(0, query)
        cast(Any, prefs).search_history = history[:10]
        
        db.commit()
        db.refresh(prefs)
        
        return prefs


class FAQSearchAnalyticsService:
    """Service for search analytics"""
    
    @staticmethod
    def log_search(
        db: Session,
        query: str,
        category_filter: Optional[str] = None,
        role_filter: Optional[str] = None,
        user_id: Optional[str] = None,
        results_count: int = 0,
        clicked_faq_id: Optional[str] = None
    ) -> FAQSearchAnalytics:
        """Log a search query"""
        
        log = FAQSearchAnalytics(
            id=str(uuid.uuid4()),
            user_id=user_id,
            query=query,
            category_filter=category_filter,
            role_filter=role_filter,
            results_count=results_count,
            clicked_faq_id=clicked_faq_id
        )
        
        db.add(log)
        db.commit()
        db.refresh(log)
        
        return log
    
    @staticmethod
    def get_trending_searches(
        db: Session,
        days: int = 7,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """Get trending search queries"""
        
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        
        results = db.query(
            FAQSearchAnalytics.query,
            func.count(FAQSearchAnalytics.id).label('count')
        ).filter(
            FAQSearchAnalytics.created_at >= cutoff_date
        ).group_by(
            FAQSearchAnalytics.query
        ).order_by(
            desc(func.count(FAQSearchAnalytics.id))
        ).limit(limit).all()
        
        return [
            {'query': query, 'count': count}
            for query, count in results
        ]
    
    @staticmethod
    def get_search_stats(db: Session) -> Dict[str, Any]:
        """Get overall search statistics"""
        
        total_searches = db.query(func.count(FAQSearchAnalytics.id)).scalar()
        
        # Most clicked FAQ
        most_clicked = db.query(
            FAQSearchAnalytics.clicked_faq_id,
            func.count(FAQSearchAnalytics.id).label('count')
        ).filter(
            FAQSearchAnalytics.clicked_faq_id.isnot(None)
        ).group_by(
            FAQSearchAnalytics.clicked_faq_id
        ).order_by(
            desc(func.count(FAQSearchAnalytics.id))
        ).first()
        
        return {
            'total_searches': total_searches,
            'most_clicked_faq_id': most_clicked[0] if most_clicked else None,
            'most_clicked_count': most_clicked[1] if most_clicked else 0
        }


class FAQExportService:
    """Service for FAQ exports"""
    
    @staticmethod
    def log_export(
        db: Session,
        user_id: str,
        faq_id: str,
        export_type: str,
        file_path: Optional[str] = None
    ) -> FAQExportLog:
        """Log FAQ export"""
        
        log = FAQExportLog(
            id=str(uuid.uuid4()),
            user_id=user_id,
            faq_id=faq_id,
            export_type=export_type,
            file_path=file_path,
            status='pending'
        )
        
        db.add(log)
        db.commit()
        db.refresh(log)
        
        return log
    
    @staticmethod
    def update_export_status(
        db: Session,
        export_id: str,
        status: str,
        file_path: Optional[str] = None
    ) -> Optional[FAQExportLog]:
        """Update export status"""
        
        export_log = db.query(FAQExportLog).filter(FAQExportLog.id == export_id).first()
        
        if export_log:
            export_obj = cast(Any, export_log)
            export_obj.status = status
            if file_path:
                export_obj.file_path = file_path
            db.commit()
            db.refresh(export_log)
        
        return export_log
    
    @staticmethod
    def get_export_statistics(db: Session, days: int = 30) -> Dict[str, Any]:
        """Get export statistics"""
        
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        
        total_exports = db.query(func.count(FAQExportLog.id)).filter(
            FAQExportLog.created_at >= cutoff_date
        ).scalar()
        
        by_type = db.query(
            FAQExportLog.export_type,
            func.count(FAQExportLog.id).label('count')
        ).filter(
            FAQExportLog.created_at >= cutoff_date
        ).group_by(
            FAQExportLog.export_type
        ).all()
        
        return {
            'total_exports': total_exports,
            'by_type': {export_type: count for export_type, count in by_type},
            'period_days': days
        }
