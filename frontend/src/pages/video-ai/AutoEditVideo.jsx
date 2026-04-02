import React, { useState, useRef } from 'react';
import { 
  Scissors, 
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
  Languages,
  Layers,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/pages/video-ai/AutoEditVideo.css';

const AutoEditVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);
  const [features, setFeatures] = useState(['subtitles']);

  const toggleFeature = (f) => {
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const editFeatures = [
    { id: 'subtitles', label: 'Smart Subtitles' },
    { id: 'b-roll', label: 'B-Roll Sync' },
    { id: 'silence', label: 'Cut Silences' },
    { id: 'color', label: 'Color Grading' },
    { id: 'zoom', label: 'Auto Zoom' }
  ];

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file.name);
    }
  };

  return (
    <div className="video-tool-page">
      <header className="vt-header">
        <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <Scissors size={40} className="text-danger" /> Auto Edit Video
        </motion.h1>
        <p className="text-secondary">AI-powered post-production. Automatically add multilingual subtitles, context-aware B-rolls, and cinematic cuts in one click.</p>
      </header>

      <div className="vt-grid">
        <div className="vt-main-content">
          <div className="vt-upload-card premium-card" onClick={() => fileInputRef.current?.click()}>
            <input type="file" hidden ref={fileInputRef} onChange={handleVideoUpload} accept="video/*" />
            {selectedVideo ? (
              <div className="py-2 text-center">
                 <Video size={40} className="text-danger mb-2" />
                 <h3>{selectedVideo}</h3>
                 <p className="text-secondary">Video source identified.</p>
                 <button className="btn btn-outline-light btn-sm mt-3 px-4 rounded-pill">Replace Source</button>
              </div>
            ) : (
              <div className="py-5">
                 <div className="display-4 mb-3 opacity-20"><Upload size={64} /></div>
                 <h3>Upload Footage</h3>
                 <p className="text-secondary">MP4, MOV, AVI up to 500MB</p>
                 <button className="btn btn-primary mt-3 px-5 rounded-pill">Upload Media</button>
              </div>
            )}
          </div>

          <div className="vt-preview-placeholder premium-card overflow-hidden position-relative">
             <div className="viewport-overlay" />
             {isGenerating ? (
               <div className="text-center px-5">
                  <div className="icon-slice mb-4"><Scissors size={32} className="text-danger" /></div>
                  <h3 className="h5">Neural Post-Processing</h3>
                  <p className="small text-secondary">Analyzing vocal patterns and synthesizing contextual b-roll layers...</p>
                  <div className="progress mt-4 w-75 mx-auto" style={{height:'3px', background: 'rgba(255,255,255,0.05)'}}>
                     <motion.div className="progress-bar bg-danger shadow-glow-danger" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 7 }} />
                  </div>
               </div>
             ) : (
               <div className="text-center opacity-30">
                 <Video size={64} className="mb-3" />
                 <h3>Production Monitor</h3>
                 <p>Establishing secure connection to Editor-v3 pipeline...</p>
               </div>
             )}
          </div>
        </div>

        <aside className="vt-settings-panel glass-card p-4">
           <div className="vt-param-group">
              <label className="vt-param-label"><Settings size={18} /> Edit Features</label>
              <div className="d-flex flex-column gap-2">
                 {editFeatures.map(f => (
                   <div key={f.id} className={`glass-card p-3 d-flex align-items-center gap-3 border ${features.includes(f.id) ? 'border-danger' : 'border-white-05'}`} onClick={() => toggleFeature(f.id)} style={{cursor:'pointer', transition:'all 0.2s'}}>
                      <div className={`checkbox-mini rounded-circle border ${features.includes(f.id) ? 'bg-danger border-danger' : 'border-white-10'}`} style={{width:'16px', height:'16px'}} />
                      <span className="tiny fw-bold">{f.label}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="vt-param-group">
              <label className="vt-param-label"><Languages size={18} /> Subtitle Language</label>
              <select className="form-select-dark small w-100">
                 <option>Auto Detect (Default)</option>
                 <option>English</option>
                 <option>Spanish</option>
                 <option>French</option>
                 <option>Japanese</option>
              </select>
           </div>

           <div className="vt-param-group pt-3 border-top border-white-05">
              <button 
                className="vt-btn-primary" 
                style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
                disabled={!selectedVideo || isGenerating}
                onClick={() => setIsGenerating(true)}
              >
                {isGenerating ? <Zap size={20} className="spinner" /> : <Sparkles size={20} />}
                {isGenerating ? 'Rendering...' : 'Automate Edit'}
              </button>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default AutoEditVideo;
