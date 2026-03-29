import React from 'react';
import '../styles/Toolbar.css';
import { Bell, HelpCircle, LogOut, MessageSquare, Settings, User, Search, X, ChevronRight, Share, Zap, Maximize2 } from 'lucide-react';
import { Dropdown, DropdownItem, DropdownDivider } from './dropdowns';

const Toolbar = ({ activeTab, onToggleSidebar, isSidebarOpen, onTabChange, isDeepFocus, setIsDeepFocus }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);

  // Flat list of all searchable items - updated to match App.jsx cases
  const ALL_FEATURES = React.useMemo(() => [
    { name: 'Video Workspace', path: 'video-dashboard', cat: 'Studio', keywords: ['edit', 'movie', 'production', 'cut', 'clip', 'render'] },
    { name: 'Image Studio', path: 'image-dashboard', cat: 'Design', keywords: ['photo', 'generate', 'picture', 'create', 'draw', 'art'] },
    { name: 'Avatar AI', path: 'avatar-dashboard', cat: 'AI Tools', keywords: ['deepfake', 'person', 'actor', 'talk', 'human', 'face'] },
    { name: 'Speech & Audio', path: 'speech-dashboard', cat: 'Audio', keywords: ['voice', 'mp3', 'sound', 'tts', 'listen', 'speak'] },
    { name: 'Merge PDF', path: 'merge', cat: 'Files', keywords: ['combine', 'join', 'add files', 'collective', 'attach'] },
    { name: 'Split PDF', path: 'split', cat: 'Files', keywords: ['cut', 'separate', 'pages', 'divide', 'break'] },
    { name: 'Compress PDF', path: 'compress', cat: 'Files', keywords: ['shrink', 'small', 'reduce size', 'optimize', 'lightweight'] },
    { name: 'Remove Pages', path: 'remove-pages', cat: 'Files', keywords: ['delete', 'clean', 'scrub', 'filter', 'erase'] },
    { name: 'Extract Pages', path: 'extract-pages', cat: 'Files', keywords: ['specific', 'pull', 'select', 'individual', 'isolate'] },
    { name: 'Organize PDF', path: 'organize-pdf', cat: 'Files', keywords: ['rearrange', 'sort', 'order', 'pages', 'move'] },
    { name: 'Scan to PDF', path: 'scan-to-pdf', cat: 'Files', keywords: ['camera', 'photo', 'picture', 'capture', 'document'] },
    { name: 'API Keys', path: 'api-keys', cat: 'Dev', keywords: ['developer', 'sdk', 'tokens', 'integration', 'backend'] },
    { name: 'System Settings', path: 'settings-hub', cat: 'System', keywords: ['config', 'preferences', 'customize', 'aura', 'ui'] },
    { name: 'Billing', path: 'billing', cat: 'Account', keywords: ['money', 'pay', 'credits', 'subscription', 'invoice'] },
    { name: 'Documentation', path: 'docs', cat: 'Resources', keywords: ['help', 'guide', 'howto', 'learn', 'support'] },
    { name: 'Smart Text', path: 'text-dashboard', cat: 'AI Text', keywords: ['write', 'blog', 'copy', 'script', 'assist', 'letters'] },
    { name: 'Social Media', path: 'social-dashboard', cat: 'Marketing', keywords: ['post', 'share', 'market', 'facebook', 'instagram', 'ads'] },
  ], []);

  const results = React.useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return ALL_FEATURES.filter(f => 
      f.name.toLowerCase().includes(query) || 
      f.cat.toLowerCase().includes(query) ||
      (f.keywords && f.keywords.some(k => k.toLowerCase().includes(query)))
    );
  }, [searchQuery, ALL_FEATURES]);

  const getBreadcrumb = (tab) => {
    if (!tab || tab === 'dashboard') return 'Project';
    const parts = tab.split('/');
    const last = parts[parts.length - 1];
    return last.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <header className="aura-toolbar">
      <div className="toolbar-left">
        {!isSidebarOpen && (
          <button className="toggle-sidebar-btn-aura" onClick={onToggleSidebar} title="Open Sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        )}
        <div className="breadcrumb-aura">
          <span className="breadcrumb-folder">Aura</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-folder">Dashboard</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-active">{getBreadcrumb(activeTab)}</span>
        </div>
      </div>
      
      <div className="toolbar-right">
        <div className="search-container-aura">
          <div className="search-bar-aura">
             <Search size={16} strokeWidth={2.5} />
             <input 
              type="text" 
              placeholder="Quick search... (Alt+S)" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
             />
             {searchQuery && (
               <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                 <X size={12} />
               </button>
             )}
          </div>

          {showResults && searchQuery && (
            <div className="search-results-dropdown-aura">
              {results.length > 0 ? (
                <>
                  <div className="search-group-title">Suggestions</div>
                  {results.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="search-result-item-aura"
                      onClick={() => {
                        onTabChange(item.path);
                        setSearchQuery('');
                        setShowResults(false);
                      }}
                    >
                      <div className="result-info">
                        <span className="result-name">{item.name}</span>
                        <span className="result-cat">{item.cat}</span>
                      </div>
                      <Zap size={14} className="result-icon-small" />
                    </div>
                  ))}
                </>
              ) : (
                <div className="no-search-results">No features matching "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>
        
        <div className="toolbar-actions-aura">
          <button className="icon-btn-aura" title="Share Project">
            <Share size={18} />
          </button>
          
          <button 
            className={`icon-btn-aura ${isDeepFocus ? 'active' : ''}`} 
            title="Deep Focus Mode"
            onClick={() => setIsDeepFocus(!isDeepFocus)}
          >
            <Maximize2 size={18} />
          </button>
          
          <button className="icon-btn-aura" title="Shortcuts">
            <Zap size={18} />
          </button>
          
          <Dropdown 
            align="right"
            trigger={
              <button className="icon-btn-aura" title="Notifications">
                <Bell size={18} />
                <span className="noti-dot"></span>
              </button>
            }
          >
            <div className="menu-header">
              <strong>Activity</strong>
              <span>Updates and events</span>
            </div>
            <div className="noti-list" style={{ padding: '8px' }}>
                <DropdownItem>System: Deployment successful</DropdownItem>
                <DropdownItem>Team: New comment on Video #2</DropdownItem>
                <DropdownItem>Credits: +500 refilled</DropdownItem>
            </div>
          </Dropdown>

          <div className="user-profile-aura">
             <Dropdown 
               align="right"
               trigger={
                 <div className="user-name-aura">KJ</div>
               }
             >
               <div className="menu-header">
                 <strong>Kajal J.</strong>
                 <span>Personal Workspace</span>
               </div>
               <DropdownItem icon={<User size={14} />} onClick={() => onTabChange('profile')}>Public Profile</DropdownItem>
               <DropdownItem icon={<Settings size={14} />} onClick={() => onTabChange('settings-hub')}>Workspace Settings</DropdownItem>
               <DropdownItem icon={<HelpCircle size={14} />} onClick={() => onTabChange('faq')}>Documentation</DropdownItem>
               <DropdownDivider />
               <DropdownItem icon={<LogOut size={14} />} className="logout">Sign Out</DropdownItem>
             </Dropdown>
          </div>
        </div>
      </div>
      {showResults && searchQuery && <div className="search-backdrop-aura" onClick={() => setShowResults(false)}></div>}
    </header>
  );
};

export default Toolbar;
