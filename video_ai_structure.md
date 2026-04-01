# Video AI Files and Folders: Project Organization

This document provides a structured list of all files and folders related to **Video AI** in the project, categorized by their functionality.

## 1. Metadata and Configuration
These files define the toolsets, categories, and available configurations for Video AI.

- [video_tools.json](file:///f:/Project/Template--5/video_tools.json) — Defines all base video conversion tools and their descriptions.
- [frontend/src/constants/sidebarData.js](file:///f:/Project/Template--5/frontend/src/constants/sidebarData.js) — Contains navigation links and structure for video-related tools.
- [frontend/src/constants/dashboardConfig.js](file:///f:/Project/Template--5/frontend/src/constants/dashboardConfig.js) — Configuration for how video tools are displayed on the dashboards.

---

## 2. Advanced Video AI Studio
These files handle complex AI video generation and manipulation, such as dubbing, highlights, and B-roll generation.

### Pages (f:/Project/Template--5/frontend/src/pages/studio/)
- [VideoDubbing.jsx](file:///f:/Project/Template--5/frontend/src/pages/studio/VideoDubbing.jsx) — AI-driven video dubbing and translation.
- [VideoPodcast.jsx](file:///f:/Project/Template--5/frontend/src/pages/studio/VideoPodcast.jsx) — Tools for generating video podcasts with AI.
- [GenerateBRoll.jsx](file:///f:/Project/Template--5/frontend/src/pages/studio/GenerateBRoll.jsx) — Automatically generate B-roll footage for videos.
- [FaceSwapAI.jsx](file:///f:/Project/Template--5/frontend/src/pages/studio/FaceSwapAI.jsx) & [FaceSwap.jsx](file:///f:/Project/Template--5/frontend/src/pages/studio/FaceSwap.jsx) — AI face swapping in video content.
- [InstantHighlights.jsx](file:///f:/Project/Template--5/frontend/src/pages/studio/InstantHighlights.jsx) — Automatic video highlight extraction.
- [UGCCreator.jsx](file:///f:/Project/Template--5/frontend/src/pages/studio/UGCCreator.jsx) — Tools for user-generated content creation.
- [BatchMode.jsx](file:///f:/Project/Template--5/frontend/src/pages/studio/BatchMode.jsx) — Processing multiple videos in batch.

---

## 3. Avatar and AI Personalization
These files focus on human-like AI avatars that can speak and appear in videos.

### Pages (f:/Project/Template--5/frontend/src/pages/avatar/)
- [AvatarCreator.jsx](file:///f:/Project/Template--5/frontend/src/pages/avatar/AvatarCreator.jsx) — Creating and personalizing digital avatars.
- [VideoAgent.jsx](file:///f:/Project/Template--5/frontend/src/pages/avatar/VideoAgent.jsx) — Interactive video agents for customer support or sales.
- [PPTToVideo.jsx](file:///f:/Project/Template--5/frontend/src/pages/avatar/PPTToVideo.jsx) — Converting PowerPoint presentations into video with avatars.
- [Translate.jsx](file:///f:/Project/Template--5/frontend/src/pages/avatar/Translate.jsx) — Video translation and lip-syncing.
- [BrandSystem.jsx](file:///f:/Project/Template--5/frontend/src/pages/avatar/BrandSystem.jsx) — Consistent branding for avatar videos.

---

## 4. Frontend Styles (CSS)
Specific styling for Video AI components.

- [frontend/src/styles/pages/studio/VideoDubbing.css](file:///f:/Project/Template--5/frontend/src/styles/pages/studio/VideoDubbing.css)
- [frontend/src/styles/pages/studio/VideoPodcast.css](file:///f:/Project/Template--5/frontend/src/styles/pages/studio/VideoPodcast.css)
- [frontend/src/styles/pages/studio/GenerateBRoll.css](file:///f:/Project/Template--5/frontend/src/styles/pages/studio/GenerateBRoll.css)
- [frontend/src/styles/pages/avatar/VideoAgent.css](file:///f:/Project/Template--5/frontend/src/styles/pages/avatar/VideoAgent.css)
- [frontend/src/styles/pages/avatar/PPTToVideo.css](file:///f:/Project/Template--5/frontend/src/styles/pages/avatar/PPTToVideo.css)

---

## 5. Backend Logic
Backend endpoints and services that handle video-related analytics and data models.

- [backend/api/models/database_models.py](file:///f:/Project/Template--5/backend/api/models/database_models.py) — Defines schema for video processing tasks.
- [backend/api/services/analytics_service.py](file:///f:/Project/Template--5/backend/api/services/analytics_service.py) — Handles usage statistics for video tools.
- [backend/init_db.py](file:///f:/Project/Template--5/backend/init_db.py) — Seeds the database with video-related tool configurations.
