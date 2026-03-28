import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { api } from './services/api'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import Button from './components/Button'
import PDFTools from './components/PDFTools'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import * as Pages from './pages'
import MinimalistPDFMerger from './features/pdf/MinimalistPDFMerger'
import FAQSection from './features/pdf/FAQSection'
import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { animationsEnabled, auraBackground } = useTheme();
  const [backendStatus, setBackendStatus] = useState('Checking...')
  const [features, setFeatures] = useState([])
  
  const location = useLocation()
  const navigate = useNavigate()

  // Sync activeTab with URL path on load and URL changes
  useEffect(() => {
    const path = location.pathname.substring(1)
    if (path && path !== activeTab) {
      // Map potential special cases (like / -> dashboard)
      const tabId = path === '' ? 'dashboard' : path;
      setActiveTab(tabId);
    } else if (!path) {
      setActiveTab('dashboard');
    }
  }, [location])

  useEffect(() => {
    // Health check
    api.fetchHealth()
      .then(data => setBackendStatus(data.status))
      .catch(() => setBackendStatus('Offline'))

    // Fetch dynamic features from Django
    api.fetchFeatures()
      .then(data => setFeatures(data))
      .catch(err => console.error("Could not fetch features:", err))
  }, [])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`);
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <Pages.Profile />;
      case 'dashboard': return <Pages.Dashboard />;
      case 'user-dashboard': return <Pages.UserDashboard />;
      case 'settings-hub': return <Pages.SettingsHub />;
      case 'settings/general': return <Pages.GeneralSettingsPage />;
      case 'settings/image': return <Pages.ImageSettingsPage />;
      case 'settings/avatar': return <Pages.AvatarSettingsPage />;
      case 'settings/speech': return <Pages.SpeechSettingsPage />;
      case 'settings/text': return <Pages.TextSettingsPage />;
      case 'settings/studio': return <Pages.StudioSettingsPage />;
      case 'settings/files': return <Pages.FileSettingsPage />;
      case 'settings/pdf': return <Pages.PDFSettingsPage />;
      case 'settings/developers': return <Pages.DevSettingsPage />;
      case 'settings/social': return <Pages.SocialSettingsPage />;
      case 'settings/about': return <Pages.AboutSettingsPage />;
      case 'hub-dashboard': return <Pages.HubDashboard />;
      case 'generic-dashboard': return <Pages.GenericDashboard />;

      // Image & Design
      case 'image-dashboard': return <Pages.ImageDashboard />;
      case 'image-generator': return <Pages.ImageGenerator />;
      case 'brand-kits': return <Pages.BrandKits />;
      case 'models': return <Pages.Models />;
      case 'flux-contest': return <Pages.FluxContest />;
      case 'generate-images': return <Pages.GenerateImages />;

      // Avatar AI
      case 'avatar-dashboard': return <Pages.AvatarDashboard />;
      case 'ai-studio': return <Pages.AIStudio />;
      case 'avatar-creator': return <Pages.AvatarCreator />;
      case 'face-swap': return <Pages.ArtistFaceSwap />;
      case 'video-agent': return <Pages.VideoAgent />;
      case 'avatar-templates': return <Pages.AvatarTemplates />;
      case 'ppt-to-video': return <Pages.PPTToVideo />;
      case 'translate': return <Pages.Translate />;
      case 'characters': return <Pages.Characters />;
      case 'avatars': return <Pages.Avatars />;
      case 'apps': return <Pages.Apps />;
      case 'brand-system': return <Pages.BrandSystem />;
      case 'team-dashboard': return <Pages.TeamDashboard />;
      case 'team': return <Pages.Team />;
      case 'project-avatar': return <Pages.ProjectAvatar />;
      case 'avatar-videos-home': return <Pages.AvatarVideosHome />;

      // Speech & Voices
      case 'speech-dashboard': return <Pages.SpeechDashboard />;
      case 'text-to-speech': return <Pages.TextToSpeech />;
      case 'voice-changer': return <Pages.VoiceChanger />;
      case 'podcast-creator': return <Pages.PodcastCreator />;
      case 'audio-dubbing': return <Pages.AudioDubbing />;
      case 'pronunciation': return <Pages.Pronunciation />;
      case 'sound-effects': return <Pages.SoundEffects />;
      case 'clone-voices': return <Pages.Voices />;

      // Studio & Creation
      case 'ai-orchestrator': return <Pages.AIOrchestrator />;
      case 'face-swap-ai': return <Pages.FaceSwapAI />;
      case 'music-generator': return <Pages.MusicGenerator />;
      case 'highlights': return <Pages.Highlights />;
      case 'b-roll': return <Pages.GenerateBRoll />;
      case 'product-placement': return <Pages.ProductPlacement />;
      case 'ugc-creator': return <Pages.UGCCreator />;
      case 'batch-mode': return <Pages.BatchMode />;
      case 'voice-isolator': return <Pages.VoiceIsolator />;
      case 'audio-native': return <Pages.AudioNative />;
      case 'playground': return <Pages.Playground />;
      case 'history': return <Pages.History />;
      case 'instant-highlights': return <Pages.InstantHighlights />;
      case 'video-dubbing': return <Pages.VideoDubbing />;
      case 'video-podcast': return <Pages.VideoPodcast />;
      case 'artists-home': return <Pages.ArtistsHome />;

      // Files & Assets
      case 'files': return <Pages.Files />;
      case 'audiobooks': return <Pages.Audiobooks />;
      case 'productions': return <Pages.Productions />;
      case 'series': return <Pages.Series />;
      case 'templates': return <Pages.Templates />;

      // Smart Text
      case 'text-dashboard': return <Pages.TextDashboard />;
      case 'speech-to-text': return <Pages.SpeechToText />;
      case 'rules': return <Pages.Rules />;

      // Social Media
      case 'social-dashboard': return <Pages.SocialDashboard />;
      case 'blog': return <Pages.Blog />;
      case 'discord': return <Pages.Discord />;
      case 'twitter': return <Pages.Twitter />;
      case 'integrations': return <Pages.Integrations />;
      case 'social-media-home': return <Pages.SocialMedia />;

      // Developer Tools
      case 'dev-dashboard': return <Pages.DevDashboard />;
      case 'api-keys': return <Pages.ApiKeys />;
      case 'dev-analytics': return <Pages.DevAnalytics />;
      case 'dev-logs': return <Pages.DevLogs />;
      case 'dev-overview': return <Pages.DevOverview />;
      case 'env-vars': return <Pages.EnvVars />;
      case 'system-status': return <Pages.SystemStatus />;
      case 'webhooks': return <Pages.Webhooks />;
      case 'developer-api-hub': return <Pages.API />;

      // About & Resources
      case 'billing': return <Pages.Billing />;
      case 'docs': return <Pages.Docs />;
      case 'faq': return <Pages.FAQSupport />;
      case 'feedback': return <Pages.Feedback />;
      case 'notifications': return <Pages.Notifications />;
      case 'about-us': return <Pages.AboutUs />;
      case 'coming-soon': return <Pages.ComingSoon />;
      case 'ask': return <Pages.Ask />;
      
      case 'merge':
        return <Pages.MergePDF />;
      case 'split':
        return <Pages.SplitPDF />;
      case 'remove-pages':
        return <Pages.RemovePages />;
      case 'extract-pages':
        return <Pages.ExtractPages />;
      case 'scan-to-pdf':
        return <Pages.ScanToPDF />;
      case 'organize-pdf':
        return <Pages.OrganizePDF />;
      case 'pdf-dashboard':
      case 'pdf-select':
        return <Pages.PDFDashboard />;
      case 'compress':
      case 'repair':
      case 'word-to-pdf':
      case 'jpg-to-pdf':
      case 'excel-to-pdf':
      case 'pdf-to-word':
      case 'pdf-to-jpg':
      case 'pdf-to-excel':
      case 'edit':
      case 'watermark':
      case 'page-numbers':
      case 'lock':
      case 'unlock':
      case 'sign':
      case 'summarize':
      case 'chat':
      case 'extract-data':
      case 'optimize-pdf':
      case 'convert-to-pdf':
      case 'convert-from-pdf':
      case 'edit-pdf':
      case 'pdf-security':
      case 'pdf-intelligence':
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
    <MotionConfig reducedMotion={animationsEnabled ? 'never' : 'always'}>
      {auraBackground && (
        <div className="aura-bg-container">
          <div className="aura-orb orb-1"></div>
          <div className="aura-orb orb-2"></div>
          <div className="aura-orb orb-3"></div>
        </div>
      )}
      <div className={`app-container ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
        {isSidebarOpen ? (
          <Sidebar activeTab={activeTab} onTabChange={handleTabChange} isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        ) : (
          <Navbar activeTab={activeTab} onTabChange={handleTabChange} onToggle={toggleSidebar} />
        )}
        <div className="main-layout">
          <Toolbar activeTab={activeTab} onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} onTabChange={handleTabChange} />
          <main className="content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%' }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </MotionConfig>
  )
}

export default App
