import React from 'react';
import { 
  Film, Palette, Bot, Mic, FileText, 
  Clapperboard, HardDrive, Terminal, 
  Share2, Info, Layout, Languages,
  Zap, Settings, Activity, Shield,
  Globe, Code2, Key, Webhook,
  History, Music, Video, Star, Users, CheckCircle2,
  Box, Eye, Layers, Combine, Split,
  Play, Clock, Download, User, Trash2, RotateCw, 
  Hash, Lock, Unlock, PenTool, EyeOff, Scissors
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
      { name: 'Video Hub', desc: 'Central command for all AI video production.', path: '/video-dashboard', icon: React.createElement(Film, { size: 20 }) },
      { name: 'Text-to-Video', desc: 'Text-to-Video and Image-to-Video generation.', path: '/Text-to-Video', icon: React.createElement(Video, { size: 20 }) },
      { name: 'AI Studio', desc: 'Powerful studio for automated content creation.', path: '/ai-studio', icon: React.createElement(Clapperboard, { size: 20 }) },
      { name: 'Video Agent', desc: 'Build autonomous agents to execute complex tasks.', path: '/video-agent', icon: React.createElement(Bot, { size: 20 }) },
      { name: 'PPT to Video', desc: 'Convert presentations into narrated avatar videos.', path: '/ppt-to-video', icon: React.createElement(FileText, { size: 20 }) }
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
    actionPath: '/pdf-dashboard',
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
  },
  studio: {
    title: 'Creative Studio',
    subtitle: 'Full-suite production orchestration and batch processing.',
    color: '#a855f7',
    rgb: '168, 85, 247',
    actionText: 'New Project',
    actionPath: '/highlights',
    icon: React.createElement(Clapperboard, { size: 24 }),
    groupLabel: 'Studio Engines',
    badge: 'Production',
    version: 'v1.2',
    recentHeader: 'Studio Projects',
    recentCols: ['Project', 'Specs', 'Status', 'Actions'],
    stats: [
      { label: 'Render Time', value: '1.2h', sub: 'Optimized', subColor: '#10b981', subIcon: React.createElement(Zap, { size: 12 }) },
      { label: 'Projects', value: '25', sub: 'Active', subColor: '#7c3aed', subIcon: React.createElement(Activity, { size: 12 }) }
    ],
    tools: [
      { name: 'Video Highlights', desc: 'Extract viral moments with AI analytics.', path: '/highlights', icon: React.createElement(Star, { size: 20 }) },
      { name: 'Face Swap AI', desc: 'Realistic identity migration in video.', path: '/face-swap-ai', icon: React.createElement(User, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Cinematic Reel #1', specs: '4K • 60fps', status: 'Completed' },
      { id: 2, name: 'Batch Interview Set', specs: '1080p • 30fps', status: 'Processing' }
    ]
  },
  files: {
    title: 'Asset Library',
    subtitle: 'Universal file storage and document organization.',
    color: '#64748b',
    rgb: '100, 116, 139',
    actionText: 'Upload Assets',
    actionPath: '/files',
    icon: React.createElement(HardDrive, { size: 24 }),
    groupLabel: 'Storage Nodes',
    badge: 'Unlimited',
    version: 'v3.0',
    recentHeader: 'Library History',
    recentCols: ['Asset', 'Size', 'Status', 'Actions'],
    stats: [
      { label: 'Total Files', value: '542', sub: 'Healthy', subColor: '#10b981', subIcon: React.createElement(CheckCircle2, { size: 12 }) },
      { label: 'Storage', value: '1.2TB', sub: 'Cloud', subColor: '#0ea5e9', subIcon: React.createElement(Globe, { size: 12 }) }
    ],
    tools: [
      { name: 'Library', desc: 'Manage and search your global asset list.', path: '/files', icon: React.createElement(HardDrive, { size: 20 }) },
      { name: 'Productions', desc: 'Active workspace for ongoing projects.', path: '/productions', icon: React.createElement(Box, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Raw_Video_Archive.zip', specs: '4.5 GB', status: 'Synced' },
      { id: 2, name: 'Project_Alpha_Docs', specs: '240 MB', status: 'Healthy' }
    ]
  },
  resources: {
    title: 'Resources & Support',
    subtitle: 'Documentation, community, and billing management.',
    color: '#334155',
    rgb: '51, 65, 85',
    actionText: 'Browse Docs',
    actionPath: '/docs',
    icon: React.createElement(Info, { size: 24 }),
    groupLabel: 'Help & Assets',
    badge: 'Knowledge',
    version: 'v1.0',
    recentHeader: 'Recent Support',
    recentCols: ['Subject', 'Category', 'Status', 'Actions'],
    stats: [
      { label: 'Knowledge Base', value: '1.2K', sub: 'Articles', subColor: '#10b981', subIcon: React.createElement(FileText, { size: 12 }) },
      { label: 'Status', value: 'Online', sub: '99.9%', subColor: '#0ea5e9', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { name: 'Documentation', desc: 'Deep-dive into API and platform guides.', path: '/docs', icon: React.createElement(Info, { size: 20 }) },
      { name: 'Billing', desc: 'Manage invoices and subscription tiers.', path: '/billing', icon: React.createElement(Key, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'API v5 Integration', specs: 'Guide', status: 'Published' },
      { id: 2, name: 'March 2026 Invoice', specs: 'Billing', status: 'Paid' }
    ]
  },
  pdf_organize: {
    title: 'Organize PDF',
    subtitle: 'Reorder, merge, and split documents with precision.',
    color: '#e53935',
    rgb: '229, 57, 53',
    actionText: 'Process PDF',
    actionPath: '/pdf-dashboard',
    icon: React.createElement(Layers, { size: 24 }),
    groupLabel: 'Organization Tools',
    badge: 'Structure',
    version: 'v2.1',
    recentHeader: 'Recent Tasks',
    recentCols: ['File', 'Pages', 'Status', 'Actions'],
    stats: [
      { label: 'Merged', value: '1.4K', sub: 'Healthy', subColor: '#10b981', subIcon: React.createElement(CheckCircle2, { size: 12 }) },
      { label: 'Split', value: '850', sub: 'In Sync', subColor: '#0ea5e9', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { name: 'Merge PDF', desc: 'Combine multiple files into one.', path: '/merge', icon: React.createElement(Combine, { size: 20 }) },
      { name: 'Split PDF', desc: 'Divide files into parts.', path: '/split', icon: React.createElement(Split, { size: 20 }) },
      { name: 'Organize PDF', desc: 'Rearrange and reorder pages.', path: '/organize-pdf', icon: React.createElement(Layers, { size: 20 }) },
      { name: 'Remove Pages', desc: 'Delete unwanted document pages.', path: '/remove-pages', icon: React.createElement(Trash2, { size: 20 }) }
    ],
    recentItems: [
        { id: 1, name: 'Report_Draft.pdf', specs: '12 pgs', status: 'Merged' },
        { id: 2, name: 'Invoice_Set.pdf', specs: '45 pgs', status: 'Split' }
    ]
  },
  pdf_optimize: {
    title: 'Optimize PDF',
    subtitle: 'Shrink and repair documents for better performance.',
    color: '#10b981',
    rgb: '16, 185, 129',
    actionText: 'Compress Now',
    actionPath: '/compress',
    icon: React.createElement(Zap, { size: 24 }),
    groupLabel: 'Optimization',
    badge: 'Smart v2',
    version: 'v4.0',
    recentHeader: 'Optimization History',
    recentCols: ['File', 'Reduction', 'Status', 'Actions'],
    stats: [
      { label: 'Storage Saved', value: '12GB', sub: '+15%', subColor: '#10b981', subIcon: React.createElement(Activity, { size: 12 }) },
      { label: 'Avg Shrink', value: '72%', sub: 'High', subColor: '#0ea5e9', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { name: 'Compress PDF', desc: 'Reduce file size without quality loss.', path: '/compress', icon: React.createElement(Zap, { size: 20 }) },
      { name: 'Repair PDF', desc: 'Fix corrupted document structures.', path: '/repair', icon: React.createElement(History, { size: 20 }) }
    ],
    recentItems: [
        { id: 1, name: 'Archive_2024.pdf', specs: '85% saved', status: 'Ready' },
        { id: 2, name: 'Backup_v1.pdf', specs: '40% saved', status: 'Ready' }
    ]
  },
  pdf_edit: {
    title: 'Edit PDF Pages',
    subtitle: 'Rotate, watermark, and crop your documents.',
    color: '#7c3aed',
    rgb: '124, 58, 237',
    actionText: 'Launch Editor',
    actionPath: '/edit',
    icon: React.createElement(Layout, { size: 24 }),
    groupLabel: 'Visual Tools',
    badge: 'Creative',
    version: 'v1.5',
    recentHeader: 'Creative History',
    recentCols: ['File', 'Edit Type', 'Status', 'Actions'],
    stats: [
      { label: 'Watermarks', value: '450', sub: 'Secure', subColor: '#10b981', subIcon: React.createElement(Shield, { size: 12 }) },
      { label: 'Rotations', value: '1.2K', sub: 'Manual', subColor: '#2563eb', subIcon: React.createElement(RotateCw, { size: 12 }) }
    ],
    tools: [
      { name: 'Edit PDF', desc: 'Comprehensive page editor.', path: '/edit', icon: React.createElement(Layout, { size: 20 }) },
      { name: 'Rotate PDF', desc: 'Orient pages correctly.', path: '/rotate', icon: React.createElement(RotateCw, { size: 20 }) },
      { name: 'Add Watermark', desc: 'Secure branding on pages.', path: '/watermark', icon: React.createElement(Star, { size: 20 }) },
      { name: 'Add Page Number', desc: 'Paginate your documents.', path: '/page-numbers', icon: React.createElement(Hash, { size: 20 }) }
    ],
    recentItems: [
        { id: 1, name: 'Branded_Sales.pdf', specs: 'Watermark', status: 'Published' },
        { id: 2, name: 'Upside_Down.pdf', specs: 'Rotation', status: 'Completed' }
    ]
  },
  pdf_security: {
    title: 'PDF Security Hub',
    subtitle: 'Protect and sign your documents with ease.',
    color: '#0ea5e9',
    rgb: '14, 165, 233',
    actionText: 'Protect PDF',
    actionPath: '/lock',
    icon: React.createElement(Shield, { size: 24 }),
    groupLabel: 'Security Suite',
    badge: 'Secure',
    version: 'v3.0',
    recentHeader: 'Security Activity',
    recentCols: ['File', 'Protocol', 'Status', 'Actions'],
    stats: [
      { label: 'Shielded', value: '2.5K', sub: 'Healthy', subColor: '#10b981', subIcon: React.createElement(CheckCircle2, { size: 12 }) },
      { label: 'Encryptions', value: '45', sub: 'AES-256', subColor: '#0ea5e9', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { name: 'Protect PDF', desc: 'Password protect your files.', path: '/lock', icon: React.createElement(Lock, { size: 20 }) },
      { name: 'Unlock PDF', desc: 'Remove document passwords.', path: '/unlock', icon: React.createElement(Unlock, { size: 20 }) },
      { name: 'Sign PDF', desc: 'Add digital signatures.', path: '/sign', icon: React.createElement(PenTool, { size: 20 }) },
      { name: 'Redact PDF', desc: 'Securely hide sensitive data.', path: '/redact', icon: React.createElement(EyeOff, { size: 20 }) }
    ],
    recentItems: [
        { id: 1, name: 'NDA_Confidential.pdf', specs: 'Password Set', status: 'Encrypted' },
        { id: 2, name: 'Invoice_Signed.pdf', specs: 'Signatures', status: 'Ready' }
    ]
  },
  pdf_intelligence: {
    title: 'PDF Intelligence',
    subtitle: 'Analyze and extract data using neural OCR.',
    color: '#f59e0b',
    rgb: '245, 158, 11',
    actionText: 'Launch OCR',
    actionPath: '/ocr-pdf',
    icon: React.createElement(Bot, { size: 24 }),
    groupLabel: 'Neural Engine',
    badge: 'AI Powered',
    version: 'v5.0',
    recentHeader: 'Extraction Logs',
    recentCols: ['File', 'Data Pts', 'Status', 'Actions'],
    stats: [
      { label: 'Extracts', value: '1.2M', sub: 'Growing', subColor: '#10b981', subIcon: React.createElement(Activity, { size: 12 }) },
      { label: 'Accuracy', value: '99.5%', sub: 'High', subColor: '#f59e0b', subIcon: React.createElement(Zap, { size: 12 }) }
    ],
    tools: [
      { name: 'OCR PDF', desc: 'Automated text recognition.', path: '/ocr-pdf', icon: React.createElement(Box, { size: 20 }) },
      { name: 'Chat with PDF', desc: 'AI-driven Q&A on documents.', path: '/chat', icon: React.createElement(Bot, { size: 20 }) },
      { name: 'Summarize', desc: 'Get quick document insights.', path: '/summarize', icon: React.createElement(FileText, { size: 20 }) },
      { name: 'Extract Data', desc: 'Table and form data extraction.', path: '/extract-data', icon: React.createElement(Layers, { size: 20 }) }
    ],
    recentItems: [
        { id: 1, name: 'Bank_Statement.pdf', specs: 'Table data', status: 'Ready' },
        { id: 2, name: 'Research_Paper.pdf', specs: 'Summary', status: 'Processed' }
    ]
  },
  'text-to-video': {
    title: 'Text Synthesis Hub',
    subtitle: 'Generate cinematic videos from semantic text prompts.',
    color: '#8b5cf6',
    rgb: '139, 92, 246',
    actionText: 'Synthesize Vision',
    actionPath: '/text-to-video',
    icon: React.createElement(Video, { size: 24 }),
    groupLabel: 'Synthesis Tools',
    badge: 'Nucleus v4',
    version: 'v4.2',
    hasPromptBar: true,
    showTelemetry: true,
    promptPlaceholder: 'Manifest your cinematic vision through semantic synthesis...',
    samples: [
      { id: 1, title: 'Cyberpunk rainy night', type: 'Text-to-Video', preview: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=300' },
      { id: 2, title: 'Abstract flow 1', type: 'Motion Pattern', preview: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=300' }
    ],
    recentHeader: 'Recent Synthesis',
    recentCols: ['Project', 'Specs', 'Status', 'Actions'],
    stats: [
      { label: 'Render Time', value: '45s', sub: 'Optimized', subColor: '#10b981', subIcon: React.createElement(Zap, { size: 12 }) },
      { label: 'Resolution', value: '4K HDR', sub: 'Cinema', subColor: '#0ea5e9', subIcon: React.createElement(Shield, { size: 12 }) }
    ],
    tools: [
      { name: 'Direct Synthesis', desc: 'Convert text directly to video steps.', path: '/text-to-video', icon: React.createElement(Zap, { size: 20 }) },
      { name: 'Script breakdown', desc: 'Split scripts into production scenes.', path: '/script-to-video', icon: React.createElement(Scissors, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Cyberpunk rainy night', specs: 'Cinematic • 24fps', status: 'Completed' },
      { id: 2, name: 'Abstract flow 1', specs: '4K • 60fps', status: 'Processing' }
    ]
  },
  'image-to-video': {
    title: 'Visual Design Hub',
    subtitle: 'Manifest motion from seed images and vision concepts.',
    color: '#c026d3',
    rgb: '192, 38, 211',
    actionText: 'Start Generation',
    actionPath: '/image-to-video',
    icon: React.createElement(Palette, { size: 24 }),
    groupLabel: 'Asset Production',
    badge: 'Diffusion v3',
    version: 'v3.0',
    hasPromptBar: true,
    showTelemetry: true,
    promptPlaceholder: 'Define the motion vision for your visual assets...',
    samples: [
      { id: 1, title: 'Portrait Shift', type: 'Stable Diffusion', preview: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300' },
      { id: 2, title: 'Landscape Flow', type: 'Atmos v4', preview: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=300' }
    ],
    recentHeader: 'Recent Productions',
    recentCols: ['Seed Image', 'Specs', 'Status', 'Actions'],
    stats: [
      { label: 'Temporal Sync', value: 'High', sub: 'Coherent', subColor: '#10b981', subIcon: React.createElement(Shield, { size: 12 }) },
      { label: 'Creations', value: '85', sub: 'Active', subColor: '#c026d3', subIcon: React.createElement(Activity, { size: 12 }) }
    ],
    tools: [
      { name: 'Neural Generation', desc: 'High-fidelity image-to-video wizard.', path: '/image-to-video', icon: React.createElement(Zap, { size: 20 }) },
      { name: 'Asset Library', desc: 'Manage your seed images and renders.', path: '/files', icon: React.createElement(HardDrive, { size: 20 }) }
    ],
    recentItems: [
      { id: 1, name: 'Portrait Shift', specs: 'Stable Diffusion', status: 'Completed' },
      { id: 2, name: 'Landscape Flow', specs: 'Atmos v4', status: 'Ready' }
    ]
  }
};
