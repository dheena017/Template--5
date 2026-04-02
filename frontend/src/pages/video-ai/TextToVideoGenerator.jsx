import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Fingerprint, 
  Cpu, 
  Video, 
  Image as ImageIcon, 
  Activity, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import usePreferences from '../../hooks/usePreferences';
import PromptBar from '../../components/common/PromptBar/PromptBar';
import { api } from '../../services/api';

// Reuse steps from ImageToVideo since they are generic enough
import Step1Brainstorm from './ImageToVideo/Step1Brainstorm';
import Step2Parameters from './ImageToVideo/Step2Parameters';
import Step5Review from './ImageToVideo/Step5Review';

import './ImageToVideo/ImageToVideo.css';

const TextToVideoGenerator = () => {
  const navigate = useNavigate();
  const { getPreference, setPreference } = usePreferences();
  
  const [currentStep, setCurrentStep] = useState(0); // 0 = Hub, 1-5 = Production
  const [formData, setFormData] = useState(() => {
    const saved = getPreference('video_text_to_video_settings', null);
    return saved || {
      concept: '',
      scenes: [],
      promptElements: { subject: '', setting: '', action: '', style: 'Cinematic', audio: true }
    };
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [tickerText, setTickerText] = useState('HUB SIGNAL STABLE');
  const [resultVideo, setResultVideo] = useState(null);
  const pollIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearTimeout(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, []);

  // Save form preferences
  useEffect(() => {
    setPreference('video_text_to_video_settings', formData);
  }, [formData, setPreference]);

  const composedPrompt = useMemo(() => {
    const p = formData.promptElements;
    return [p.subject, p.setting, p.action, `Style: ${p.style}`].filter(Boolean).join('. ');
  }, [formData.promptElements]);

  const handleUpdateData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleCommandExecute = (val) => {
    handleUpdateData({ 
        concept: val,
        promptElements: { ...formData.promptElements, subject: val }
    });
    setCurrentStep(1); 
  };

  const handleGenerate = async () => {
    if (pollIntervalRef.current) {
      clearTimeout(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }

    setCurrentStep(4); // Synthesis Phase
    setIsGenerating(true);
    setResultVideo(null);
    setGenProgress(0);
    setTickerText('INITIATING TEXT SYNTHESIS...');

    try {
        const payload = {
            prompt: composedPrompt,
            mode: 'text-to-video',
          settings: formData.promptElements
        };
        const res = await api.video.generate(payload);
        if (res && res.job_id) {
            pollForResults(res.job_id);
        } else {
            throw new Error("Invalid job-id response");
        }
    } catch (err) {
        console.error("Text synthesis failed:", err);
        setIsGenerating(false);
        setTickerText('CONNECTION ABORTED');
    }
  };

  const pollForResults = async (jobId) => {
    const schedulePoll = () => {
      pollIntervalRef.current = setTimeout(async () => {
      try {
        const status = await api.video.status(jobId);
        if (status.progress !== undefined && status.progress !== null) setGenProgress(status.progress);
        if (status.status === 'completed' && status.video_url) {
          clearTimeout(pollIntervalRef.current);
          pollIntervalRef.current = null;
          setResultVideo(status.video_url);
          setIsGenerating(false);
          setTickerText('VISION SYNTHESIZED');
          setCurrentStep(5);
        } else if (status.status === 'failed') {
          clearTimeout(pollIntervalRef.current);
          pollIntervalRef.current = null;
          setIsGenerating(false);
          setTickerText('SYNTHESIS FAILED');
        } else {
          schedulePoll();
        }
      } catch (err) {
        console.error("Polling error:", err);
        schedulePoll();
      }
      }, 2500);
    };

    schedulePoll();
  };

  const handleRestart = () => {
    if (pollIntervalRef.current) {
      clearTimeout(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setFormData({
      concept: '',
      scenes: [],
      promptElements: { subject: '', setting: '', action: '', style: 'Cinematic', audio: true }
    });
    setCurrentStep(0);
  };

  return (
    <div className="fusion-dashboard">
      <header className="fusion-header">
        <div className="fh-left">
           <div className="fh-badge"><Fingerprint size={10} /> NUCLEUS v4.2 TEXT</div>
           <h1 className="display-title">Fusion-Direct <span className="text-secondary">Text Engine</span></h1>
           <p className="tiny text-slate-500 uppercase font-black tracking-widest mt-1">Generate multi-scene cinematic sequences directly from semantic vision concepts.</p>
        </div>
        <div className="fh-right d-flex align-items-center gap-4">
           {currentStep > 0 && (
             <div className="step-nav-pills d-flex gap-2">
                {[1, 2, 4, 5].map(s => (
                   <div 
                     key={s} 
                     className={`step-dot ${currentStep === s ? 'active' : ''} ${currentStep > s ? 'done' : ''}`} 
                     onClick={() => s < currentStep && setCurrentStep(s)}
                     style={{ cursor: s < currentStep ? 'pointer' : 'default' }}
                   />
                ))}
             </div>
           )}
           <div className="gpu-cluster-card p-3 glass-card">
              <div className="gpu-label-v4 tiny font-black uppercase text-slate-400 d-flex align-items-center gap-2">
                 <Cpu size={12} className="text-emerald-400" /> Neural State
              </div>
              <div className="gpu-mini-progress mt-1">
                <motion.div 
                    className="gpu-fill" 
                    animate={{ width: isGenerating ? '92%' : '12%' }} 
                    transition={{ duration: 1 }}
                />
              </div>
           </div>
        </div>
      </header>

      <PromptBar 
        placeholder="Manifest your cinematic vision through semantic synthesis..."
        onExecute={handleCommandExecute}
        isProcessing={isGenerating}
      />

      <div className="fusion-grid mt-5">
        <aside className="fusion-control-panel glass-card p-4">
           <div className="mode-switcher-v4 d-flex gap-2 p-1 glass-card mb-5">
              <button className="mode-v4-btn active"><Video size={14} /> Text-to-Video</button>
              <button className="mode-v4-btn" onClick={() => navigate('/image-to-video')}><ImageIcon size={14} /> Image-to-Video</button>
           </div>

           <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div 
                   key="idle"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="fusion-module"
                >
                   <label className="fusion-label"><Activity size={14} className="text-primary" /> Engine Status</label>
                   <div className="glass-card p-4 text-center border-none" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <Zap size={32} className="text-warning mb-3" />
                      <h3 className="tiny font-black uppercase text-white">Direct Pipe Active</h3>
                      <p className="tiny text-slate-500 mt-2">Initialize your vision via prompt to start the multi-stage production.</p>
                   </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <Step1Brainstorm 
                   formData={formData} 
                   onUpdate={handleUpdateData} 
                   onNext={() => setCurrentStep(2)} 
                />
              )}

              {currentStep === 2 && (
                <Step2Parameters 
                   formData={formData} 
                   onUpdate={handleUpdateData} 
                   onNext={handleGenerate}
                   onBack={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 4 && (
                <div className="processing-wizard-aura brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Activity size={10} /> CHAPTER 4</label>
                      <h2 className="display-6 fw-900 border-none text-white">Direct Synthesis</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Synthesizing vision through semantic direct pipe. GPU allocation: 100%.</p>
                   </div>
                   <div className="glass-card p-5 text-center border-none" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="status-blip-large active mx-auto mb-4" />
                      <h4 className="tiny font-black text-white uppercase tracking-widest">{tickerText}</h4>
                      <div className="nv-progress-container mt-4" style={{ height: '4px' }}>
                         <motion.div 
                            className="nv-progress-fill" 
                            animate={{ width: `${genProgress}%` }}
                         />
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 5 && (
                <Step5Review 
                   resultVideo={resultVideo} 
                   onRestart={handleRestart}
                   onTweak={() => setCurrentStep(2)}
                />
              )}
           </AnimatePresence>
        </aside>

        <section className="fusion-viewport-container">
           <div className="neural-viewport-v4">
              <div className="nv-header">
                 <div className="d-flex align-items-center gap-3">
                    <div className="status-blip active" />
                    <span className="tiny font-black text-white uppercase tracking-widest">Master Viewport</span>
                 </div>
                 <div className="d-flex gap-2">
                    <button className="v-mini-btn-v4"><Zap size={12} /></button>
                    <button className="v-mini-btn-v4"><Activity size={12} /></button>
                 </div>
              </div>
              <div className="nv-content">
                 <AnimatePresence mode="wait">
                    {resultVideo ? (
                      <motion.div 
                        key="video"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="result-video-wrapper h-100"
                      >
                         <video src={resultVideo} autoPlay loop muted className="w-100 h-100 object-cover" />
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="nv-placeholder h-100 d-grid place-items-center"
                      >
                         <div className="text-center">
                            <div className="nv-placeholder-icon mb-4"><Video size={32} /></div>
                            <h4 className="tiny font-black text-slate-500 uppercase">Awaiting Synthesis</h4>
                         </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default TextToVideoGenerator;