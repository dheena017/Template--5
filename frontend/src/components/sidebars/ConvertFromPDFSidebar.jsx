import React from 'react';
import { FileText, ImageIcon, Table } from 'lucide-react';
import '../../styles/sidebars/ConvertFromPDFSidebar.css';

const ConvertFromPDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'pdf-to-word', label: 'PDF to Word', icon: <FileText size={18} /> },
    { id: 'pdf-to-jpg', label: 'PDF to JPG', icon: <ImageIcon size={18} /> },
    { id: 'pdf-to-excel', label: 'PDF to Excel', icon: <Table size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <h3>Convert from PDF</h3>
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

export default ConvertFromPDFSidebar;
