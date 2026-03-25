import React, { useEffect, useState, useRef } from 'react'
import { 
  Camera, Upload, Zap, Star, Sparkles, 
  Trash2, Download, RefreshCw, ChevronRight,
  Shield, Image as ImageIcon, User, HelpCircle,
  AlertCircle, CheckCircle2, Sliders, Wand2,
  Lock, History, Info, Play, Palette, Cpu
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../services/api'
import { logger } from '../../services/api'
import '../../styles/pages/studio/FaceSwap.css'

const FaceSwap = () => {
  // --- States ---
  const [sourceImage, setSourceImage] = useState(null)
  const [targetFace, setTargetFace] = useState(null)
  const [sourcePreview, setSourcePreview] = useState(null)
  const [targetPreview, setTargetPreview] = useState(null)
  const [resultImage, setResultImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [jobStatus, setJobStatus] = useState(null)
  const [activeEngine, setActiveEngine] = useState('Realistic')
  const [stamina, setStamina] = useState(145)
  const [credits, setCredits] = useState(0)

  // --- Enhancement States ---
  const [enhancements, setEnhancements] = useState({
    faceRestoration: true,
    hdUpscale: false,
    colorMatching: true
  })

  const sourceRef = useRef(null)
  const targetRef = useRef(null)

  // --- Effects ---
  useEffect(() => {
    logger.log('FACESWAP', 'Component mounted')
    fetchBalance()
  }, [])

  // Manage URL revocation specifically when previews change
  useEffect(() => {
    return () => { if (sourcePreview) URL.revokeObjectURL(sourcePreview) }
  }, [sourcePreview])

  useEffect(() => {
    return () => { if (targetPreview) URL.revokeObjectURL(targetPreview) }
  }, [targetPreview])

  const fetchBalance = async () => {
    try {
      const data = await api.billing.getBalance()
      if (data && data.credits !== undefined) setCredits(data.credits)
    } catch (err) {
      console.error("Failed to fetch balance:", err)
    }
  }

  // --- Handlers ---
  const handleSourceUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (sourcePreview) URL.revokeObjectURL(sourcePreview)
      setSourceImage(file)
      setSourcePreview(URL.createObjectURL(file))
      logger.log('FACESWAP', 'Source image uploaded', { fileName: file.name, size: file.size })
    }
  }

  const handleTargetUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (targetPreview) URL.revokeObjectURL(targetPreview)
      setTargetFace(file)
      setTargetPreview(URL.createObjectURL(file))
      logger.log('FACESWAP', 'Target face uploaded', { fileName: file.name, size: file.size })
    }
  }

  const handleSwap = async () => {
    if (!sourceImage || !targetFace) return

    logger.log('FACESWAP', 'Starting face swap process')
    setIsProcessing(true)
    setResultImage(null)
    setJobStatus({ status: 'Preprocessing assets...', progress: 5 })

    try {
      // Step 1: Upload images
      setJobStatus({ status: 'Uploading source target...', progress: 15 })
      const [sourceRes, targetRes] = await Promise.all([
        api.uploadFile(sourceImage),
        api.uploadFile(targetFace)
      ])

      if (!sourceRes?.url || !targetRes?.url) {
         throw new Error("Cloud upload failed. Please try again.")
      }

      setJobStatus({ status: 'Neural mapping in progress...', progress: 30 })
      
      // Step 2: Trigger Swap
      const res = await api.video.faceswap({
        source_url: sourceRes.url,
        target_url: targetRes.url,
        engine: activeEngine,
        enhancements: enhancements
      })

      if (res.job_id) {
        pollStatus(res.job_id)
      } else {
        throw new Error(res.error || "Failed to initialize generative neural engine.")
      }
    } catch (error) {
      console.error("Swap failed:", error)
      logger.error('FACESWAP', 'Face swap error', error.message)
      setIsProcessing(false)
      setJobStatus({ status: 'Failed', progress: 0, message: error.message })
      // Alert could be replaced by a toast component
      alert("Error: " + error.message)
    }
  }

  const pollStatus = (id) => {
    const timer = setInterval(async () => {
      try {
        const res = await api.video.getStatus(id)
        
        // Update job status with progressive feedback
        setJobStatus({
            ...res,
            status: res.status === 'Processing' ? 'Blending facial textures...' : res.status,
            progress: res.progress || (res.status === 'Processing' ? 65 : 100)
        })

        if (res.status === 'Completed' || res.status === 'Succeeded') {
          setResultImage(res.result?.url || res.url)
          setStamina(prev => Math.max(0, prev - 15))
          setIsProcessing(false)
          clearInterval(timer)
          logger.success('FACESWAP', 'Face swap completed successfully')
          fetchBalance()
        } else if (res.status === 'Failed' || res.status === 'Error') {
          setIsProcessing(false)
          clearInterval(timer)
          logger.error('FACESWAP', 'Face swap failed at remote node')
          alert("Generative process failed: " + (res.message || "Unknown neural error"))
        }
      } catch (err) {
        console.error("Polling error:", err)
        clearInterval(timer)
        setIsProcessing(false)
        logger.error('FACESWAP', 'Connection lost during polling')
      }
    }, 2500)
  }

  const resetImages = () => {
    setSourceImage(null)
    setSourcePreview(null)
    setTargetFace(null)
    setTargetPreview(null)
    setResultImage(null)
    setJobStatus(null)
    logger.log('FACESWAP', 'Workspace cleared')
  }

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a')
      link.href = resultImage
      link.download = `swap-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const toggleEnhancement = (key) => {
    setEnhancements(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="faceswap-container">
      {/* Top Utility Bar */}
      <motion.header 
        className="fs-utility-bar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="fs-title">
          <Sparkles className="icon-pulse" size={24} />
          <span>Neural Face Swap <span className="beta-badge">ULTRA v3.0</span></span>
        </div>
        <div className="fs-metrics">
          <div className="fs-metric">
            <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <Zap size={16} fill="#fbbf24" color="#fbbf24" /> 
            </div>
            <span>Stamina: <strong>{stamina}</strong></span>
          </div>
          <div className="fs-metric">
             <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <Star size={16} fill="#a855f7" color="#a855f7" /> 
            </div>
            <span>Credits: <strong>{credits}</strong></span>
          </div>
        </div>
      </motion.header>

      <div className="fs-main-layout">
        {/* Settings Sidebar */}
        <aside className="fs-settings-sidebar">
          <div className="fs-settings-header">
            <h2>Configuration</h2>
            <button className="reset-btn" onClick={resetImages} title="Reset Workspace">
               <RefreshCw size={16} />
            </button>
          </div>

          <div className="fs-settings-scroll">
            <div className="fs-setting-section">
              <label className="fs-section-label">1. Source Asset (Base)</label>
              <div 
                className={`fs-upload-slot ${sourcePreview ? 'has-file' : ''}`}
                onClick={() => sourceRef.current.click()}
              >
                {sourcePreview ? (
                  <motion.img 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    src={sourcePreview} 
                    alt="Source" 
                    className="fs-preview-img" 
                  />
                ) : (
                  <>
                    <ImageIcon className="fs-upload-icon" size={32} />
                    <p className="fs-upload-text">Upload target scene</p>
                    <span className="fs-upload-hint">Photo or Video (MP4/PNG)</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                ref={sourceRef} 
                onChange={handleSourceUpload} 
                className="fs-hidden-input" 
                accept="image/*,video/*"
              />
            </div>

            <div className="fs-setting-section">
              <label className="fs-section-label">2. Target Identity (Swap)</label>
              <div 
                className={`fs-upload-slot ${targetPreview ? 'has-file' : ''}`}
                onClick={() => targetRef.current.click()}
              >
                {targetPreview ? (
                  <motion.img 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    src={targetPreview} 
                    alt="Target" 
                    className="fs-preview-img" 
                  />
                ) : (
                  <>
                    <User className="fs-upload-icon" size={32} />
                    <p className="fs-upload-text">Reference face</p>
                    <span className="fs-upload-hint">Clear, front-facing portrait</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                ref={targetRef} 
                onChange={handleTargetUpload} 
                className="fs-hidden-input" 
                accept="image/*"
              />
            </div>

            <div className="fs-setting-section">
              <label className="fs-section-label">Neural Engine</label>
              <div className="fs-tool-selector">
                {['Classic', 'Realistic', 'Deep', 'Creative'].map(t => (
                  <button 
                    key={t}
                    className={`fs-tool-btn ${activeEngine === t ? 'active' : ''}`}
                    onClick={() => setActiveEngine(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="fs-setting-section">
              <label className="fs-section-label">Enhancements</label>
              <div className="fs-enhancements">
                  <div className="fs-checkbox-group" onClick={() => toggleEnhancement('faceRestoration')}>
                    <input type="checkbox" checked={enhancements.faceRestoration} readOnly />
                    <label>Face Restoration (GFP-GAN)</label>
                  </div>
                  <div className="fs-checkbox-group" onClick={() => toggleEnhancement('hdUpscale')}>
                    <input type="checkbox" checked={enhancements.hdUpscale} readOnly />
                    <label>Ultra HD Upscale (4K)</label>
                  </div>
                  <div className="fs-checkbox-group" onClick={() => toggleEnhancement('colorMatching')}>
                    <input type="checkbox" checked={enhancements.colorMatching} readOnly />
                    <label>Ambient Color Matching</label>
                  </div>
              </div>
            </div>
            
            <div className="fs-privacy-note">
               <div className="fs-privacy-head">
                 <Shield size={14} /> <span>End-to-End Encryption</span>
               </div>
               <p className="fs-privacy-text">Assets are processed in isolated environments and purged within 24 hours.</p>
            </div>
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="fs-content-area">
          <div className="fs-canvas-container">
            <AnimatePresence mode="wait">
              {isProcessing && (
                <motion.div 
                  className="fs-loading-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="fs-magic-spinner">
                    <div className="fs-spinner-inner"></div>
                    <div className="fs-spinner-outer"></div>
                    <Wand2 size={32} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#818cf8' }} />
                  </div>
                  
                  <motion.h3 
                    className="fs-job-status-text"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {jobStatus?.status || 'Synthesizing Neural Layers...'}
                  </motion.h3>
                  
                  <p className="fs-job-subtext">
                    Our AI is mapping facial landmarks and blending textures for a seamless result.
                  </p>
                  
                  <div className="fs-progress-wrapper">
                    <div className="fs-progress-track">
                      <motion.div 
                        className="fs-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${jobStatus?.progress || 10}%` }}
                      />
                    </div>
                    <div className="fs-progress-info">
                      <span>Neural Synergy</span>
                      <span>{jobStatus?.progress || 10}%</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {resultImage ? (
              <motion.img 
                key={resultImage}
                src={resultImage} 
                alt="Neural Result" 
                className="fs-canvas-img"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              />
            ) : sourcePreview ? (
              <img src={sourcePreview} alt="Work in Progress" className="fs-canvas-img" style={{ opacity: 0.4 }} />
            ) : (
              <div className="fs-canvas-placeholder">
                <div className="fs-placeholder-icon-wrap">
                   <div className="pulse-bg"></div>
                   <Camera size={120} strokeWidth={0.5} />
                   <div style={{ position: 'absolute', top: -20, right: -20, color: '#818cf8', opacity: 0.8 }}>
                     <Sparkles size={48} />
                   </div>
                </div>
                <div className="fs-placeholder-text">
                  <h3>Forge New Identities</h3>
                  <p>Upload a source scene and a target face to begin the neural synthesis process. High-quality assets yield cinematic results.</p>
                </div>
              </div>
            )}
          </div>

          <footer className="fs-footer">
            <div className="fs-info">
               {resultImage ? (
                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="fs-info-chip ready">
                   <CheckCircle2 size={18} /> Neural synthesis complete
                 </motion.div>
               ) : (
                 <div className="fs-info-chip waiting">
                   <Info size={18} /> Awaiting neural parameters
                 </div>
               )}
            </div>

            <div className="fs-controls">
              {resultImage && (
                <button className="fs-download-btn" onClick={handleDownload} title="Export Final Asset">
                  <Download size={20} />
                  <span>Download</span>
                </button>
              )}
              
              <button 
                className="fs-generate-btn" 
                onClick={handleSwap}
                disabled={!sourceImage || !targetFace || isProcessing}
              >
                {isProcessing ? (
                   <>
                    <RefreshCw className="icon-spin" size={20} />
                    <span>Processing...</span>
                   </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    <span>Execute Swap</span>
                    <div className="fs-cost-bubble">15</div>
                  </>
                )}
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default FaceSwap
