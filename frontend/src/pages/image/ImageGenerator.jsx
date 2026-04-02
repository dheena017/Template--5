import React, { useEffect, useState } from 'react'
import { 
  Image as ImageIcon, Video as VideoIcon, 
  Cpu, User, MoreHorizontal,
  Zap,
  Upload, Music, HelpCircle, ChevronRight,
  Sparkles, Star, Lock, RefreshCw
} from 'lucide-react'
import { api, logger } from '../../services/api'
import CreditErrorMessage from '../../components/CreditErrorMessage'
import PromptBar from '../../components/common/PromptBar/PromptBar'
import '../../styles/pages/image/ImageGenerator.css'

const ImageGenerator = () => {
  const [activeTab, setActiveTab] = useState('Image')
  const [stamina, setStamina] = useState(130)
  const [credit, setCredit] = useState(0)
  const [promptText, setPromptText] = useState('')
  const [selectedVideoModel, setSelectedVideoModel] = useState('WAN 2.6')
  const [selectedImageModel, setSelectedImageModel] = useState('Flux 2')
  const [selectedImageTool, setSelectedImageTool] = useState('Controlled Text-to-image')
  const [orientation, setOrientation] = useState('Portrait')
  const [usesRemaining, setUsesRemaining] = useState(3)
  const [outputs, setOutputs] = useState([])
  const [generateState, setGenerateState] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const videoCostMap = {
    'WAN 2.6': 14,
    'WAN 2.5': 13,
    'WAN 2.2': 12,
    'Grok Imagine': 15,
    'Sora 2': 20,
    'Kling 2.6': 18,
    'Seedance 1.0': 11,
    'Veo 3.1': 21,
    'Veo 3.0': 19,
    'WAN 2.1': 10,
    'Kling 2.1': 14
  }

  const imageCostMap = {
    'Grok Imagine': 12,
    'Nano Banana': 8,
    'Nano Banana Pro': 13,
    'Flux 2': 9,
    'Flux 2 Pro': 14,
    'Flux 1': 7,
    'XL Lightning': 10,
    'SD1': 6,
    'XL': 8
  }

  const imageToolCostMap = {
    'Controlled Text-to-image': 3,
    'Remove background': 2,
    'Upscale': 2,
    'Inpainting from text': 4,
    'Edit image from text': 4
  }

  const videoModels = [
    'WAN 2.6',
    'WAN 2.5',
    'WAN 2.2',
    'Grok Imagine',
    'Sora 2',
    'Kling 2.6',
    'Seedance 1.0',
    'Veo 3.1',
    'Veo 3.0',
    'WAN 2.1',
    'Kling 2.1'
  ]

  const imageModels = [
    'Grok Imagine',
    'Nano Banana',
    'Nano Banana Pro',
    'Flux 2',
    'Flux 2 Pro',
    'Flux 1',
    'XL Lightning',
    'SD1',
    'XL'
  ]

  const imageTools = [
    'Controlled Text-to-image',
    'Remove background',
    'Upscale',
    'Inpainting from text',
    'Edit image from text'
  ]

  const tabs = [
    { id: 'Image', icon: <ImageIcon size={18} /> },
    { id: 'Video', icon: <VideoIcon size={18} /> },
    { id: 'AI App', icon: <Cpu size={18} /> },
    { id: 'Agent', icon: <User size={18} /> },
    { id: 'More', icon: <MoreHorizontal size={18} /> }
  ]

  const activeGenerationCost =
    activeTab === 'Video'
      ? (videoCostMap[selectedVideoModel] || 10)
      : (imageCostMap[selectedImageModel] || 8) + (imageToolCostMap[selectedImageTool] || 2)

  const canGenerate = promptText.trim().length > 0 && usesRemaining > 0 && generateState !== 'loading'

  useEffect(() => {
    logger.log('IMAGEGEN', 'Component mounted')
  }, [])

  const handleGenerateAsset = async () => {
    if (!canGenerate) return
    logger.log('IMAGEGEN', 'Starting asset generation', { model: selectedImageModel, orientation })

    setGenerateState('loading')
    setStatusMessage('Generating your image asset...')

    const result = await api.generateImageAsset({
      prompt: promptText.trim(),
      model: selectedImageModel,
      orientation
    })

    if (result?.status === 'success' && result?.output) {
      setOutputs((prev) => [result.output, ...prev].slice(0, 8))
      setUsesRemaining((prev) => Math.max(0, prev - 1))
      setGenerateState('success')
      setStatusMessage('Asset generated successfully.')
      logger.success('IMAGEGEN', 'Asset generated', { outputId: result.output.id })
      return
    }

    setGenerateState('error')
    const errorMsg = result?.error || result?.message || 'Failed to generate asset.'
    setStatusMessage(errorMsg)
    logger.error('IMAGEGEN', 'Asset generation failed', errorMsg)
  }

  return (
    <div className="generator-container">
      {/* Top Utility Bar */}
      <div className="gen-utility-bar">
        <div className="tabs-group">
          {tabs.slice(0, 2).map(tab => (
            <button 
              key={tab.id} 
              className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.id === 'Image' ? 'Image Generation' : 'Video Generation'}
            </button>
          ))}
        </div>
        <div className="metrics-group">
          <div className="metric stamina">
            <Zap size={14} className="icon-burn" /> <span>stamina</span> <strong>{stamina}</strong>
          </div>
          <div className="metric credit">
            <Star size={14} className="icon-star" /> <span>credit</span> <strong>{credit}</strong>
          </div>
        </div>
      </div>

      <div className="gen-main-layout">
        <aside className="gen-settings-sidebar">
          <div className="setting-header">
             <button className="guide-btn"><HelpCircle size={14} /> Guides</button>
             <button className="reset-btn"><RefreshCw size={14} /> Reset</button>
          </div>

          <div className="settings-scroll-area">
            {activeTab === 'Video' ? (
              <div className="setting-section">
                <label>Video Model</label>
                <div className="model-chip-grid">
                  {videoModels.map((model) => (
                    <button
                      key={model}
                      className={`model-chip ${selectedVideoModel === model ? 'active' : ''}`}
                      onClick={() => setSelectedVideoModel(model)}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="setting-section">
                  <label>Image Model</label>
                  <div className="model-chip-grid">
                    {imageModels.map((model) => (
                      <button
                        key={model}
                        className={`model-chip ${selectedImageModel === model ? 'active' : ''}`}
                        onClick={() => setSelectedImageModel(model)}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="setting-section">
                  <label>Image Tools</label>
                  <div className="model-chip-grid">
                    {imageTools.map((tool) => (
                      <button
                        key={tool}
                        className={`model-chip ${selectedImageTool === tool ? 'active' : ''}`}
                        onClick={() => setSelectedImageTool(tool)}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="setting-section">
              <div className="section-title">Element <span className="beta-lite">Combo Library NEW</span></div>
              <div className="image-upload-zone">
                <Upload size={24} />
                <p>Click to upload or drag images here.</p>
                <span className="small-text">Supports JPG/PNG, Up to 10MB</span>
              </div>
              <div className="example-images">
                <div className="ex-box">🍌 Cat</div>
                <div className="ex-box">Mitsuri</div>
                <div className="ex-box">Hinata</div>
                <div className="ex-box">Musk</div>
              </div>
            </div>

            <div className="setting-section">
              <label>Upload Audio (Optional)</label>
              <div className="audio-upload-zone">
                 <Music size={18} />
                 <span>Click/Drag/Paste MP3/WAV</span>
              </div>
            </div>

            <div className="setting-section">
              <label>Generation Mode</label>
              <div className="option-pills grid-2">
                <button className="active">Standard</button>
                <button className="vip">Quality <Star size={10} /></button>
                <button className="vip">Ultra HD <Star size={10} /></button>
                <button className="vip">Professional <Star size={10} /></button>
              </div>
            </div>

            <div className="setting-section">
              <label>Prompt Magic</label>
              <div className="option-pills grid-3">
                <button className="active">Auto</button>
                <button>On</button>
                <button>Off</button>
              </div>
            </div>

            <div className="setting-section">
              <label>Duration</label>
              <div className="option-pills grid-3">
                <button className="active">5s</button>
                <button>10s</button>
                <button>15s</button>
              </div>
            </div>

            <div className="setting-section">
              <label>Private Creation</label>
              <div className="toggle-lock">
                <Lock size={14} /> <span>Enabled for VIP</span>
              </div>
            </div>

            <button className="advanced-config-btn">Advanced Config</button>
          </div>
        </aside>

        <main className="gen-content-area">
          <div className="image-generator-panel glass-card">
            <h2>Generate images</h2>
            <p>Here you can quickly create image assets</p>

            <div className="field-group">
              <label>Model</label>
              <div className="select-like">{selectedImageModel}</div>
            </div>

            <div className="field-group">
              <label>Orientation</label>
              <div className="orientation-toggle">
                {['Portrait', 'Landscape'].map((item) => (
                  <button
                    key={item}
                    className={orientation === item ? 'active' : ''}
                    onClick={() => setOrientation(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
               <div className="prompt-commander-placeholder">
                  <p className="tiny text-slate-500 uppercase font-black tracking-widest text-center py-5">
                    Command the Aura Image Engines via the floating dock below
                  </p>
               </div>
            </div>

            <div className="usage-left">You have {usesRemaining} model uses remaining</div>

            <CreditErrorMessage error={generateState === 'error' ? statusMessage : null} />
            
            <div className="spacer-v4 py-4"></div>

            <div className="recent-outputs">
              <h3>Recent outputs</h3>
              <div className="outputs-grid">
                {outputs.length === 0 ? (
                  <>
                    <div className="output-placeholder">No outputs yet</div>
                    <div className="output-placeholder">Your generated assets will appear here</div>
                  </>
                ) : (
                  outputs.map((item) => (
                    <article key={item.id} className="output-card">
                      <img src={item.url} alt={item.prompt} loading="lazy" />
                      <div className="output-meta">
                        <strong>{item.model} • {item.orientation}</strong>
                        <span>{item.created_at}</span>
                      </div>
                      <p>{item.prompt}</p>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Global Semantic Prompt Bar */}
      <PromptBar 
        placeholder="Type your prompt to create images..."
        onExecute={(val) => {
          setPromptText(val);
          handleGenerateAsset();
        }}
        isProcessing={generateState === 'loading'}
      />
    </div>
  )
}

export default ImageGenerator





