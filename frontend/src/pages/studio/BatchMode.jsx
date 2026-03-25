import React, { useEffect, useState } from 'react'
import { Upload, Settings, Play, FileText, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import '../../styles/pages/studio/BatchMode.css'

const BatchMode = () => {
  const [files, setFiles] = useState([])
  const [batchName, setBatchName] = useState('')
  const [template, setTemplate] = useState('standard')
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState(null)
  const [_jobId, setJobId] = useState(null)

  useEffect(() => {
    logger.log('BATCH', 'Component mounted')
  }, [])

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...newFiles])
    logger.log('BATCH', 'Files uploaded', { count: newFiles.length, totalFiles: files.length + newFiles.length })
  }

  const removeFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
  }

  const handleProcessBatch = async () => {
    if (files.length === 0) return
    logger.log('BATCH', 'Starting batch processing', { fileCount: files.length, template })
    setIsProcessing(true)
    setStatus({ status: 'Uploading files', progress: 5 })

    try {
      const fileUrls = []
      for (let i = 0; i < files.length; i++) {
        setStatus({ status: `Uploading file ${i + 1} of ${files.length}`, progress: Math.max(5, Math.floor((i / files.length) * 30)) })
        const uploadRes = await api.uploadFile(files[i])
        if (!uploadRes || !uploadRes.url) throw new Error(`Failed to upload ${files[i].name}`)
        fileUrls.push(uploadRes.url)
      }
      
      setStatus({ status: 'Initiating Batch Job', progress: 35 })
      const res = await api.video.batch({ video_urls: fileUrls, template })
      if (res.job_id) {
        setJobId(res.job_id)
        logger.success('BATCH', 'Batch job created', { jobId: res.job_id, fileCount: fileUrls.length })
        pollStatus(res.job_id)
      } else {
        throw new Error(res.error || "Failed to start batch job.")
      }
    } catch (err) {
      logger.error('BATCH', 'Batch processing failed', err.message)
      setIsProcessing(false)
      setStatus({ status: 'Failed', progress: 0, message: err.message })
      alert('Batch processing failed: ' + err.message)
    }
  }

  const pollStatus = async (id) => {
    const timer = setInterval(async () => {
      try {
        const res = await api.video.getStatus(id)
        setStatus({ status: res.status, progress: Math.max(35, res.progress || 0) })
        if (res.status === 'Completed') {
          setIsProcessing(false)
          clearInterval(timer)
          alert(`Batch "${batchName || 'Untitled'}" completed successfully!`)
          setFiles([])
          setBatchName('')
        } else if (res.status === 'Failed') {
          setIsProcessing(false)
          clearInterval(timer)
          alert("Batch job failed: " + (res.message || "Unknown error"))
        }
      } catch (err) {
        console.error("Polling error:", err)
        clearInterval(timer)
        setIsProcessing(false)
        setStatus({ status: 'Failed', progress: 0, message: "Polling failed" })
      }
    }, 2000)
  }

  return (
    <div className="batch-mode-page">
      <div className="bm-header">
        <h1>Batch Mode</h1>
        <p>Process multiple videos with the same settings</p>
      </div>

      <div className="bm-content">
        <motion.div 
          className="bm-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bm-section">
            <label>Batch Name</label>
            <input 
              type="text" 
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              placeholder="e.g., Product Demo Videos"
            />
          </div>

          <div className="bm-section">
            <label>Video Template</label>
            <select value={template} onChange={(e) => setTemplate(e.target.value)}>
              <option value="standard">Standard Product</option>
              <option value="promotional">Promotional</option>
              <option value="tutorial">Tutorial</option>
              <option value="testimonial">Testimonial</option>
              <option value="shorts">TikTok/YouTube Shorts</option>
            </select>
          </div>

          <div className="bm-upload">
            <Upload size={32} />
            <h3>Upload Videos</h3>
            <p>Select multiple video files to process together</p>
            <input 
              type="file" 
              multiple
              accept="video/*"
              onChange={handleFileUpload}
              className="bm-hidden-input"
            />
          </div>

          {files.length > 0 && (
            <div className="bm-file-list">
              <h3>Files ({files.length})</h3>
              {files.map((file, idx) => (
                <div key={idx} className="bm-file-item">
                  <FileText size={18} />
                  <div className="bm-file-info">
                    <p>{file.name}</p>
                    <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                  </div>
                  <button 
                    className="bm-remove-btn"
                    onClick={() => removeFile(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {isProcessing && (
            <div className="progress-bar-wrap" style={{ marginTop: '20px' }}>
              <div className="progress-bar" style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div 
                  className="progress-fill-hq" 
                  initial={{ width: 0 }}
                  animate={{ width: `${status?.progress || 0}%` }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)', borderRadius: '4px' }}
                />
              </div>
              <div className="progress-stats" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>{status?.status || 'Processing'}</span>
                <strong>{status?.progress || 0}%</strong>
              </div>
            </div>
          )}

          <button 
            className="bm-process-btn"
            onClick={handleProcessBatch}
            disabled={files.length === 0 || isProcessing}
          >
            {isProcessing ? (
              <>
                <Zap size={18} className="spin" />
                Processing...
              </>
            ) : (
              <>
                <Play size={18} />
                Start Batch Processing
              </>
            )}
          </button>
        </motion.div>

        <motion.div 
          className="bm-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bm-card">
            <Settings size={24} />
            <h3>Keep Settings Consistent</h3>
            <p>All videos will be processed with the same template and settings</p>
          </div>
          <div className="bm-card">
            <Zap size={24} />
            <h3>Save Time</h3>
            <p>Process up to 50 videos at once without repetitive configuration</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BatchMode





