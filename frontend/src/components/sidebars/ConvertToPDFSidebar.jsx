import React from 'react';
import { FileText, ImageIcon, Table } from 'lucide-react';
import '../../styles/sidebars/ConvertToPDFSidebar.css';

const ConvertToPDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'word-to-pdf', label: 'Word to PDF', icon: <FileText size={18} /> },
    { id: 'jpg-to-pdf', label: 'JPG to PDF', icon: <ImageIcon size={18} /> },
    { id: 'excel-to-pdf', label: 'Excel to PDF', icon: <Table size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <h3>Convert to PDF</h3>
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

export default ConvertToPDFSidebar;
