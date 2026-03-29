# All-In-One AI Tools Platform (Aura)

Welcome to the all-in-one platform for AI tools, documents, and media processing. This platform provides a massive suite of utilities—from AI intelligence and marketing tools down to PDF, image, audio, and video transformations. 

The goal of this codebase is to provide a single, unified, high-performance web interface ("Aura") powered by a scalable backend system.

## 🗂️ High-Level Architecture

The project is split into two main sections:
- **`frontend/`**: A vast React (Vite) application containing pages for dozens of tools (text, speech, image, avatar, video, PDF, etc.). It uses an immersive "button-card" styling with Framer Motion.
- **`backend/`**: A FastAPI service connected to an SQLite database. It serves as the orchestrator for heavy file processing operations and platform analytics.

Please browse the nested `README.md` files in each directory for deeper, folder-specific context, which helps significantly reduce confusion when navigating this massive codebase!

## 🚀 Quick Start
**Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Start Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```\n