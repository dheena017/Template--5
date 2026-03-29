# Aura Platform - High-Performance AI & Orchestration Hub

Aura Platform is a robust, full-stack application template designed for ultra-low latency, scalable cloud-native architectures. This project features a state-of-the-art PDF management tool suite, generative AI integrations, and a deeply optimized developer console.

## 🚀 Key Features
*   **Aura Command Hub:** Visual Organize, Merge, Split, and Compress PDF tools directly integrated with frontend/backend orchestration.
*   **Privacy-First Design:** Sensitive document processing offloaded to the browser, with heavy-lifting capabilities structured on the backend.
*   **AI Integration:** Framework set up for AI-assisted workflows (Neural synthesis, voice generation).
*   **Premium "Button-Card" Aesthetics:** Deep glassmorphism, dynamic lighting, and a modern 'Studio' application feel.

## 🛠 Project Structure

- `frontend/`: React + Vite application boasting Framer Motion liquid physics and an immersive dark mode theme.
- `backend/`: FastAPI + SQLAlchemy backend serving as the hyper-fast capability engine.
- `SYSTEM_ARCHITECTURE.md`: Deep dive into the cloud infrastructure and intended data flow.
- `aura_platform.db`: The provisioned SQLite backend database driving features and live telemetry.

---
## 📂 Full File & Directory Arrangement

### Root Directory
- `analytics_stats.json`, `audio_names.json`, `audio_tools.json`, `image_tools.json`, `video_tools.json`: JSON data/configuration for analytics and tool definitions.
- `platform_schema.sql`: SQL schema for the platform database.
- `docker-compose.yml`, `Dockerfile`: Docker configuration for deployment.
- `README.md`: Main project documentation (this file).
- `SYSTEM_ARCHITECTURE.md`: High-level system architecture and infrastructure design.

### backend/
- `README.md`: Backend-specific documentation and usage.
- `requirements.txt`: Python dependencies for backend.
- `init_db.py`: Script to initialize and seed the database.
- `main.py`: FastAPI application entry point.
- `core/`: Database configuration and global backend settings.
- `api/`:
   - `models/`: SQLAlchemy ORM models for database tables.
   - `routes/`: FastAPI route definitions (e.g., PDF, assets, profile).
   - `services/`: Business logic and service layers for analytics, PDF, etc.

### frontend/
- `README.md`: Frontend-specific documentation and usage.
- `package.json`: NPM dependencies and scripts.
- `vite.config.js`: Vite build configuration.
- `public/`: Static assets (images, icons, etc.).
- `src/`: Main source code for the React app:
   - `App.jsx`, `main.jsx`: Application entry points.
   - `assets/`: Static assets used in the app.
   - `components/`: Reusable UI components (Navbar, Sidebar, Toolbar, etc.).
   - `constants/`: Static configuration and data arrays.
   - `context/`: React context providers for state management.
   - `features/`: Specialized tool features (e.g., PDF tools).
   - `pages/`: Page-level components and routing.
   - `services/`: API and provider service logic.
   - `styles/`: CSS files for global and component-specific styles.
   - `utils/`: Utility/helper functions.

### docs/
- `README.md`, `SYSTEM_ARCHITECTURE.md`: Documentation files, moved here for better organization.

---
Each folder contains a README or index file where possible, and the code is modularized for scalability and clarity. If you need more detailed explanations for any specific file or folder, see the respective README or ask for details.

## 🏗 System Architecture

```mermaid
graph LR
    CDN[CDN] --> Frontend[Vite Frontend]
    Frontend --> Auth[Auth Gate]
    Auth --> API[FastAPI Orchestrator]
    API --> DB[(SQLite / SQLBase)]
    API --> Background[Background Synthesis]
```

## 💻 Local Development

1. **Clone the repository.**
2. **Frontend Development:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. **Backend Development:**
   Navigate back to the project root:
   ```bash
   pip install -r backend/requirements.txt
   python -m backend.init_db
   python -m uvicorn backend.main:app --reload --port 8000
   ```
   *Your live API Documentation will be hosted at `/docs`!*

## ☁️ Deployment Philosophy
This project currently acts as an extensible monolithic template. In production, the FastAPI core can separate into modular serverless functions while the React application pushes instantly via Cloudflare Pages or AWS Amplify.

---
*Developed as the high-fidelity Aura template*
