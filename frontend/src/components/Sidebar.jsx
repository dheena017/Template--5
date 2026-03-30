import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import { Search, Zap, Sliders } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SearchBar from './common/SearchBar/SearchBar';
import '../styles/Sidebar.css';

import '../styles/MissionControl.css';
import OrganizePDFSidebar from './sidebars/OrganizePDFSidebar';
import OptimizePDFSidebar from './sidebars/OptimizePDFSidebar';
import ConvertToPDFSidebar from './sidebars/ConvertToPDFSidebar';
import ConvertFromPDFSidebar from './sidebars/ConvertFromPDFSidebar';
import PDFToolSwitcher from './dropdowns/PDFToolSwitcher';
import EditPDFSidebar from './sidebars/EditPDFSidebar';
import PDFSecuritySidebar from './sidebars/PDFSecuritySidebar';
import PDFIntelligenceSidebar from './sidebars/PDFIntelligenceSidebar';
import VideoConversionSidebar from './sidebars/VideoConversionSidebar';
import AudioConversionSidebar from './sidebars/AudioConversionSidebar';
import ImageFormatConversionSidebar from './sidebars/ImageFormatConversionSidebar';
import DocumentConversionSidebar from './sidebars/DocumentConversionSidebar';

// Bespoke Aura Modern SVG Icons
const Icons = {
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Voices: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
  Studio: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" x2="12" y1="2" y2="4"/><line x1="12" x2="12" y1="20" y2="22"/><line x1="2" x2="4" y1="12" y2="12"/><line x1="20" x2="22" y1="12" y2="12"/></svg>,
  Flows: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Files: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>,
  PDF: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Avatar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>,
  Info: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  Books: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  ChevronDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  ChevronRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
  Back: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  Image: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  Text: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18.1H3"/></svg>,
  Social: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  Dev: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Intel: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/><path d="M12 18H2"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  More: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>,
};

const Sidebar = ({ activeTab, onTabChange, isOpen, onToggle }) => {
  const { toggleApp } = useSettings();
  const { tasks } = useTasks();
  const [isToolsOpenMobile, setIsToolsOpenMobile] = useState(false);
  const [sidebarView, setSidebarView] = useState('main'); 
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isConversionOpen, setIsConversionOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSpeechOpen, setIsSpeechOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [isIntelOpen, setIsIntelOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: <Icons.Home /> },
    { id: 'voices', label: 'Voices', icon: <Icons.Voices /> },
    { id: 'studio', label: 'Studio', icon: <Icons.Studio /> },
    { id: 'flows', label: 'Flows', icon: <Icons.Flows />, badge: 'New' },
    { id: 'files', label: 'Files', icon: <Icons.Files /> },
  ];

  const pdfCategories = [
    { id: 'pdf-select', label: 'PDF Dashboard' },
    { id: 'organize-pdf', label: 'Organize PDF' },
    { id: 'optimize-pdf', label: 'Optimize PDF' },
    { id: 'convert-to-pdf', label: 'Convert to PDF' },
    { id: 'convert-from-pdf', label: 'Convert from PDF' },
    { id: 'edit-pdf', label: 'Edit PDF' },
    { id: 'pdf-security', label: 'PDF security' },
    { id: 'pdf-intelligence', label: 'PDF Intelligence' },
    { id: 'settings/pdf', label: '📑 PDF Settings' },
  ];

  const conversionCategories = [
    { id: 'video-conversion', label: 'Video Conversion' },
    { id: 'audio-conversion', label: 'Audio Conversion' },
    { id: 'image-conversion', label: 'Image Conversion' },
    { id: 'document-conversion', label: 'Document Conversion' },
  ];

  const avatarCategories = [
    { id: 'avatar-dashboard', label: 'Avatar Dashboard' },
    { id: 'ai-studio', label: 'AI Studio' },
    { id: 'avatar-creator', label: 'Avatar Creator' },
    { id: 'face-swap', label: 'Face Swap' },
    { id: 'video-agent', label: 'Video Agent' },
    { id: 'avatar-templates', label: 'Templates' },
    { id: 'ppt-to-video', label: 'PPT to Video' },
    { id: 'translate', label: 'Translate' },
    { id: 'characters', label: 'Characters' },
    { id: 'avatars', label: 'Avatars' },
    { id: 'apps', label: 'Apps' },
    { id: 'brand-system', label: 'Brand System' },
    { id: 'team', label: 'Team' },
    { id: 'project-avatar', label: 'Projects' },
    { id: 'settings/avatar', label: '👤 Avatar Settings' },
  ];

  const speechCategories = [
    { id: 'speech-dashboard', label: 'Speech Dashboard' },
    { id: 'text-to-speech', label: 'Text to Speech' },
    { id: 'voice-changer', label: 'Voice Changer' },
    { id: 'podcast-creator', label: 'Podcast Creator' },
    { id: 'audio-dubbing', label: 'Audio Dubbing' },
    { id: 'pronunciation', label: 'Pronunciation' },
    { id: 'sound-effects', label: 'Sound Effects' },
    { id: 'clone-voices', label: 'Clone Voices' },
    { id: 'settings/speech', label: '🎙️ Voice Settings' },
  ];

  const studioCategories = [
    { id: 'artists-home', label: 'Studio Dashboard' },
    { id: 'ai-orchestrator', label: 'AI Orchestrator' },
    { id: 'face-swap-ai', label: 'Face Swap AI' },
    { id: 'music-generator', label: 'Music Generator' },
    { id: 'highlights', label: 'Video Highlights' },
    { id: 'b-roll', label: 'B-Roll Generator' },
    { id: 'product-placement', label: 'Product Placement' },
    { id: 'ugc-creator', label: 'UGC Creator' },
    { id: 'batch-mode', label: 'Batch Processing' },
    { id: 'voice-isolator', label: 'Voice Isolator' },
    { id: 'audio-native', label: 'Audio Native' },
    { id: 'history', label: 'Export History' },
    { id: 'settings/studio', label: '🎬 Studio Settings' },
  ];

  const aboutCategories = [
    { id: 'billing', label: 'Billing Dashboard' },
    { id: 'docs', label: 'Documentation', url: 'http://localhost:8000/docs' },
    { id: 'faq', label: 'FAQ & Support' },
    { id: 'ask', label: 'Ask AI Assistant' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'notifications', label: 'Update Logs' },
    { id: 'about-us', label: 'About Team' },
  ];

  const imageCategories = [
    { id: 'image-dashboard', label: 'Visual Dashboard' },
    { id: 'image-generator', label: 'Image Creator' },
    { id: 'brand-kits', label: 'Brand Kits' },
    { id: 'models', label: 'AI Models' },
    { id: 'flux-contest', label: 'Flux Contest' },
    { id: 'settings/image', label: '🎨 Image Settings' },
  ];

  const textCategories = [
    { id: 'text-dashboard', label: 'Smart Text Hub' },
    { id: 'rules', label: 'AI Rules' },
    { id: 'settings/text', label: '✍️ Text Settings' },
  ];

  const socialCategories = [
    { id: 'social-dashboard', label: 'Social Dashboard' },
    { id: 'blog', label: 'Blog Builder' },
    { id: 'twitter', label: 'Twitter Thread' },
    { id: 'discord', label: 'Discord Bot' },
    { id: 'integrations', label: 'Connect Tools' },
    { id: 'settings/social', label: '🌐 Social Settings' },
  ];

  const devCategories = [
    { id: 'dev-dashboard', label: 'Dev Hub' },
    { id: 'api-keys', label: 'API Keys' },
    { id: 'developer-api-hub', label: 'API Console', url: 'http://localhost:8000/docs' },
    { id: 'dev-analytics', label: 'Analytics' },
    { id: 'dev-logs', label: 'Logs & Debug' },
    { id: 'system-status', label: 'System' },
    { id: 'webhooks', label: 'Webhooks' },
    { id: 'settings/developers', label: '⚙️ API Settings' },
  ];

  const intelCategories = [
    { id: 'query-agent', label: 'Search AI' },
  ];
  const [intelOpen, setIntelOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');

  const filterLinks = (links) => {
    if (!sidebarSearch) return links;
    return links.filter(link => link.label.toLowerCase().includes(sidebarSearch.toLowerCase()));
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const filteredPdf = filterLinks(pdfCategories);
  const filteredConversion = filterLinks(conversionCategories);
  const filteredAvatar = filterLinks(avatarCategories);
  const filteredSpeech = filterLinks(speechCategories);
  const filteredStudio = filterLinks(studioCategories);
  const filteredAbout = filterLinks(aboutCategories);
  const filteredImage = filterLinks(imageCategories);
  const filteredText = filterLinks(textCategories);
  const filteredSocial = filterLinks(socialCategories);
  const filteredDev = filterLinks(devCategories);

  const isAnyResult = sidebarSearch ? (
    filteredMenuItems.length > 0 || filteredPdf.length > 0 || filteredConversion.length > 0 || filteredAvatar.length > 0 ||
    filteredSpeech.length > 0 || filteredStudio.length > 0 || filteredAbout.length > 0 ||
    filteredImage.length > 0 || filteredText.length > 0 || filteredSocial.length > 0 ||
    filteredDev.length > 0
  ) : true;

  const renderCurrentView = () => {
    switch (sidebarView) {
      case 'organize-pdf': return <OrganizePDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'optimize-pdf': return <OptimizePDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'convert-to-pdf': return <ConvertToPDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'convert-from-pdf': return <ConvertFromPDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'edit-pdf': return <EditPDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'pdf-security': return <PDFSecuritySidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'pdf-intelligence': return <PDFIntelligenceSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'video-conversion': return <VideoConversionSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'audio-conversion': return <AudioConversionSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'document-conversion': return <DocumentConversionSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'image-conversion':
      case 'image-conversion-tools': return <ImageFormatConversionSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      default: return renderMainNavigation();
    }
  };

  const renderMainNavigation = () => (
    <>
      <div className="sidebar-search-container-aura">
        <SearchBar 
          placeholder="Quick search..."
          onSearch={(val) => setSidebarSearch(val)}
          className="sidebar-search-premium"
        />
      </div>

      <div className="workspace-card">
        <div className="workspace-icon"><div className="aura-dot"></div></div>
        <div className="workspace-info">
           <span className="workspace-label">Current Workspace</span>
           <span className="workspace-name">Aura Design</span>
        </div>
        <Icons.ChevronDown />
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {!isAnyResult && (
            <div className="sidebar-no-results">No results</div>
          )}

          {filteredMenuItems.map((item, i) => (
            <li 
              key={item.id}
              className={`${activeTab === item.id ? 'active' : ''} animate-slide-right`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => onTabChange(item.id)}
            >
              <span className="item-icon-aura">{item.icon}</span>
              <span className="label-aura">{item.label}</span>
              {item.badge && <span className={`item-badge-aura ${item.badge.toLowerCase()}`}>{item.badge}</span>}
            </li>
          ))}
          
          {(sidebarSearch || (!sidebarSearch && true)) && (
            <>
              <div className="nav-section-divider-aura" style={{ marginTop: 24, marginBottom: 0 }}></div>
              <div className="nav-section-title-aura" style={{ margin: '16px 0 12px 0' }}>ESSENTIALS</div>
            </>
          )}
          
          {/* PDF SECTION */}
          {(sidebarSearch ? filteredPdf.length > 0 : true) && (
            <>
              <div style={{ height: 0 }} />
              <li className={`dropdown-trigger-aura ${(isPdfOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => {
                if (!sidebarSearch) setIsPdfOpen(!isPdfOpen);
                onTabChange('pdf-select'); 
              }}>
                 <span className="item-icon-aura"><Icons.PDF /></span>
                 <span className="label-aura">PDF Tools</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isPdfOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isPdfOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredPdf.map((item, idx) => (
                    <li key={item.id} 
                        className={`sub-item-aura ${sidebarView === item.id ? 'active' : ''} animate-slide-right`} 
                        style={{ animationDelay: `${idx * 0.03}s` }}
                        onClick={() => { setSidebarView(item.id); onTabChange(item.id); }}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          
          {/* CONVERSION SECTION */}
          {(sidebarSearch ? filteredConversion.length > 0 : true) && (
            <>
              <div className="nav-section-divider-aura"></div>
              <li className={`dropdown-trigger-aura ${(isConversionOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => {
                if (!sidebarSearch) setIsConversionOpen(!isConversionOpen);
                onTabChange('universal-conversion'); 
              }}>
                 <span className="item-icon-aura"><Icons.Flows /></span>
                 <span className="label-aura">Universal Converters</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isConversionOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isConversionOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredConversion.map((item, idx) => (
                    <li key={item.id} 
                        className={`sub-item-aura ${sidebarView === item.id ? 'active' : ''} animate-slide-right`} 
                        style={{ animationDelay: `${idx * 0.03}s` }}
                        onClick={() => { setSidebarView(item.id); onTabChange(item.id); }}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* AVATAR SECTION */}
          {(sidebarSearch ? filteredAvatar.length > 0 : true) && (
            <>
              <div className="nav-section-divider-aura"></div>
              <li className={`dropdown-trigger-aura ${(isAvatarOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => { if (!sidebarSearch) setIsAvatarOpen(!isAvatarOpen); onTabChange('avatar-dashboard'); }}>
                 <span className="item-icon-aura"><Icons.Avatar /></span>
                 <span className="label-aura">Avatar AI</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isAvatarOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isAvatarOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredAvatar.map((item) => (
                    <li key={item.id} className={`sub-item-aura ${activeTab === item.id ? 'active' : ''}`} onClick={() => onTabChange(item.id)}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* SPEECH SECTION */}
          {(sidebarSearch ? filteredSpeech.length > 0 : true) && (
            <>
              <div className="nav-section-divider-aura"></div>
              <li className={`dropdown-trigger-aura ${(isSpeechOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => { if (!sidebarSearch) setIsSpeechOpen(!isSpeechOpen); onTabChange('speech-dashboard'); }}>
                 <span className="item-icon-aura"><Icons.Voices /></span>
                 <span className="label-aura">Voice & Speech</span>
                 {!sidebarSearch && (
                    <span className="dropdown-arrow-aura">
                      {isSpeechOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                    </span>
                 )}
              </li>
              {(isSpeechOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredSpeech.map((item) => (
                    <li key={item.id} className={`sub-item-aura ${activeTab === item.id ? 'active' : ''}`} onClick={() => onTabChange(item.id)}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* STUDIO SECTION */}
          {(sidebarSearch ? filteredStudio.length > 0 : true) && (
            <>
              <div className="nav-section-divider-aura"></div>
              <li className={`dropdown-trigger-aura ${(isStudioOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => { if (!sidebarSearch) setIsStudioOpen(!isStudioOpen); onTabChange('artists-home'); }}>
                 <span className="item-icon-aura"><Icons.Studio /></span>
                 <span className="label-aura">Creation Studio</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isStudioOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isStudioOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredStudio.map((item) => (
                    <li key={item.id} className={`sub-item-aura ${activeTab === item.id ? 'active' : ''}`} onClick={() => onTabChange(item.id)}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* IMAGE SECTION */}
          {(sidebarSearch ? filteredImage.length > 0 : true) && (
            <>
              <li className={`dropdown-trigger-aura ${(isImageOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => { if (!sidebarSearch) setIsImageOpen(!isImageOpen); onTabChange('image-dashboard'); }}>
                 <span className="item-icon-aura"><Icons.Image /></span>
                 <span className="label-aura">Visual Design</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isImageOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isImageOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredImage.map((item) => (
                    <li key={item.id} className={`sub-item-aura ${activeTab === item.id ? 'active' : ''}`} onClick={() => onTabChange(item.id)}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* SOCIAL SECTION */}
          {(sidebarSearch ? filteredSocial.length > 0 : true) && (
            <>
              <li className={`dropdown-trigger-aura ${(isSocialOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => { if (!sidebarSearch) setIsSocialOpen(!isSocialOpen); onTabChange('social-dashboard'); }}>
                 <span className="item-icon-aura"><Icons.Social /></span>
                 <span className="label-aura">Marketing & Social</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isSocialOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isSocialOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredSocial.map((item) => (
                    <li key={item.id} className={`sub-item-aura ${activeTab === item.id ? 'active' : ''}`} onClick={() => onTabChange(item.id)}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* DEV HUB */}
          {(sidebarSearch ? filteredDev.length > 0 : true) && (
            <>
              <li className={`dropdown-trigger-aura ${(isDevOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => { if (!sidebarSearch) setIsDevOpen(!isDevOpen); onTabChange('dev-dashboard'); }}>
                 <span className="item-icon-aura"><Icons.Dev /></span>
                 <span className="label-aura">Developer Hub</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isDevOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isDevOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredDev.map((item) => (
                    <li key={item.id} className={`sub-item-aura ${activeTab === item.id ? 'active' : ''}`} onClick={() => {
                      if (item.url) {
                        window.open(item.url, '_blank');
                      } else {
                        onTabChange(item.id);
                      }
                    }}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* TEXT SECTION */}
          {(sidebarSearch ? filteredText.length > 0 : true) && (
            <>
              <li className={`dropdown-trigger-aura ${(isTextOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => { if (!sidebarSearch) setIsTextOpen(!isTextOpen); onTabChange('text-dashboard'); }}>
                 <span className="item-icon-aura"><Icons.Text /></span>
                 <span className="label-aura">Smart Text</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isTextOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isTextOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredText.map((item) => (
                    <li key={item.id} className={`sub-item-aura ${activeTab === item.id ? 'active' : ''}`} onClick={() => onTabChange(item.id)}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* ABOUT SECTION */}
          {(sidebarSearch ? filteredAbout.length > 0 : true) && (
            <>
              <li className={`dropdown-trigger-aura ${(isAboutOpen || sidebarSearch) ? 'open' : ''}`} onClick={() => { if (!sidebarSearch) setIsAboutOpen(!isAboutOpen); onTabChange('billing'); }}>
                 <span className="item-icon-aura"><Icons.Info /></span>
                 <span className="label-aura">Resources</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isAboutOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isAboutOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredAbout.map((item) => (
                    <li key={item.id} className={`sub-item-aura ${activeTab === item.id ? 'active' : ''}`} onClick={() => {
                      if (item.url) {
                        window.open(item.url, '_blank');
                      } else {
                        onTabChange(item.id);
                      }
                    }}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          
          {(sidebarSearch ? (activeTab === 'audiobooks' && 'Audiobooks'.toLowerCase().includes(sidebarSearch.toLowerCase())) : true) && (
            <li className={activeTab === 'audiobooks' ? 'active' : ''} onClick={() => onTabChange('audiobooks')}>
              <span className="item-icon-aura"><Icons.Books /></span>
              <span className="label-aura">Audiobooks</span>
              <span className="item-badge-aura pro">Pro</span>
            </li>
          )}
        </ul>
      </nav>
    </>
  );


  const EssentialsGrid = () => (
    <div className={`essentials-mobile-hub ${isToolsOpenMobile ? 'open' : ''}`}>
      <div className="hub-header">
        <h2>Essential Tools</h2>
        <button onClick={() => setIsToolsOpenMobile(false)}>×</button>
      </div>
      <div className="hub-grid">
        <div className="hub-item" onClick={() => { onTabChange('pdf-select'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon pdf"><Icons.PDF /></div>
          <span>PDF Tools</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('avatar-dashboard'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon avatar"><Icons.Avatar /></div>
          <span>Avatar AI</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('speech-dashboard'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon speech"><Icons.Voices /></div>
          <span>Voice & Audio</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('artists-home'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon studio"><Icons.Studio /></div>
          <span>Creation Studio</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('image-dashboard'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon image"><Icons.Image /></div>
          <span>Visual Design</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('social-dashboard'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon social"><Icons.Social /></div>
          <span>Marketing Hub</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('dev-dashboard'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon dev"><Icons.Dev /></div>
          <span>Developer Hub</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('text-dashboard'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon text"><Icons.Text /></div>
          <span>Smart Text</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('audiobooks'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon books"><Icons.Books /></div>
          <span>Audiobooks</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('billing'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon about"><Icons.Info /></div>
          <span>Resources</span>
        </div>
        <div className="hub-item" onClick={() => { onTabChange('settings-hub'); setIsToolsOpenMobile(false); }}>
          <div className="hub-icon settings"><Icons.Settings /></div>
          <span>System Settings</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-header">
           {sidebarView === 'main' ? (
             <>
               <div className="aura-logo" onClick={() => onTabChange('dashboard')} style={{ cursor: 'pointer' }}>
                 <div className="logo-icon"></div>
                 <h1 className="logo-text">Aura</h1>
               </div>
               <button className="sidebar-close-btn-aura" onClick={onToggle}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
               </button>
             </>
           ) : (
             <div className="sidebar-view-header" onClick={() => setSidebarView('main')}>
               <div className="back-btn-aura"><Icons.Back /></div>
               <span className="view-title-aura">
                  {pdfCategories.find(c => c.id === sidebarView)?.label || 'Back'}
               </span>
             </div>
           )}
        </div>

        <div className="sidebar-scroll-aura">
          {renderCurrentView()}
        </div>

        <div className="sidebar-footer-aura">
          {/* Mission Control Widget */}
          <AnimatePresence>
            {tasks.length > 0 && (
              <motion.div 
                className="mission-control-aura"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="mc-header">
                  <span className="mc-title">Mission Control</span>
                  <span className="mc-count">{tasks.filter(t => t.status === 'running').length} Active</span>
                </div>
                <div className="mc-tasks-list">
                  {tasks.map(task => (
                    <div key={task.id} className="mc-task-item">
                      <div className="mc-task-info">
                        <span className="mc-task-name">{task.name}</span>
                        <span className="mc-task-pct">{task.progress}%</span>
                      </div>
                      <div className="mc-progress-track">
                        <motion.div 
                          className="mc-progress-fill" 
                          animate={{ width: `${task.progress}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="sidebar-settings-aura" onClick={toggleApp} style={{ cursor: 'pointer', padding: '12px 16px', borderRadius: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s' }}>
            <Icons.Settings />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>App Settings</span>
          </div>
          <div className="usage-card-aura">
            <div className="usage-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: '#fff' }}>Aura Credits:</span>
              <span style={{ fontSize: '12.5px', color: 'var(--text-muted, #b3b3b3)' }}>85/100 <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 700 }}>(85% remaining)</span></span>
            </div>
            <div className="usage-bar-bg" style={{ marginTop: 6 }}>
               <div className="usage-bar-fill" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="user-profile-footer-aura" onClick={() => { onTabChange('profile'); setSidebarView('main'); }}>
            <div className="user-avatar-aura" title="Kj. Dheena - Pro Plan">KJ</div>
            <div className="user-details-aura">
               <span className="user-name">Kj. Dheena</span>
               <span className="user-plan">Pro Plan</span>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar Overrides */}
        <nav className="mobile-bottom-bar-nav">
          <ul className="mobile-nav-list">
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => onTabChange('dashboard')}>
              <Icons.Home />
              <span>Home</span>
            </li>
            <li className={activeTab === 'studio' ? 'active' : ''} onClick={() => onTabChange('studio')}>
              <Icons.Studio />
              <span>Studio</span>
            </li>
            <li className={isToolsOpenMobile ? 'active' : ''} onClick={() => setIsToolsOpenMobile(true)}>
              <Icons.More />
              <span>Tools</span>
            </li>
            <li className={activeTab === 'files' ? 'active' : ''} onClick={() => onTabChange('files')}>
              <Icons.Files />
              <span>Files</span>
            </li>
            <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => onTabChange('profile')}>
              <Icons.Avatar />
              <span>Profile</span>
            </li>
          </ul>
        </nav>
      </aside>
      <EssentialsGrid />
    </>
  );
};

export default Sidebar;
