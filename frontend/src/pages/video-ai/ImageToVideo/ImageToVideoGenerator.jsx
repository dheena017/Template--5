import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Play, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Activity, 
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
  Star,
  Cpu,
  Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import usePreferences from '../../../hooks/usePreferences';
import { api, logger } from '../../../services/api';
import './ImageToVideo.css';

// Lazy load steps for performance
import Step1Brainstorm from './Step1Brainstorm';
import Step2Parameters from './Step2Parameters';
import Step3Frames from './Step3Frames';
import Step5Review from './Step5Review';

const ImageToVideoGenerator = () => {
  const navigate = useNavigate();
  const { getPreference, setPreference } = usePreferences();

  // Restore state from preferences for seamless flow
  const [currentStep, setCurrentStep] = useState(0); 
  const [formData, setFormData] = useState(() => {
    const saved = getPreference('video_image_to_video_settings', null);
    return saved || {
      image: null,
      concept: '',
      motionBucket: 127,
      fps: 6,
      aspectRatio: '16:9',
      style: 'Cinematic',
      music: 'None',
      quality: 'HD'
    };
  });

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('IDLE');
  const [jobId, setJobId] = useState(null);
  const [finalVideo, setFinalVideo] = useState(null);

  // Auto-sync state to preferences
  useEffect(() => {
    setPreference('video_image_to_video_settings', formData);
  }, [formData, setPreference]);

  const handleStartGeneration = async () => {
    setCurrentStep(4); // Enter synthesis viewport
    setIsSynthesizing(true);
    setProgress(5);
    setStatusMessage('Handshaking with Neural Cluster...');

    try {
      const res = await api.video.generate({
        mode: 'image-to-video',
        prompt: formData.concept,
        image_seed: formData.image,
        settings: {
           motionBucket: formData.motionBucket,
           fps: formData.fps,
           quality: formData.quality,
           music: formData.music
        }
      });

      if (res.job_id) {
        setJobId(res.job_id);
        pollJobStatus(res.job_id);
      }
    } catch (err) {
      logger.error('Video Synthesis', 'Failed to initialize chain', err);
      setStatusMessage('Synthesis Error: ' + err.message);
      setIsSynthesizing(false);
    }
  };

  const pollJobStatus = useCallback(async (id) => {
    const interval = setInterval(async () => {
      try {
        const res = await api.video.status(id);
        setProgress(res.progress || 0);
        setStatusMessage(res.status || 'Synthesizing...');

        if (res.is_ready) {
          clearInterval(interval);
          setFinalVideo(res.url);
          setIsSynthesizing(false);
          setCurrentStep(5);
        }
      } catch (err) {
        clearInterval(interval);
        logger.error('Video Sync', 'Heartbeat lost', err);
      }
    }, 3000);
  }, []);

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="fusion-dashboard">
      <header className="production-header-aura">
         <div className="ph-left">
            <div className="fh-badge"><ShieldCheck size={10} /> NEURAL VIDEO ENGINE v4.2</div>
            <h1 className="display-title font-black text-white">Aura <span className="text-secondary">Synthesis Studio</span></h1>
            <p className="tiny text-slate-500 uppercase font-black tracking-widest mt-1">Industrial-grade image-to-video production pipeline.</p>
         </div>
         <div className="ph-right d-flex gap-4">
            <div className="step-nav-pills d-flex gap-2">
               {[1, 2, 3, 4, 5].map(s => (
                  <div key={s} className={`step-dot ${currentStep === s ? 'active' : ''} ${currentStep > s ? 'done' : ''}`} />
               ))}
            </div>
            <div className="gpu-card-mini p-3 glass-card">
               <div className="tiny font-black text-slate-400 d-flex align-items-center gap-2 mb-1 uppercase">
                  <Cpu size={12} className="text-blue-400" /> GPU Load: 12%
               </div>
               <div className="aura-mini-progress">
                  <motion.div className="fill" animate={{ width: isSynthesizing ? '85%' : '10%' }} />
               </div>
            </div>
         </div>
      </header>

      <div className="fusion-layout mt-5">
         <aside className="fusion-sidebar-panel glass-card p-4">
            <AnimatePresence mode="wait">
               {currentStep === 0 && (
                 <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="wizard-header mb-5">
                       <label className="tiny-label text-blue-400">GETTING STARTED</label>
                       <h2 className="display-5 font-black text-white">Video Hub</h2>
                       <p className="tiny text-slate-500 uppercase font-black tracking-widest">Select a production path to begin.</p>
                    </div>
                    <button className="path-card-aura glass-card p-4 mb-3 w-100 text-start" onClick={() => setCurrentStep(1)}>
                       <Sparkles size={24} className="text-blue-400 mb-2" />
                       <h4 className="tiny font-black text-white m-0">NEW PRODUCTION</h4>
                       <p className="tiny text-slate-500 m-0">Start from a blank canvas or image anchor.</p>
                    </button>
                    <button className="path-card-aura glass-card p-4 w-100 text-start opacity-50" disabled>
                       <RefreshCw size={24} className="text-slate-500 mb-2" />
                       <h4 className="tiny font-black text-white m-0">RESTORE SESSION</h4>
                       <p className="tiny text-slate-500 m-0">Coming soon.</p>
                    </button>
                 </motion.div>
               )}

               {currentStep === 1 && (
                 <Step1Brainstorm 
                    formData={formData} 
                    setFormData={setFormData} 
                    onNext={nextStep} 
                 />
               )}
               
               {currentStep === 2 && (
                 <Step2Parameters 
                    formData={formData} 
                    setFormData={setFormData} 
                    onNext={nextStep} 
                    onBack={prevStep}
                 />
               )}

               {currentStep === 3 && (
                 <Step3Frames 
                    formData={formData} 
                    setFormData={setFormData} 
                    onGenerate={handleStartGeneration}
                    onBack={prevStep}
                 />
               )}

               {currentStep === 4 && (
                 <div className="processing-state-aura p-5 text-center">
                    <Waves size={48} className="text-blue-500 spin-slow mx-auto mb-4" />
                    <h3 className="tiny font-black text-white uppercase tracking-widest">{statusMessage}</h3>
                    <div className="aura-progress-main mt-4">
                       <motion.div className="fill" animate={{ width: `${progress}%` }} />
                    </div>
                    <p className="tiny text-slate-500 uppercase mt-4">Neural interpolation active</p>
                 </div>
               )}

               {currentStep === 5 && (
                 <Step5Review
                   videoUrl={finalVideo}
                   onReset={() => setCurrentStep(0)}
                 />
               )}
            </AnimatePresence>
         </aside>

         <main className="fusion-viewport-container flex-fill pe-4">
            <div className="neural-viewport glass-card h-100 d-grid place-items-center position-relative overflow-hidden">
               {currentStep === 4 ? (
                 <div className="kinetic-overlay">
                    <div className="scan-line" />
                    <motion.div 
                       animate={{ opacity: [0.2, 0.5, 0.2] }} 
                       transition={{ repeat: Infinity, duration: 2 }}
                       className="glow-core"
                    />
                 </div>
               ) : null}
               
               {finalVideo && currentStep === 5 ? (
                 <video src={finalVideo} controls autoPlay loop className="final-output-video" />
               ) : (
                 <div className="viewport-idle text-center">
                    <Sparkles size={120} className="text-slate-800 mb-4 opacity-50" />
                    <p className="tiny font-black text-slate-700 uppercase tracking-[1em]">Awaiting Synthesis</p>
                 </div>
               )}
            </div>
         </main>
      </div>
    </div>
  );
};

export default ImageToVideoGenerator;
