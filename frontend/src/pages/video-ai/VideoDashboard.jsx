import React from 'react';
import { 
  Clapperboard, 
  Video, 
  Bot, 
  FileText, 
  Sparkles, 
  ArrowUpRight, 
  PlayCircle,
  Clock,
  Activity,
  Zap,
  TrendingUp,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/pages/video-ai/VideoDashboard.css';

const videoTools = [
  {
    id: 'ai-studio',
    title: 'AI Studio',
    desc: 'The ultimate professional workspace for cinematic video production with AI avatars.',
    icon: <Clapperboard size={28} />,
    color: '#6366f1',
    path: '/ai-studio',
    credits: 50
  },
  {
    id: 'video-ai',
    title: 'Video AI generator',
    desc: 'Generate photorealistic videos from simple text prompts or animate your images instantly.',
    icon: <Video size={28} />,
    color: '#ec4899',
    path: '/video-ai',
    credits: 30
  },
  {
    id: 'video-agent',
    title: 'Video Agent',
    desc: 'Deploy interactive AI video agents for autonomous sales, support, and engagement.',
    icon: <Bot size={28} />,
    color: '#10b981',
    path: '/video-agent',
    credits: 20
  },
  {
    id: 'ppt-to-video',
    title: 'PPT to Video',
    desc: 'Transform your presentations into engaging video narrations with AI speakers.',
    icon: <FileText size={28} />,
    color: '#f59e0b',
    path: '/ppt-to-video',
    credits: 15
  }
];

const VideoDashboard = ({ onTabChange }) => {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="video-dashboard-container">
      <section className="vd-hero glass-card">
        <div className="vd-hero-content">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Video AI Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Experience the future of video production. Create, automate, and deploy cinematic content with advanced atmospheric AI models.
          </motion.p>
          <div className="vd-stats">
            <div className="vd-stat-item">
              <span>Total Credits</span>
              <strong>1,240 <Zap size={18} fill="#f59e0b" className="text-warning" /></strong>
            </div>
            <div className="vd-stat-item border-start ps-4">
              <span>Active Agents</span>
              <strong>12 <Activity size={18} className="text-success" /></strong>
            </div>
            <div className="vd-stat-item border-start ps-4">
              <span>Render Queue</span>
              <strong>0 <Clock size={18} className="text-secondary" /></strong>
            </div>
          </div>
        </div>
        <div className="vd-hero-visual d-none d-lg-block">
          <div className="hero-orb glass-card p-4">
             <div className="orb-inner">
               <TrendingUp size={48} className="text-primary" />
             </div>
          </div>
        </div>
      </section>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title h4 mb-0">Video AI Specialized Tools</h2>
        <div className="d-flex gap-2">
          <button className="badge-btn active"><Sparkles size={14} /> Recommended</button>
          <button className="badge-btn">All Tools</button>
        </div>
      </div>

      <motion.div 
        className="vd-grid"
        variants={containerVars}
        initial="hidden"
        animate="show"
      >
        {videoTools.map((tool) => (
          <motion.div 
            key={tool.id}
            className="vd-card glass-card"
            variants={itemVars}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onTabChange(tool.path.substring(1))}
          >
            <div className="vd-card-header d-flex justify-content-between align-items-start">
              <div 
                className="vd-icon-wrapper" 
                style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
              >
                {tool.icon}
              </div>
              <div className="credits-badge">
                <Zap size={10} fill="currentColor" /> {tool.credits}
              </div>
            </div>
            
            <div className="vd-card-content mt-3">
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </div>

            <div className="vd-card-footer">
               <div className="preview-indicator">
                  <PlayCircle size={14} /> <span>Try Demo</span>
               </div>
               <button className="launch-btn">
                 Launch <ArrowUpRight size={14} />
               </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <section className="highlights-section mt-5">
         <div className="section-header d-flex align-items-center gap-2 mb-4">
           <Layers size={20} className="text-primary" />
           <h3 className="h5 mb-0">Production Insights</h3>
         </div>
         <div className="row g-4">
            <div className="col-md-6">
               <div className="info-kit glass-card p-4 h-100">
                  <h4 className="h6 mb-3">Recent Projects</h4>
                  <div className="project-list d-flex flex-column gap-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="mini-project-item d-flex align-items-center gap-3">
                           <div className="mp-thumb bg-dark rounded" />
                           <div className="mp-info flex-grow-1">
                              <span className="d-block fw-600 tiny">Untitled Sequence #{i * 42}</span>
                              <span className="tiny text-secondary">Modified {i}h ago</span>
                           </div>
                           <button className="icon-btn-sm"><ArrowUpRight size={12} /></button>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="col-md-6">
               <div className="info-kit glass-card p-4 h-100 d-flex flex-column justify-content-center align-items-center text-center">
                  <div className="empty-spark p-3 rounded-circle bg-primary-10 mb-3">
                    <Sparkles size={32} className="text-primary" />
                  </div>
                  <h4 className="h6">Ready for your next masterpiece?</h4>
                  <p className="small text-secondary mb-3">Start from a template or use autonomous AI agents to build your workflow.</p>
                  <button className="btn btn-primary btn-sm px-4">Create From Template</button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default VideoDashboard;
