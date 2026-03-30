# 🎨 Aura Frontend (React + Vite)

The frontend is a massive, immersive single-page application (SPA) orchestrating dozens of unique AI and media utility "tools". Built with a modern **glassmorphic design language**, it offers a premium, high-performance experience.

---

## 🏗️ Core Architecture

- **Framing**: Uses **Framer Motion** for all transitions, ensuring a fluid, "alive" interface.
- **Modularity**: Every tool is a standalone page or feature, registered via a unified routing system.
- **Navigation**: Premium sidebars and dashboards categorized by capability (AI, Audio, Video, PDF, etc.).
- **Visuals**: Modern Glassmorphism using Backdrop-Filters and custom HSL color tokens.

---

## 📁 Key Directories

| Directory | Description |
| :--- | :--- |
| **`src/pages/`** | Contain all high-level tool views (PDF, Speech, Image, etc.). |
| **`src/layouts/`** | **ToolLayout**: Unified structure used for all standardized tools. |
| **`src/components/common/`** | Global UI collection (VisualAssetTray, CommandHub, etc.). |
| **`src/components/help/`** | **Contextual Help System**. Slide-in guidance for every tool. |
| **`src/features/`** | Complex tool-specific logic (WebWorkers, heavy processing). |
| **`src/styles/`** | **Design System**. Core CSS tokens, Layouts, and animations. |

---

## 🛠️ Tool Standardization (v2.1)

To ensure a premium and consistent experience across the platform, all tools follow the unified layout architecture:

1. **ToolLayout**: Central component providing the glassmorphism frame, sidebar integration, and responsiveness.
2. **SettingsHub**: All tool-specific configuration is centralized in a slide-out settings panel managed by `SettingsContext`.
3. **WorkspaceArea**: The primary interactive zone for file drops and tool execution.

---

## 📘 Integrated Help System

To maintain UX consistency, Aura utilizes a global Help Drawer:
1. Create a content component in `src/components/help/content/YourToolHelp.jsx`.
2. Register the help topic in `src/components/help/ToolHelpDrawer.jsx`.
3. Dispatch the help toggle in your page component to open the specific drawer state.

---

## 🚀 Development Workflow

```bash
cd frontend
npm install
npm run dev
```
The application uses **Vite 6** for near-instant HMR (Hot Module Replacement) during development.
\n