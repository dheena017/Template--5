import React, { useState, useRef } from 'react';
import { 
  Globe, 
  Upload, 
  Settings, 
  Sparkles, 
  Zap, 
  Video, 
  Maximize,
  Download,
  Trash2,
  Play,
  History,
  Link2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/pages/video-ai/BlogToVideo.css';

const BlogToVideo = () => {
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('Shorts');

  const formats = ['Shorts', 'Reels', 'TikTok', 'YouTube', 'LinkedIn'];

  const [recentGens, setRecentGens] = useState([
    { id: 1, title: 'Medium Article Promo', date: '1d ago', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=300' }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setRecentGens([{ id: Date.now(), title: url.replace('https://', '').substring(0, 20), date: 'Just now', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=300' }, ...recentGens]);
    }, 6000);
  };

  return (
    <div className="video-tool-page">
      <header className="vt-header">
        <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <Globe size={40} className="text-success" /> Blog to Video
        </motion.h1>
        <p className="text-secondary">Transform articles, blog posts, and external URLs into high-impact social media videos automatically.</p>
      </header>

      <div className="vt-grid">
        <div className="vt-main-content">
          <div className="vt-upload-card premium-card text-start">
             <div className="vt-param-label"><Link2 size={18} /> Article / URL Link</div>
             <input 
               type="text" 
               className="prompt-area" 
               style={{minHeight: '60px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', width: '100%', color: '#fff', padding: '1.2rem', fontSize: '1rem'}}
               placeholder="https://medium.com/your-article-url-here"
               value={url}
               onChange={e => setUrl(e.target.value)}
             />
             <div className="d-flex align-items-center gap-3 mt-4 pt-3 border-top border-white-05">
                <FileText size={20} className="text-secondary" />
                <div className="flex-grow-1">
                   <h4 className="tiny fw-bold mb-1 lh-1">Manual Content Toggle</h4>
                   <p className="tiny text-secondary mb-0">Alternatively, you can paste the full article text directly.</p>
                </div>
                <button className="btn btn-outline-light btn-sm rounded-pill px-3 tiny">Paste Text</button>
             </div>
          </div>

          <div className="vt-preview-placeholder premium-card overflow-hidden position-relative">
             <div className="viewport-overlay" />
             {isGenerating ? (
               <div className="text-center px-5">
                  <div className="icon-orbit mb-4"><Search size={32} className="text-success" /></div>
                  <h3 className="h5">Crawl & Extraction Phase</h3>
                  <p className="small text-secondary">Mapping article structure and selecting key visual highlights...</p>
                  <div className="progress mt-4 w-75 mx-auto" style={{height:'3px'}}>
                     <motion.div className="progress-bar bg-success" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 6 }} />
                  </div>
               </div>
             ) : (
               <div className="text-center opacity-30">
                 <Video size={64} className="mb-3" />
                 <h3>Content Extraction Terminal</h3>
                 <p>Establishing secure connection to URL-Scraper-v2...</p>
               </div>
             )}
          </div>
        </div>

        <aside className="vt-settings-panel glass-card p-4">
           <div className="vt-param-group">
              <label className="vt-param-label"><Settings size={18} /> Output Format</label>
              <div className="format-grid d-grid grid-2 gap-2">
                 {formats.map(f => (
                   <button key={f} className={`btn-outline-light-sq btn-sm tiny px-3 ${selectedFormat === f ? 'active' : ''}`} onClick={() => setSelectedFormat(f)}>
                     {f}
                   </button>
                 ))}
              </div>
           </div>

           <div className="vt-param-group">
              <label className="vt-param-label">Visual Style</label>
              <select className="form-select-dark small w-100">
                 <option>Narrative Modern</option>
                 <option>Breaking News</option>
                 <option>Vibrant Tech</option>
                 <option>Corporate Minimal</option>
              </select>
           </div>

           <div className="vt-param-group pt-3 border-top border-white-05">
              <button 
                className="vt-btn-primary" 
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                disabled={!url || isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? <Zap size={20} className="spinner" /> : <Sparkles size={20} />}
                {isGenerating ? 'Analyzing URL...' : 'Syndicate Video'}
              </button>
           </div>

           <div className="history-sec mt-5">
              <h3 className="tiny fw-800 text-secondary text-uppercase mb-3">Recent Crawls</h3>
              <div className="history-list d-flex flex-column gap-3">
                 {recentGens.map(r => (
                    <div key={r.id} className="history-item d-flex gap-3 align-items-center">
                       <div className="rounded bg-dark d-flex align-items-center justify-content-center" style={{width:'50px', height:'35px'}}><Globe size={14} /></div>
                       <div className="flex-grow-1 overflow-hidden">
                          <span className="tiny d-block fw-bold line-clamp-1">{r.title}</span>
                          <span className="tiny text-secondary opacity-50">{r.date}</span>
                       </div>
                       <button className="icon-btn-sm"><ArrowRight size={14} /></button>
                    </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

const ArrowRight = ({size, className}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>

export default BlogToVideo;
