import React, { useState, useEffect, useRef } from 'react'
import { 
  FolderPlus, Upload, Search, File, 
  MoreVertical, Download, Trash2, Folder,
  Grid, List, Filter, ChevronRight,
  HardDrive, Info, Share2, Plus,
  FileAudio, FileImage, FileVideo, FileText,
  Clock, Tag, X, CheckCircle2, Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, resolveAssetUrl } from '../../services/api'
import '../../styles/pages/files/Files.css'

const Files = () => {
  const [view, setView] = useState('grid')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')

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
    switch (type.toLowerCase()) {
      case 'audio': return <FileAudio className="icon-audio" size={24} />
      case 'image': return <FileImage className="icon-image" size={24} />
      case 'video': return <FileVideo className="icon-video" size={24} />
      default: return <FileText className="icon-doc" size={24} />
    }
  }

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="files-page-container">
      <header className="files-header">
        <div className="header-left">
          <h1>Asset Library</h1>
          <div className="storage-info">
            <div className="storage-bar"><div className="fill" style={{width: '35%'}}></div></div>
            <span>12.4GB of 50GB used</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="secondary-btn"><FolderPlus size={18} /> New Folder</button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileUpload}
          />
          <button 
            className="primary-btn" 
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
          >
            {uploading ? <RefreshCw className="spin" size={18} /> : <Upload size={18} />}
            {uploading ? 'Uploading...' : 'Upload Asset'}
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="files-toolbar">
        <div className="search-wrapper glass-card">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name, tag, or type..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="toolbar-right">
          <div className="view-toggle">
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><Grid size={18} /></button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><List size={18} /></button>
          </div>
          <button className="filter-pill"><Filter size={16} /> Filter</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <div className="loading-state">Syncing assets...</div>
        ) : (
          <motion.div 
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`files-content-area ${view}-view`}
          >
            {/* Folder Shortcuts */}
            <div className="folder-grid">
              {['My Creations', 'Voice Samples', 'Project B-Roll'].map(f => (
                <div key={f} className="folder-card premium-card">
                  <Folder size={24} className="f-icon" />
                  <div className="f-info">
                    <span className="name">{f}</span>
                    <span className="count">12 Items</span>
                  </div>
                  <ChevronRight size={16} className="arrow" />
                </div>
              ))}
            </div>

            {/* Files Grid/List */}
            <h3 className="group-title">All Assets ({filteredFiles.length})</h3>
            <div className={`assets-${view}`}>
              {filteredFiles.map(file => (
                <div key={file.id} className="asset-card premium-card">
                  <div className="asset-preview">
                    {file.type.toLowerCase() === 'image' && file.url ? (
                      <img src={resolveAssetUrl(file.url)} alt={file.name} className="a-thumbnail" />
                    ) : (
                      getFileIcon(file.type)
                    )}
                    {file.is_generated && <div className="gen-badge"><Sparkles size={10} /> AI</div>}
                  </div>
                  <div className="asset-details">
                    <div className="main-info">
                      <span className="a-name">{file.name}</span>
                      <span className="a-meta">{file.size} • {new Date(file.date).toLocaleDateString()}</span>
                    </div>
                    <div className="a-actions">
                       <button className="icon-btn"><Download size={14} /></button>
                       <button className="icon-btn"><Trash2 size={14} /></button>
                       <button className="icon-btn"><MoreVertical size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredFiles.length === 0 && (
                <div className="empty-files glass-card">
                   <HardDrive size={32} />
                   <p>No assets match your search.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const RefreshCw = ({ className, size }) => (
  <motion.div 
    animate={{ rotate: 360 }} 
    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    className={className}
  >
    <File size={size} /> {/* fallback icon for loading */}
  </motion.div>
)

export default Files





