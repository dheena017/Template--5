import React, { useState } from 'react';
import {
  Clapperboard,
  FileText,
  Languages,
  Bot,
  Plus,
  Play,
  Zap,
  Search,
  Film,
  Globe,
  Scissors,
  Mic,
  PlusCircle,
  Video as VideoIcon,
  Layout
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../../styles/pages/video-ai/VideoDashboard.css';
import SearchBar from '../../components/common/SearchBar/SearchBar';

// Using the generated images for a classic and professional look
const IMAGES = {
  studio: '/ai_studio_cinematic_production_1775024446512.png',
  generation: '/text_to_video_generation_1775024482314.png',
  agent: '/video_agent_autonomous_1775024461995.png',
  imageToVideo: '/image_to_video_animation_1775024505444.png',
  blogToVideo: '/blog_to_video_transformation_1775024522972.png',
  autoEdit: '/auto_edit_video_ai_1775024542851.png',
  translate: '/video_translate_localization_1775024562085.png',
  dubbing: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
  hero: 'https://images.unsplash.com/photo-1492691523567-6170c3295db5?auto=format&fit=crop&q=80&w=1200'
};

const TiltCard = ({ tool, onTabChange, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="vd-card-v3 premium-action-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      onClick={() => onTabChange(tool.path)}
    >
      <div className="card-image-wrapper premium-frame" style={{ transformStyle: "preserve-3d" }}>
        <motion.img
          src={tool.image}
          alt={tool.title}
          className="base-image"
          style={{ translateZ: 50, scale: 1.1 }}
        />
        <motion.div
          className="card-glare-aura"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(139, 92, 246, 0.25) 0%, transparent 80%)`,
            translateZ: 120
          }}
        />
        <div className="card-video-overlay-aura" style={{ translateZ: 80 }}>
          <div className="video-icon-center"><Play fill="white" size={32} /></div>
        </div>
        <div className="card-image-overlay-glow" />
        <div className="card-badge-aura platinum" style={{ translateZ: 100 }}>{tool.status}</div>
      </div>

      <div className="card-content-aura" style={{ transformStyle: "preserve-3d" }}>
        <div className="card-header-flex" style={{ translateZ: 40 }}>
          <div className="card-meta-aura">
            <span className="card-icon-small">{tool.icon}</span>
            <span className="card-cat-small">{tool.category}</span>
          </div>
          <Zap size={14} className="quick-access-icon" />
        </div>
        <motion.h2 className="card-title-v3" style={{ translateZ: 70 }}>{tool.title}</motion.h2>
        <motion.p className="card-desc-v3" style={{ translateZ: 40 }}>{tool.desc}</motion.p>

        <div className="card-footer-aura" style={{ translateZ: 60 }}>
          <button className="card-action-btn-aura">
            <Zap size={14} /> Open Suite
          </button>
        </div>
      </div>
      <div className="card-hover-border"></div>
    </motion.div>
  );
};

const VideoDashboard = ({ onTabChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Parallax Hero state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const heroRotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 30 });
  const heroRotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 30 });
  const heroX = useSpring(useTransform(mouseX, [-500, 500], [-25, 25]), { stiffness: 100, damping: 30 });
  const heroY = useSpring(useTransform(mouseY, [-500, 500], [-25, 25]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    mouseX.set(clientX - windowWidth / 2);
    mouseY.set(clientY - windowHeight / 2);
  };

  const allTools = [
    { id: 'ai-studio', title: 'AI Studio', category: 'CINEMATIC PRODUCTION', desc: 'Create captivating video from scripts', icon: <Clapperboard size={18} />, image: IMAGES.studio, path: 'ai-studio', status: 'Pro Version' },
    { id: 'video-agent', title: 'Video Agent', category: 'AUTONOMOUS AGENTS', desc: 'Deploy autonomous virtual sales agents', icon: <Bot size={18} />, image: IMAGES.agent, path: 'video-agent', status: 'Ready' },
    { id: 'text-to-video', title: 'Text-to-Video', category: 'AI GENERATION', desc: 'Generate cinematic scenes from prompts', icon: <Film size={18} />, image: IMAGES.generation, path: 'Text-to-Video', status: 'v4.0 Alpha' },
    { id: 'image-to-video', title: 'Image-to-Video', category: 'MOTION DESIGN', desc: 'Animate static photos with depth', icon: <VideoIcon size={18} />, image: IMAGES.imageToVideo, path: 'image-to-video', status: 'Ready' },
    { id: 'script-to-video', title: 'Script to Video', category: 'STORYBOARDING', desc: 'Convert long-form scripts to video', icon: <FileText size={18} />, image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800', path: 'script-to-video', status: 'Ready' },
    { id: 'blog-to-video', title: 'Blog to Video', category: 'CONTENT REPURPOSING', desc: 'Transform articles into social videos', icon: <Globe size={18} />, image: IMAGES.blogToVideo, path: 'blog-to-video', status: 'Ready' },
    { id: 'ppt-to-video', title: 'PPT to Video', category: 'PRESENTATIONS', desc: 'Convert static slides into video', icon: <Layout size={18} />, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800', path: 'ppt-to-video', status: 'Ready' },
    { id: 'auto-edit', title: 'Auto Edit Video', category: 'POST-PRODUCTION', desc: 'AI-powered cuts and b-rolls', icon: <Scissors size={18} />, image: IMAGES.autoEdit, path: 'auto-edit', status: 'Ready' },
    { id: 'record-to-video', title: 'Record to Video', category: 'RECORDING', desc: 'Polishing raw recordings with AI', icon: <Mic size={18} />, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', path: 'record-to-video', status: 'Ready' },
    { id: 'video-translate', title: 'Video Translate', category: 'LOCALIZATION', desc: 'Translate video into 40+ languages', icon: <Languages size={18} />, image: IMAGES.translate, path: 'ComingSoon-Translate', status: 'Ready' },
    { id: 'video-dubbing', title: 'Video Dubbing', category: 'LOCALIZATION', desc: 'AI-powered voice replacement', icon: <Mic size={18} />, image: IMAGES.dubbing, path: 'ComingSoon-Dubbing', status: 'Ready' },
    { id: 'blank-video', title: 'Empty Canvas', category: 'CUSTOM CREATION', desc: 'Start creating from a blank file', icon: <PlusCircle size={18} />, image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800', path: 'blank-video', status: 'Ready' }
  ];

  const filteredTools = allTools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="video-dashboard-v3 cinematic-view" onMouseMove={handleMouseMove}>
      <section className="vd-hero-premium">
        <motion.div
          className="hero-bg-video-container"
          style={{ x: heroX, y: heroY, scale: 1.12 }}
        >
          <video autoPlay muted loop playsInline className="hero-bg-video" poster={IMAGES.hero}>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-city-4412-large.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay-gradient"></div>
        </motion.div>

        <motion.div
          className="hero-content-bridge"
          style={{
            x: useTransform(mouseX, [-500, 500], [40, -40]),
            y: useTransform(mouseY, [-500, 500], [40, -40])
          }}
        >
          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="hero-badge-aura">
            NEXT-GEN VIDEO AI
          </motion.span>
          <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100 }}>
            Cinematic Production <br /> <span>Reimagined</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Harness the power of Sora, Runway Gen-2, and Aura Engines to transform
            your creative vision into studio-quality masterpieces.
          </motion.p>
          <div className="hero-actions-aura">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hero-btn-primary" onClick={() => onTabChange('ai-studio')}>
              Start Studio <Plus size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hero-btn-outline" onClick={() => onTabChange('docs')}>
              Documentation
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual-aura"
          initial={{ opacity: 0, rotateY: -30, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: -15, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            perspective: 1000,
            rotateX: heroRotateX,
            rotateY: heroRotateY,
            x: useTransform(mouseX, [-500, 500], [-60, 60]),
            y: useTransform(mouseY, [-500, 500], [-60, 60]),
            transformStyle: "preserve-3d"
          }}
        >
          <div className="hero-video-container" style={{ transformStyle: "preserve-3d" }}>
            <div className="video-glow-aura" style={{ translateZ: 20 }}></div>
            <img src={IMAGES.hero} alt="Hero Preview" className="hero-preview-img" style={{ translateZ: 0 }} />
            <div className="floating-3d-play" style={{ translateZ: 100 }}>
              <Play size={48} fill="white" />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="vd-header-aura secondary-header">
        <div className="header-left-aura">
          <span className="breadcrumb-aura">AURA CREATIVE SUITE</span>
          <h2>Specialized Production Tools</h2>
        </div>
        <div className="header-right-aura">
          <SearchBar placeholder="Filter by tool or category..." onSearch={(val) => setSearchQuery(val)} className="premium-search" />
        </div>
      </div>

      <div className="vd-grid-v3">
        {filteredTools.map((tool, index) => (
          <TiltCard key={tool.id} tool={tool} index={index} onTabChange={onTabChange} />
        ))}
      </div>
    </div>
  );
};

export default VideoDashboard;
