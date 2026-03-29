# Backend Application (FastAPI)

This is the backend orchestration engine. While the frontend handles the vast majority of local AI processing and UI, this backend is responsible for:
1. Managing complex asset operations (heavy PDF processing, etc.).
2. Database storage (Analytics, Statistics).
3. Routing for future large-scale AI generation endpoints.

## 📁 Architecture
- `api/`: The main application logic (Routes, Models, Services).
- `core/`: Database engine configuration.
- `init_db.py`: Database seeding script.
- `main.py`: The FastAPI application entrypoint.\n