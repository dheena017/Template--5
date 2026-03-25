import React, { useState } from 'react'
import { 
  Sparkles, Scissors, Play, 
  ChevronRight, Video, Clock,
  BarChart, Download, Share2,
  AlertCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../services/api'
import CreditErrorMessage from '../../components/CreditErrorMessage'
import '../../styles/pages/studio/Highlights.css'

const Highlights = () => {
  const [videoUrl, setVideoUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [highlights, setHighlights] = useState([])
  const [status, setStatus] = useState(null)
  const [_error, setError] = useState(null)

  const startExtraction = async (e) => {
    e.preventDefault()
    if (!videoUrl) return
    
    setIsProcessing(true)
    setError(null)
    setHighlights([])
    
    try {
        const res = await api.video.getHighlights({ video_url: videoUrl })
        if (res.error) {
            setError(res.error)
            setIsProcessing(false)
            return
        }
        if (res.job_id) {
            pollStatus(res.job_id)
        }
    } catch {
        setError("Failed to reach processing cluster.")
        setIsProcessing(false)
    }
  }

  const pollStatus = async (id) => {
    const timer = setInterval(async () => {
        try {
            const res = await api.video.getStatus(id)
            setStatus(res)
            if (res.status === 'Completed') {
                setHighlights(res.result)
                setIsProcessing(false)
                clearInterval(timer)
            } else if (res.status === 'Failed') {
                setError("Processing failed")
                setIsProcessing(false)
                clearInterval(timer)
            }
        } catch {
            clearInterval(timer)
            setIsProcessing(false)
        }
    }, 2000)
  }

  return (
    <div className="highlights-container">
      <div className="h-header">
         <h1><Sparkles size={24} /> AI Highlights</h1>
         <p>Turn long videos into viral social clips instantly</p>
      </div>

      <div className="h-grid">
         <div className="h-input-section premium-card">
            <form onSubmit={startExtraction}>
               <label>Long-form Video URL</label>
               <div className="input-with-btn">
                  <input 
                    type="url" 
                    placeholder="Paste YouTube or drive link..." 
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                  />
                  <button type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Analyzing...' : 'Extract Moments'}
                  </button>
               </div>
               <CreditErrorMessage error={_error} />
            </form>

            <div className="analysis-stats">
               <div className="stat"><span>AI Model</span> <strong>VisionPro-V3</strong></div>
               <div className="stat"><span>Max Duration</span> <strong>2 Hours</strong></div>
            </div>
         </div>

         <div className="h-results-section">
            <AnimatePresence>
                {isProcessing ? (
                  <motion.div 
                    initial={{opacity: 0}} animate={{opacity: 1}} 
                    className="processing-loader"
                  >
                     <div className="scanner"></div>
                     <div className="progress-wrap">
                        <div className="progress-bar">
                           <motion.div 
                             className="progress-fill" 
                             initial={{ width: 0 }}
                             animate={{ width: `${status?.progress || 0}%` }}
                           />
                        </div>
                        <div className="progress-stats">
                           <span>{status?.status || 'In Queue'}</span>
                           <strong>{status?.progress || 0}%</strong>
                        </div>
                     </div>
                     <p>{status?.status === 'Processing' ? 'Determining viral semantic moments...' : 'Analyzing audio sentiment cues...'}</p>
                  </motion.div>
               ) : highlights.length > 0 ? (
                 <div className="highlights-list">
                    {highlights.map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{x: 20, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: i * 0.1}}
                        className="highlight-card premium-card"
                      >
                         <div className="h-thumb">
                            <img src={h.preview} alt="" />
                            <div className="h-time">{h.start} - {h.end}</div>
                         </div>
                         <div className="h-info">
                            <h3>{h.title}</h3>
                            <div className="h-metrics">
                               <div className="score-ring">
                                  <span>Viral Score</span>
                                  <strong>{Math.round(h.score * 100)}%</strong>
                               </div>
                               <div className="h-actions">
                                  <button className="icon-btn"><Download size={16} /></button>
                                  <button className="icon-btn"><Share2 size={16} /></button>
                                  <button className="primary-mini">Edit in Studio</button>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </div>
               ) : (
                 <div className="h-empty glass-card">
                    <Video size={48} />
                    <p>Enter a video URL to start extracting highlights.</p>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  )
}

export default Highlights





