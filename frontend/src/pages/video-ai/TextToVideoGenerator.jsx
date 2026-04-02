import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Video, 
  Maximize,
  Download,
  Play,
  History as HistoryIcon,
  Cpu,
  Fingerprint,
  Share2,
  Volume2,
  Settings,
  Sparkles,
  Search,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PromptBar from '../../components/common/PromptBar/PromptBar';

// Modular Production Suite (Phase 1)
// We will build these as we progress
// import Step1Concept from './TextToVideo/Step1Concept';
// import Step2Direction from './TextToVideo/Step2Direction';
// ...

import '../../styles/pages/video-ai/TextToVideo.css';

const TextToVideo = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = Hub, 1-3 = Production
  const [formData, setFormData] = useState({
    prompt: '',
    script: '',
    style: 'Cinematic',
    camera: 'Pan Right',
    motion: 50,
    aspectRatio: '16:9'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [tickerText, setTickerText] = useState('NEURAL LINK READY');
  const [resultVideo, setResultVideo] = useState(null);
  const [recentGens, setRecentGens] = useState([
    { id: 1, title: 'Neon city with flying cars in rainy night', date: '12m ago', img: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=300', type: 'Text-to-Video' }
  ]);

  const handleCommandExecute = (val) => {
    setFormData(prev => ({ ...prev, prompt: val }));
    // Auto-advance from Hub to Step 1 (Concept Refining)
    setCurrentStep(1);
    setTickerText('CRYSTALIZING VISION...');
  };

  const handleGenerate = async () => {
    setCurrentStep(3); // Render Lab
    setIsGenerating(true);
    setGenProgress(0);
    setTickerText('SAMPLING LATENT SPACE...');
    
    const interval = setInterval(() => {
      setGenProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setTickerText('SYNTHESIS COMPLETE');
          setResultVideo('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'); 
          return 100;
        }
        return p + 1.2;
      });
    }, 100);
  };

  return (
    <div className="fusion-dashboard">
      <header className="fusion-header">
        <div className="fh-left">
           <div className="fh-badge"><Fingerprint size={10} /> ATMOSPHERIC v4.2 PRO</div>
           <h1>Fusion-Direct <span className="text-secondary">Text Engine</span></h1>
           <p className="tiny text-slate-500 uppercase font-black tracking-widest mt-1">Multi-stage neural synthesis from semantic prompts.</p>
        </div>
        <div className="fh-right d-flex align-items-center gap-4">
           {currentStep > 0 && (
             <div className="step-nav-pills d-flex gap-2">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`step-dot ${currentStep === s ? 'active' : ''} ${currentStep > s ? 'done' : ''}`} />
                ))}
             </div>
           )}
           <div className="gpu-cluster-card p-3 glass-card">
              <div className="gpu-label-v4 tiny font-black uppercase text-slate-400 d-flex align-items-center gap-2">
                 <Cpu size={12} className="text-emerald-400" /> GPU Cluster: Active
              </div>
              <div className="gpu-mini-progress mt-1">
                 <motion.div 
                    className="gpu-fill" 
                    animate={{ width: isGenerating ? '92%' : '18%' }} 
                    transition={{ duration: 1 }}
                 />
              </div>
           </div>
        </div>
      </header>

      <PromptBar 
        placeholder="Describe a cinematic scene you want to synthesize..."
        onExecute={handleCommandExecute}
        isProcessing={isGenerating}
      />

      <div className="fusion-grid mt-5">
        <aside className="fusion-control-panel glass-card p-4">
           <div className="mode-switcher-v4 d-flex gap-2 p-1 glass-card mb-5">
              <button className="mode-v4-btn active"><Video size={14} /> Direct</button>
              <button className="mode-v4-btn"><Play size={14} /> Storyboard</button>
           </div>

           <AnimatePresence mode="wait">
              {currentStep === 0 ? (
                <motion.div 
                   key="hub-idle"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                >
                   <label className="fusion-label"><Activity size={14} className="text-primary" /> Engine Readiness</label>
                   <div className="glass-card p-4 text-center">
                      <div className="status-blip-large active mx-auto mb-3" />
                      <h3 className="tiny font-black uppercase text-white">Nucleus Connected</h3>
                      <p className="tiny text-slate-500 mt-2">Enter a command above to activate the sequential production wizard.</p>
                   </div>
                </motion.div>
              ) : currentStep === 1 ? (
                <motion.div 
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="fusion-module"
                >
                   <label className="fusion-label"><Sparkles size={14} className="text-warning" /> 01. Concept Script</label>
                   <div className="fusion-input-wrap mb-4">
                      <textarea 
                        className="fusion-textarea" 
                        value={formData.prompt}
                        onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                      />
                   </div>
                   <button className="synth-vision-btn" onClick={() => setCurrentStep(2)}>
                      Configure Directives <ChevronRight size={14} />
                   </button>
                </motion.div>
              ) : currentStep === 2 ? (
                <motion.div 
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="fusion-module"
                >
                   <label className="fusion-label"><Settings size={14} className="text-info" /> 02. Cine-Direction</label>
                   <div className="glass-card p-3 mb-4">
                      {/* Placeholder for direction settings */}
                      <p className="tiny text-slate-500 mb-0">Camera Motion, Styles, and Lighting calibration will appear here.</p>
                   </div>
                   <button className="synth-vision-btn" onClick={handleGenerate}>
                      Start Synthesis <Zap size={14} className="ms-2" />
                   </button>
                   <button className="btn btn-link tiny uppercase text-slate-500 mt-2 w-100" onClick={() => setCurrentStep(1)}>Back to Concept</button>
                </motion.div>
              ) : null}
           </AnimatePresence>
        </aside>

        <main className="fusion-viewport-container">
           <div className="neural-viewport-v4 glass-card">
              <div className="nv-header d-flex justify-content-between">
                 <div className="tiny font-monospace text-slate-500 d-flex align-items-center gap-2"><div className="status-blip active" /> {tickerText}</div>
                 <div className="tiny font-monospace text-slate-500">SYNC_ID: {isGenerating ? 'ATMOS_890' : 'READY'}</div>
              </div>

              <div className="nv-content d-flex flex-column align-items-center justify-content-center">
                   <AnimatePresence>
                      {isGenerating ? (
                        <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           className="neural-computing-portal"
                        >
                           <div className="neural-grid-scan"></div>
                           <div className="data-pulse-line"></div>
                           <div className="cyber-corner tr"></div>
                           <div className="cyber-corner bl"></div>
                           <div className="neural-orb-center">
                              <Zap size={40} className="text-secondary" />
                           </div>
                           <div className="nv-progress-container mt-4">
                              <motion.div className="nv-progress-fill" style={{ width: `${genProgress}%` }} />
                           </div>
                        </motion.div>
                      ) : resultVideo ? (
                        <div className="result-video-wrapper w-100 h-100 p-2">
                           <video src={resultVideo} controls autoPlay loop className="w-100 h-100 rounded-xl object-cover shadow-2xl" />
                        </div>
                      ) : (
                        <div className="nv-placeholder text-center">
                           <Maximize size={48} className="text-slate-800" />
                           <h3 className="fw-900 uppercase tracking-tighter text-slate-700 mt-4">Neural Field Ready</h3>
                           <p className="tiny text-slate-500 uppercase font-black tracking-widest">Provide semantic command to manifest visual context.</p>
                        </div>
                      )}
                   </AnimatePresence>
              </div>

              <div className="nv-footer d-flex justify-content-between align-items-center">
                 <div className="v-mini-actions d-flex gap-3">
                    <button className="v-mini-btn-v4"><Volume2 size={14} /></button>
                    <button className="v-mini-btn-v4"><HistoryIcon size={14} /></button>
                 </div>
                 <div className="d-flex align-items-center gap-3">
                    <span className="tiny font-monospace text-emerald-400">ATMOS-MASTER-v4</span>
                    <button className="opt-v4-btn"><Settings size={14} /> Optimization</button>
                 </div>
              </div>
           </div>

           <div className="visual-archive-v4 mt-5">
              <header className="archive-header-v4 d-flex align-items-center gap-3 mb-4">
                 <Play size={12} fill="currentColor" />
                 <span className="uppercase font-black tracking-widest text-sm text-slate-300">Visual Archive</span>
                 <span className="tiny-count-v4">{recentGens.length} CREATIONS</span>
              </header>
              <div className="archive-grid-v4">
                 {recentGens.map(gen => (
                    <div key={gen.id} className="v-archive-card-v4">
                       <div className="v-thumb-wrap">
                          <img src={gen.img} alt="" />
                          <div className="v-badge-v4">{gen.type}</div>
                       </div>
                       <div className="v-info-v4 d-flex justify-content-between align-items-center p-3">
                          <div>
                            <h4 className="tiny font-black text-white m-0">{gen.title}</h4>
                            <span className="tiny text-slate-500">{gen.date}</span>
                          </div>
                          <div className="d-flex gap-2">
                             <button className="v-arch-action-btn"><Download size={10} /></button>
                             <button className="v-arch-action-btn"><Share2 size={10} /></button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

const ChevronRight = ({ size, className }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>;

export default TextToVideo;
