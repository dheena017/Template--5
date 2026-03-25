import React from 'react';
import '../styles/Toolbar.css';

const Toolbar = ({ activeTab, onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="aura-toolbar">
      <div className="toolbar-left">
        {!isSidebarOpen && (
          <button className="toggle-sidebar-btn-aura" onClick={onToggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        )}
        <div className="breadcrumb-aura">
          <span className="breadcrumb-folder">Dashboard</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
        </div>
      </div>
      
      <div className="toolbar-right">
        <div className="search-bar-aura">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
           <input type="text" placeholder="Search features..." />
        </div>
        
        <div className="toolbar-actions-aura">
          <button className="icon-btn-aura" title="Feedback">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button className="icon-btn-aura" title="Notifications">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
             <span className="noti-dot"></span>
          </button>
          <div className="user-profile-aura">
             <div className="user-name-aura">KJ</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
