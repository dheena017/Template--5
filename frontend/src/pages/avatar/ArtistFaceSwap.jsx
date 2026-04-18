import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Sparkles, 
  Download, 
  Zap, 
  ImageIcon, 
  User, 
  Activity, 
  Shield, 
  ChevronRight, 
  Layers,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import '../video-ai/ImageToVideo/ImageToVideo.css';
import '../../styles/pages/avatar/FaceSwap.css';

const FaceSwap = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    sourceFile: null,
    targetFile: null,
    sourcePreview: null,
    targetPreview: null,
    jobId: null,
    resultUrl: null
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('IDLE');

  const handleFileUpload = (type, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        [`${type}File`]: file,
        [`${type}Preview`]: preview
      }));
    }
  };

  const handleInitializeSync = async () => {
    setCurrentStep(3); // Syncing Phase
    setIsProcessing(true);
    setProgress(10);
    setStatusMessage('UPLOADING ASSETS TO NEURAL CLUSTER...');

    try {
      // Step 1: Upload (Mock simulation for UI)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProgress(40);
      setStatusMessage('FUSING FACIAL GEOMETRY...');

      // Step 2: Trigger Backend
      const res = await api.video.faceswap({
         source: 'mock_uploaded_source', 
         target: 'mock_uploaded_target'
      });
      
      if (res.job_id) {
         setFormData(p => ({ ...p, jobId: res.job_id }));
         pollStatus(res.job_id);
      }
    } catch (e) {
      setIsProcessing(false);
      setStatusMessage('NEURAL HANDSHAKE FAILED');
    }
  };

  const pollStatus = async (id) => {
    const interval = setInterval(async () => {
       try {
          const res = await api.video.status(id);
          setProgress(res.progress || progress);
          setStatusMessage(res.status || 'SYNCHRONIZING...');
          
          if (res.status === 'completed') {
             clearInterval(interval);
             setIsProcessing(false);
             setFormData(p => ({ ...p, resultUrl: res.video_url }));
             setCurrentStep(4);
          }
       } catch (e) {
          clearInterval(interval);
       }
    }, 2500);
  };

  return (
    <div className="fusion-dashboard">
      <header className="fusion-header">
        <div className="fh-left">
           <div className="fh-badge"><Shield size={10} /> IDENTITY SYNC v5.2</div>
           <h1 className="display-title">Aura <span className="text-secondary text-pink-400">Identity Sync</span></h1>
           <p className="tiny text-slate-500 uppercase font-black tracking-widest mt-1">Professional cinematic face-swapping & neural re-skinning studio.</p>
        </div>
        <div className="fh-right d-flex align-items-center gap-4">
           {currentStep > 1 && (
             <div className="step-nav-pills d-flex gap-2">
                {[1, 2, 3, 4].map(s => (
                   <div 
                     key={s} 
                     className={`step-dot ${currentStep === s ? 'active' : ''} ${currentStep > s ? 'done' : ''}`} 
                   />
                ))}
             </div>
           )}
           <div className="gpu-cluster-card p-3 glass-card">
              <div className="gpu-label-v4 tiny font-black uppercase text-slate-400 d-flex align-items-center gap-2">
                 <Activity size={12} className="text-pink-400" /> GPU Sync Load
              </div>
              <div className="gpu-mini-progress mt-1">
                <motion.div 
                    className="gpu-fill" 
                    animate={{ width: isProcessing ? '92%' : '4%' }} 
                    transition={{ duration: 1.5 }}
                />
              </div>
           </div>
        </div>
      </header>

      <div className="fusion-grid mt-5">
        <aside className="fusion-control-panel glass-card p-4">
           <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="brainstorm-wizard-v4"
                >
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-pink-400 d-flex align-items-center gap-2"><Layers size={10} /> CHAPTER 1</label>
                      <h2 className="display-6 fw-900 border-none text-white">Source Anchors</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Select the face (Source) and the body/video (Target).</p>
                   </div>

                   <div className="glass-card p-4 mb-4">
                      <label className="tiny-label mb-3 text-white uppercase">Neural Source Face</label>
                      <div className="upload-zone-aura" onClick={() => document.getElementById('source-input').click()}>
                        {formData.sourcePreview ? (
                          <img src={formData.sourcePreview} className="preview-fit" alt="Source" />
                        ) : (
                          <>
                             <User size={32} className="text-pink-400 mb-2 mx-auto" />
                             <p className="tiny font-black uppercase">Upload Source Face</p>
                          </>
                        )}
                        <input id="source-input" type="file" hidden onChange={(e) => handleFileUpload('source', e)} />
                      </div>
                   </div>

                   <div className="glass-card p-4 mb-4">
                      <label className="tiny-label mb-3 text-white uppercase">Neural Target Asset</label>
                      <div className="upload-zone-aura" onClick={() => document.getElementById('target-input').click()}>
                        {formData.targetPreview ? (
                          <img src={formData.targetPreview} className="preview-fit" alt="Target" />
                        ) : (
                          <>
                             <Upload size={32} className="text-slate-400 mb-2 mx-auto" />
                             <p className="tiny font-black uppercase">Upload Target Body / Video</p>
                          </>
                        )}
                        <input id="target-input" type="file" hidden onChange={(e) => handleFileUpload('target', e)} />
                      </div>
                   </div>

                   <div className="wizard-footer-aura mt-5">
                      <button 
                        className="primary-aura-btn w-100" 
                        disabled={!formData.sourceFile || !formData.targetFile}
                        onClick={() => setCurrentStep(3)}
                      >
                         <span>Synthesize Identity</span>
                         <Sparkles size={18} />
                      </button>
                   </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <div key="step3" className="processing-wizard-aura brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-pink-400 d-flex align-items-center gap-2"><Activity size={10} /> NEURAL SYNCING</label>
                      <h2 className="display-6 fw-900 border-none text-white">Identity Fusion</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Warping facial anchors. Blending skin tones and temporal facial shadows.</p>
                   </div>
                   <div className="glass-card p-5 text-center border-none" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="status-blip-large active mx-auto mb-4 bg-pink-500" />
                      <h4 className="tiny font-black text-white uppercase tracking-widest">{statusMessage}</h4>
                      <div className="nv-progress-container mt-4" style={{ height: '4px' }}>
                         <motion.div 
                            className="nv-progress-fill" 
                            style={{ background: 'linear-gradient(90deg, #ec4899, #8b5cf6)' }}
                            animate={{ width: `${progress}%` }}
                         />
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div key="step4" className="brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-pink-400 d-flex align-items-center gap-2"><Check size={10} /> FINAL CHAPTER</label>
                      <h2 className="display-6 fw-900 border-none text-white">Identity Fused</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">The identity has been successfully shifted. Ready for cinematic export.</p>
                   </div>

                   <div className="glass-card p-4 mb-4 text-center">
                      <video 
                         src={formData.resultUrl} 
                         className="result-video-preview w-100 rounded-lg mb-3" 
                         controls 
                         autoPlay
                      />
                      <p className="tiny text-pink-400 font-black">STABILITY: 99.4%</p>
                   </div>

                   <div className="wizard-footer-aura mt-5">
                      <button className="primary-aura-btn w-100 mb-3" onClick={() => window.open(formData.resultUrl)}>
                         <Download size={18} />
                         <span>Download Cinematic Master</span>
                      </button>
                      <button className="secondary-aura-btn w-100" onClick={() => setCurrentStep(1)}>
                         Shift New Identity
                      </button>
                   </div>
                </div>
              )}
           </AnimatePresence>
        </aside>

        <section className="fusion-viewport-container">
           <div className="neural-viewport-v4 sync-viewport">
              <div className="nv-header border-bottom border-pink-500/20">
                 <div className="d-flex align-items-center gap-3">
                    <div className="status-blip active bg-pink-500" />
                    <span className="tiny font-black text-white uppercase tracking-widest">Visual Anchor Sync Monitor</span>
                 </div>
              </div>
              <div className="nv-content d-grid place-items-center">
                 <div className="sync-monitor-grid w-100 h-100 p-5">
                    {currentStep < 3 ? (
                      <div className="d-flex justify-content-center align-items-center h-100 gap-5">
                         <div className={`sync-box ${formData.sourcePreview ? 'active' : ''}`}>
                            {formData.sourcePreview ? <img src={formData.sourcePreview} alt="Source" /> : <User size={40} />}
                            <label>SOURCE</label>
                         </div>
                         <Zap className="text-pink-400" size={32} />
                         <div className={`sync-box ${formData.targetPreview ? 'active' : ''}`}>
                            {formData.targetPreview ? <img src={formData.targetPreview} alt="Target" /> : <Layers size={40} />}
                            <label>TARGET</label>
                         </div>
                      </div>
                    ) : (
                       <div className="fusion-active-frame text-center">
                          <motion.div 
                             animate={{ opacity: [0.3, 0.7, 0.3] }}
                             transition={{ repeat: Infinity, duration: 1.5 }}
                             className="sync-overlay-v5"
                          />
                          <ImageIcon size={100} className="text-pink-400 mx-auto opacity-20 mb-4" />
                          <p className="tiny font-black text-white uppercase tracking-widest">Neural Re-projection In Progress...</p>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default FaceSwap;
