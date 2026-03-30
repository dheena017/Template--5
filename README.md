# 🌌 Aura: The All-In-One AI Tools Platform

Welcome to **Aura**, a state-of-the-art, high-performance platform for AI, document processing, and media management. Aura provides a massive suite of professional utilities—ranging from marketing and intelligence tools to complex PDF, image, audio, and video transformations.

The platform is designed with a premium, immersive **glassmorphic UI**, featuring dynamic animations and a highly modular architecture that ensures scalability and ease of extension.

---

## 🏗️ System Architecture

Aura is built as a decoupled full-stack application, ensuring high availability and separation of concerns:

- **Frontend (`/frontend`)**: A vast **React (Vite 6)** application featuring dozens of tool-specific modules. It utilizes **Framer Motion** for a fluid interaction model and includes a deep-integrated **Contextual Help Drawer System**.
- **Backend (`/backend`)**: A high-performance **FastAPI** service orchestration engine. It handles heavy file operations, analytics persistence (SQLite), and serves as the bridge for large-scale AI generation tasks.

---

## ✨ Key Feature Suites

| Suite | Included Capabilities |
| :--- | :--- |
| **📄 PDF Suite** | Merge, Split, Compress, OCR, Rotate, and Optimize PDF documents. |
| **🤖 AI Suite** | Neural Synthesis (Image Gen), Text Analysis, and Intelligence tools. |
| **🎨 Media Suite** | Image transformations, Video processing, and Audio manipulation. |
| **📈 Analytics** | Global heartbeat monitoring and processing metrics dashboard. |
| **🔍 Search Hub** | Universal search for instant navigation across 50+ specialized tools. |

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **Python**: v3.11 or higher

### Launch Options

#### **Option A: One-Step Launch (Recommended)**
Run both frontend and backend simultaneously using the integrated launcher:
```bash
node scripts/start-full.js
```

#### **Option B: Manual Service Launch**
**1. Start Backend (from root):**
```bash
./venv/bin/python -m uvicorn backend.main:app --reload --port 8000
```

**2. Start Frontend (new terminal):**
```bash
cd frontend
npm install
npm run dev
```
- API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Health Check: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

---

## 📅 Platform Roadmap
- [x] **v2.0**: Migrate to FastAPI & Vite 6 (Completed)
- [x] **v2.1**: Standardize UI with Unified Tool Layouts (Completed)
- [ ] **v2.2**: Integrate Advanced Task Queuing (Celery/Reddis)
- [ ] **v2.3**: Multi-user Workspace Management

---

## 🗂️ Project Structure

- `frontend/`: React components, pages, and UI logic.
- `backend/`: API routes, models, and core services.
- `docs/`: Comprehensive system architecture and developer guides.
- `venv/`: Shared Python virtual environment for backend operations.

---

*Aura is designed for professionals who need elite performance and a beautiful interface.*
\n