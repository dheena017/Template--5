# Aura Engine (Backend)

The backend component of the Aura architecture is an ultra-fast, asynchronous orchestration microservice built primarily to drive data synthesis, user telemetry, and document capabilities for the frontend.

## 🚀 Core Technologies
- **Engine**: FastAPI
- **Database**: SQLite built on pure SQLAlchemy ORMs
- **Environment Management**: Uvicorn server

## 📁 Architecture Overview
- `backend/core`: Database configurations, Base engines, and global settings.
- `backend/api/models`: SQLAlchemy Database models (Platform, PlatformStat, Assets, Feature Flags).
- `backend/api/routes`: Distinct operational endpoints (e.g., pdf manipulation, assets retrieval).
- `backend/api/services`: Specialized business logic decoupling routers from processing code.
- `init_db.py`: The database provisioning script to inject seed features and mock statistics.

## ⚙️ How to Run
Ensure you operate from the project root rather than inside the `backend` folder to keep module pathways intact.

1. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

2. Provision the database (one-time setup):
```bash
python -m backend.init_db
```

3. Launch the engine:
```bash
python -m uvicorn backend.main:app --reload --port 8000
```

The Swagger API documentation will be available locally at `http://localhost:8000/docs`.