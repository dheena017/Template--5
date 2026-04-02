import React, { useState } from 'react';
import { 
  Bot, 
  User, 
  Layers, 
  Sparkles, 
  Zap, 
  Search,
  Scan,
  Shield,
  Smile,
  Ghost,
  Users,
  Video,
  Clapperboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/pages/video-ai/VideoDashboard.css'; // Reusing the visual engine
import '../../styles/pages/avatar/AvatarDashboard.css';

const AVATAR_TOOLS = [
  {
    id: 'avatar-creator',
    title: 'Aura Persona Engine',
    category: 'DIGITAL IDENTITY',
    desc: 'Synthesize photorealistic autonomous talking avatars via neural anchors.',
    icon: <User size={18} />,
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    path: 'avatar-creator',
    status: 'Ready'
  },
  {
    id: 'face-swap',
    title: 'Identity Sync Hub',
    category: 'IMAGE SYNTHESIS',
    desc: 'Cinematic-grade neural re-skinning and face-swap studio.',
    icon: <Layers size={18} />,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800',
    path: 'face-swap',
    status: 'High Precision'
  },
  {
    id: 'avatars-hub',
    title: 'My Characters',
    category: 'PERSONA HUB',
    desc: 'Manage your library of custom-trained avatars',
    icon: <Users size={18} />,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6bb3?auto=format&fit=crop&q=80&w=800',
    path: 'avatars',
    status: '12 Active'
  },
  {
    id: 'avatar-translate',
    title: 'Avatar Translate',
    category: 'MULTILINGUAL',
    desc: 'Lip-sync your avatar into any language',
    icon: <Smile size={18} />,
    image: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=800',
    path: 'translate',
    status: 'Beta'
  },
  {
    id: 'characters-lab',
    title: 'Characters Lab',
    category: 'VIRTUAL AGENTS',
    desc: 'Build intelligent characters with unique personalities',
    icon: <Bot size={18} />,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    path: 'characters',
    status: 'Advanced AI'
  },
  {
    id: 'artist-face-swap',
    title: 'Artist Face Swap',
    category: 'POST-PRODUCTION',
    desc: 'Professional grade face swap for cinematic content',
    icon: <Video size={18} />,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    path: 'artist-face-swap',
    status: 'Pro Only'
  }
];

const AvatarDashboard = ({ onTabChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = AVATAR_TOOLS.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="avatar-dashboard-v3 video-dashboard-v3 cinematic-view">
      <section className="vd-hero-premium avatar-hero">
        <div className="hero-content-bridge">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-badge-aura platinum"
          >
            VIRTUAL IDENTITY ENGINE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Digital Personas <br/> <span>Infinite Lives</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Deploy your digital twin, manage virtual characters, and master 
            the art of identity synthesis with Aura's pro-grade character lab.
          </motion.p>
          <div className="hero-actions-aura">
            <button className="hero-btn-primary" onClick={() => onTabChange('avatar-creator')}>
              Create Persona <Users size={18} />
            </button>
            <button className="hero-btn-outline" onClick={() => onTabChange('face-swap')}>
              Identity Sync
            </button>
          </div>
        </div>
        <div className="hero-visual-aura">
          <div className="hero-video-container avatar-frame">
            <div className="video-glow-aura purple"></div>
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200" 
              alt="Avatar Preview" 
              className="hero-preview-img"
            />
          </div>
        </div>
      </section>

      <div className="vd-header-aura secondary-header">
        <div className="header-left-aura">
           <span className="breadcrumb-aura">IDENTITY SUITE</span>
           <h2>Persona Management</h2>
        </div>
        <div className="header-right-aura">
          <div className="search-bar-aura premium-search">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search characters or tools..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="vd-grid-v3">
        {filteredTools.map((tool, index) => (
          <motion.div 
            key={tool.id}
            className="vd-card-v3 premium-action-card avatar-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onTabChange(tool.path)}
          >
            <div className="card-image-wrapper premium-frame">
              <img src={tool.image} alt={tool.title} className="base-image" />
              <div className="card-video-overlay-aura">
                <div className="video-icon-center"><Zap fill="white" size={32} /></div>
              </div>
              <div className="card-image-overlay-glow" />
              <div className="card-badge-aura platinum">{tool.status}</div>
            </div>
            
            <div className="card-content-aura">
              <div className="card-header-flex">
                <div className="card-meta-aura">
                  <span className="card-icon-small">{tool.icon}</span>
                  <span className="card-cat-small">{tool.category}</span>
                </div>
                <Sparkles size={14} className="quick-access-icon text-secondary" />
              </div>
              <h2 className="card-title-v3">{tool.title}</h2>
              <p className="card-desc-v3">{tool.desc}</p>
              
              <div className="card-footer-aura">
                <button className="card-action-btn-aura">
                  Synthesize <Zap size={14} />
                </button>
              </div>
            </div>
            <div className="card-hover-border"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AvatarDashboard;
