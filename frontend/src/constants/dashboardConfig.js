import React from 'react';
import { 
  Film, Palette, Bot, Mic, FileText, 
  Clapperboard, HardDrive, Terminal, 
  Share2, Info, Layout, Languages,
  Zap, Settings, Activity, Shield,
  Globe, Code2, Key, Webhook,
  History, Music, Video, Star, Users, CheckCircle2,
  Box, Eye, Layers, Combine, Split,
  Play, Clock, Download, User
} from 'lucide-react';

export const DASHBOARD_CONFIG = {
  video: {
    title: 'Video Workspace',
    subtitle: 'Production-grade AI video tools for professionals.',
    color: '#ef4444',
    rgb: '239, 68, 68',
    actionText: 'New Production',
    actionPath: '/ai-studio',
    icon: React.createElement(Film, { size: 24 }),
    groupLabel: 'Video Engines',
    badge: 'Standard',
    version: 'v4.2',
    recentHeader: 'Recent Productions',
    recentCols: ['Name', 'Specs', 'Status', 'Actions'],
    stats: [
      { label: 'Total Clips', value: '142', sub: '+12%', subColor: '#10b981', subIcon: React.createElement(Activity, { size: 12 }) },
      { label: 'Avg FPS', value: '60', sub: 'Optimized', subColor: '#0ea5e9', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { name: 'AI Studio', desc: 'Powerful studio for automated content creation.', path: '/ai-studio', icon: React.createElement(Clapperboard, { size: 20 }) },
      { name: 'Video Agent', desc: 'Build autonomous agents to execute complex tasks.', path: '/video-agent', icon: React.createElement(Bot, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Brand Product Reel', specs: '1080p • 24fps', status: 'Completed' },
      { id: 2, name: 'AI Explainer v1', specs: '4K • 60fps', status: 'Rendering' }
    ]
  },
  image: {
    title: 'Image Studio',
    subtitle: 'Synthesize art, textures, and assets with precision.',
    color: '#db2777',
    rgb: '219, 39, 119',
    actionText: 'Generate New',
    actionPath: '/image-generator',
    icon: React.createElement(Palette, { size: 24 }),
    groupLabel: 'Synthesis Labs',
    badge: 'Pro Tier',
    version: 'v2.0',
    recentHeader: 'Creative Assets',
    recentCols: ['Asset Name', 'Dimensions', 'Status', 'Actions'],
    stats: [
      { label: 'Generations', value: '2.5K', sub: '+5%', subColor: '#10b981', subIcon: React.createElement(Activity, { size: 12 }) },
      { label: 'Quality Ratio', value: '98%', sub: 'High Fidelity', subColor: '#0ea5e9', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { name: 'Image Creator', desc: 'Next-gen text-to-image engine with styles.', path: '/image-generator', icon: React.createElement(Palette, { size: 20 }) },
      { name: 'Face Swap', desc: 'Seamlessly blend facial features into new environments.', path: '/face-swap', icon: React.createElement(Layers, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Cyberpunk Portrait', specs: '1024x1024', status: 'Ready' },
      { id: 2, name: 'Abstract Series', specs: '2048x2048', status: 'Drafting' }
    ]
  },
  avatar: {
    title: 'Avatar & Identity',
    subtitle: 'Manage your digital presence and virtual character sets.',
    color: '#3b82f6',
    rgb: '59, 130, 246',
    actionText: 'New Avatar',
    actionPath: '/avatar-creator',
    icon: React.createElement(Bot, { size: 24 }),
    groupLabel: 'Persona Hub',
    badge: 'Enterprise',
    version: 'v1.5',
    recentHeader: 'Identity Projects',
    recentCols: ['Name', 'Complexity', 'Status', 'Actions'],
    stats: [
      { label: 'Active Personas', value: '12', sub: 'In Sync', subColor: '#10b981', subIcon: React.createElement(Shield, { size: 12 }) },
      { label: 'Voices Trained', value: '5', sub: 'High Accuracy', subColor: '#f59e0b', subIcon: React.createElement(Zap, { size: 12 }) }
    ],
    tools: [
      { id: 'ai-studio', name: 'AI Studio', desc: 'Build realistic virtual agents from text.', path: '/ai-studio', icon: React.createElement(Bot, { size: 20 }) },
      { id: 'avatar-creator', name: 'Avatar Creator', desc: 'Custom lip-sync and body character generation.', path: '/avatar-creator', icon: React.createElement(User, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Virtual Guide - Sarah', specs: 'Medium Poly', status: 'Active' },
      { id: 2, name: 'Support Bot - Alex', specs: 'High Details', status: 'In Review' }
    ]
  },
  speech: {
    title: 'Speech & Audio',
    subtitle: 'Vocal cloning and advanced audio synthesis console.',
    color: '#f59e0b',
    rgb: '245, 158, 11',
    actionText: 'Generate Voice',
    actionPath: '/text-to-speech',
    icon: React.createElement(Mic, { size: 24 }),
    groupLabel: 'Audio Engines',
    badge: 'Standard',
    version: 'v2.1',
    recentHeader: 'Processed Audio',
    recentCols: ['Vocal Track', 'BPM / Details', 'Status', 'Actions'],
    stats: [
      { label: 'Total Mins', value: '850', sub: '+5%', subColor: '#10b981', subIcon: React.createElement(Activity, { size: 12 }) },
      { label: 'Clones Active', value: '8', sub: 'Private', subColor: '#2563eb', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { id: 'text-to-speech', name: 'TTS Engine', desc: 'Industry leading text-to-speech with emotion.', path: '/text-to-speech', icon: React.createElement(Mic, { size: 20 }) },
      { id: 'voice-changer', name: 'Voice Lab', desc: 'Real-time or file-based vocal modification.', path: '/voice-changer', icon: React.createElement(Zap, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Podcast Episode #12', specs: '128kbps / Mono', status: 'Completed' },
      { id: 2, name: 'Branded IVR Voice', specs: '44.1kHz / Stereo', status: 'Processing' }
    ]
  },
  text: {
    title: 'Text Intelligence',
    subtitle: 'Manage linguistic workflows and smart document rules.',
    color: '#10b981',
    rgb: '16, 185, 129',
    actionText: 'Analyze Text',
    actionPath: '/speech-to-text',
    icon: React.createElement(FileText, { size: 24 }),
    groupLabel: 'Text Utilities',
    badge: 'Smart v3',
    version: 'v3.0',
    recentHeader: 'Analysis Logs',
    recentCols: ['Doc Name', 'Word Count', 'Status', 'Actions'],
    stats: [
      { label: 'Words Processed', value: '1.2M', sub: 'Growing', subColor: '#10b981', subIcon: React.createElement(Activity, { size: 12 }) },
      { label: 'Accuracy', value: '99.2%', sub: 'High NLP', subColor: '#f59e0b', subIcon: React.createElement(Star, { size: 12 }) }
    ],
    tools: [
      { id: 'speech-to-text', name: 'Transcriber', desc: 'Convert audio to clean, formatted text logs.', path: '/speech-to-text', icon: React.createElement(FileText, { size: 20 }) },
      { id: 'rules', name: 'Linguistic Rules', desc: 'Define custom AI behaviors for text.', path: '/rules', icon: React.createElement(Shield, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Legal Memo #4', specs: '4,500 words', status: 'Completed' },
      { id: 2, name: 'Blog Draft v1', specs: '1,200 words', status: 'Active' }
    ]
  },
  social: {
    title: 'Social Hub',
    subtitle: 'Syndicate your content and manage social workflows.',
    color: '#0ea5e9',
    rgb: '14, 165, 233',
    actionText: 'Compose Post',
    actionPath: '/social-media-home',
    icon: React.createElement(Share2, { size: 24 }),
    groupLabel: 'Marketing Channels',
    badge: 'Connect',
    version: 'v1.0',
    recentHeader: 'Campaign Feed',
    recentCols: ['Post / Campaign', 'Reach', 'Status', 'Actions'],
    stats: [
      { label: 'Total Reach', value: '45K', sub: '+18%', subColor: '#10b981', subIcon: React.createElement(Activity, { size: 12 }) },
      { label: 'Platforms', value: '4', sub: 'Healthy', subColor: '#f59e0b', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { id: 'social-media-home', name: 'Social Feed', desc: 'Unified inbox for all social activity.', path: '/social-media-home', icon: React.createElement(Share2, { size: 20 }) },
      { id: 'blog', name: 'Blog Builder', desc: 'Generate SEO-optimized blog articles.', path: '/blog', icon: React.createElement(Globe, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Twitter Product Launch', specs: '5-Tweet Thread', status: 'Published' },
      { id: 2, name: 'Instagram Weekly Wrap', specs: 'Carousel / Video', status: 'Scheduled' }
    ]
  },
  dev: {
    title: 'Developer Center',
    subtitle: 'Scale your platform with API keys and system monitoring.',
    color: '#475569',
    rgb: '71, 85, 105',
    actionText: 'New API Key',
    actionPath: '/api-keys',
    icon: React.createElement(Terminal, { size: 24 }),
    groupLabel: 'Platform Infra',
    badge: 'Stable',
    version: 'v5.0',
    recentHeader: 'Request Logs',
    recentCols: ['Endpoint', 'Latency', 'Status', 'Actions'],
    stats: [
      { label: 'Req / Day', value: '14.2K', sub: 'Stable', subColor: '#10b981', subIcon: React.createElement(Shield, { size: 12 }) },
      { label: 'Uptime', value: '99.98%', sub: 'Global', subColor: '#0ea5e9', subIcon: React.createElement(Globe, { size: 12 }) }
    ],
    tools: [
      { id: 'developer-api-hub', name: 'API Console', desc: 'Test endpoints and view documentation.', path: '/developer-api-hub', icon: React.createElement(Code2, { size: 20 }) },
      { id: 'api-keys', name: 'Auth Keys', desc: 'Manage security credentials for your app.', path: '/api-keys', icon: React.createElement(Key, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'GET /api/v1/user', specs: '45ms', status: 'Completed' },
      { id: 2, name: 'POST /api/v1/generate', specs: '1.4s', status: 'Completed' }
    ]
  },
  pdf: {
    title: 'PDF Command Center',
    subtitle: 'High-performance document processing and encryption hub.',
    color: '#ec4899',
    rgb: '236, 72, 153',
    actionText: 'Process New PDF',
    actionPath: '/pdf-select',
    icon: React.createElement(Shield, { size: 24 }),
    groupLabel: 'Document Engines',
    badge: 'Enterprise',
    version: 'v3.5',
    recentHeader: 'Processed Documents',
    recentCols: ['File Name', 'Pages / Size', 'Status', 'Actions'],
    stats: [
      { label: 'Pages Handled', value: '45.2K', sub: '+15%', subColor: '#10b981', subIcon: React.createElement(Activity, { size: 12 }) },
      { label: 'Space Saved', value: '2.4 GB', sub: 'Optimized', subColor: '#0ea5e9', subIcon: React.createElement(Zap, { size: 12 }) }
    ],
    tools: [
      { id: 'organize-pdf', name: 'Organize PDF', desc: 'Reorder, merge, or split documents with ease.', path: '/organize-pdf', icon: React.createElement(Layout, { size: 20 }) },
      { id: 'optimize-pdf', name: 'Optimize & Compress', desc: 'Reduce file size while preserving high fidelity.', path: '/optimize-pdf', icon: React.createElement(Zap, { size: 20 }) },
      { id: 'convert-to-pdf', name: 'Universal Convert', desc: 'Transform any file format into a secure PDF.', path: '/convert-to-pdf', icon: React.createElement(FileText, { size: 20 }) },
      { id: 'pdf-intelligence', name: 'PDF Intelligence', desc: 'Extract data and insights using neural OCR.', path: '/pdf-intelligence', icon: React.createElement(Shield, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Q1 Financial Report.pdf', specs: '124 Pages • 14MB', status: 'Encrypted' },
      { id: 2, name: 'Contract_v4_draft.docx', specs: '12 Pages • 2MB', status: 'Converted' },
      { id: 3, name: 'Legal_Discovery_Set.zip', specs: '2,500 Pages • 450MB', status: 'OCR Complete' }
    ]
  },
  team: {
    title: 'Organization Workspace',
    subtitle: 'Manage members, permissions, and collaborative workflows.',
    color: '#8b5cf6',
    rgb: '139, 92, 246',
    actionText: 'Invite Member',
    actionPath: '/team',
    icon: React.createElement(Users, { size: 24 }),
    groupLabel: 'Org Management',
    badge: 'Enterprise',
    version: 'v2.8',
    recentHeader: 'Team Activity',
    recentCols: ['Member', 'Activity', 'Time', 'Access'],
    stats: [
      { label: 'Active Seats', value: '4 / 10', sub: 'In Use', subColor: '#10b981', subIcon: React.createElement(CheckCircle2, { size: 12 }) },
      { label: 'Global Uptime', value: '99.9%', sub: 'Healthy', subColor: '#0ea5e9', subIcon: React.createElement(Globe, { size: 12 }) }
    ],
    tools: [
      { id: 'team', name: 'Member Roster', desc: 'Manage your organization member list.', path: '/team', icon: React.createElement(Users, { size: 20 }) },
      { id: 'permissions', name: 'Permissions', desc: 'Configure global access roles and security.', path: '/settings/developers', icon: React.createElement(Shield, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Dheena v.', specs: 'Updated Root Access', status: 'Admin' },
      { id: 2, name: 'Alex Rover', specs: 'Joined Workspace', status: 'Editor' }
    ]
  }
};
