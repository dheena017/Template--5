import React from 'react';
import '../../styles/sidebars/OrganizePDFSidebar.css';
import { FileText, Table, Presentation, BookOpen, Box, FileUp, Languages, ScanIcon } from 'lucide-react';

const DocumentConversionSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'word-to-pdf', label: 'Word to PDF', icon: <FileText size={18} /> },
    { id: 'excel-to-pdf', label: 'Excel to PDF', icon: <Table size={18} /> },
    { id: 'epub-to-pdf', label: 'EPUB to PDF', icon: <BookOpen size={18} /> },
    { id: 'mobi-to-pdf', label: 'MOBI to PDF', icon: <BookOpen size={18} /> },
    { id: 'azw3-to-pdf', label: 'AZW3 to PDF', icon: <BookOpen size={18} /> },
    { id: 'hwp-to-pdf', label: 'HWP to PDF', icon: <Languages size={18} /> },
    { id: 'cad-to-pdf', label: 'CAD to PDF', icon: <Box size={18} /> },
    { id: 'cbr-to-pdf', label: 'CBR to PDF', icon: <ScanIcon size={18} /> },
    { id: 'cbz-to-pdf', label: 'CBZ to PDF', icon: <ScanIcon size={18} /> },
    { id: 'xps-to-pdf', label: 'XPS to PDF', icon: <FileUp size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <div className="header-icon-box" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
          <FileText className="text-sky-500" strokeWidth={2.5} size={18} />
        </div>
        <h3 className="header-title-aura">Document Tools</h3>
      </div>
      <div className="header-divider-aura"></div>
      <nav className="secondary-nav" style={{ overflowY: 'auto', flex: 1 }}>
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

export default DocumentConversionSidebar;
