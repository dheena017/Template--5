# FAQ System Testing Guide

Quick reference for testing all FAQ API endpoints

## Setup for Testing

### 1. Start Backend Server
```bash
cd backend
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### 2. Verify Database
Run setup script first if database not initialized:

**Windows:**
```powershell
.\api\routes\setup-faq.ps1
```

**Linux/Mac:**
```bash
bash api/routes/setup-faq.sh
```

### 3. Test Tools
Use any of these to test the API:
- **curl** (command line)
- **Postman** (GUI)
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

---

## Health Check

**Test API is running:**

```bash
curl http://localhost:8000/api/v1/faq/health
```

**Expected Response (200 OK):**
```json
{
  "status": "healthy",
  "message": "FAQ service is running",
  "timestamp": "2024-01-15T10:30:00"
}
```

---

## FAQ Management Tests

### 1. Get All FAQs

**Basic request:**
```bash
curl http://localhost:8000/api/v1/faq/faqs
```

**With filters:**
```bash
curl "http://localhost:8000/api/v1/faq/faqs?category=Getting%20Started&limit=5"
```

**With search:**
```bash
curl "http://localhost:8000/api/v1/faq/faqs?search=video"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid-here",
      "question": "How do I create my first video?",
      "answer": "Creating your first video is simple...",
      "category_id": "uuid-here",
      "category_name": "Getting Started",
      "difficulty": "easy",
      "tags": ["Video", "Tutorial"],
      "views": 2341,
      "popular": true,
      "created_at": "2024-01-15T10:00:00"
    }
  ],
  "total": 12,
  "message": "FAQs retrieved successfully"
}
```

### 2. Get Single FAQ

```bash
curl http://localhost:8000/api/v1/faq/faqs/{faq_id}
```

Replace `{faq_id}` with actual FAQ ID from previous response.

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid-here",
    "question": "How do I create my first video?",
    "answer": "Creating your first video is simple...",
    "category_id": "uuid-here",
    "category_name": "Getting Started",
    "difficulty": "easy",
    "tags": ["Video", "Tutorial"],
    "views": 2342,
    "popular": true,
    "created_at": "2024-01-15T10:00:00",
    "updated_at": "2024-01-15T10:30:00"
  },
  "message": "FAQ retrieved successfully"
}
```

### 3. Create FAQ (Admin)

```bash
curl -X POST http://localhost:8000/api/v1/faq/faqs \
  -H "Content-Type: application/json" \
  -H "x-admin-token: your_secure_admin_token_here" \
  -d '{
    "question": "How do I export my video?",
    "answer": "You can export your video by clicking the export button...",
    "category_id": "category-uuid-here",
    "difficulty": "easy",
    "tags": ["Export", "Video"]
  }'
```

**Expected Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "id": "new-uuid",
    "question": "How do I export my video?",
    ...
  },
  "message": "FAQ created successfully"
}
```

### 4. Update FAQ (Admin)

```bash
curl -X PUT http://localhost:8000/api/v1/faq/faqs/{faq_id} \
  -H "Content-Type: application/json" \
  -H "x-admin-token: your_secure_admin_token_here" \
  -d '{
    "question": "Updated question?",
    "answer": "Updated answer..."
  }'
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": { ... updated FAQ ... },
  "message": "FAQ updated successfully"
}
```

### 5. Delete FAQ (Admin)

```bash
curl -X DELETE http://localhost:8000/api/v1/faq/faqs/{faq_id} \
  -H "x-admin-token: your_secure_admin_token_here"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "message": "FAQ deleted successfully"
}
```

---

## Category Tests

### Get All Categories

```bash
curl http://localhost:8000/api/v1/faq/categories
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Getting Started",
      "icon": "Zap",
      "description": "Set up your account...",
      "order": 1,
      "faq_count": 2
    }
  ],
  "message": "Categories retrieved successfully"
}
```

### Get Category with FAQs

```bash
curl http://localhost:8000/api/v1/faq/categories/{category_id}
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "name": "Getting Started",
    "description": "...",
    "faqs": [ ... list of FAQs in this category ... ]
  },
  "message": "Category retrieved successfully"
}
```

---

## Helpful Vote Tests

### Add/Update Vote

```bash
curl -X POST http://localhost:8000/api/v1/faq/faqs/{faq_id}/vote \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "helpful": true,
    "feedback": "Very clear and helpful!"
  }'
```

**Expected Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "faq_id": "uuid",
    "user_id": "user-123",
    "helpful": true,
    "feedback": "Very clear and helpful!",
    "created_at": "2024-01-15T10:30:00"
  },
  "message": "Vote recorded successfully"
}
```

### Get Vote Statistics

```bash
curl http://localhost:8000/api/v1/faq/faqs/{faq_id}/vote-stats
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "faq_id": "uuid",
    "total_votes": 150,
    "helpful_votes": 135,
    "unhelpful_votes": 15,
    "helpful_percentage": 90.0,
    "average_feedback_length": 45
  },
  "message": "Vote statistics retrieved successfully"
}
```

---

## Comment Tests

### Add Comment

```bash
curl -X POST http://localhost:8000/api/v1/faq/faqs/{faq_id}/comments \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "text": "I found this very helpful!",
    "author_name": "John Doe"
  }'
```

**Expected Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "id": "comment-uuid",
    "faq_id": "uuid",
    "user_id": "user-123",
    "text": "I found this very helpful!",
    "author_name": "John Doe",
    "votes": 0,
    "flagged_as_spam": false,
    "created_at": "2024-01-15T10:30:00"
  },
  "message": "Comment added successfully"
}
```

### Get Comments

```bash
curl "http://localhost:8000/api/v1/faq/faqs/{faq_id}/comments?limit=10"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": [ ... array of comments ... ],
  "total": 5,
  "message": "Comments retrieved successfully"
}
```

### Upvote Comment

```bash
curl -X POST http://localhost:8000/api/v1/faq/comments/{comment_id}/upvote \
  -H "user-id: user-123"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "comment_id": "uuid",
    "votes": 5,
    "user_upvoted": true
  },
  "message": "Comment upvoted successfully"
}
```

### Flag Comment as Spam

```bash
curl -X POST http://localhost:8000/api/v1/faq/comments/{comment_id}/spam \
  -H "user-id: user-123"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "comment_id": "uuid",
    "flagged_as_spam": true
  },
  "message": "Comment flagged as spam"
}
```

---

## User Preferences Tests

### Get User Preferences

```bash
curl http://localhost:8000/api/v1/faq/user/preferences \
  -H "user-id: user-123"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user_id": "user-123",
    "language": "en",
    "favorites": [],
    "subscribed_categories": [],
    "search_history": [],
    "email_notifications": true,
    "created_at": "2024-01-15T10:00:00"
  },
  "message": "User preferences retrieved successfully"
}
```

### Add to Favorites

```bash
curl -X POST http://localhost:8000/api/v1/faq/user/favorites/{faq_id} \
  -H "user-id: user-123"
```

**Expected Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "faq_id": "uuid",
    "added_to_favorites": true,
    "total_favorites": 3
  },
  "message": "Added to favorites successfully"
}
```

### Remove from Favorites

```bash
curl -X DELETE http://localhost:8000/api/v1/faq/user/favorites/{faq_id} \
  -H "user-id: user-123"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "message": "Removed from favorites successfully"
}
```

### Subscribe to Category

```bash
curl -X POST http://localhost:8000/api/v1/faq/user/subscribe/{category_id} \
  -H "user-id: user-123"
```

**Expected Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "category_id": "uuid",
    "subscribed": true
  },
  "message": "Subscribed to category successfully"
}
```

### Unsubscribe from Category

```bash
curl -X DELETE http://localhost:8000/api/v1/faq/user/subscribe/{category_id} \
  -H "user-id: user-123"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "message": "Unsubscribed from category successfully"
}
```

---

## Search Analytics Tests

### Log Search

```bash
curl -X POST http://localhost:8000/api/v1/faq/search \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "query": "video export",
    "category_filter": "Getting Started",
    "results_found": 3,
    "clicked_result_id": "uuid"
  }'
```

**Expected Response (201 Created):**
```json
{
  "status": "success",
  "message": "Search logged successfully"
}
```

### Get Trending Searches

```bash
curl "http://localhost:8000/api/v1/faq/analytics/trending?days=7"
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "query": "video export",
      "search_count": 45,
      "result_clicks": 32,
      "click_through_rate": 71.1
    }
  ],
  "message": "Trending searches retrieved successfully"
}
```

### Get Search Statistics

```bash
curl http://localhost:8000/api/v1/faq/analytics/stats
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "total_searches": 1250,
    "unique_users": 345,
    "average_searches_per_user": 3.6,
    "searches_with_results": 1150,
    "searches_without_results": 100,
    "success_rate": 92.0
  },
  "message": "Search analytics retrieved successfully"
}
```

---

## Export Tests

### Create PDF Export

```bash
curl -X POST http://localhost:8000/api/v1/faq/exports/{faq_id} \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "export_type": "pdf"
  }'
```

**Expected Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "export_id": "export-uuid",
    "faq_id": "uuid",
    "export_type": "pdf",
    "status": "pending",
    "file_path": "/exports/faq-uuid.pdf",
    "created_at": "2024-01-15T10:30:00"
  },
  "message": "Export created successfully"
}
```

### Get Export Statistics

```bash
curl http://localhost:8000/api/v1/faq/analytics/exports
```

**Expected Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "total_exports": 234,
    "exports_by_type": {
      "pdf": 180,
      "print": 40,
      "share": 14
    },
    "exports_last_30_days": 45,
    "most_exported_faq": "uuid",
    "export_growth_percentage": 12.5
  },
  "message": "Export statistics retrieved successfully"
}
```

---

## Testing Checklist

### Basic Functionality
- [ ] Health check passes (200 OK)
- [ ] Get all FAQs returns data (200 OK)
- [ ] Get single FAQ increments views (200 OK)
- [ ] Get categories returns all 6 categories (200 OK)

### CRUD Operations
- [ ] Create FAQ with admin token (201 Created)
- [ ] Update FAQ with admin token (200 OK)
- [ ] Delete FAQ with admin token (200 OK)
- [ ] Reject FAQ creation without token (401 Unauthorized)

### Voting & Comments
- [ ] Add vote for FAQ (201 Created)
- [ ] Get vote stats shows correct percentages (200 OK)
- [ ] Add comment to FAQ (201 Created)
- [ ] Get comments returns all comments (200 OK)
- [ ] Upvote comment increases count (200 OK)
- [ ] Flag comment as spam (200 OK)

### User Preferences
- [ ] Get user preferences (auto-create if not exists) (200 OK)
- [ ] Add FAQ to favorites (201 Created)
- [ ] Remove from favorites (200 OK)
- [ ] Subscribe to category (201 Created)
- [ ] Unsubscribe from category (200 OK)

### Analytics
- [ ] Log search query (201 Created)
- [ ] Get trending searches (200 OK)
- [ ] Get search statistics (200 OK)
- [ ] Get export statistics (200 OK)

### Error Handling
- [ ] Invalid FAQ ID returns 404 Not Found
- [ ] Missing required fields returns 422 Unprocessable Entity
- [ ] Admin operations without token return 401 Unauthorized
- [ ] Invalid JSON returns 400 Bad Request

---

## Performance Testing

### Load Test (Optional)
```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:8000/api/v1/faq/health

# Using wrk
wrk -t4 -c100 -d30s http://localhost:8000/api/v1/faq/faqs
```

### Expected Results
- Health check: < 50ms per request
- GET FAQs: < 200ms per request
- Search: < 500ms per request

---

## Troubleshooting

### 404 Not Found
- Ensure FAQ routes are registered in main.py with `app.include_router`
- Check URL format matches endpoint path

### 500 Internal Server Error
- Check database connection
- Review server logs for detailed error
- Ensure DATABASE_URL environment variable is set

### 401 Unauthorized
- Add required headers: `user-id` for user operations
- Add `x-admin-token` for admin operations

### 422 Unprocessable Entity
- Verify request body matches expected schema
- Check all required fields are present
- Ensure JSON is valid

---

## Quick Test Script

Save as `test-faq.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8000/api/v1/faq"
USER_ID="test-user-123"
ADMIN_TOKEN="your_secure_admin_token_here"

echo "🧪 Testing FAQ API..."

# Test 1: Health check
echo -e "\n✓ Testing health check..."
curl -s $BASE_URL/health | jq .

# Test 2: Get FAQs
echo -e "\n✓ Testing get all FAQs..."
curl -s $BASE_URL/faqs | jq '.data | length'

# Test 3: Get categories
echo -e "\n✓ Testing get categories..."
curl -s $BASE_URL/categories | jq '.data | length'

# Test 4: Search
echo -e "\n✓ Testing search..."
curl -s "$BASE_URL/faqs?search=video" | jq '.total'

echo -e "\n✅ Tests completed!"
```

Run with: `bash test-faq.sh`

---

## Next Steps

1. Start backend server
2. Run setup script to initialize database
3. Execute tests from this guide
4. Verify all endpoints return expected responses
5. Test frontend integration with API
6. Deploy to production

Happy testing! 🚀
