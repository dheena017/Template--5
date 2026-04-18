import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Settings, 
  Sparkles, 
  Zap, 
  Video, 
  Maximize,
  Download,
  Trash2,
  Play,
  History as HistoryIcon,
  Volume2,
  MessageSquareShare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/pages/video-ai/ScriptToVideo.css';

const ScriptToVideo = () => {
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('Sarah');
  const [voiceStyle, setVoiceStyle] = useState('Professional');

  const voices = ['Professional', 'Lively', 'Warm', 'Narrative', 'Energetic'];

  const [recentGens, setRecentGens] = useState([
    { id: 1, title: 'Commercial Script v1', date: '5h ago', img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=300' }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setRecentGens([{ id: Date.now(), title: script.substring(0, 20), date: 'Just now', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300' }, ...recentGens]);
    }, 5000);
  };

  return (
    <div className="video-tool-page">
      <header className="vt-header">
        <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <FileText size={40} className="text-info" /> Script to Video
        </motion.h1>
        <p className="text-secondary">Automatically transform your long-form scripts into engaging high-definition videos with AI avatars and narration.</p>
      </header>

      <div className="vt-grid">
        <div className="vt-main-content">
          <div className="vt-upload-card premium-card text-start">
             <div className="vt-param-label"><MessageSquareShare size={18} /> Enter Script Content</div>
             <textarea 
               className="prompt-area" 
               style={{minHeight: '280px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', width: '100%', color: '#fff', padding: '1.2rem'}}
               placeholder="Once upon a time in a digital landscape... Paste your full script here for AI analysis and storyboard generation."
               value={script}
               onChange={e => setScript(e.target.value)}
             />
             <div className="d-flex justify-content-between mt-3 text-secondary tiny">
                <span>{script.split(' ').filter(x => x).length} words</span>
                <button className="btn-link-sec tiny p-0">Clear Editor</button>
             </div>
          </div>

          <div className="vt-preview-placeholder premium-card overflow-hidden position-relative h-300">
             <div className="viewport-overlay" />
             {isGenerating ? (
               <div className="text-center px-5">
                  <div className="icon-pulse mb-3"><Sparkles size={32} className="text-info" /></div>
                  <h3 className="h5">Storyboard Intelligence</h3>
                  <p className="small text-secondary">Analyzing semantic context and generating visual match sequence...</p>
                  <div className="progress mt-4 w-75 mx-auto" style={{height:'3px'}}>
                     <motion.div className="progress-bar bg-info" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 5 }} />
                  </div>
               </div>
             ) : (
               <div className="text-center opacity-30">
                 <Video size={64} className="mb-3" />
                 <h3>Master Timeline Monitor</h3>
                 <p>Establishing storyboard generation pipeline...</p>
               </div>
             )}
          </div>
        </div>

        <aside className="vt-settings-panel glass-card p-4">
           <div className="vt-param-group">
              <label className="vt-param-label"><Volume2 size={18} /> AI Narration Style</label>
              <div className="voice-list d-flex flex-wrap gap-2">
                 {voices.map(v => (
                   <button key={v} className={`btn-outline-light-sq btn-sm tiny px-3 ${voiceStyle === v ? 'active' : ''}`} onClick={() => setVoiceStyle(v)}>
                     {v}
                   </button>
                 ))}
              </div>
           </div>

           <div className="vt-param-group">
              <label className="vt-param-label">Presenter Persona</label>
              <div className="avatar-preview-row d-flex gap-3 overflow-auto pb-2">
                 {['Sarah', 'Marcus', 'Elena', 'Tom'].map(a => (
                    <div key={a} className={`avatar-mini-box glass-card p-2 text-center rounded border ${selectedAvatar === a ? 'border-info' : 'border-white-05'}`} onClick={() => setSelectedAvatar(a)} style={{minWidth: '65px', cursor: 'pointer'}}>
                       <div className="avatar-placeholder rounded-circle bg-dark mx-auto mb-1" style={{width:'35px', height:'35px'}} />
                       <span className="tiny fw-bold d-block">{a}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="vt-param-group pt-3 border-top border-white-05">
              <button 
                className="vt-btn-primary" 
                style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' }}
                disabled={!script || isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? <Zap size={20} className="rotate-360" /> : <Sparkles size={20} />}
                {isGenerating ? 'Analyzing...' : 'Generate Full Video'}
              </button>
           </div>

           <div className="history-sec mt-5">
              <h4 className="tiny fw-bold text-secondary text-uppercase mb-3"><HistoryIcon size={14} /> Production Logs</h4>
              <div className="history-list d-flex flex-column gap-3">
                 {recentGens.map(r => (
                    <div key={r.id} className="history-item d-flex gap-3 align-items-center">
                       <div className="rounded bg-dark d-flex align-items-center justify-content-center" style={{width:'50px', height:'35px'}}><Video size={14} /></div>
                       <div className="flex-grow-1 overflow-hidden">
                          <span className="tiny d-block fw-bold line-clamp-1">{r.title}</span>
                          <span className="tiny text-secondary opacity-50">{r.date}</span>
                       </div>
                       <button className="icon-btn-sm"><Download size={14} /></button>
                    </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default ScriptToVideo;
