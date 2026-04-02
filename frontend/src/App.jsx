import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MotionConfig, AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { NotificationProvider } from './context/NotificationContext';
import { api } from './services/api'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import { Search, Home, FileUp, Minimize2, Zap } from 'lucide-react'
import * as VideoConversions from './pages/pdf/VideoConversion'
import * as AudioConversions from './pages/pdf/AudioConversion'
import * as ImageFormatConversions from './pages/pdf/ImageFormatConversion'
import * as EditPDFTools from './pages/pdf/EditPDF/index'
import * as PDFSecurityTools from './pages/pdf/PDFSecurity/index'
import * as EbookConversions from './pages/pdf/EbookConversion/index'
import * as ConvertToPDF from './pages/pdf/ConvertToPDF/index'
import * as OfficeTools from './pages/pdf/OfficeTools/index'
import NextActionRail from './components/common/NextActionRail'
import VisualAssetTray from './components/common/VisualAssetTray'
import { useSettings } from './context/SettingsContext'
import RightSettingsPanel from './components/RightSettingsPanel'
import ToolSettingsManager from './components/toolSettings/ToolSettingsManager'
import './App.css'
import './styles/Notifications.css'
import './styles/NextActionRail.css'
import './styles/VisualAssetTray.css'
import LoadingScreen from './components/common/LoadingScreen/LoadingScreen'


// Lazy load large sections to prevent circular imports & improve stability
const Pages = {
  Profile: React.lazy(() => import('./pages/Profile')),
  Dashboard: React.lazy(() => import('./pages/dashboards/Dashboard')),
  UserDashboard: React.lazy(() => import('./pages/dashboards/UserDashboard')),
  GeneralSettings: React.lazy(() => import('./pages/settings/GeneralSettings')),
  ImageSettings: React.lazy(() => import('./pages/settings/ImageSettings')),
  AvatarSettings: React.lazy(() => import('./pages/settings/AvatarSettings')),
  SpeechSettings: React.lazy(() => import('./pages/settings/SpeechSettings')),
  TextSettings: React.lazy(() => import('./pages/settings/TextSettings')),
  StudioSettings: React.lazy(() => import('./pages/settings/StudioSettings')),
  FileSettings: React.lazy(() => import('./pages/settings/FileSettings')),
  PDFSettings: React.lazy(() => import('./pages/settings/PDFSettings')),
  DevSettings: React.lazy(() => import('./pages/settings/DevSettings')),
  SocialSettings: React.lazy(() => import('./pages/settings/SocialSettings')),
  AboutSettings: React.lazy(() => import('./pages/settings/AboutSettings')),
  HubDashboard: React.lazy(() => import('./pages/dashboards/HubDashboard')),
  GenericDashboard: React.lazy(() => import('./pages/dashboards/GenericDashboard')),
  ImageDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.ImageDashboard }))),
  ImageGenerator: React.lazy(() => import('./pages/image/ImageGenerator')),
  BrandKits: React.lazy(() => import('./pages/image/BrandKits')),
  Models: React.lazy(() => import('./pages/image/Models')),
  FluxContest: React.lazy(() => import('./pages/image/FluxContest')),
  GenerateImages: React.lazy(() => import('./pages/image/GenerateImages')),
  AvatarDashboard: React.lazy(() => import('./pages/avatar/AvatarDashboard')),
  AIStudio: React.lazy(() => import('./pages/video-ai/AIStudio')),
  AvatarCreator: React.lazy(() => import('./pages/avatar/AvatarCreator')),
  ArtistFaceSwap: React.lazy(() => import('./pages/avatar/ArtistFaceSwap')),
  VideoAgent: React.lazy(() => import('./pages/video-ai/VideoAgent')),
  AvatarTemplates: React.lazy(() => import('./pages/avatar/AvatarTemplates')),
  PPTToVideo: React.lazy(() => import('./pages/video-ai/PPTToVideo')),
  Translate: React.lazy(() => import('./pages/avatar/Translate')),
  Characters: React.lazy(() => import('./pages/avatar/Characters')),
  Avatars: React.lazy(() => import('./pages/avatar/Avatars')),
  Apps: React.lazy(() => import('./pages/avatar/Apps')),
  BrandSystem: React.lazy(() => import('./pages/avatar/BrandSystem')),
  TeamDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.TeamDashboard }))),
  Team: React.lazy(() => import('./pages/avatar/Team')),
  ProjectAvatar: React.lazy(() => import('./pages/avatar/Project')),
  SpeechDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.SpeechDashboard }))),
  TextToSpeech: React.lazy(() => import('./pages/speech/TextToSpeech')),
  VoiceChanger: React.lazy(() => import('./pages/speech/VoiceChanger')),
  PodcastCreator: React.lazy(() => import('./pages/speech/PodcastCreator')),
  AudioDubbing: React.lazy(() => import('./pages/speech/AudioDubbing')),
  Pronunciation: React.lazy(() => import('./pages/speech/Pronunciation')),
  SoundEffects: React.lazy(() => import('./pages/speech/SoundEffects')),
  Voices: React.lazy(() => import('./pages/speech/Voices')),
  StudioDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.StudioDashboard }))),
  FaceSwapAI: React.lazy(() => import('./pages').then(m => ({ default: m.FaceSwapAI }))),
  MusicGenerator: React.lazy(() => import('./pages').then(m => ({ default: m.MusicGenerator }))),
  Highlights: React.lazy(() => import('./pages').then(m => ({ default: m.Highlights }))),
  GenerateBRoll: React.lazy(() => import('./pages').then(m => ({ default: m.GenerateBRoll }))),
  ProductPlacement: React.lazy(() => import('./pages').then(m => ({ default: m.ProductPlacement }))),
  UGCCreator: React.lazy(() => import('./pages').then(m => ({ default: m.UGCCreator }))),
  BatchMode: React.lazy(() => import('./pages').then(m => ({ default: m.BatchMode }))),
  VoiceIsolator: React.lazy(() => import('./pages').then(m => ({ default: m.VoiceIsolator }))),
  AudioNative: React.lazy(() => import('./pages').then(m => ({ default: m.AudioNative }))),
  Playground: React.lazy(() => import('./pages').then(m => ({ default: m.Playground }))),
  History: React.lazy(() => import('./pages').then(m => ({ default: m.History }))),
  InstantHighlights: React.lazy(() => import('./pages').then(m => ({ default: m.InstantHighlights }))),
  VideoDubbing: React.lazy(() => import('./pages').then(m => ({ default: m.VideoDubbing }))),
  VideoPodcast: React.lazy(() => import('./pages').then(m => ({ default: m.VideoPodcast }))),
  TextToVideoGenerator: React.lazy(() => import('./pages/video-ai/TextToVideoGenerator')),
  ImageToVideoGenerator: React.lazy(() => import('./pages/video-ai/ImageToVideo/ImageToVideoGenerator')),
  TextToVideoDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.TextToVideoDashboard }))),
  ImageToVideoDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.ImageToVideoDashboard }))),
  ScriptToVideo: React.lazy(() => import('./pages/video-ai/ScriptToVideo')),
  BlogToVideo: React.lazy(() => import('./pages/video-ai/BlogToVideo')),
  AutoEditVideo: React.lazy(() => import('./pages/video-ai/AutoEditVideo')),
  RecordToVideo: React.lazy(() => import('./pages/video-ai/RecordToVideo')),
  BlankCanvas: React.lazy(() => import('./pages/video-ai/BlankCanvas')),
  VideoDashboard: React.lazy(() => import('./pages/video-ai/VideoDashboard')),
  ArtistsHome: React.lazy(() => import('./pages/studio/ArtistsHome')),
  FilesDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.FilesDashboard }))),
  Files: React.lazy(() => import('./pages/files/Files')),
  Audiobooks: React.lazy(() => import('./pages/files/Audiobooks')),
  Productions: React.lazy(() => import('./pages/files/Productions')),
  Series: React.lazy(() => import('./pages/files/Series')),
  Templates: React.lazy(() => import('./pages/files/Templates')),
  TextDashboard: React.lazy(() => import('./pages/text/TextDashboard')),
  SpeechToText: React.lazy(() => import('./pages/text/SpeechToText')),
  Rules: React.lazy(() => import('./pages/text/Rules')),
  SocialDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.SocialDashboard }))),
  Blog: React.lazy(() => import('./pages/social-media/Blog')),
  Discord: React.lazy(() => import('./pages/social-media/Discord')),
  Twitter: React.lazy(() => import('./pages/social-media/Twitter')),
  Integrations: React.lazy(() => import('./pages/social-media/Integrations')),
  SocialMedia: React.lazy(() => import('./pages/social-media/SocialMedia')),
  DevDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.DevDashboard }))),
  ApiKeys: React.lazy(() => import('./pages/developers/ApiKeys')),
  DevAnalytics: React.lazy(() => import('./pages/developers/DevAnalytics')),
  DevLogs: React.lazy(() => import('./pages/developers/DevLogs')),
  DevOverview: React.lazy(() => import('./pages/developers/DevOverview')),
  EnvVars: React.lazy(() => import('./pages/developers/EnvVars')),
  SystemStatus: React.lazy(() => import('./pages/developers/SystemStatus')),
  Webhooks: React.lazy(() => import('./pages/developers/Webhooks')),
  API: React.lazy(() => import('./pages/developers/API')),
  Billing: React.lazy(() => import('./pages/about-us/Billing')),
  Docs: React.lazy(() => import('./pages/about-us/Docs')),
  FAQSupport: React.lazy(() => import('./pages/about-us/FAQSupport')),
  Feedback: React.lazy(() => import('./pages/about-us/Feedback')),
  Notifications: React.lazy(() => import('./pages/about-us/Notifications')),
  AboutUs: React.lazy(() => import('./pages/about-us/AboutUs')),
  ResourcesDashboard: React.lazy(() => import('./pages/dashboards/CategoryDashboards').then(m => ({ default: m.ResourcesDashboard }))),
  ComingSoon: React.lazy(() => import('./pages/about-us/ComingSoon')),
  Ask: React.lazy(() => import('./pages/about-us/Ask')),
  AnalyticsDashboard: React.lazy(() => import('./pages/dashboards/AnalyticsDashboard')),
  VideoConversionDashboard: React.lazy(() => import('./pages/pdf/VideoConversionDashboard')),
  AudioConversionDashboard: React.lazy(() => import('./pages/pdf/AudioConversionDashboard')),
  ImageFormatConversionDashboard: React.lazy(() => import('./pages/pdf/ImageFormatConversionDashboard')),
  DocumentConversionDashboard: React.lazy(() => import('./pages/pdf/DocumentConversionDashboard')),
  MergePDF: React.lazy(() => import('./pages/pdf/MergePDF')),
  SplitPDF: React.lazy(() => import('./pages/pdf/SplitPDF')),
  RemovePages: React.lazy(() => import('./pages/pdf/RemovePages')),
  ExtractPages: React.lazy(() => import('./pages/pdf/ExtractPages')),
  ScanToPDF: React.lazy(() => import('./pages/pdf/ScanToPDF')),
  OCRPDF: React.lazy(() => import('./pages/pdf/OCRPDF')),
  PDFDashboard: React.lazy(() => import('./pages/pdf/PDFDashboard')),
  PDFPages: React.lazy(() => import('./pages/pdf/PDFPages')),
  PDFOrganizeDashboard: React.lazy(() => import('./pages/pdf/dashboards/OrganizePDFDashboard')),
  PDFOptimizeDashboard: React.lazy(() => import('./pages/pdf/dashboards/OptimizePDFDashboard')),
  PDFConvertToDashboard: React.lazy(() => import('./pages/pdf/dashboards/ConvertToPDFDashboard')),
  PDFConvertFromDashboard: React.lazy(() => import('./pages/pdf/dashboards/ConvertFromPDFDashboard')),
  PDFIntelligenceDashboardMain: React.lazy(() => import('./pages/pdf/dashboards/PDFIntelligenceDashboard')),
  PDFEditDashboard: React.lazy(() => import('./pages/pdf/dashboards/EditPDFDashboard')),
  PDFSecurityDashboardMain: React.lazy(() => import('./pages/pdf/dashboards/PDFSecurityDashboard')),
};



function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDeepFocus, setIsDeepFocus] = useState(false)
  const { animationsEnabled, auraBackground } = useTheme();
  const { appSettingsOpen, setAppSettingsOpen, toolSettingsOpen, setToolSettingsOpen } = useSettings();
  const [backendStatus, setBackendStatus] = useState('Checking...')
  const [features, setFeatures] = useState([])
  const [isBooting, setIsBooting] = useState(false)

  // Motion values for global parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const location = useLocation()
  const navigate = useNavigate()

  // Sync activeTab with URL path on load and URL changes
  useEffect(() => {
    const path = location.pathname.substring(1)
    if (path && path !== activeTab) {
      const tabId = path === '' ? 'dashboard' : path;
      setActiveTab(tabId);
    } else if (!path) {
      setActiveTab('dashboard');
    }
  }, [location])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const initApp = async () => {
      try {
        const [healthData, featuresData] = await Promise.all([
          api.fetchHealth().catch(() => ({ status: 'Offline' })),
          api.fetchFeatures().catch(() => [])
        ]);
        setBackendStatus(healthData.status);
        setFeatures(featuresData);
      } catch (err) {
        console.error("Bootup error:", err);
      } finally {
        setIsBooting(false);
      }
    };
    initApp();
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
      case 'settings-hub': return <Pages.GeneralSettings />;
      case 'settings/general': return <Pages.GeneralSettings />;
      case 'settings/image': return <Pages.ImageSettings />;
      case 'settings/avatar': return <Pages.AvatarSettings />;
      case 'settings/speech': return <Pages.SpeechSettings />;
      case 'settings/text': return <Pages.TextSettings />;
      case 'settings/studio': return <Pages.StudioSettings />;
      case 'settings/files': return <Pages.FileSettings />;
      case 'settings/pdf': return <Pages.PDFSettings />;
      case 'settings/developers': return <Pages.DevSettings />;
      case 'settings/social': return <Pages.SocialSettings />;
      case 'settings/about': return <Pages.AboutSettings />;
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
      case 'Text-to-Video': 
      case 'text-to-video': return <Pages.TextToVideoGenerator />;
      case 'text-to-video-dashboard': return <Pages.TextToVideoDashboard />;
      case 'image-to-video-dashboard': return <Pages.ImageToVideoDashboard />;
      case 'image-to-video': return <Pages.ImageToVideoGenerator />;
      case 'script-to-video': return <Pages.ScriptToVideo />;
      case 'blog-to-video': return <Pages.BlogToVideo />;
      case 'auto-edit': return <Pages.AutoEditVideo />;
      case 'record-to-video': return <Pages.RecordToVideo />;
      case 'blank-video': return <Pages.BlankCanvas />;
      case 'ComingSoon-Translate': return <Pages.ComingSoon title="Video Translate" />;
      case 'video_dashboard':
      case 'video-dashboard': return <Pages.VideoDashboard onTabChange={handleTabChange} />;
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
      case 'epub-to-pdf': return <EbookConversions.EpubToPdf />;
      case 'epub-to-mobi': return <EbookConversions.EpubToMobi />;
      case 'epub-to-azw3': return <EbookConversions.EpubToAzw3 />;
      case 'mobi-to-pdf': return <EbookConversions.MobiToPdf />;
      case 'mobi-to-epub': return <EbookConversions.MobiToEpub />;
      case 'mobi-to-azw3': return <EbookConversions.MobiToAzw3 />;
      case 'pdf-to-epub': return <EbookConversions.PdfToEpub />;
      case 'pdf-to-mobi': return <EbookConversions.PdfToMobi />;
      case 'pdf-to-azw3': return <EbookConversions.PdfToAzw3 />;
      case 'azw3-to-pdf': return <EbookConversions.Azw3ToPdf />;
      case 'azw3-to-epub': return <EbookConversions.Azw3ToEpub />;
      case 'azw3-to-mobi': return <EbookConversions.Azw3ToMobi />;

      // ── Office Tools ──────────────────────────────────────
      case 'word-merge': return <OfficeTools.WordMerge />;
      case 'excel-merge': return <OfficeTools.ExcelMerge />;
      case 'excel-split': return <OfficeTools.ExcelSplit />;
      case 'word-compress': return <OfficeTools.WordCompress />;
      case 'ppt-compress': return <OfficeTools.PptCompress />;
      case 'img-compress': return <OfficeTools.ImgCompress />;

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
        <div className="premium-glow-overlay"></div>
        <div className="noise-texture"></div>
        <MotionConfig reducedMotion={animationsEnabled ? 'never' : 'always'}>
          <div className="aura-bg-container premium-visuals" style={{ perspective: '1200px' }}>
            <div className="premium-main-bg"></div>
            {auraBackground && (
              <>
                <motion.div
                  className="aura-orb orb-1"
                  style={{ x: useTransform(springX, x => x * 0.5), y: useTransform(springY, y => y * 0.5) }}
                />
                <motion.div
                  className="aura-orb orb-2"
                  style={{ x: useTransform(springX, x => -x * 0.8), y: useTransform(springY, y => -y * 0.8) }}
                />
                <motion.div
                  className="aura-orb orb-3"
                  style={{ x: useTransform(springX, x => x * 1.2), y: useTransform(springY, y => -y * 1.2) }}
                />
                <motion.div
                  className="aura-orb orb-4"
                  style={{ x: useTransform(springX, x => -x * 1.5), y: useTransform(springY, y => y * 1.5) }}
                />
              </>
            )}
          </div>

          <AnimatePresence>
            {showQuickSearch && (
              <div className="quick-search-overlay-global" onClick={() => setShowQuickSearch(false)}>
                <motion.div
                  className="quick-search-modal-global"
                  initial={{ scale: 0.9, opacity: 0, rotateX: 10, y: -40 }}
                  animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, rotateX: 10, y: -40 }}
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="modal-search-wrapper" style={{ translateZ: '50px' }}>
                    <Search size={22} className="modal-search-icon" />
                    <input
                      autoFocus
                      placeholder="Ask Aura to 'shrink my pdf' or 'find images'..."
                      onChange={(e) => setSearchQueryHub(e.target.value)}
                    />
                    <div className="modal-esc-label">ESC</div>
                  </div>
                  <div className="modal-results-area" style={{ translateZ: '30px' }}>
                    {hubResults.length > 0 ? (
                      <div className="results-group-hub">
                        <div className="hub-group-header">
                           <Sparkles size={12} className="text-secondary" />
                           <span className="group-label-v4">AI Intent Matches</span>
                           <div className="hub-results-count">{hubResults.length} FOUND</div>
                        </div>
                        
                        <div className="hub-items-stagger">
                          {hubResults.map((item, idx) => (
                            <motion.div
                              key={idx}
                              className="command-item-v4"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={() => {
                                handleTabChange(item.path);
                                setShowQuickSearch(false);
                                setSearchQueryHub('');
                              }}
                            >
                               <div className="c-item-icon-box">
                                  {item.icon ? React.createElement(item.icon, { size: 16 }) : <Zap size={16} />}
                               </div>
                               <div className="c-item-info">
                                  <span className="c-item-title">{item.name}</span>
                                  <span className="c-item-desc">Open the specialized {item.cat} suite</span>
                               </div>
                               <div className="c-item-badge">
                                  {item.cat}
                               </div>
                            </motion.div>
                          ))}
                        </div>
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

          <div className={`app-container ${!isSidebarOpen ? 'sidebar-closed' : ''} ${isDeepFocus ? 'deep-focus-active' : ''} glass-ui-active`}>
            <RightSettingsPanel open={appSettingsOpen} setOpen={setAppSettingsOpen} />
            <ToolSettingsManager
              toolId={activeTab}
              open={toolSettingsOpen}
              onClose={() => setToolSettingsOpen(false)}
            />
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
              <main className="content-area" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
                {isDeepFocus && (
                  <button
                    className="exit-deep-focus-btn"
                    onClick={() => setIsDeepFocus(false)}
                    title="Exit Deep Focus (ESC)"
                  >
                    <Minimize2 size={16} />
                  </button>
                )}
                <React.Suspense fallback={<LoadingScreen />}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.95, rotateY: 20, z: -100 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                      exit={{ opacity: 0, scale: 1.05, rotateY: -20, z: 100 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ height: 'auto', minHeight: '100%', transformStyle: 'preserve-3d' }}
                    >
                      {renderContent()}
                    </motion.div>
                  </AnimatePresence>
                </React.Suspense>
              </main>
            </div>
          </div>
        </MotionConfig>
      </TaskProvider>
    </NotificationProvider>
  );
}

export default App;
