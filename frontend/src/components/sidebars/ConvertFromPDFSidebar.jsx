import React from 'react';
import '../../styles/sidebars/ConvertFromPDFSidebar.css';

const Icons = {
  FileText: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>,
  ImageIcon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  Table: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>,
};

const ConvertFromPDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'pdf-to-word', label: 'PDF to Word', icon: <Icons.FileText /> },
    { id: 'pdf-to-jpg', label: 'PDF to JPG', icon: <Icons.ImageIcon /> },
    { id: 'pdf-to-excel', label: 'PDF to Excel', icon: <Icons.Table /> },
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
