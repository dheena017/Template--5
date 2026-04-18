"""
FAQ Support System Database Models
Handles all FAQ-related data structures and relationships
"""

from sqlalchemy import Column, String, Integer, Text, DateTime, Boolean, JSON, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()

# Association table for FAQ to Category (many-to-many)
faq_categories = Table(
    'faq_categories',
    Base.metadata,
    Column('faq_id', String(36), ForeignKey('faqs.id')),
    Column('category_id', String(36), ForeignKey('faq_categories_table.id'))
)

# Association table for FAQ to User roles
faq_user_roles = Table(
    'faq_user_roles',
    Base.metadata,
    Column('faq_id', String(36), ForeignKey('faqs.id')),
    Column('role', String(50))
)


class FAQ(Base):
    """
    Main FAQ document model
    Stores FAQ questions, answers, and metadata
    """
    __tablename__ = 'faqs'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    question = Column(String(500), nullable=False, index=True)
    answer = Column(Text, nullable=False)
    category_id = Column(String(36), ForeignKey('faq_categories_table.id'), nullable=False)
    
    # Metadata
    difficulty = Column(String(20), default='easy')  # easy, medium, hard
    tips = Column(Text, nullable=True)
    tags = Column(JSON, default=[])  # ['Commercial', 'Licensing', etc]
    roles = Column(JSON, default=[])  # ['all', 'beginner', 'developer', 'enterprise']
    
    # Relationships
    views = Column(Integer, default=0)
    popular = Column(Boolean, default=False)
    
    # Related FAQs (IDs stored as JSON)
    related_faq_ids = Column(JSON, default=[])
    
    # Multimedia support
    multimedia = Column(JSON, nullable=True)  # {video, images}
    article_link = Column(String(255), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Languages support
    language = Column(String(10), default='en')
    translations = Column(JSON, default={})  # {es: {...}, fr: {...}}
    
    # Relationships to other tables
    votes = relationship('HelpfulVote', back_populates='faq', cascade='all, delete-orphan')
    comments = relationship('FAQComment', back_populates='faq', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<FAQ {self.id}: {self.question[:50]}>'
    
    def to_dict(self):
        updated_at = self.updated_at
        payload = {
            'id': self.id,
            'question': self.question,
            'answer': self.answer,
            'category_id': self.category_id,
            'difficulty': self.difficulty,
            'tips': self.tips,
            'tags': self.tags,
            'roles': self.roles or [],
            'views': self.views,
            'popular': self.popular,
            'related_faq_ids': self.related_faq_ids,
            'relatedFAQs': self.related_faq_ids or [],
            'multimedia': self.multimedia,
            'article_link': self.article_link,
            'article': self.article_link,
            'updated_at': updated_at.isoformat() if updated_at is not None else None,
            'updatedAt': updated_at.isoformat() if updated_at is not None else None,
            'comments_count': len(self.comments),
            'comments': len(self.comments),
        }

        if getattr(self, 'category', None):
            payload['category_name'] = self.category.name

        return payload


class FAQCategory(Base):
    """
    FAQ Categories for organization
    """
    __tablename__ = 'faq_categories_table'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False, unique=True, index=True)
    icon = Column(String(50), nullable=True)  # icon name from lucide-react
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    faqs = relationship('FAQ', backref='category')
    
    def __repr__(self):
        return f'<FAQCategory {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'icon': self.icon,
            'description': self.description,
            'order': self.order,
        }


class HelpfulVote(Base):
    """
    User votes on FAQ helpfulness
    Tracks if users found an FAQ answer helpful
    """
    __tablename__ = 'helpful_votes'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    faq_id = Column(String(36), ForeignKey('faqs.id'), nullable=False, index=True)
    user_id = Column(String(36), nullable=False, index=True)
    
    helpful = Column(Boolean, default=True)  # True for helpful, False for not helpful
    feedback = Column(Text, nullable=True)  # Optional feedback
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    faq = relationship('FAQ', back_populates='votes')
    
    def __repr__(self):
        return f'<HelpfulVote FAQ:{self.faq_id} User:{self.user_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'faq_id': self.faq_id,
            'helpful': self.helpful,
            'created_at': self.created_at.isoformat(),
        }


class FAQComment(Base):
    """
    Community comments on FAQ answers
    Enables user-generated discussions
    """
    __tablename__ = 'faq_comments'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    faq_id = Column(String(36), ForeignKey('faqs.id'), nullable=False, index=True)
    user_id = Column(String(36), nullable=False, index=True)
    author_name = Column(String(255), nullable=False)
    author_avatar = Column(String(255), nullable=True)
    
    text = Column(Text, nullable=False)
    votes = Column(Integer, default=0)
    
    # Moderation
    approved = Column(Boolean, default=True)
    spam_flagged = Column(Boolean, default=False)
    spam_count = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    faq = relationship('FAQ', back_populates='comments')
    
    def __repr__(self):
        return f'<FAQComment FAQ:{self.faq_id} Author:{self.author_name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'faq_id': self.faq_id,
            'author': self.author_name,
            'author_avatar': self.author_avatar,
            'text': self.text,
            'votes': self.votes,
            'timestamp': self.created_at.isoformat(),
        }


class UserFAQPreferences(Base):
    """
    User preferences for FAQ experience
    Tracks subscriptions, favorites, language preference
    """
    __tablename__ = 'user_faq_preferences'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, unique=True, index=True)
    
    # Preferences
    preferred_language = Column(String(10), default='en')
    favorite_faq_ids = Column(JSON, default=[])
    subscribed_category_ids = Column(JSON, default=[])
    search_history = Column(JSON, default=[])
    
    # Notification settings
    email_notifications = Column(Boolean, default=True)
    notify_new_faqs = Column(Boolean, default=True)
    notify_category = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<UserFAQPreferences User:{self.user_id}>'
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'preferred_language': self.preferred_language,
            'favorite_faq_ids': self.favorite_faq_ids,
            'subscribed_categories': self.subscribed_category_ids,
            'search_history': self.search_history,
            'email_notifications': self.email_notifications,
        }


class FAQSearchAnalytics(Base):
    """
    Track FAQ search queries for analytics and trending
    """
    __tablename__ = 'faq_search_analytics'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=True, index=True)
    
    query = Column(String(255), nullable=False, index=True)
    category_filter = Column(String(36), nullable=True)
    role_filter = Column(String(50), nullable=True)
    
    results_count = Column(Integer, default=0)
    clicked_faq_id = Column(String(36), nullable=True)  # If user clicked on a result
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    def __repr__(self):
        return f'<FAQSearchAnalytics "{self.query}">'
    
    def to_dict(self):
        return {
            'id': self.id,
            'query': self.query,
            'results_count': self.results_count,
            'clicked_faq': self.clicked_faq_id,
            'category_filter': self.category_filter,
            'role_filter': self.role_filter,
            'timestamp': self.created_at.isoformat(),
        }


class FAQExportLog(Base):
    """
    Track FAQ exports (PDF, print, share)
    """
    __tablename__ = 'faq_export_logs'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, index=True)
    faq_id = Column(String(36), ForeignKey('faqs.id'), nullable=False)
    
    export_type = Column(String(20), nullable=False)  # pdf, print, share
    status = Column(String(20), default='pending')  # pending, completed, failed
    file_path = Column(String(255), nullable=True)  # For generated PDFs
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    def __repr__(self):
        return f'<FAQExportLog FAQ:{self.faq_id} Type:{self.export_type}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'faq_id': self.faq_id,
            'export_type': self.export_type,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
        }
