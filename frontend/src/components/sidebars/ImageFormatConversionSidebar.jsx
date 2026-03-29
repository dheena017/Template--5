import React from 'react';
import '../../styles/sidebars/OrganizePDFSidebar.css';
import { Image, Layers, FileImage, ImageIcon, FileCode } from 'lucide-react';

const ImageFormatConversionSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'heic-to-jpg', label: 'HEIC to JPG', icon: <FileImage size={18} /> },
    { id: 'heic-to-png', label: 'HEIC to PNG', icon: <FileImage size={18} /> },
    { id: 'heic-to-webp', label: 'HEIC to WEBP', icon: <ImageIcon size={18} /> },
    { id: 'svg-to-png', label: 'SVG to PNG', icon: <Layers size={18} /> },
    { id: 'svg-to-jpg', label: 'SVG to JPG', icon: <Layers size={18} /> },
    { id: 'png-to-jpg', label: 'PNG to JPG', icon: <FileImage size={18} /> },
    { id: 'jpg-to-png', label: 'JPG to PNG', icon: <FileImage size={18} /> },
    { id: 'webp-to-jpg', label: 'WEBP to JPG', icon: <FileImage size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <div className="header-icon-box" style={{ background: 'rgba(251, 191, 36, 0.1)' }}>
          <Image className="text-amber-500" strokeWidth={2.5} size={18} />
        </div>
        <h3 className="header-title-aura">Image Formats</h3>
      </div>
      <div className="header-divider-aura"></div>
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

export default ImageFormatConversionSidebar;
