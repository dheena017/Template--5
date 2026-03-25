import React, { useEffect, useState } from 'react'
import { Image as ImageIcon, Wand2, Zap, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import '../../styles/pages/image/GenerateImages.css'

const GenerateImages = () => {
  const [prompt, setPrompt] = useState('')
  const [aspect, setAspect] = useState('Portrait')
  const [model, setModel] = useState('Flux 2')
  const [isGenerating, setIsGenerating] = useState(false)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)

  const aspects = ['Portrait', 'Landscape']
  const models = ['Flux 2', 'Flux 2 Pro', 'Flux 1', 'Grok Imagine', 'XL Lightning', 'SD1', 'XL']

  useEffect(() => {
    logger.log('GENERATE_IMG', 'Component mounted')
    // Load previously generated images on mount
    api.getImageOutputs().then(data => {
      if (Array.isArray(data)) {
        setImages(data)
        logger.log('GENERATE_IMG', 'Previous images loaded', { count: data.length })
      }
    }).catch(err => logger.error('GENERATE_IMG', 'Failed to load images', err.message))
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description')
      return
    }

    logger.log('GENERATE_IMG', 'Starting image generation', { model, aspect })
    setIsGenerating(true)
    setError(null)
    
    const result = await api.generateImageAsset({
      prompt: prompt.trim(),
      model,
      orientation: aspect
    })

    if (result?.status === 'success' && result?.output) {
      setImages(prev => [result.output, ...prev])
      setPrompt('')
      logger.success('GENERATE_IMG', 'Image generated successfully')
    } else {
      const msg = result?.message || 'Failed to generate image'
      setError(msg)
      logger.error('GENERATE_IMG', 'Image generation failed', msg)
    }
    
    setIsGenerating(false)
  }

  return (
    <div className="generate-images-page">
      <div className="gi-header">
        <h1>Generate Images</h1>
        <p>Create stunning AI-generated artwork for your content</p>
      </div>

      <div className="gi-content">
        <motion.div 
          className="gi-create-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="gi-input-group">
            <label>Image Description</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              rows={4}
              maxLength={1000}
            />
            <div className="gi-counter">{prompt.length}/1000</div>
          </div>

          <div className="gi-grid">
            <div className="gi-control">
              <label>Orientation</label>
              <select value={aspect} onChange={(e) => setAspect(e.target.value)}>
                {aspects.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div className="gi-control">
              <label>Model</label>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {error && (
            <div className="gi-error" style={{ color: '#ff6b6b', padding: '12px', background: 'rgba(255,107,107,0.1)', borderRadius: '8px', marginTop: '12px' }}>
              ⚠️ {error}
            </div>
          )}

          <button 
            className={`gi-generate-btn ${isGenerating ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Zap size={18} className="spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Generate Image
              </>
            )}
          </button>
        </motion.div>

        {images.length > 0 && (
          <motion.div 
            className="gi-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Generated Images</h2>
            <div className="gi-grid-images">
              {images.map(img => (
                <motion.div 
                  key={img.id}
                  className="gi-image-card"
                  whileHover={{ scale: 1.05 }}
                  layoutId={`image-${img.id}`}
                >
                  <img src={img.url || img.image} alt="Generated" />
                  <div className="gi-overlay">
                    <div className="gi-meta">
                      <span className="gi-aspect">{img.orientation || img.aspect}</span>
                      <span className="gi-model">{img.model}</span>
                    </div>
                    <a href={img.url || img.image} download className="gi-download">
                      <Download size={20} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default GenerateImages





