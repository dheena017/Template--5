import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  SlidersHorizontal, RotateCcw, Zap, Check, Image as ImageIcon,
  Bot, Volume2, FileText, Clapperboard, HardDrive, Shield,
  Terminal, Share2, Info, ChevronLeft, Search
} from 'lucide-react'
import '../../styles/pages/Settings.css'
import { ThemeProvider, useTheme } from '../../context/ThemeContext'
import { useNotifications } from '../../context/NotificationContext'

// Reusable Settings Layout Shell
const SETTINGS_TABS = [
  { id: 'general', label: 'General / UI', icon: <SlidersHorizontal size={18} /> },
  { id: 'image', label: 'Image Engine', icon: <ImageIcon size={18} /> },
  { id: 'avatar', label: 'Avatar Labs', icon: <Bot size={18} /> },
  { id: 'speech', label: 'Speech & Voice', icon: <Volume2 size={18} /> },
  { id: 'text', label: 'Text & Lang', icon: <FileText size={18} /> },
  { id: 'studio', label: 'Studio Config', icon: <Clapperboard size={18} /> },
  { id: 'files', label: 'Library & Storage', icon: <HardDrive size={18} /> },
  { id: 'pdf', label: 'PDF Engine', icon: <Shield size={18} /> },
  { id: 'developers', label: 'API & Dev', icon: <Terminal size={18} /> },
  { id: 'social', label: 'Social & Network', icon: <Share2 size={18} /> },
  { id: 'about', label: 'About & System', icon: <Info size={18} /> }
]

const SettingsLayout = ({ children, currentTab }) => {
  const navigate = useNavigate()
  const notify = useNotifications()
  const [searchTerm, setSearchTerm] = useState('')
  const activeTab = currentTab || 'general'
  const activeTabData = SETTINGS_TABS.find(t => t.id === activeTab)

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      notify.success(`${activeTabData?.label} settings synchronized successfully.`);
    }, 600);
  }

  const filteredTabs = SETTINGS_TABS.filter(t => 
    t.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="settings-modern-page">
      <aside className="settings-sidebar">
        <div className="sidebar-header">
          <button 
            className="back-to-hub" 
            onClick={() => navigate('/dashboard')}
            title="Back to Dashboard"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="sidebar-title-group">
            <h2>Settings Center</h2>
            <div className="status-badge-live">
               <div className="pulse-dot-green"></div>
               <span>Cloud Sync Active</span>
            </div>
          </div>
        </div>

        <div className="settings-search-box">
           <Search size={18} />
           <input 
             placeholder="Search categories..." 
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>

        <nav className="settings-nav">
          {filteredTabs.map(t => (
            <button
              key={t.id}
              className={`nav-tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => navigate(`/settings/${t.id}`)}
            >
              <span className="tab-icon">{t.icon}</span>
              <span>{t.label}</span>
              {activeTab === t.id && <Check size={16} className="active-indicator" strokeWidth={3} />}
            </button>
          ))}
        </nav>
      </aside>

      <main className="settings-main-area">
        <header className="main-header">
          <div className="header-text">
            <h1>{activeTabData?.label} Settings</h1>
            <p>{activeTabData?.id === 'general' 
              ? 'Personalize your workspace aesthetic and global interaction patterns.' 
              : activeTabData?.id === 'pdf'
              ? 'Configure document intelligence, security protocols, and export optimization.'
              : `Manage and optimize your ${activeTabData?.label.toLowerCase()} experience.`}
            </p>
          </div>
          <button className="reset-btn-top" onClick={() => navigate('/dashboard')}>
            <RotateCcw size={18} /> <span>Exit to Dashboard</span>
          </button>
        </header>

        <div className="settings-scroll-view">
          {children}
        </div>
        
        <footer className="settings-footer">
          <p className="footer-status">Cloud Synchronized • Latency 24ms</p>
          <button className="save-btn-premium" onClick={handleSave}><Zap size={18} fill="currentColor" /> Save Configuration</button>
        </footer>
      </main>
    </div>
  )
}

export default SettingsLayout
