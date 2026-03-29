# Aura Frontend Platform

The frontend of the Aura platform is built for ultra-performance, utilizing React, Vite, Framer Motion, and Tailwind CSS. It features a modular, dashboard-centric architecture designed to orchestrate complex documents, AI models, and creative assets.

## 🚀 Technical Stack
- **Framework**: React 18 + Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS, "button-card" dynamic glassmorphic design system
- **Animation**: Framer Motion for liquid transitions
- **Icons**: Lucide React
- **Document Processing**: `pdf-lib` and `pdf.js` for heavy client-side isolation processing

## 📁 Directory Structure
- `src/components`: Reusable UI elements (Sidebars, Topbars)
- `src/features`: Specialized tool functionality (e.g., PDF orchestrator, Video editors)
- `src/pages`: Distinct page layouts and routing logic
- `src/styles`: Global CSS, custom component styling, and dark mode tokens
- `src/constants`: Application state configs, static feature data arrays

## 🛠 Active Development
1. Install dependencies: `npm install`
2. Start development server: `npm run dev` (running on port 5173).

All calls to the backend are dynamically routed via frontend service layers connecting to the FastAPI local endpoint at `:8000`.
