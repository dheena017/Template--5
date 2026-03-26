import React from 'react';
import { Bot, Languages, Scan } from 'lucide-react';
import '../../styles/sidebars/PDFIntelligenceSidebar.css';

const PDFIntelligenceSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'summarize', label: 'AI Summary', icon: <Bot size={18} /> },
    { id: 'chat', label: 'Chat with PDF', icon: <Languages size={18} /> },
    { id: 'extract-data', label: 'Extract Data', icon: <Scan size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <h3>PDF Intelligence</h3>
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

export default PDFIntelligenceSidebar;
