# FAQ Support API Documentation

## Overview
Complete REST API for FAQ Support system with 12 advanced features. Supports search, filtering, voting, comments, exports, analytics, and user preferences.

## Base URL
```
http://localhost:8000/api/v1/faq
```

---

## 📋 Endpoints Reference

### FAQ Management

#### Get All FAQs
```http
GET /faqs
```

**Query Parameters:**
- `category_id` (optional): Filter by category ID
- `search` (optional): Search by question/answer text
- `user_role` (optional): Filter by user role (all, beginner, developer, enterprise)
- `language` (optional): Default 'en'
- `skip` (optional): Pagination offset (default 0)
- `limit` (optional): Pagination limit (default 20)

**Response:**
```json
{
  "status": "success",
  "data": {
    "total": 12,
    "faqs": [
      {
        "id": "uuid",
        "question": "How do I create my first video?",
        "answer": "...",
        "category_id": "uuid",
        "difficulty": "easy",
        "tags": ["Commercial", "Licensing"],
        "views": 2341,
        "popular": true,
        "comments_count": 3
      }
    ],
    "skip": 0,
    "limit": 20
  }
}
```

#### Get Single FAQ
```http
GET /faqs/{faq_id}
```

**Response:** Single FAQ object with incremented view count

---

### Category Operations

#### Get All Categories
```http
GET /categories
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Getting Started",
      "icon": "Zap",
      "description": "Set up your account..."
    }
  ]
}
```

#### Get Category with FAQs
```http
GET /categories/{category_id}
```

---

### Feature 3: Helpful Voting

#### Add/Update Vote
```http
POST /faqs/{faq_id}/vote
```

**Headers:**
- `user-id`: User ID (required)

**Body:**
```json
{
  "helpful": true,
  "feedback": "Very clear explanation"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "faq_id": "uuid",
    "helpful": true,
    "created_at": "2024-10-15T10:30:00"
  }
}
```

#### Get Vote Statistics
```http
GET /faqs/{faq_id}/vote-stats
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "helpful": 156,
    "not_helpful": 12,
    "total_votes": 168,
    "helpful_percentage": 92.9
  }
}
```

---

### Feature 12: Community Comments

#### Add Comment
```http
POST /faqs/{faq_id}/comments
```

**Headers:**
- `user-id`: User ID (required)

**Body:**
```json
{
  "text": "Very helpful!",
  "author_name": "John Doe",
  "author_avatar": "https://avatar.url"
}
```

#### Get Comments
```http
GET /faqs/{faq_id}/comments
```

**Query Parameters:**
- `skip` (optional): Default 0
- `limit` (optional): Default 10

#### Upvote Comment
```http
POST /comments/{comment_id}/upvote
```

#### Flag as Spam
```http
POST /comments/{comment_id}/spam
```

---

### Feature 7: User Preferences & Subscriptions

#### Get User Preferences
```http
GET /user/preferences
```

**Headers:**
- `user-id`: User ID (required)

**Response:**
```json
{
  "status": "success",
  "data": {
    "user_id": "uuid",
    "preferred_language": "en",
    "favorite_faq_ids": ["uuid1", "uuid2"],
    "subscribed_categories": ["uuid1"],
    "email_notifications": true
  }
}
```

#### Add to Favorites
```http
POST /user/favorites/{faq_id}
```

**Headers:**
- `user-id`: User ID (required)

#### Remove from Favorites
```http
DELETE /user/favorites/{faq_id}
```

#### Subscribe to Category
```http
POST /user/subscribe/{category_id}
```

#### Unsubscribe from Category
```http
DELETE /user/subscribe/{category_id}
```

---

### Feature 8: Search Analytics & Trending

#### Log Search
```http
POST /search
```

**Headers:**
- `user-id`: User ID (optional)

**Body:**
```json
{
  "query": "API integration",
  "category_id": "uuid",
  "role_filter": "developer",
  "results_count": 5,
  "clicked_faq_id": "uuid"
}
```

#### Get Trending Searches
```http
GET /analytics/trending
```

**Query Parameters:**
- `days` (optional): Default 7
- `limit` (optional): Default 10

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "query": "API integration",
      "count": 145
    },
    {
      "query": "credit limits",
      "count": 98
    }
  ]
}
```

#### Get Search Statistics
```http
GET /analytics/stats
```

---

### Feature 9: Export Operations

#### Create Export
```http
POST /exports/{faq_id}
```

**Headers:**
- `user-id`: User ID (required)

**Body:**
```json
{
  "export_type": "pdf"
}
```

**Supported types:** `pdf`, `print`, `share`

#### Get Export Statistics
```http
GET /analytics/exports
```

**Query Parameters:**
- `days` (optional): Default 30

---

## 🔐 Authentication

All endpoints that modify data or access user-specific data require:
- `user-id` header: Current user's ID
- `x-admin-token` header (required for create/update/delete FAQ operations)

---

## 📝 Frontend Integration Examples

### React Hook for FAQ Search
```javascript
const [faqs, setFaqs] = useState([]);
const [loading, setLoading] = useState(false);

const fetchFAQs = async (searchQuery) => {
  setLoading(true);
  try {
    const response = await fetch(
      `/api/v1/faq/faqs?search=${searchQuery}&limit=20`,
      {
        headers: {
          'user-id': currentUserId
        }
      }
    );
    const data = await response.json();
    setFaqs(data.data.faqs);
  } finally {
    setLoading(false);
  }
};
```

### Vote on FAQ
```javascript
const voteHelpful = async (faqId, isHelpful) => {
  const response = await fetch(`/api/v1/faq/faqs/${faqId}/vote`, {
    method: 'POST',
    headers: {
      'user-id': currentUserId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      helpful: isHelpful,
      feedback: userFeedback
    })
  });
  return response.json();
};
```

### Add Comment
```javascript
const addComment = async (faqId, commentText) => {
  const response = await fetch(
    `/api/v1/faq/faqs/${faqId}/comments`,
    {
      method: 'POST',
      headers: {
        'user-id': currentUserId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: commentText,
        author_name: userName,
        author_avatar: userAvatar
      })
    }
  );
  return response.json();
};
```

### Log Search for Analytics
```javascript
const logSearch = async (query, categoryId) => {
  await fetch('/api/v1/faq/search', {
    method: 'POST',
    headers: {
      'user-id': currentUserId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      category_id: categoryId,
      results_count: results.length,
      clicked_faq_id: selectedFaqId
    })
  });
};
```

---

## 🗄️ Database Schema

### Tables
- `faqs` - Main FAQ documents
- `faq_categories_table` - FAQ categories
- `helpful_votes` - User votes on FAQ helpfulness
- `faq_comments` - Community comments
- `user_faq_preferences` - User settings/favorites/subscriptions
- `faq_search_analytics` - Search tracking
- `faq_export_logs` - Export tracking

---

## 🚀 Setup Instructions

### 1. Install Models
```python
from backend.api.models.faq_models import Base
from backend.core.db import engine

# Create tables
Base.metadata.create_all(bind=engine)
```

### 2. Register Routes in main.py
```python
from api.routes.faq_routes import router as faq_router

app.include_router(faq_router)
```

### 3. Initial Data Load
```sql
-- Add categories
INSERT INTO faq_categories_table (id, name, icon, description, order) VALUES
  ('1', 'Getting Started', 'Zap', 'Set up your account', 1),
  ('2', 'Billing & Plans', 'Shield', 'Understand credits', 2),
  ('3', 'API & Developers', 'Code', 'API integration', 3),
  ...
```

### 4. Environment Variables
```
DATABASE_URL=postgresql://user:password@localhost/textai
FAQServiceEnabled=true
MaxFAQCategories=10
```

---

## 📊 Analytics Features

The API tracks:
- ✅ FAQ views per question
- ✅ User helpful votes ratio
- ✅ Popular search queries (trending)
- ✅ Export types and frequency
- ✅ Comment engagement
- ✅ User subscriptions to categories

---

## Error Handling

All responses follow standard format:

**Success (200-201):**
```json
{
  "status": "success",
  "data": {...},
  "message": "Operation completed"
}
```

**Error (4xx-5xx):**
```json
{
  "status": "error",
  "detail": "Error description"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

---

## 🔄 Sync with Frontend FAQSupport.jsx

The backend API pairs with the frontend component:

| Frontend Feature | API Endpoint |
|---|---|
| Search FAQs | `GET /faqs?search=...` |
| Filter by role | `GET /faqs?user_role=...` |
| Vote helpful | `POST /faqs/:id/vote` |
| Add comment | `POST /faqs/:id/comments` |
| Get comments | `GET /faqs/:id/comments` |
| Add favorite | `POST /user/favorites/:id` |
| Subscribe category | `POST /user/subscribe/:id` |
| Log search | `POST /search` |
| Trending searches | `GET /analytics/trending` |
| Export FAQ | `POST /exports/:id` |

---

## 🧪 Testing

### Using cURL

```bash
# Get FAQs
curl -X GET "http://localhost:8000/api/v1/faq/faqs?search=video" \
  -H "user-id: test-user-123"

# Vote helpful
curl -X POST "http://localhost:8000/api/v1/faq/faqs/faq-123/vote" \
  -H "user-id: test-user-123" \
  -H "Content-Type: application/json" \
  -d '{"helpful": true}'

# Get trending
curl -X GET "http://localhost:8000/api/v1/faq/analytics/trending"

# Health check
curl -X GET "http://localhost:8000/api/v1/faq/health"
```

---

## Support

For issues or questions about FAQ API integration, contact the backend team or check the logs:
```
backend/logs/faq_service.log
```

---

**Last Updated:** April 2, 2026
**API Version:** v1
**Status:** Production Ready
