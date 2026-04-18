# ⚙️ Aura Backend (FastAPI Orchestration)

This service serves as the core orchestration engine for the Aura platform. It manages complex document processing, secure file operations, and platform-wide analytics.

---

## 🛠️ Key Responsibilities

1. **Document Intelligence**: Processing complex multi-format document operations (PDF, OCR, etc.).
2. **Persistence Layer**: Storing analytics, usage statistics, and user interactions in SQLite via SQLAlchemy.
3. **Task Queuing**: Handling long-running media transformations and future large-scale AI background tasks.
4. **API Gateway**: Serving as the unified interface for frontend data consumption with automatic Swagger documentation.

---

## 📁 Directory Structure

| Path | Description |
| :--- | :--- |
| **`api/routes/`** | Endpoint definitions (PDF, Assets, Profile, Analytics). |
| **`api/services/`** | Business logic (Analytics processing, File manipulation). |
| **`core/`** | Database engine configuration and security middleware. |
| **`init_db.py`** | Database schema initialization and seeding script. |
| **`main.py`** | FastAPI entrypoint and global middleware setup. |

---

## 🚀 Environment Setup

The backend requires a modern Python environment (3.11+). **Aura uses a centralized virtual environment in the project root** to maintain consistency across the entire platform.

### Running the Server
From the **project root**:
```bash
./venv/bin/python -m uvicorn backend.main:app --reload --port 8000
```

### Manual Installation (Local Context)
If you need to install new packages, use the root environment's pip:
```bash
./venv/bin/pip install -r backend/requirements.txt
```

---

## 🛑 Common Issues
- **`ModuleNotFoundError: No module named 'uvicorn'`**: This happens if you try to run within the `backend/venv` instead of the root `venv`. Ensure you are calling the Python executable located at `{ROOT}/venv/bin/python`.
- **`Address already in use`**: If port 8000 is taken, use the `--port` flag to specify a different one.

---

## 🏗️ Technical Stack
- **Framework**: FastAPI
- **Database**: SQLite (SQLAlchemy 2.0)
- **Validation**: Pydantic v2
- **I/O Operations**: aiofiles, python-multipart