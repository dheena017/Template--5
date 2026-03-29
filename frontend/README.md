# Frontend (React + Vite)

This is the user-facing web application. It is a massive single-page application orchestrating dozens of unique "tools" across different AI/media categories.

## 📁 Key Directories
- `src/`: The source directory containing all logic.
  - `pages/`: 🚨 Start here! This contains all the actual views for categories like Avatar, Video, PDF, Speech, etc.
  - `components/`: Pure, reusable UI components.
  - `features/`: Specific, isolated tool logic.
  - `services/`: API connectors to the FastAPI backend.
  - `styles/`: Global CSS and design tokens.
  - `utils/`: Helper functions.\n