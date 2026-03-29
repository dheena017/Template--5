import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { NotificationProvider } from './context/NotificationContext';
import { api } from './services/api'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import Button from './components/Button'
import PDFTools from './components/PDFTools'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Search, Home, FileUp, Minimize2, Zap, Combine } from 'lucide-react'
import * as Pages from './pages'
import * as VideoConversions from './pages/pdf/VideoConversion'
import * as AudioConversions from './pages/pdf/AudioConversion'
import * as ImageFormatConversions from './pages/pdf/ImageFormatConversion'
import * as EditPDFTools from './pages/pdf/EditPDF/index'
import * as PDFSecurityTools from './pages/pdf/PDFSecurity/index'
import * as EbookConversions from './pages/pdf/EbookConversion/index'
import * as ConvertToPDF from './pages/pdf/ConvertToPDF/index'
import * as OfficeTools from './pages/pdf/OfficeTools/index'
import MinimalistPDFMerger from './features/pdf/MinimalistPDFMerger'
import FAQSection from './features/pdf/FAQSection'
import NextActionRail from './components/common/NextActionRail'
import VisualAssetTray from './components/common/VisualAssetTray'
import { useSettings } from './context/SettingsContext'
import RightSettingsPanel from './components/RightSettingsPanel'
import './App.css'
import './styles/Notifications.css'
import './styles/NextActionRail.css'
import './styles/VisualAssetTray.css'



function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDeepFocus, setIsDeepFocus] = useState(false)
  const { animationsEnabled, auraBackground } = useTheme();
  const { appSettingsOpen, setAppSettingsOpen, toolSettingsOpen, setToolSettingsOpen } = useSettings();
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
    const checkMobile = () => {
      if (window.innerWidth <= 768) setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Health check
    api.fetchHealth()
      .then(data => setBackendStatus(data.status))
      .catch(() => setBackendStatus('Offline'))

    // Fetch dynamic features from Django
    api.fetchFeatures()
      .then(data => setFeatures(data))
      .catch(err => console.error("Could not fetch features:", err))

    return () => window.removeEventListener('resize', checkMobile);
  }, [])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`);
  }

  const [showQuickSearch, setShowQuickSearch] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowQuickSearch(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowQuickSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <Pages.Profile />;
      case 'dashboard': return <Pages.Dashboard />;
      case 'user-dashboard': return <Pages.UserDashboard />;
      case 'settings-hub': return <Pages.GeneralSettingsPage />;
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
      case 'studio-dashboard': return <Pages.StudioDashboard />;
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
      case 'files-dashboard': return <Pages.FilesDashboard />;
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
      case 'resources-dashboard': return <Pages.ResourcesDashboard />;
      case 'coming-soon': return <Pages.ComingSoon />;
      case 'ask': return <Pages.Ask />;
      case 'analytics': return <Pages.AnalyticsDashboard />;
      
            case 'avi-to-mp4': return <VideoConversions.AVItoMP4 />;
      case 'avi-to-mov': return <VideoConversions.AVItoMOV />;
      case 'avi-to-wmv': return <VideoConversions.AVItoWMV />;
      case 'avi-to-mkv': return <VideoConversions.AVItoMKV />;
      case 'mp4-to-avi': return <VideoConversions.MP4toAVI />;
      case 'mp4-to-mov': return <VideoConversions.MP4toMOV />;
      case 'mp4-to-wmv': return <VideoConversions.MP4toWMV />;
      case 'mp4-to-mkv': return <VideoConversions.MP4toMKV />;
      case 'mov-to-mp4': return <VideoConversions.MOVtoMP4 />;
      case 'mov-to-avi': return <VideoConversions.MOVtoAVI />;
      case 'mov-to-wmv': return <VideoConversions.MOVtoWMV />;
      case 'mov-to-mkv': return <VideoConversions.MOVtoMKV />;
      case 'wmv-to-mp4': return <VideoConversions.WMVtoMP4 />;
      case 'wmv-to-avi': return <VideoConversions.WMVtoAVI />;
      case 'wmv-to-mkv': return <VideoConversions.WMVtoMKV />;
      case 'mkv-to-mp4': return <VideoConversions.MKVtoMP4 />;
      case 'mkv-to-mov': return <VideoConversions.MKVtoMOV />;
      case 'mkv-to-wmv': return <VideoConversions.MKVtoWMV />;
      case 'mkv-to-avi': return <VideoConversions.MKVtoAVI />;
      // Image Format Conversions
      case 'heic-to-jpg': return <ImageFormatConversions.HEICtoJPG />;
      case 'heic-to-png': return <ImageFormatConversions.HEICtoPNG />;
      case 'heic-to-webp': return <ImageFormatConversions.HEICtoWEBP />;
      case 'heic-to-jpeg': return <ImageFormatConversions.HEICtoJPEG />;
      case 'svg-to-png': return <ImageFormatConversions.SVGtoPNG />;
      case 'svg-to-jpg': return <ImageFormatConversions.SVGtoJPG />;
      case 'svg-to-jpeg': return <ImageFormatConversions.SVGtoJPEG />;
      case 'svg-to-webp': return <ImageFormatConversions.SVGtoWEBP />;
      case 'png-to-jpg': return <ImageFormatConversions.PNGtoJPG />;
      case 'jpg-to-png': return <ImageFormatConversions.JPGtoPNG />;
      case 'webp-to-jpg': return <ImageFormatConversions.WEBPtoJPG />;
      case 'webp-to-png': return <ImageFormatConversions.WEBPtoPNG />;
      case 'webp-to-jpeg': return <ImageFormatConversions.WEBPtoJPEG />;
      case 'jpg-to-webp': return <ImageFormatConversions.JPGtoWEBP />;

      // Audio Conversions
      case 'mp3-to-wav': return <AudioConversions.MP3toWAV />;
      case 'mp3-to-flac': return <AudioConversions.MP3toFLAC />;
      case 'mp3-to-aac': return <AudioConversions.MP3toAAC />;
      case 'mp3-to-ac3': return <AudioConversions.MP3toAC3 />;
      case 'mp3-to-ogg': return <AudioConversions.MP3toOGG />;
      case 'wav-to-mp3': return <AudioConversions.WAVtoMP3 />;
      case 'wav-to-flac': return <AudioConversions.WAVtoFLAC />;
      case 'wav-to-ac3': return <AudioConversions.WAVtoAC3 />;
      case 'wav-to-ogg': return <AudioConversions.WAVtoOGG />;
      case 'flac-to-mp3': return <AudioConversions.FLACtoMP3 />;
      case 'flac-to-wav': return <AudioConversions.FLACtoWAV />;
      case 'flac-to-aac': return <AudioConversions.FLACtoAAC />;
      case 'flac-to-ac3': return <AudioConversions.FLACtoAC3 />;
      case 'flac-to-ogg': return <AudioConversions.FLACtoOGG />;
      case 'aac-to-mp3': return <AudioConversions.AACtoMP3 />;
      case 'aac-to-wav': return <AudioConversions.AACtoWAV />;
      case 'aac-to-flac': return <AudioConversions.AACtoFLAC />;
      case 'aac-to-ac3': return <AudioConversions.AACtoAC3 />;
      case 'aac-to-ogg': return <AudioConversions.AACtoOGG />;
      case 'ogg-to-mp3': return <AudioConversions.OGGtoMP3 />;

      case 'universal-conversion': return <Pages.VideoConversionDashboard />;
      case 'video-conversion': return <Pages.VideoConversionDashboard />;
      case 'audio-conversion': return <Pages.AudioConversionDashboard />;
      case 'image-conversion':
      case 'image-conversion-tools': return <Pages.ImageFormatConversionDashboard />;
      case 'document-conversion': return <Pages.DocumentConversionDashboard />;

      // Document Conversions
      case 'word-to-pdf': return <ConvertToPDF.WordToPDF />;
      case 'excel-to-pdf': return <ConvertToPDF.ExcelToPDF />;
      case 'jpg-to-pdf': return <ConvertToPDF.JPGToPDF />;
      case 'cad-to-pdf': return <ConvertToPDF.CADToPDF />;
      case 'epub-to-pdf': return <ConvertToPDF.EPUBToPDF />;
      case 'mobi-to-pdf': return <ConvertToPDF.MobiToPDF />;
      case 'azw3-to-pdf': return <ConvertToPDF.AZW3ToPDF />;
      case 'hwp-to-pdf': return <ConvertToPDF.HWPToPDF />;
      case 'xps-to-pdf': return <ConvertToPDF.XPSToPDF />;
      case 'cbr-to-pdf': return <ConvertToPDF.CBRToPDF />;
      case 'cbz-to-pdf': return <ConvertToPDF.CBZToPDF />;

      case 'pdf/merge':
      case 'merge':
        return <Pages.MergePDF />;
      case 'pdf/split':
      case 'split':
        return <Pages.SplitPDF />;
      case 'remove-pages':
        return <Pages.RemovePages />;
      case 'extract-pages':
        return <Pages.ExtractPages />;
      case 'scan-to-pdf':
        return <Pages.ScanToPDF />;
      case 'ocr-pdf':
        return <Pages.OCRPDF />;
      case 'organize-pdf':
        return <Pages.PDFOrganizeDashboard />;
      case 'pdf-dashboard':
      case 'pdf-select':
        return <Pages.PDFDashboard />;
      case 'compress':
      case 'optimize-pdf':
        return <Pages.PDFOptimizeDashboard />;
      case 'convert-to-pdf':
        return <Pages.PDFConvertToDashboard />;
      case 'convert-from-pdf':
        return <Pages.PDFConvertFromDashboard />;
      case 'pdf-intelligence':
        return <Pages.PDFIntelligenceDashboardMain />;
      // Edit PDF Tools
      case 'edit': return <EditPDFTools.EditPDFPage />;
      case 'rotate': return <EditPDFTools.RotatePDF />;
      case 'page-numbers': return <EditPDFTools.AddPageNumbers />;
      case 'watermark': return <EditPDFTools.AddWatermark />;
      case 'crop': return <EditPDFTools.CropPDF />;
      case 'edit-pdf': return <Pages.PDFEditDashboard />;

      // PDF Security Tools
      case 'lock': return <PDFSecurityTools.ProtectPDF />;
      case 'unlock': return <PDFSecurityTools.UnlockPDF />;
      case 'sign': return <PDFSecurityTools.SignPDF />;
      case 'redact': return <PDFSecurityTools.RedactPDF />;
      case 'compare': return <PDFSecurityTools.ComparePDF />;
      case 'pdf-security': return <Pages.PDFSecurityDashboardMain />;

      // ── eBook Conversion ──────────────────────────────────
      case 'epub-to-pdf':  return <EbookConversions.EpubToPdf />;
      case 'epub-to-mobi': return <EbookConversions.EpubToMobi />;
      case 'epub-to-azw3': return <EbookConversions.EpubToAzw3 />;
      case 'mobi-to-pdf':  return <EbookConversions.MobiToPdf />;
      case 'mobi-to-epub': return <EbookConversions.MobiToEpub />;
      case 'mobi-to-azw3': return <EbookConversions.MobiToAzw3 />;
      case 'pdf-to-epub':  return <EbookConversions.PdfToEpub />;
      case 'pdf-to-mobi':  return <EbookConversions.PdfToMobi />;
      case 'pdf-to-azw3':  return <EbookConversions.PdfToAzw3 />;
      case 'azw3-to-pdf':  return <EbookConversions.Azw3ToPdf />;
      case 'azw3-to-epub': return <EbookConversions.Azw3ToEpub />;
      case 'azw3-to-mobi': return <EbookConversions.Azw3ToMobi />;

      // ── Office Tools ──────────────────────────────────────
      case 'word-merge':    return <OfficeTools.WordMerge />;
      case 'excel-merge':   return <OfficeTools.ExcelMerge />;
      case 'excel-split':   return <OfficeTools.ExcelSplit />;
      case 'word-compress': return <OfficeTools.WordCompress />;
      case 'ppt-compress':  return <OfficeTools.PptCompress />;
      case 'img-compress':  return <OfficeTools.ImgCompress />;

      default:
        return (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view coming soon!</h2>
          </div>
        )
    }
  }

  const COMMAND_HUB_FEATURES = [
    { name: 'Home Dashboard', path: 'dashboard', icon: Home, cat: 'Navigate' },
    { name: 'Upload PDF', path: 'pdf-dashboard', icon: FileUp, cat: 'Action' },
    { name: 'Merge Documents', path: 'merge', keywords: ['combine', 'join', 'add files'], cat: 'PDF' },
    { name: 'Compress PDF', path: 'compress', keywords: ['shrink', 'small', 'reduce size', 'optimize'], cat: 'PDF' },
    { name: 'Avatar AI', path: 'avatar-dashboard', keywords: ['deepfake', 'person', 'human', 'face', 'talk'], cat: 'AI' },
    { name: 'Image Studio', path: 'image-dashboard', keywords: ['photo', 'generate', 'create', 'art'], cat: 'AI' },
    { name: 'Text to Speech', path: 'text-to-speech', keywords: ['voice', 'sound', 'speak'], cat: 'Audio' }
  ];

  const [searchQueryHub, setSearchQueryHub] = useState('');
  const hubResults = searchQueryHub ? COMMAND_HUB_FEATURES.filter(f => 
    f.name.toLowerCase().includes(searchQueryHub.toLowerCase()) || 
    (f.keywords && f.keywords.some(k => k.toLowerCase().includes(searchQueryHub.toLowerCase())))
  ) : [];

  return (
    <NotificationProvider>
      <TaskProvider>
        <NextActionRail />
        <VisualAssetTray />
        <MotionConfig reducedMotion={animationsEnabled ? 'never' : 'always'}>
      {auraBackground && (
        <div className="aura-bg-container">
          <div className="aura-orb orb-1"></div>
          <div className="aura-orb orb-2"></div>
          <div className="aura-orb orb-3"></div>
        </div>
      )}
      <AnimatePresence>
        {showQuickSearch && (
          <div className="quick-search-overlay-global" onClick={() => setShowQuickSearch(false)}>
            <motion.div 
              className="quick-search-modal-global"
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-search-wrapper">
                <Search size={22} className="modal-search-icon" />
                <input 
                  autoFocus 
                  placeholder="Ask Aura to 'shrink my pdf' or 'find images'..." 
                  onChange={(e) => setSearchQueryHub(e.target.value)}
                />
                <div className="modal-esc-label">ESC</div>
              </div>
              <div className="modal-results-area">
                {hubResults.length > 0 ? (
                  <div className="results-group">
                    <span className="group-label">Intent Matches</span>
                    {hubResults.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="command-item" 
                        onClick={() => { 
                          handleTabChange(item.path); 
                          setShowQuickSearch(false); 
                          setSearchQueryHub('');
                        }}
                      >
                        {item.icon ? React.createElement(item.icon, { size: 16 }) : <Zap size={16} className="text-secondary" />}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                           <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                        </div>
                        <span className="hub-cat-badge" style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.5, fontWeight: 'bold' }}>{item.cat}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="results-group">
                    <span className="group-label">Navigation</span>
                    <div className="command-item" onClick={() => { handleTabChange('dashboard'); setShowQuickSearch(false); }}>
                      <Home size={16} /> <span>Home Dashboard</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className={`app-container ${!isSidebarOpen ? 'sidebar-closed' : ''} ${isDeepFocus ? 'deep-focus-active' : ''}`}>
        <RightSettingsPanel open={appSettingsOpen} setOpen={setAppSettingsOpen} />
        {!isDeepFocus && (
          isSidebarOpen ? (
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} isOpen={isSidebarOpen} onToggle={toggleSidebar} />
          ) : (
            <Navbar activeTab={activeTab} onTabChange={handleTabChange} onToggle={toggleSidebar} />
          )
        )}
        <div className="main-layout">
          {!isDeepFocus && (
            <Toolbar 
              activeTab={activeTab} 
              onToggleSidebar={toggleSidebar} 
              isSidebarOpen={isSidebarOpen} 
              onTabChange={handleTabChange} 
              isDeepFocus={isDeepFocus}
              setIsDeepFocus={setIsDeepFocus}
            />
          )}
          <main className="content-area">
             {isDeepFocus && (
               <button 
                 className="exit-deep-focus-btn" 
                 onClick={() => setIsDeepFocus(false)}
                 title="Exit Deep Focus (ESC)"
               >
                 <Minimize2 size={16} />
               </button>
             )}
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
      </TaskProvider>
    </NotificationProvider>
  );
}

export default App
