import React from 'react';
import { Lock, Unlock, PenTool } from 'lucide-react';
import '../../styles/sidebars/PDFSecuritySidebar.css';

const PDFSecuritySidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'lock', label: 'Password Protect', icon: <Lock size={18} /> },
    { id: 'unlock', label: 'Remove Password', icon: <Unlock size={18} /> },
    { id: 'sign', label: 'Sign Document', icon: <PenTool size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <h3>PDF Security</h3>
      </div>
      <nav className="secondary-nav">
        <ul>
          {tools.map(tool => (
            <li key={tool.id} data-id={tool.id} className={activeTab === tool.id ? 'active' : ''} onClick={() => onTabChange(tool.id)}>
              <span className="tool-icon">{tool.icon}</span>
              <span className="tool-label">{tool.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PDFSecuritySidebar;
