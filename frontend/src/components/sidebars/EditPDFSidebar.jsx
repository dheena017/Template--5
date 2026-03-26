import React from 'react';
import { Edit3, Droplet, Hash } from 'lucide-react';
import '../../styles/sidebars/EditPDFSidebar.css';

const EditPDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'edit', label: 'Edit PDF', icon: <Edit3 size={18} /> },
    { id: 'watermark', label: 'Watermark', icon: <Droplet size={18} /> },
    { id: 'page-numbers', label: 'Page Numbers', icon: <Hash size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <h3>Edit PDF</h3>
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

export default EditPDFSidebar;
