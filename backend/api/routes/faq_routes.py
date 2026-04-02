"""
FAQ Support Routes/Endpoints
RESTful API for FAQ operations
"""

from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.orm import Session
from typing import Optional, List
from backend.api.models.faq_models import FAQ, FAQCategory
from backend.api.services.faq_service import (
    FAQService, FAQCategoryService, HelpfulVoteService,
    FAQCommentService, UserFAQPreferencesService,
    FAQSearchAnalyticsService, FAQExportService
)
from backend.api.services.faq_pdf_export import export_faq_pdf
from backend.core.db import get_db

# Create router
router = APIRouter(
    prefix="/api/v1/faq",
    tags=["FAQ Support"]
)


# ============ FAQ ENDPOINTS ============

@router.get("/faqs")
def get_faqs(
    category_id: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    user_role: Optional[str] = Query(None),
    language: str = Query("en"),
    skip: int = Query(0),
    limit: int = Query(20),
    db: Session = Depends(get_db)
):
    """Get all FAQs with filtering and search"""
    
    result = FAQService.get_all_faqs(
        db,
        category_id=category_id,
        search_query=search,
        user_role=user_role,
        language=language,
        skip=skip,
        limit=limit
    )

    return {
        "status": "success",
        "data": result
    }


@router.get("/faqs/{faq_id}")
def get_faq(faq_id: str, db: Session = Depends(get_db)):
    """Get single FAQ by ID and increment view count"""
    
    faq = FAQService.get_faq_by_id(db, faq_id)
    
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    return {
        "status": "success",
        "data": faq.to_dict()
    }


@router.get("/faqs/{faq_id}/related")
def get_related_faqs(faq_id: str, db: Session = Depends(get_db)):
    """Get related FAQs for a given FAQ."""

    related = FAQCategoryService.get_related_faqs(db, faq_id)
    return {
        "status": "success",
        "data": [faq.to_dict() for faq in related]
    }


@router.post("/faqs")
def create_faq(
    question: str,
    answer: str,
    category_id: str,
    difficulty: str = "easy",
    tips: Optional[str] = None,
    tags: Optional[List[str]] = None,
    multimedia: Optional[dict] = None,
    article_link: Optional[str] = None,
    db: Session = Depends(get_db),
    x_admin_token: str = Header(None)
):
    """Create new FAQ (admin only)"""
    
    # Verify admin token (implement your auth logic)
    if not x_admin_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    faq = FAQService.create_faq(
        db,
        question=question,
        answer=answer,
        category_id=category_id,
        difficulty=difficulty,
        tips=tips,
        tags=tags,
        multimedia=multimedia,
        article_link=article_link
    )
    
    return {
        "status": "success",
        "data": faq.to_dict(),
        "message": "FAQ created successfully"
    }


@router.put("/faqs/{faq_id}")
def update_faq(
    faq_id: str,
    question: Optional[str] = None,
    answer: Optional[str] = None,
    difficulty: Optional[str] = None,
    tips: Optional[str] = None,
    tags: Optional[List[str]] = None,
    popular: Optional[bool] = None,
    db: Session = Depends(get_db),
    x_admin_token: str = Header(None)
):
    """Update FAQ (admin only)"""
    
    if not x_admin_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    update_data = {}
    if question: update_data['question'] = question
    if answer: update_data['answer'] = answer
    if difficulty: update_data['difficulty'] = difficulty
    if tips: update_data['tips'] = tips
    if tags: update_data['tags'] = tags
    if popular is not None: update_data['popular'] = popular
    
    faq = FAQService.update_faq(db, faq_id, **update_data)
    
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    return {
        "status": "success",
        "data": faq.to_dict(),
        "message": "FAQ updated successfully"
    }


@router.delete("/faqs/{faq_id}")
def delete_faq(
    faq_id: str,
    db: Session = Depends(get_db),
    x_admin_token: str = Header(None)
):
    """Delete FAQ (admin only)"""
    
    if not x_admin_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    success = FAQService.delete_faq(db, faq_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    return {
        "status": "success",
        "message": "FAQ deleted successfully"
    }


# ============ CATEGORY ENDPOINTS ============

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    """Get all FAQ categories"""
    
    categories = FAQCategoryService.get_all_categories(db)
    
    return {
        "status": "success",
        "data": [cat.to_dict() for cat in categories]
    }


@router.get("/categories/{category_id}")
def get_category(category_id: str, db: Session = Depends(get_db)):
    """Get category with its FAQs"""
    
    result = FAQCategoryService.get_category_with_faqs(db, category_id)
    
    if not result:
        raise HTTPException(status_code=404, detail="Category not found")
    
    return {
        "status": "success",
        "data": result
    }


# ============ HELPFUL VOTE ENDPOINTS ============

@router.post("/faqs/{faq_id}/vote")
def add_helpful_vote(
    faq_id: str,
    helpful: bool,
    feedback: Optional[str] = None,
    user_id: str = Header(None),
    db: Session = Depends(get_db)
):
    """Add or update helpful vote"""
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID required")
    
    vote = HelpfulVoteService.add_or_update_vote(
        db,
        faq_id=faq_id,
        user_id=user_id,
        helpful=helpful,
        feedback=feedback
    )
    
    return {
        "status": "success",
        "data": vote.to_dict(),
        "message": "Vote recorded successfully"
    }


@router.get("/faqs/{faq_id}/vote-stats")
def get_vote_stats(faq_id: str, db: Session = Depends(get_db)):
    """Get vote statistics for an FAQ"""
    
    stats = HelpfulVoteService.get_vote_stats(db, faq_id)
    
    return {
        "status": "success",
        "data": stats
    }


# ============ COMMENT ENDPOINTS ============

@router.post("/faqs/{faq_id}/comments")
def add_comment(
    faq_id: str,
    text: str,
    author_name: str,
    user_id: str = Header(None),
    author_avatar: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Add comment to FAQ"""
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID required")
    
    comment = FAQCommentService.add_comment(
        db,
        faq_id=faq_id,
        user_id=user_id,
        author_name=author_name,
        text=text,
        author_avatar=author_avatar
    )
    
    return {
        "status": "success",
        "data": comment.to_dict(),
        "message": "Comment added successfully"
    }


@router.get("/faqs/{faq_id}/comments")
def get_comments(
    faq_id: str,
    skip: int = Query(0),
    limit: int = Query(10),
    db: Session = Depends(get_db)
):
    """Get comments for an FAQ"""
    
    comments = FAQCommentService.get_comments(
        db,
        faq_id=faq_id,
        skip=skip,
        limit=limit
    )
    
    return {
        "status": "success",
        "data": [comment.to_dict() for comment in comments]
    }


@router.post("/comments/{comment_id}/upvote")
def upvote_comment(comment_id: str, db: Session = Depends(get_db)):
    """Upvote a comment"""
    
    comment = FAQCommentService.upvote_comment(db, comment_id)
    
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    return {
        "status": "success",
        "data": comment.to_dict()
    }


@router.post("/comments/{comment_id}/spam")
def flag_spam(comment_id: str, db: Session = Depends(get_db)):
    """Flag comment as spam"""
    
    comment = FAQCommentService.flag_spam(db, comment_id)
    
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    return {
        "status": "success",
        "data": comment.to_dict()
    }


# ============ USER PREFERENCES ENDPOINTS ============

@router.get("/user/preferences")
def get_user_preferences(
    user_id: str = Header(None),
    db: Session = Depends(get_db)
):
    """Get user FAQ preferences"""
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID required")
    
    prefs = UserFAQPreferencesService.get_or_create_preferences(db, user_id)
    
    return {
        "status": "success",
        "data": prefs.to_dict()
    }


@router.post("/user/favorites/{faq_id}")
def add_favorite(
    faq_id: str,
    user_id: str = Header(None),
    db: Session = Depends(get_db)
):
    """Add FAQ to favorites"""
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID required")
    
    prefs = UserFAQPreferencesService.add_favorite(db, user_id, faq_id)
    
    return {
        "status": "success",
        "data": prefs.to_dict()
    }


@router.delete("/user/favorites/{faq_id}")
def remove_favorite(
    faq_id: str,
    user_id: str = Header(None),
    db: Session = Depends(get_db)
):
    """Remove FAQ from favorites"""
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID required")
    
    prefs = UserFAQPreferencesService.remove_favorite(db, user_id, faq_id)
    
    return {
        "status": "success",
        "data": prefs.to_dict()
    }


@router.post("/user/subscribe/{category_id}")
def subscribe_category(
    category_id: str,
    user_id: str = Header(None),
    db: Session = Depends(get_db)
):
    """Subscribe to category"""
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID required")
    
    prefs = UserFAQPreferencesService.subscribe_category(db, user_id, category_id)
    
    return {
        "status": "success",
        "data": prefs.to_dict()
    }


@router.delete("/user/subscribe/{category_id}")
def unsubscribe_category(
    category_id: str,
    user_id: str = Header(None),
    db: Session = Depends(get_db)
):
    """Unsubscribe from category"""
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID required")
    
    prefs = UserFAQPreferencesService.unsubscribe_category(db, user_id, category_id)
    
    return {
        "status": "success",
        "data": prefs.to_dict()
    }


# ============ SEARCH ANALYTICS ENDPOINTS ============

@router.post("/search")
def log_search(
    query: str,
    category_id: Optional[str] = None,
    role_filter: Optional[str] = None,
    results_count: int = 0,
    clicked_faq_id: Optional[str] = None,
    user_id: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Log search query and analytics"""
    
    log = FAQSearchAnalyticsService.log_search(
        db,
        query=query,
        category_filter=category_id,
        role_filter=role_filter,
        user_id=user_id,
        results_count=results_count,
        clicked_faq_id=clicked_faq_id
    )

    if user_id:
        UserFAQPreferencesService.add_search_history(db, user_id, query)
    
    return {
        "status": "success",
        "data": log.to_dict()
    }


@router.get("/analytics/trending")
def get_trending_searches(
    days: int = Query(7),
    limit: int = Query(10),
    db: Session = Depends(get_db)
):
    """Get trending searches"""
    
    trending = FAQSearchAnalyticsService.get_trending_searches(
        db,
        days=days,
        limit=limit
    )
    
    return {
        "status": "success",
        "data": trending
    }


@router.get("/analytics/stats")
def get_search_stats(db: Session = Depends(get_db)):
    """Get search statistics"""
    
    stats = FAQSearchAnalyticsService.get_search_stats(db)
    
    return {
        "status": "success",
        "data": stats
    }


# ============ EXPORT ENDPOINTS ============

@router.post("/exports/{faq_id}")
def create_export(
    faq_id: str,
    export_type: str,  # pdf, print, share
    user_id: str = Header(None),
    db: Session = Depends(get_db)
):
    """Create FAQ export"""
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID required")
    
    if export_type not in ['pdf', 'print', 'share']:
        raise HTTPException(status_code=400, detail="Invalid export type")

    faq = FAQService.get_faq_by_id(db, faq_id)
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")

    generated_path = None
    if export_type == 'pdf':
        export_result = export_faq_pdf(faq.to_dict(), export_format='single')
        if export_result.get('status') != 'success':
            raise HTTPException(status_code=500, detail=export_result.get('message', 'PDF export failed'))
        generated_path = export_result.get('path')
    
    export_log = FAQExportService.log_export(
        db,
        user_id=user_id,
        faq_id=faq_id,
        export_type=export_type,
        file_path=generated_path
    )

    FAQExportService.update_export_status(
        db,
        str(export_log.id),
        status='completed',
        file_path=generated_path
    )
    
    return {
        "status": "success",
        "data": {
            **export_log.to_dict(),
            "file_path": generated_path,
        },
        "message": f"Export initiated for type: {export_type}"
    }


@router.get("/analytics/exports")
def get_export_stats(
    days: int = Query(30),
    db: Session = Depends(get_db)
):
    """Get export statistics"""
    
    stats = FAQExportService.get_export_statistics(db, days=days)
    
    return {
        "status": "success",
        "data": stats
    }


# ============ HEALTH CHECK ============

@router.get("/health")
def health_check():
    """Health check endpoint"""
    
    return {
        "status": "success",
        "message": "FAQ API is running",
        "service": "FAQ Support System"
    }
