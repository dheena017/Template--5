import React, { useState, useEffect, useRef } from 'react'
import { 
  FolderPlus, Upload, Search, File, 
  MoreVertical, Download, Trash2, Folder,
  Grid, List, Filter, ChevronRight,
  HardDrive, Info, Share2, Plus,
  FileAudio, FileImage, FileVideo, FileText,
  Clock, Tag, X, CheckCircle2, Sparkles, RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, resolveAssetUrl } from '../../services/api'
import '../../styles/pages/files/Files.css'

const Files = () => {
  const [view, setView] = useState('grid')
  const [activeCategory, setActiveCategory] = useState('All')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const categories = [
    { name: 'All', icon: <Grid size={16} /> },
    { name: 'Images', icon: <FileImage size={16} /> },
    { name: 'Videos', icon: <FileVideo size={16} /> },
    { name: 'Audio', icon: <FileAudio size={16} /> },
    { name: 'Documents', icon: <FileText size={16} /> },
    { name: 'AI Gen', icon: <Sparkles size={16} /> }
  ]

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = async () => {
    setLoading(true)
    try {
      const data = await api.getFiles()
      setFiles(data)
    } catch (err) {
      console.error('Failed to fetch assets', err)
      // Enhanced fallback mock data for better initial UI
      setFiles([
        { id: 1, name: 'Aura_Launch_Trailer_Final.mp4', type: 'video', size: '124.5MB', date: new Date('2026-03-27'), is_generated: true, tags: ['Cinematic', 'Promo'] },
        { id: 2, name: 'Ambient_Space_Loop.wav', type: 'audio', size: '12.8MB', date: new Date('2026-03-25'), is_generated: true, tags: ['Music', 'Atmospheric'] },
        { id: 3, name: 'Hero_Visual_v2.png', type: 'image', size: '4.2MB', date: new Date('2026-03-26'), is_generated: false, tags: ['Design', 'Brand'] },
        { id: 4, name: 'Project_Roadmap_Q2.pdf', type: 'document', size: '1.2MB', date: new Date('2026-03-20'), is_generated: false, tags: ['Internal', 'Docs'] },
        { id: 5, name: 'Neon_Pulse_Asset.mov', type: 'video', size: '15.6MB', date: new Date('2026-03-28'), is_generated: true, tags: ['VFX', 'Loop'] },
        { id: 6, name: 'Voiceover_Talent_A.mp3', type: 'audio', size: '3.1MB', date: new Date('2026-03-28'), is_generated: false, tags: ['Voice'] },
        { id: 7, name: 'Synth_Generated_Background.png', type: 'image', size: '2.1MB', date: new Date('2026-03-28'), is_generated: true, tags: ['AI Art'] },
      ])
    } finally {
      setLoading(false)
    }
  }


  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploading(true)
    try {
      const res = await api.uploadFile(file)
      if (res && res.file) {
        setFiles(prev => [res.file, ...prev])
      }
    } catch (err) {
      console.error('Upload failed', err)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'audio': return <FileAudio className="icon-audio" size={24} />
      case 'image': return <FileImage className="icon-image" size={24} />
      case 'video': return <FileVideo className="icon-video" size={24} />
      default: return <FileText className="icon-doc" size={24} />
    }
  }

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         f.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || 
                           (activeCategory === 'AI Gen' ? f.is_generated : f.type.toLowerCase() === activeCategory.toLowerCase().replace('s', ''))
    return matchesSearch && matchesCategory
  })

  return (
    <div className="files-page-container">
      <div className="files-layout-main">
        <div className="files-content-wrapper">
          <header className="files-header">
            <div className="header-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="aura-text-glow"
              >
                Asset Library
              </motion.h1>
              <div className="storage-info glass-pill">
                <div className="storage-text">
                  <HardDrive size={14} />
                  <span>12.4GB of 50GB used</span>
                </div>
                <div className="storage-bar"><div className="fill" style={{width: '35%'}}></div></div>
              </div>
            </div>
            
            <div className="header-actions">
              <button className="secondary-btn glow-on-hover"><FolderPlus size={18} /> New Folder</button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileUpload}
              />
              <button 
                className="primary-btn aura-btn-gradient" 
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
              >
                {uploading ? <RefreshCw className="spin" size={18} /> : <Upload size={18} />}
                <span>{uploading ? 'Syncing...' : 'Upload Asset'}</span>
              </button>
            </div>
          </header>

          {/* Quick Categories */}
          <section className="files-categories">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`category-pill ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </section>

          {/* Recent Files Slider */}
          <section className="recent-files-section">
            <div className="section-header">
              <h3><Clock size={16} /> Recently Modified</h3>
              <button className="text-btn">View All</button>
            </div>
            <div className="recent-scroll">
              {files.slice(0, 4).map((file, i) => (
                <motion.div 
                  key={`recent-${file.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="recent-card premium-card glass-morph"
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="recent-icon">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="recent-details">
                    <span className="name">{file.name}</span>
                    <span className="time">Added 2h ago</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Toolbar */}
          <div className="files-toolbar glass-card">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search assets, metadata, or AI tags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <button className="filter-pill"><Filter size={16} /> Filter By Tag</button>
              <div className="view-toggle glass-pill">
                <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><Grid size={18} /></button>
                <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><List size={18} /></button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <div className="loading-state">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Sparkles size={32} className="aura-text-glow" />
                </motion.div>
                <p>Synchronizing with Aura Engine...</p>
              </div>
            ) : (
              <motion.div 
                key={view + activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`files-content-area ${view}-view`}
              >
                <div className="folder-grid">
                  {['Production Workspace', 'Stock Assets', 'Archives'].map((f, i) => (
                    <motion.div 
                      key={f} 
                      className="folder-card premium-card hover-glow"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="folder-icon-wrapper">
                         <Folder size={28} className="f-icon" />
                      </div>
                      <div className="f-info">
                        <span className="name">{f}</span>
                        <span className="count">24 Files • 1.2GB</span>
                      </div>
                      <ChevronRight size={18} className="arrow" />
                    </motion.div>
                  ))}
                </div>

                <div className="assets-header-row">
                  <h3 className="group-title">{activeCategory} Assets ({filteredFiles.length})</h3>
                  <button className="select-all-btn">Select Multiple</button>
                </div>

                <div className={`assets-${view}`}>
                  {filteredFiles.map((file, i) => (
                    <motion.div 
                      key={file.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className={`asset-card premium-card ${selectedFile?.id === file.id ? 'selected' : ''}`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="asset-preview">
                        <div className="preview-overlay">
                          <button className="preview-action-btn"><Share2 size={16} /></button>
                        </div>
                        {file.type.toLowerCase() === 'image' && file.url ? (
                          <img src={resolveAssetUrl(file.url)} alt={file.name} className="a-thumbnail" />
                        ) : (
                          <div className="icon-container">
                            {getFileIcon(file.type)}
                          </div>
                        )}
                        {file.is_generated && (
                          <div className="gen-badge-v2">
                            <Sparkles size={10} />
                            <span>AI GEN</span>
                          </div>
                        )}
                      </div>
                      <div className="asset-details">
                        <div className="main-info">
                          <span className="a-name">{file.name}</span>
                          <div className="a-tags">
                            {file.tags?.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                          </div>
                          <span className="a-meta">{file.size} • {new Date(file.date).toLocaleDateString()}</span>
                        </div>
                        <div className="a-actions">
                           <button className="action-btn-circle" title="Download"><Download size={14} /></button>
                           <button className="action-btn-circle delete" title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredFiles.length === 0 && (
                    <div className="empty-files glass-card">
                       <div className="empty-icon-wrapper">
                         <Search size={48} />
                       </div>
                       <h3>No matches found</h3>
                       <p>Try adjusting your search or category filters.</p>
                       <button className="secondary-btn" onClick={() => {setSearchQuery(''); setActiveCategory('All')}}>Clear Filters</button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Details Panel Sidebar */}
        <AnimatePresence>
          {selectedFile && (
            <motion.aside 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="files-details-panel glass-card"
            >
              <div className="panel-header">
                <h3>Asset Details</h3>
                <button className="close-panel" onClick={() => setSelectedFile(null)}><X size={20} /></button>
              </div>
              
              <div className="panel-content">
                <div className="detail-preview glass-morph">
                  {getFileIcon(selectedFile.type)}
                </div>
                
                <div className="file-id-card">
                   <h2>{selectedFile.name}</h2>
                   <div className="file-status">
                     <CheckCircle2 size={14} className="status-icon" />
                     <span>Verified Secure</span>
                   </div>
                </div>

                <div className="detail-grid">
                  <div className="detail-item">
                    <label>File Type</label>
                    <span>{selectedFile.type.toUpperCase()}</span>
                  </div>
                  <div className="detail-item">
                    <label>File Size</label>
                    <span>{selectedFile.size}</span>
                  </div>
                  <div className="detail-item">
                    <label>Dimensions</label>
                    <span>1920 x 1080</span>
                  </div>
                  <div className="detail-item">
                    <label>Added On</label>
                    <span>{new Date(selectedFile.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="tags-section">
                  <label>Smart Tags (AI)</label>
                  <div className="smart-tags">
                    <span className="tag-pill ai">Metadata</span>
                    <span className="tag-pill ai">4K Video</span>
                    <span className="tag-pill ai">H.264</span>
                    <button className="add-tag"><Plus size={14} /></button>
                  </div>
                </div>

                <div className="panel-actions">
                  <button className="primary-btn aura-btn-gradient w-100">
                    <Download size={18} />
                    <span>Download Original</span>
                  </button>
                  <div className="secondary-actions">
                    <button className="secondary-btn"><Share2 size={16} /> Share</button>
                    <button className="secondary-btn delete"><Trash2 size={16} /> Delete</button>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


export default Files





