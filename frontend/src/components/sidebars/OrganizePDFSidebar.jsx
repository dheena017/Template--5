import React from 'react';
import { Combine, Split, Layers } from 'lucide-react';
import '../../styles/sidebars/OrganizePDFSidebar.css';

const OrganizePDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'merge', label: 'Merge PDF', icon: <Combine size={18} /> },
    { id: 'split', label: 'Split PDF', icon: <Split size={18} /> },
    { id: 'organize', label: 'Rearrange Pages', icon: <Layers size={18} /> },
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
