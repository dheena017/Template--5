import React, { useState } from 'react'
import { Upload, Sparkles, Download, Zap, Image as ImageIcon, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../services/api'
import '../../styles/pages/avatar/FaceSwap.css'

const FaceSwap = () => {
  const [sourceFile, setSourceFile] = useState(null)
  const [targetFile, setTargetFile] = useState(null)
  const [sourcePreview, setSourcePreview] = useState(null)
  const [targetPreview, setTargetPreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [jobStatus, setJobStatus] = useState(null)
  const [_jobId, setJobId] = useState(null)

  const handleImageUpload = (type, e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'source') {
        setSourceFile(file)
        setSourcePreview(URL.createObjectURL(file))
      } else {
        setTargetFile(file)
        setTargetPreview(URL.createObjectURL(file))
      }
    }
  }

  const handleSwapFaces = async () => {
    if (!sourceFile || !targetFile) return

    setIsProcessing(true)
    setResult(null)
    setJobStatus({ status: 'Uploading', progress: 5 })
    
    try {
      const [sourceRes, targetRes] = await Promise.all([
        api.uploadFile(sourceFile),
        api.uploadFile(targetFile)
      ])

      if (!sourceRes.url || !targetRes.url) throw new Error("Upload failed")
      
      const res = await api.video.faceswap({
        source_url: sourceRes.url,
        target_url: targetRes.url
      })

      if (res.job_id) {
        setJobId(res.job_id)
        pollStatus(res.job_id)
      } else {
        throw new Error(res.error || "Failed to start swap job.")
      }
    } catch (err) {
      console.error(err)
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
          setResult({
            id: id,
            url: res.result.url
          })
          setIsProcessing(false)
          clearInterval(timer)
        } else if (res.status === 'Failed') {
          setIsProcessing(false)
          clearInterval(timer)
          alert("Face swap failed: " + (res.message || "Unknown error"))
        }
      } catch (err) {
        console.error("Polling error:", err)
        clearInterval(timer)
        setIsProcessing(false)
      }
    }, 2000)
  }

  return (
    <div className="faceswap-page">
      <div className="fs-header">
        <h1>Face Swap</h1>
        <p>Swap faces between images using advanced AI technology</p>
      </div>

      <div className="fs-content">
        <div className="fs-grid">
          <motion.div 
            className="fs-upload-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="fs-label"><ImageIcon size={14} /> Source Face (The face to use)</div>
            <div 
              className="fs-upload-box premium-card"
              onClick={() => document.getElementById('source-input').click()}
            >
              {sourcePreview ? (
                <img src={sourcePreview} alt="Source" className="fs-preview" />
              ) : (
                <>
                  <Upload size={40} style={{ opacity: 0.3 }} />
                  <p>Click to upload source</p>
                </>
              )}
            </div>
            <input 
              id="source-input"
              type="file" 
              accept="image/*"
              onChange={(e) => handleImageUpload('source', e)}
              className="fs-hidden-input"
            />
          </motion.div>

          <motion.div 
            className="fs-separator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles size={24} />
          </motion.div>

          <motion.div 
            className="fs-upload-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="fs-label"><User size={14} /> Target Face (The body to use)</div>
            <div 
              className="fs-upload-box premium-card"
              onClick={() => document.getElementById('target-input').click()}
            >
              {targetPreview ? (
                <img src={targetPreview} alt="Target" className="fs-preview" />
              ) : (
                <>
                  <Upload size={40} style={{ opacity: 0.3 }} />
                  <p>Click to upload target</p>
                </>
              )}
            </div>
            <input 
              id="target-input"
              type="file" 
              accept="image/*"
              onChange={(e) => handleImageUpload('target', e)}
              className="fs-hidden-input"
            />
          </motion.div>
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

        <motion.button 
          className={`fs-swap-btn ${isProcessing ? 'loading' : ''}`}
          onClick={handleSwapFaces}
          disabled={!sourceFile || !targetFile || isProcessing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isProcessing ? (
            <>
              <Zap size={18} className="spin" />
              Swapping Faces...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Swap Faces
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.div 
              className="fs-result glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="result-badge"><Sparkles size={12} /> AI Result</div>
              <h3>Face Swap Complete</h3>
              <div className="result-preview-wrap">
                <img src={result.url} alt="Result" />
              </div>
              <div className="fs-actions">
                <button className="fs-download-btn">
                  <Download size={18} />
                  Download Result
                </button>
                <button 
                  className="fs-retry-btn"
                  onClick={() => {
                    setResult(null)
                    setSourceFile(null)
                    setTargetFile(null)
                    setSourcePreview(null)
                    setTargetPreview(null)
                  }}
                >
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FaceSwap





