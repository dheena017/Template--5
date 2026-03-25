import { useState, useEffect } from 'react'
import { fetchHealth } from './utils/api'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import Button from './components/Button'
import PDFTools from './components/PDFTools'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [backendStatus, setBackendStatus] = useState('Checking...')
  const [features, setFeatures] = useState([])

  useEffect(() => {
    // Health check
    fetchHealth()
      .then(data => setBackendStatus(data.status))
      .catch(() => setBackendStatus('Offline'))

    // Fetch dynamic features from Django
    fetchFeatures()
      .then(data => setFeatures(data))
      .catch(err => console.error("Could not fetch features:", err))
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-view">
            <div className="announcement-banner-aura">
              <span className="badge-aura">Aura Pro</span>
              <span className="banner-text">Welcome to the future of AI generation.</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </div>
            
            <header className="dashboard-content-header">
              <span className="sub-greeting-aura">Personal Workspace</span>
              <h2 className="greeting-aura">Aura Evolution</h2>
            </header>

            <div className="card-grid-aura">
              {[
                { title: 'Instant speech', icon: '🎙️' },
                { title: 'Audiobook', icon: '📚' },
                { title: 'Image & Video', icon: '🎬' },
                { title: 'Aura Agents', icon: '🤖' },
                { title: 'Neural Music', icon: '🎵' },
                { title: 'Smart Dubbing', icon: '📺' }
              ].map((card, i) => (
                <div key={i} className="feature-card-aura">
                  <span className="card-icon-aura">{card.icon}</span>
                  <span className="card-title-aura">{card.title}</span>
                </div>
              ))}
            </div>

            <div className="dashboard-sections-aura">
              <div className="aura-section">
                <h3>Aura Studio Library</h3>
                <div className="library-list-aura">
                   <div className="library-item-aura">
                     <div className="avatar-aura">IA</div>
                     <div className="item-text-aura">
                        <span className="name">Aura Neural Engine</span>
                        <p>Optimized for high-fidelity voice cloning....</p>
                     </div>
                   </div>
                   <div className="library-item-aura">
                     <div className="avatar-aura" style={{background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-secondary)'}}>AS</div>
                     <div className="item-text-aura">
                        <span className="name">Visual Synthesis v2</span>
                        <p>Ultra-fast generative video processing....</p>
                     </div>
                   </div>
                </div>
              </div>
              
              <div className="aura-section" style={{ background: 'var(--bg-tertiary)' }}>
                 <h3>Quick Actions</h3>
                 <div className="action-card-aura">
                    <div className="action-icon-aura">✨</div>
                    <div className="action-details-aura">
                       <span className="action-title-aura">Create New project</span>
                       <p>Start from a blank canvas</p>
                    </div>
                 </div>
                 <div className="action-card-aura" style={{ borderColor: 'var(--accent-secondary)' }}>
                    <div className="action-icon-aura" style={{color: 'var(--accent-secondary)'}}>🌊</div>
                    <div className="action-details-aura">
                       <span className="action-title-aura">Clone Aura Voice</span>
                       <p>Digital vocal twin technology</p>
                    </div>
                 </div>
              </div>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Button variant="secondary" onClick={() => setActiveTab('studio')}>
                    Launch Studio
                </Button>
                <Button variant="primary" style={{ marginLeft: '12px' }}>
                    Upgrade Pro
                </Button>
            </div>
          </div>
        )
      case 'merge':
      case 'compress':
      case 'extract':
        return (
          <section id="pdf-tools">
            <PDFTools initialView={activeTab} />
          </section>
        )
      default:
        return (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view coming soon!</h2>
          </div>
        )
    }
  }

  return (
    <div className={`app-container ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      {isSidebarOpen ? (
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      ) : (
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} onToggle={toggleSidebar} />
      )}
      <div className="main-layout">
        <Toolbar activeTab={activeTab} onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="content-area">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
