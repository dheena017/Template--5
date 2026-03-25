import React, { useState, useEffect, useRef } from 'react'
import { 
  Play, Pause, SkipBack, SkipForward, 
  Plus, Music, Mic, Volume2, 
  Settings, Layers, Sliders, Scissors,
  Trash2, Download, Share2, Save,
  Zap, Activity, Waves, Clock,
  Maximize2, Minimize2, Lock, Unlock,
  Search, Filter, Wand2, Sparkles, Image as ImageIcon,
  ChevronLeft, LayoutPanelLeft, Box, Film
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, resolveAssetUrl } from '../../services/api'
import '../../styles/pages/studio/Studio.css'

const Studio = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [zoom, setZoom] = useState(50)
  const [activeTab, setActiveTab] = useState('assets') // assets, tools, layers
  const [userAssets, setUserAssets] = useState([])
  const [loadingAssets, setLoadingAssets] = useState(true)
  
  // Timeline State
  const [tracks, setTracks] = useState([
    { id: 'track-1', name: 'Main Visuals', type: 'video', color: '#646cff', clips: [] },
    { id: 'track-2', name: 'Voiceover', type: 'audio', color: '#ffa502', clips: [] },
    { id: 'track-3', name: 'Music Bed', type: 'audio', color: '#32ff7e', clips: [] }
  ])

  const [selectedClip, setSelectedClip] = useState(null)

  const timerRef = useRef(null)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const [files, images] = await Promise.all([
          api.getFiles(),
          api.getImageOutputs()
        ])
        const combined = [
          ...files.map(f => ({ ...f, source: 'upload' })),
          ...images.map(i => ({ ...i, name: `AI: ${i.prompt.substring(0,10)}...`, type: 'image', source: 'ai' }))
        ]
        setUserAssets(combined)
      } catch (err) {
        console.error("Failed to load assets", err)
      } finally {
        setLoadingAssets(false)
      }
    }
    fetchAssets()
  }, [])

  // Playback Simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => (prev + 0.1) % 60)
      }, 100)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isPlaying])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    const ms = Math.floor((seconds % 1) * 100)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`
  }

  const addClipToTimeline = (asset, trackId) => {
    const newClip = {
      id: `clip-${Date.now()}`,
      name: asset.name,
      start: currentTime,
      duration: 5, // Default 5s
      url: asset.url,
      type: asset.type
    }
    
    setTracks(prev => prev.map(t => 
      t.id === trackId ? { ...t, clips: [...t.clips, newClip] } : t
    ))
    setSelectedClip(newClip)
  }

  return (
    <div className="studio-container">
      {/* Studio Header / Navigation */}
      <header className="studio-header glass-card">
         <div className="h-left">
            <button className="back-btn"><ChevronLeft size={18} /> Projects</button>
            <div className="project-title">
               <h2>Untitled Masterpiece</h2>
               <span className="save-status"><Save size={12} /> Auto-saved 2m ago</span>
            </div>
         </div>
         
         <div className="h-right">
            <div className="user-perms"><Lock size={14} /> Private Project</div>
            <button className="share-btn"><Share2 size={16} /> Share</button>
            <button className="export-btn"><Download size={18} /> Export Video</button>
         </div>
      </header>

      <div className="studio-main-grid">
        {/* Left Side: Asset & Tool Panel */}
        <aside className="studio-side-panel premium-card">
           <div className="panel-tabs">
              <button 
                className={activeTab === 'assets' ? 'active' : ''} 
                onClick={() => setActiveTab('assets')}
              >
                <Layers size={18} />
              </button>
              <button 
                className={activeTab === 'tools' ? 'active' : ''} 
                onClick={() => setActiveTab('tools')}
              >
                <Wand2 size={18} />
              </button>
              <button 
                className={activeTab === 'search' ? 'active' : ''} 
                onClick={() => setActiveTab('search')}
              >
                <Search size={18} />
              </button>
           </div>

           <div className="panel-content">
              <AnimatePresence mode="wait">
                {activeTab === 'assets' && (
                  <motion.div 
                    key="assets"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="asset-picker"
                  >
                    <div className="picker-head">
                       <h3>Your Assets</h3>
                       <button className="icon-btn"><Plus size={16} /></button>
                    </div>
                    <div className="asset-scroll-grid">
                      {loadingAssets ? (
                        <div className="loading-dots"><span>.</span><span>.</span><span>.</span></div>
                      ) : userAssets.map((asset, i) => (
                        <div 
                          key={i} 
                          className="asset-item premium-card"
                          onClick={() => addClipToTimeline(asset, tracks[0].id)}
                        >
                          <div className="asset-thumb">
                            {asset.type === 'image' && asset.url ? (
                              <img src={resolveAssetUrl(asset.url)} alt="" />
                            ) : (
                              <Film size={20} />
                            )}
                          </div>
                          <span className="name-tag">{asset.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tools' && (
                  <motion.div 
                    key="tools"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ai-toolbox"
                  >
                    <h3>AI Toolchain</h3>
                    <div className="tool-shortcut premium-card">
                       <Sparkles size={18} />
                       <div className="ts-info">
                          <strong>Image Generator</strong>
                          <span>Create B-Roll instantly</span>
                       </div>
                    </div>
                    <div className="tool-shortcut premium-card">
                       <Box size={18} />
                       <div className="ts-info">
                          <strong>Face Swap AI</strong>
                          <span>Apply to characters</span>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </aside>

        {/* Center: Preview Player */}
        <main className="studio-canvas">
           <div className="preview-container glass-card">
              <div className="canvas-header">
                 <div className="resolution">1080 x 1920 (9:16)</div>
                 <div className="canvas-actions">
                    <Maximize2 size={16} />
                 </div>
              </div>
              <div className="canvas-stage">
                 {selectedClip && selectedClip.type === 'image' ? (
                   <img src={resolveAssetUrl(selectedClip.url)} alt="" className="active-preview" />
                 ) : (
                   <div className="empty-stage">
                      <Wand2 size={48} className="pulse-icon" />
                      <p>Select a clip or drag assets to begin</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Timeline Control bar */}
           <div className="timeline-controls glass-card">
              <div className="tc-left">
                 <button className="icon-btn"><SkipBack size={18} /></button>
                 <button className="play-trigger" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                 </button>
                 <button className="icon-btn"><SkipForward size={18} /></button>
                 <div className="v-divider" />
                 <div className="time-code">{formatTime(currentTime)}</div>
              </div>
              
              <div className="tc-center">
                 <button className="tool-shortcut active"><Scissors size={14} /> Split</button>
                 <button className="tool-shortcut"><Trash2 size={14} /> Trim</button>
              </div>

              <div className="tc-right">
                 <div className="zoom-slider">
                    <Minimize2 size={12} />
                    <input type="range" min="10" max="200" value={zoom} onChange={(e) => setZoom(e.target.value)} />
                    <Maximize2 size={12} />
                 </div>
              </div>
           </div>

           {/* The Timeline Canvas */}
           <div className="timeline-view">
              <div className="timeline-sidebar">
                 {tracks.map(track => (
                    <div key={track.id} className="track-identity">
                       <span className="track-icon" style={{color: track.color}}>
                          {track.type === 'video' ? <Film size={14} /> : <Music size={14} />}
                       </span>
                       <strong>{track.name}</strong>
                    </div>
                 ))}
              </div>
              <div className="timeline-tracks">
                 <div className="time-ruler">
                    {Array.from({length: 12}).map((_, i) => (
                      <span key={i}>{i * 5}s</span>
                    ))}
                 </div>
                 <div className="track-container">
                    {tracks.map(track => (
                      <div key={track.id} className="track-lane">
                        {track.clips.map(clip => (
                          <motion.div 
                            key={clip.id}
                            className={`clip-item ${selectedClip?.id === clip.id ? 'selected' : ''}`}
                            style={{ 
                              left: `${clip.start * 20}px`, 
                              width: `${clip.duration * 20}px`,
                              backgroundColor: `${track.color}22`,
                              borderLeft: `3px solid ${track.color}`
                            }}
                            onClick={() => setSelectedClip(clip)}
                          >
                             <span className="clip-label">{clip.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                    <div 
                      className="playhead-line" 
                      style={{ left: `${currentTime * 20}px` }}
                    />
                 </div>
              </div>
           </div>
        </main>

        {/* Right Side: Properties */}
        <aside className="studio-inspector premium-card">
           <div className="inspector-tabs">
              <button className="active">Selection</button>
              <button>Timeline</button>
           </div>
           
           <div className="inspector-content">
              {selectedClip ? (
                <div className="clip-properties">
                   <div className="prop-section">
                      <label>Clip Identity</label>
                      <input type="text" value={selectedClip.name} readOnly />
                   </div>
                   <div className="prop-section">
                      <label>Timing (Start / Duration)</label>
                      <div className="timing-inputs">
                         <div className="mini-box">{selectedClip.start.toFixed(1)}s</div>
                         <div className="mini-box">{selectedClip.duration}s</div>
                      </div>
                   </div>
                   <div className="prop-section">
                      <label>Appearance</label>
                      <div className="slider-row">
                         <span>Opacity</span>
                         <input type="range" defaultValue={100} />
                      </div>
                      <div className="slider-row">
                         <span>Scale</span>
                         <input type="range" defaultValue={100} />
                      </div>
                   </div>
                   <button className="enhance-action-btn"><Sparkles size={16} /> AI Neural Upscale</button>
                </div>
              ) : (
                <div className="empty-inspector">
                  <Activity size={32} />
                  <p>No clip selected</p>
                  <span>Select a clip on the timeline to edit properties</span>
                </div>
              )}
           </div>
        </aside>
      </div>
    </div>
  )
}

export default Studio





