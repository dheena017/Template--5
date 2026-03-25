import React, { useEffect, useState } from 'react'
import { Sparkles, Upload, Zap, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/studio/InstantHighlights.css'
import { api, logger } from '../../services/api'

const InstantHighlights = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [highlights, setHighlights] = useState([])
  const [jobStatus, setJobStatus] = useState(null)
  const [_jobId, setJobId] = useState(null)

  useEffect(() => {
    logger.log('HIGHLIGHTS', 'Component mounted')
  }, [])

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      logger.log('HIGHLIGHTS', 'Video file uploaded', { fileName: file.name, size: file.size })
    }
  }

  const handleGenerateHighlights = async () => {
    if (!videoFile) return

    logger.log('HIGHLIGHTS', 'Starting highlight extraction')
    setIsProcessing(true)
    setHighlights([])
    setJobStatus({ status: 'Uploading Video', progress: 5 })

    try {
      const uploadRes = await api.uploadFile(videoFile)
      if (!uploadRes.url) throw new Error("Upload failed")
      
      const res = await api.video.getHighlights({
        video_url: uploadRes.url
      })

      if (res.job_id) {
        setJobId(res.job_id)
        logger.success('HIGHLIGHTS', 'Highlights job created', { jobId: res.job_id })
        pollStatus(res.job_id)
      } else {
        throw new Error(res.error || "Failed to start highlights job.")
      }
    } catch (err) {
      logger.error('HIGHLIGHTS', 'Highlight extraction failed', err.message)
      setIsProcessing(false)
      setJobStatus({ status: 'Failed', progress: 0, message: err.message })
    }
  }

  const pollStatus = async (id) => {
    const timer = setInterval(async () => {
      try {
        const res = await api.video.getStatus(id)
        setJobStatus(res)
        if (res.status === 'Completed') {
          setHighlights(res.result.highlights || [])
          setIsProcessing(false)
          clearInterval(timer)
        } else if (res.status === 'Failed') {
          setIsProcessing(false)
          clearInterval(timer)
          alert("Highlights generation failed: " + (res.message || "Unknown error"))
        }
      } catch (err) {
        console.error("Polling error:", err)
        clearInterval(timer)
        setIsProcessing(false)
      }
    }, 2000)
  }

  return (
    <div className="instant-highlights-page">
      <div className="ih-header">
        <h1>Instant Highlights</h1>
        <p>AI-powered video clip extraction from long-form content</p>
      </div>

      <div className="ih-content">
        <motion.div 
          className="ih-upload-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="ih-upload-box">
            <Upload size={48} />
            <h3>Upload Your Video</h3>
            <p>Drop your video file here or click to browse</p>
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleFileUpload}
              className="ih-hidden-input"
            />
            {videoFile && (
              <div className="ih-file-info">
                <p>📹 {videoFile.name}</p>
                <small>{(videoFile.size / 1024 / 1024).toFixed(2)} MB</small>
              </div>
            )}
          </div>

          {isProcessing && (
            <div className="progress-bar-wrap">
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill-hq" 
                  initial={{ width: 0 }}
                  animate={{ width: `${jobStatus?.progress || 0}%` }}
                />
              </div>
              <div className="progress-stats">
                <span>{jobStatus?.status || 'Processing'}</span>
                <strong>{jobStatus?.progress || 0}%</strong>
              </div>
            </div>
          )}

          <button 
            className={`ih-generate-btn ${isProcessing ? 'loading' : ''}`}
            onClick={handleGenerateHighlights}
            disabled={!videoFile || isProcessing}
          >
            {isProcessing ? (
              <>
                <Zap size={18} className="spin" />
                Generating Highlights...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Highlights
              </>
            )}
          </button>
        </motion.div>

        {highlights.length > 0 && (
          <motion.div 
            className="ih-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Generated Highlights</h2>
            <div className="ih-clips-grid">
              {highlights.map((clip, idx) => (
                <motion.div 
                  key={idx}
                  className="ih-clip-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="ih-clip-preview">
                    <div className="ih-score-badge">{Math.round(clip.score * 100)}%</div>
                    <div className="ih-timestamp">{clip.timestamp}</div>
                  </div>
                  <p className="ih-clip-title">{clip.title}</p>
                  <button className="ih-download-btn">
                    <Download size={16} />
                    Export
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default InstantHighlights





