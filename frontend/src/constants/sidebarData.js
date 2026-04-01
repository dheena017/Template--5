import React from 'react';
import { 
  Film, Palette, Bot, Mic, FileText, 
  Clapperboard, HardDrive, Terminal, 
  Share2, Info, Languages,
  Zap, Settings, Activity, Shield,
  Globe, Code2, Key, Webhook,
  History, Music, Video, Star,
  Box, Eye, Layers, Combine, Split,
  Scissors, Trash2, Search, Scan
} from 'lucide-react';

export const SIDEBAR_CATEGORIES = [
  {
    name: 'Video',
    icon: React.createElement(Film, { size: 18 }),
    links: [
      { name: 'Video Hub', path: '/video-dashboard', icon: React.createElement(Film, { size: 16 }) },
      { name: 'AI Studio', path: '/ai-studio', icon: React.createElement(Clapperboard, { size: 16 }) },
      { name: 'Video AI', path: '/video-ai', icon: React.createElement(Video, { size: 16 }) },
      { name: 'Video Agent', path: '/video-agent', icon: React.createElement(Bot, { size: 16 }) },
      { name: 'PPT to Video', path: '/ppt-to-video', icon: React.createElement(FileText, { size: 16 }) }
    ]
  },
  {
    name: 'Image',
    icon: React.createElement(Palette, { size: 18 }),
    links: [
      { name: 'Image Creator', path: '/image-generator', icon: React.createElement(Palette, { size: 16 }) },
      { name: 'AI Generation', path: '/generate-images', icon: React.createElement(Layers, { size: 16 }) },
      { name: 'Brand Kits', path: '/brand-kits', icon: React.createElement(Settings, { size: 16 }) }
    ]
  },
  {
    name: 'Avatar',
    icon: React.createElement(Bot, { size: 18 }),
    links: [
      { name: 'Avatar Creator', path: '/avatar-creator', icon: React.createElement(Bot, { size: 16 }) },
      { name: 'Face Swap', path: '/face-swap', icon: React.createElement(Layers, { size: 16 }) },
      { name: 'Avatars', path: '/avatars', icon: React.createElement(Bot, { size: 16 }) }
    ]
  },
  {
    name: 'Speech',
    icon: React.createElement(Mic, { size: 18 }),
    links: [
      { name: 'Text to Speech', path: '/text-to-speech', icon: React.createElement(Mic, { size: 16 }) },
      { name: 'Voice Changer', path: '/voice-changer', icon: React.createElement(Zap, { size: 16 }) },
      { name: 'Podcast Creator', path: '/podcast-creator', icon: React.createElement(Music, { size: 16 }) }
    ]
  },
  {
    name: 'Text',
    icon: React.createElement(FileText, { size: 18 }),
    links: [
      { name: 'Speech to Text', path: '/speech-to-text', icon: React.createElement(Languages, { size: 16 }) },
      { name: 'AI Rules', path: '/rules', icon: React.createElement(Shield, { size: 16 }) }
    ]
  },
  {
    name: 'Studio',
    icon: React.createElement(Clapperboard, { size: 18 }),
    links: [
      { name: 'Video Highlights', path: '/highlights', icon: React.createElement(Star, { size: 16 }) }
    ]
  },
  {
    name: 'Files',
    icon: React.createElement(HardDrive, { size: 18 }),
    links: [
      { name: 'Library', path: '/files', icon: React.createElement(HardDrive, { size: 16 }) },
      { name: 'Productions', path: '/productions', icon: React.createElement(Box, { size: 16 }) }
    ]
  },
  {
    name: 'PDF',
    icon: React.createElement(FileText, { size: 18 }),
    links: [
      { name: 'Merge PDF', path: '/merge', icon: React.createElement(Combine, { size: 16 }) },
      { name: 'Split PDF', path: '/split', icon: React.createElement(Split, { size: 16 }) },
      { name: 'Organize PDF', path: '/organize-pdf', icon: React.createElement(Layers, { size: 16 }) },
      { name: 'Remove Pages', path: '/remove-pages', icon: React.createElement(Trash2, { size: 16 }) },
      { name: 'Extract Pages', path: '/extract-pages', icon: React.createElement(Scissors, { size: 16 }) },
      { name: 'Scan to PDF', path: '/scan-to-pdf', icon: React.createElement(Scan, { size: 16 }) }
    ]
  },
  {
    name: 'Developers',
    icon: React.createElement(Terminal, { size: 18 }),
    links: [
      { name: 'Dev Hub', path: '/developer-api-hub', icon: React.createElement(Code2, { size: 16 }) },
      { name: 'API Keys', path: '/api-keys', icon: React.createElement(Key, { size: 16 }) },
      { name: 'Webhooks', path: '/webhooks', icon: React.createElement(Webhook, { size: 16 }) }
    ]
  },
  {
    name: 'Social media',
    icon: React.createElement(Share2, { size: 18 }),
    links: [
      { name: 'Social Dashboard', path: '/social-media-home', icon: React.createElement(Share2, { size: 16 }) },
      { name: 'Blog Builder', path: '/blog', icon: React.createElement(FileText, { size: 16 }) }
    ]
  },
  {
    name: 'About us',
    icon: React.createElement(Info, { size: 18 }),
    links: [
      { name: 'Platform Stats', path: '/analytics', icon: React.createElement(Activity, { size: 16 }) },
      { name: 'Documentation', path: '/docs', icon: React.createElement(Info, { size: 16 }) },
      { name: 'FAQ & Support', path: '/faq', icon: React.createElement(Info, { size: 16 }) }
    ]
  }
];
