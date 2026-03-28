import React from 'react'
import '../styles/pages/Settings.css'
import { useParams, useNavigate } from 'react-router-dom'
import {
  SlidersHorizontal,
  RotateCcw,
  Zap,
  Check,
  Image as ImageIcon,
  Bot,
  Volume2,
  FileText,
  Clapperboard,
  HardDrive,
  Shield,
  Terminal,
  Share2,
  Info,
  ChevronLeft
} from 'lucide-react'
import GeneralSettings from './settings/GeneralSettings'
import ImageSettings from './settings/ImageSettings'
import AvatarSettings from './settings/AvatarSettings'
import SpeechSettings from './settings/SpeechSettings'
import TextSettings from './settings/TextSettings'
import StudioSettings from './settings/StudioSettings'
import FileSettings from './settings/FileSettings'
import PDFSettings from './settings/PDFSettings'
import DevSettings from './settings/DevSettings'
import SocialSettings from './settings/SocialSettings'
import AboutSettings from './settings/AboutSettings'
import '../styles/pages/Settings.css'

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

const Settings = ({ currentTab: tabProp }) => {
  const { tab } = useParams()
  const navigate = useNavigate()
  const activeTab = tabProp || tab || 'general'

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />
      case 'image': return <ImageSettings />
      case 'avatar': return <AvatarSettings />
      case 'speech': return <SpeechSettings />
      case 'text': return <TextSettings />
      case 'studio': return <StudioSettings />
      case 'files': return <FileSettings />
      case 'pdf': return <PDFSettings />
      case 'developers': return <DevSettings />
      case 'social': return <SocialSettings />
      case 'about': return <AboutSettings />
      default: return <GeneralSettings />
    }
  }

  return (
    <div className="settings-modern-page">
      <aside className="settings-sidebar">
        <div className="sidebar-header">
          <button className="back-to-hub" onClick={() => navigate('/settings')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={20} />
          </button>
          <h2>System Settings</h2>
        </div>
        <nav className="settings-nav">
          {SETTINGS_TABS.map(t => (
            <button
              key={t.id}
              className={`nav-tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => navigate(`/settings/${t.id}`)}
            >
              {t.icon}
              <span>{t.label}</span>
              {activeTab === t.id && <Check size={14} className="active-indicator" />}
            </button>
          ))}
        </nav>
      </aside>

      <main className="settings-main-area">
        <header className="main-header">
          <div className="header-text">
            <h1>{SETTINGS_TABS.find(t => t.id === activeTab)?.label} Settings</h1>
            <p>Customize and optimize how the {activeTab} engine behaves for your account.</p>
          </div>
          <button className="reset-btn-top" onClick={() => navigate('/settings')}>
            <RotateCcw size={16} /> Exit to Hub
          </button>
        </header>

        <div className="settings-scroll-view">
          {renderContent()}
        </div>
        
        <footer className="settings-footer">
          <p>Settings are synchronized across your devices automatically.</p>
          <button className="save-btn-premium"><Zap size={16} /> Save Changes</button>
        </footer>
      </main>
    </div>
  )
}

export default Settings

