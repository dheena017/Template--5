import React from 'react';
import { Minimize, Wrench } from 'lucide-react';
import '../../styles/sidebars/OptimizePDFSidebar.css';

const OptimizePDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'compress', label: 'Compress PDF', icon: <Minimize size={18} /> },
    { id: 'repair', label: 'Repair PDF', icon: <Wrench size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <h3>Optimize PDF</h3>
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

export default OptimizePDFSidebar;
