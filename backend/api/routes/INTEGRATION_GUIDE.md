# FAQ System Integration Guide

This guide walks through integrating the complete FAQ backend system into your FastAPI application.

## Prerequisites

✅ All FAQ backend components created:
- `faq_models.py` - Database models
- `faq_service.py` - Business logic
- `faq_routes.py` - API endpoints
- `faq_pdf_export.py` - PDF export service
- `faq_setup.py` - Database initialization script

## 1. Install Required Dependencies

Add to `backend/requirements.txt`:

```
reportlab>=4.0.0     # For PDF export
```

Then install:
```bash
pip install reportlab
```

## 2. Update main.py

Add these imports at the top of `backend/main.py`:

```python
from api.routes import faq_routes
from api.routes.faq_setup import setup_faq_system
```

Register the FAQ router in your FastAPI app:

```python
# Include FAQ routes
app.include_router(
    faq_routes.router,
    prefix="/api/v1",
    tags=["FAQ Support System"]
)
```

*Recommended placement: After other route registrations, before the startup event*

## 3. Initialize Database on Startup

Add this to your FastAPI app initialization:

```python
@app.on_event("startup")
async def startup_event():
    """Initialize FAQ database on application startup"""
    try:
        # Only run migration if tables don't exist
        from sqlalchemy import inspect
        from core.db import engine
        
        inspector = inspect(engine)
        if not inspector.has_table("faq"):
            print("Initializing FAQ database schema...")
            setup_faq_system()
    except Exception as e:
        print(f"Note: FAQ database already initialized or setup skipped: {e}")
```

## 4. Alternative: Manual Database Setup

If you prefer to set up the database manually:

```bash
# From backend directory
python -c "from api.routes.faq_setup import setup_faq_system; setup_faq_system()"
```

Or add a management command:

```bash
# Create backend/manage.py
python manage.py setup-faq
```

## 5. Environment Configuration

Ensure these environment variables are set in `.env`:

```env
# Database URL (must be PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost/your_database

# Optional: Email notifications (for comment replies, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Optional: API authentication
ADMIN_TOKEN=your_secure_admin_token_here
```

## 6. Test the Integration

### Test database connection:

```bash
curl http://localhost:8000/api/v1/faq/health
```

Expected response:
```json
{
  "status": "healthy",
  "message": "FAQ service is running",
  "timestamp": "2024-01-15T10:30:00"
}
```

### Get all FAQs:

```bash
curl http://localhost:8000/api/v1/faq/faqs
```

### Search FAQs:

```bash
curl "http://localhost:8000/api/v1/faq/faqs?search=video&category=Getting%20Started"
```

See `FAQ_API_DOCUMENTATION.md` for all endpoints.

## 7. Frontend Integration

### Update FAQSupport.jsx

Add API calls to fetch FAQ data:

```javascript
import { useState, useEffect } from 'react';

export const FAQSupport = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch FAQs from backend
    fetch('http://localhost:8000/api/v1/faq/faqs')
      .then(res => res.json())
      .then(data => {
        setFaqs(data.data);
        setLoading(false);
      })
      .catch(err => console.error('Failed to load FAQs:', err));
  }, []);
  
  // ... rest of component
};
```

### Create API service layer

Create `frontend/src/services/faqApi.js`:

```javascript
const API_BASE = 'http://localhost:8000/api/v1/faq';

export const faqApi = {
  // FAQs
  getFaqs: (params) => 
    fetch(`${API_BASE}/faqs?${new URLSearchParams(params)}`)
      .then(r => r.json()),
  
  getFaqById: (id) => 
    fetch(`${API_BASE}/faqs/${id}`)
      .then(r => r.json()),
  
  // Votes
  voteFaq: (id, helpful) =>
    fetch(`${API_BASE}/faqs/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ helpful, feedback: '' })
    }).then(r => r.json()),
  
  // Comments
  addComment: (id, text, authorName) =>
    fetch(`${API_BASE}/faqs/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, author_name: authorName })
    }).then(r => r.json()),
  
  // Search
  search: (query) =>
    fetch(`${API_BASE}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    }).then(r => r.json()),
};
```

### Use in components:

```javascript
import { faqApi } from '../services/faqApi';

// In component
const fetchFaqs = async () => {
  const response = await faqApi.getFaqs({ 
    search: query, 
    category: selectedCategory 
  });
  setFaqs(response.data);
};
```

## 8. Database Backup & Maintenance

### Backup FAQ data:

```bash
# Backup FAQs to JSON
pg_dump -U user -d database --table=faq > faq_backup.sql

# Restore from backup
psql -U user -d database < faq_backup.sql
```

### Monitor FAQ analytics:

```bash
# Query trending searches
psql -c "SELECT query, COUNT(*) as count FROM faq_search_analytics 
         WHERE created_at > NOW() - INTERVAL '7 days' 
         GROUP BY query ORDER BY count DESC LIMIT 10;"
```

## 9. Production Checklist

- [ ] Database initialized and schema created
- [ ] FAQ routes registered in main.py
- [ ] Dependencies installed (reportlab)
- [ ] Environment variables configured
- [ ] Admin token set for protected endpoints
- [ ] CORS configured for frontend domain
- [ ] Email notifications setup (optional)
- [ ] PDF export tested
- [ ] Frontend API service integrated
- [ ] All endpoints tested with curl
- [ ] Error handling tested
- [ ] Analytics tracking verified
- [ ] Database backups automated
- [ ] Rate limiting configured (optional)

## 10. Troubleshooting

### "Table 'faq' does not exist"

```python
# Run explicitly
from api.routes.faq_setup import setup_faq_system
setup_faq_system()
```

### "ModuleNotFoundError: reportlab"

```bash
pip install reportlab --upgrade
```

### "Connection refused" to database

Check `DATABASE_URL` environment variable and PostgreSQL is running:

```bash
# Linux/Mac
psql -U postgres -d postgres

# Windows
"C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres
```

### Frontend CORS error

Add to `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Summary

After following these steps, you'll have:
- ✅ FAQ database fully initialized
- ✅ 30+ API endpoints ready
- ✅ 12 sample FAQs in database
- ✅ PDF export functionality
- ✅ Analytics tracking
- ✅ User preferences
- ✅ Search functionality
- ✅ Comment system

Your FAQ system is production-ready!

## Support

For API details, see: `FAQ_API_DOCUMENTATION.md`
For component usage, see: `frontend/src/pages/support/HelpCenter.jsx`
