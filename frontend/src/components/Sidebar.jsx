import React, { useState } from 'react';
import '../styles/Sidebar.css';
import OrganizePDFSidebar from './sidebars/OrganizePDFSidebar';
import OptimizePDFSidebar from './sidebars/OptimizePDFSidebar';
import ConvertToPDFSidebar from './sidebars/ConvertToPDFSidebar';
import ConvertFromPDFSidebar from './sidebars/ConvertFromPDFSidebar';
import EditPDFSidebar from './sidebars/EditPDFSidebar';
import PDFSecuritySidebar from './sidebars/PDFSecuritySidebar';
import PDFIntelligenceSidebar from './sidebars/PDFIntelligenceSidebar';

// Bespoke Aura Modern SVG Icons
const Icons = {
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Voices: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
  Studio: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" x2="12" y1="2" y2="4"/><line x1="12" x2="12" y1="20" y2="22"/><line x1="2" x2="4" y1="12" y2="12"/><line x1="20" x2="22" y1="12" y2="12"/></svg>,
  Flows: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Files: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>,
  PDF: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Books: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  ChevronDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  ChevronRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
};

const Sidebar = ({ activeTab, onTabChange, isOpen, onToggle }) => {
  const [sidebarView, setSidebarView] = useState('main'); 
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: <Icons.Home /> },
    { id: 'voices', label: 'Voices', icon: <Icons.Voices /> },
    { id: 'studio', label: 'Studio', icon: <Icons.Studio /> },
    { id: 'flows', label: 'Flows', icon: <Icons.Flows />, badge: 'New' },
    { id: 'files', label: 'Files', icon: <Icons.Files /> },
  ];

  const pdfCategories = [
    { id: 'organize-pdf', label: 'Organize PDF', icon: <Icons.PDF /> },
    { id: 'optimize-pdf', label: 'Optimize PDF', icon: <Icons.PDF /> },
    { id: 'convert-to-pdf', label: 'Convert to PDF', icon: <Icons.PDF /> },
    { id: 'convert-from-pdf', label: 'Convert from PDF', icon: <Icons.PDF /> },
    { id: 'edit-pdf', label: 'Edit PDF', icon: <Icons.PDF /> },
    { id: 'pdf-security', label: 'PDF security', icon: <Icons.PDF /> },
    { id: 'pdf-intelligence', label: 'PDF Intelligence', icon: <Icons.PDF /> },
  ];

  const renderSecondarySidebar = () => {
    switch (sidebarView) {
      case 'organize-pdf': return <OrganizePDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'optimize-pdf': return <OptimizePDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'convert-to-pdf': return <ConvertToPDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'convert-from-pdf': return <ConvertFromPDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'edit-pdf': return <EditPDFSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'pdf-security': return <PDFSecuritySidebar activeTab={activeTab} onTabChange={onTabChange} />;
      case 'pdf-intelligence': return <PDFIntelligenceSidebar activeTab={activeTab} onTabChange={onTabChange} />;
      default: return null;
    }
  };

  const otherPinned = [
    { id: 'audiobooks', label: 'Audiobooks', icon: <Icons.Books />, badge: 'Pro' },
  ];

  return (
    <div className={`sidebar-container ${sidebarView !== 'main' ? 'has-secondary' : ''}`}>
      <aside className={`sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-header">
           <div className="aura-logo">
             <div className="logo-icon"></div>
             <h1 className="logo-text">Aura</h1>
           </div>
           <button className="sidebar-close-btn-aura" onClick={onToggle}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
           </button>
        </div>

        <div className="workspace-card">
          <div className="workspace-icon">
            <div className="aura-dot"></div>
          </div>
          <div className="workspace-info">
             <span className="workspace-label">Current Workspace</span>
             <span className="workspace-name">Aura Design</span>
          </div>
          <Icons.ChevronDown />
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li 
                key={item.id}
                className={activeTab === item.id ? 'active' : ''}
                onClick={() => { onTabChange(item.id); setSidebarView('main'); }}
              >
                <span className="item-icon-aura">{item.icon}</span>
                <span className="label-aura">{item.label}</span>
                {item.badge && <span className={`item-badge-aura ${item.badge.toLowerCase()}`}>{item.badge}</span>}
              </li>
            ))}
            
            <div className="nav-section-title-aura">Essentials</div>
            <li className={`dropdown-trigger-aura ${isPdfOpen ? 'open' : ''} ${sidebarView !== 'main' ? 'active-parent' : ''}`} onClick={() => setIsPdfOpen(!isPdfOpen)}>
               <span className="item-icon-aura"><Icons.PDF /></span>
               <span className="label-aura">PDF Tools</span>
               <span className="dropdown-arrow-aura">
                 {isPdfOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
               </span>
            </li>

            {isPdfOpen && (
              <ul className="nav-sub-list-aura">
                {pdfCategories.map((item) => (
                  <li 
                    key={item.id}
                    className={`category-item-aura ${sidebarView === item.id ? 'active' : ''}`}
                    onClick={() => setSidebarView(item.id)}
                  >
                    <span className="item-icon-aura">{item.icon}</span>
                    <span className="label-aura">{item.label}</span>
                    <Icons.ChevronRight />
                  </li>
                ))}
              </ul>
            )}
            
            {otherPinned.map((item) => (
              <li 
                key={item.id}
                className={activeTab === item.id ? 'active' : ''}
                onClick={() => { onTabChange(item.id); setSidebarView('main'); }}
              >
                <span className="item-icon-aura">{item.icon}</span>
                <span className="label-aura">{item.label}</span>
                {item.badge && <span className="item-badge-aura pro">{item.badge}</span>}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer-aura">
          <div className="usage-card-aura">
            <div className="usage-header">
              <span>Aura Credits</span>
              <span>85%</span>
            </div>
            <div className="usage-bar-bg">
               <div className="usage-bar-fill" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="user-profile-footer-aura">
            <div className="user-avatar-aura">KJ</div>
            <div className="user-details-aura">
               <span className="user-name">Kj. Dheena</span>
               <span className="user-plan">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {sidebarView !== 'main' && (
        <aside className="secondary-sidebar">
           <button className="secondary-close-btn" onClick={() => setSidebarView('main')}>
             <Icons.ChevronRight style={{ transform: 'rotate(180deg)' }} />
           </button>
           {renderSecondarySidebar()}
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
