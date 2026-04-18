"""
FAQ System Setup and Initialization
Initialize database with schema and sample data
"""

from sqlalchemy.orm import Session
from backend.api.models.faq_models import Base, FAQ, FAQCategory
from backend.core.db import engine, SessionLocal
import uuid
from datetime import datetime


def setup_faq_database():
    """Create all FAQ tables in database"""
    print("🔧 Setting up FAQ database schema...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database schema created successfully!")


def seed_faq_categories(db: Session):
    """Seed FAQ categories"""
    print("📂 Seeding FAQ categories...")
    
    categories_data = [
        {
            "name": "Getting Started",
            "icon": "Zap",
            "description": "Set up your account and create your first video",
            "order": 1
        },
        {
            "name": "Billing & Plans",
            "icon": "Shield",
            "description": "Understand credits, pricing, and subscriptions",
            "order": 2
        },
        {
            "name": "AI Features",
            "icon": "LifeBuoy",
            "description": "Learn about our AI capabilities and features",
            "order": 3
        },
        {
            "name": "Integrations",
            "icon": "Code",
            "description": "Integrate TextAI with your applications",
            "order": 4
        },
        {
            "name": "Troubleshooting",
            "icon": "AlertCircle",
            "description": "Fix common issues and errors",
            "order": 5
        },
        {
            "name": "API & Developers",
            "icon": "Github",
            "description": "API reference and developer documentation",
            "order": 6
        }
    ]
    
    created_categories = {}
    for cat_data in categories_data:
        category_id = str(uuid.uuid4())
        category = FAQCategory(
            id=category_id,
            **cat_data
        )
        db.add(category)
        created_categories[cat_data["name"]] = category_id
        print(f"  ✓ Created category: {cat_data['name']}")
    
    db.commit()
    return created_categories


def seed_sample_faqs(db: Session, categories: dict):
    """Seed sample FAQs"""
    print("📝 Seeding sample FAQs...")
    
    faqs_data = [
        {
            "category": "Getting Started",
            "question": "How do I create my first video with TextAI?",
            "answer": "Creating your first video is simple! Just click on 'Studio' in the sidebar, enter your script or select a topic, choose your preferred AI voice and visuals, and hit generate. Our engine will then orchestrate the entire production for you.",
            "difficulty": "easy",
            "tips": "Pro tip: Use descriptive keywords for better results",
            "tags": ["Video", "Tutorial"],
            "roles": ["all", "beginner"],
            "views": 2341,
            "popular": True
        },
        {
            "category": "Billing & Plans",
            "question": "What happens if I run out of credits?",
            "answer": "If you run out of credits, you can upgrade your plan or purchase top-up credits from the Billing section. Your work is always saved, and you can resume generation as soon as you have more credits.",
            "difficulty": "easy",
            "tags": ["Billing", "Credits"],
            "roles": ["all"],
            "views": 1847,
            "popular": False
        },
        {
            "category": "AI Features",
            "question": "Can I use the generated content for commercial purposes?",
            "answer": "Yes! All content generated on our Standard and Pro plans includes full commercial usage rights. Free plan users are restricted to personal or trial usage with a watermark.",
            "difficulty": "easy",
            "tags": ["Commercial", "Licensing"],
            "roles": ["all"],
            "views": 3102,
            "popular": True
        },
        {
            "category": "Integrations",
            "question": "Does TextAI support API integrations?",
            "answer": "Absolutely. We offer a robust REST API for developers. You can manage your projects, generate images/videos, and now use our dedicated Assets API to manage files programmatically. Find your API keys in the Developer Console and detailed documentation in our API reference page.",
            "difficulty": "hard",
            "tags": ["API", "Integration"],
            "roles": ["developer", "enterprise"],
            "views": 987,
            "popular": False
        },
        {
            "category": "Getting Started",
            "question": "How do I manage my uploaded assets and generated files?",
            "answer": "All your media is centralized in the 'Asset Library' (Files). You can upload local files, view AI-generated content, organized by type, and delete content to save space. Developers can also use the /api/assets endpoint for these operations.",
            "difficulty": "easy",
            "tags": ["Files", "Assets"],
            "roles": ["all"],
            "views": 1654,
            "popular": False
        },
        {
            "category": "Getting Started",
            "question": "What languages are supported?",
            "answer": "TextAI currently supports over 75 languages and 450+ high-quality AI voices. We are constantly adding new locales and dialect variations to ensure global reach.",
            "difficulty": "easy",
            "tags": ["Languages", "Voices"],
            "roles": ["all", "beginner"],
            "views": 2156,
            "popular": False
        },
        {
            "category": "Troubleshooting",
            "question": "Why is my video generation taking so long?",
            "answer": "Video generation time depends on multiple factors including video length, resolution, complexity of effects, and current server load. Standard videos (30-60 seconds) typically process within 2-5 minutes. You'll receive a notification when your content is ready.",
            "difficulty": "easy",
            "tags": ["Performance", "Troubleshooting"],
            "roles": ["all"],
            "views": 1423,
            "popular": True
        },
        {
            "category": "Troubleshooting",
            "question": "I'm getting an 'Invalid API Key' error. What should I do?",
            "answer": "1. Go to your Account Settings and regenerate your API key. 2. Copy the new key and update your application. 3. Clear your browser cache if using our web interface. 4. If the issue persists, check that your key is being passed in the Authorization header correctly.",
            "difficulty": "medium",
            "tags": ["API", "Authentication"],
            "roles": ["developer", "enterprise"],
            "views": 876,
            "popular": False
        },
        {
            "category": "AI Features",
            "question": "Can I edit videos after they're generated?",
            "answer": "Yes! Use our Video Editor suite to trim, add overlays, adjust colors, add subtitles, and more. You can also regenerate specific sections or run additional effects through our enhancement tools without re-generating the entire video.",
            "difficulty": "medium",
            "tags": ["Editing", "Video"],
            "roles": ["all"],
            "views": 2234,
            "popular": True
        },
        {
            "category": "Billing & Plans",
            "question": "What's included in each subscription plan?",
            "answer": "Free Plan: 50 credits/month, watermarked exports, support via community forum. Starter: 500 credits, unlimited videos, email support. Pro: 5000 credits, priority processing, API access. Enterprise: Custom limits and dedicated support.",
            "difficulty": "easy",
            "tags": ["Plans", "Pricing"],
            "roles": ["all", "enterprise"],
            "views": 1567,
            "popular": False
        },
        {
            "category": "API & Developers",
            "question": "How do I authenticate API requests?",
            "answer": "Include your API key in the request header: Authorization: Bearer YOUR_API_KEY. Never expose your API key in client-side code. If compromised, immediately regenerate it in your dashboard.",
            "difficulty": "hard",
            "tags": ["API", "Security"],
            "roles": ["developer", "enterprise"],
            "views": 654,
            "popular": False
        },
        {
            "category": "AI Features",
            "question": "Does the platform support batch processing?",
            "answer": "Yes! With our Batch API, you can submit multiple generation requests at once. Perfect for processing large content libraries. Results are processed in the background and delivered via webhook or polling.",
            "difficulty": "hard",
            "tags": ["API", "Advanced"],
            "roles": ["developer", "enterprise"],
            "views": 892,
            "popular": False
        }
    ]
    
    for faq_data in faqs_data:
        category_name = faq_data.pop("category")
        category_id = categories.get(category_name)
        
        faq = FAQ(
            id=str(uuid.uuid4()),
            category_id=category_id,
            language="en",
            **faq_data
        )
        db.add(faq)
        print(f"  ✓ Created FAQ: {faq_data['question'][:50]}...")
    
    db.commit()
    print(f"✅ Seeded {len(faqs_data)} sample FAQs!")


def setup_faq_system():
    """Complete setup of FAQ system"""
    print("\n" + "="*60)
    print("🚀 FAQ Support System Setup")
    print("="*60 + "\n")
    
    # Step 1: Create database schema
    setup_faq_database()
    
    # Step 2: Seed data
    db = SessionLocal()
    try:
        print("\n📊 Seeding initial data...\n")
        
        # Create categories
        categories = seed_faq_categories(db)
        
        # Create sample FAQs
        seed_sample_faqs(db, categories)
        
        print("\n" + "="*60)
        print("✨ FAQ System Setup Complete!")
        print("="*60)
        print("\n📊 Summary:")
        print(f"  • Categories created: {len(categories)}")
        print(f"  • Sample FAQs created: 12")
        print(f"  • Database: Ready for use")
        print("\n🔗 Next steps:")
        print("  1. Ensure FAQ routes are registered in main.py")
        print("  2. Test endpoints with provided cURL examples")
        print("  3. Configure email notifications (optional)")
        print("  4. Set up PDF export server (optional)")
        print("\n📖 API Documentation: backend/api/routes/FAQ_API_DOCUMENTATION.md")
        print("\n")
        
    except Exception as e:
        print(f"\n❌ Error during setup: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    setup_faq_system()
