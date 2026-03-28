import React from 'react';
import '../../styles/sidebars/OrganizePDFSidebar.css';

const Icons = {
  Combine: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 18H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5"/><rect width="10" height="10" x="12" y="12" rx="2"/></svg>,
  Split: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2v20M15 7l-3-3-3 3M9 17l3 3 3-3"/></svg>,
  Layers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.1 6.27a2 2 0 0 0 0 3.64l9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09a2 2 0 0 0 0-3.64z"/><path d="m2.1 14.73 9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09"/><path d="m2.1 19.08 9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09"/></svg>,
};

const OrganizePDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'merge', label: 'Merge PDF', icon: <Icons.Combine /> },
    { id: 'split', label: 'Split PDF', icon: <Icons.Split /> },
    { id: 'organize', label: 'Rearrange Pages', icon: <Icons.Layers /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <h3>Organize PDF</h3>
      </div>
      <nav className="secondary-nav">
        <ul>
          {tools.map(tool => (
            <li 
              key={tool.id} 
              data-id={tool.id}
              className={activeTab === tool.id ? 'active' : ''}
              onClick={() => onTabChange(tool.id)}
            >
              <span className="tool-icon">{tool.icon}</span>
              <span className="tool-label">{tool.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default OrganizePDFSidebar;
