import React from 'react';
import '../../styles/sidebars/OrganizePDFSidebar.css';
import { Music, Headphones, Volume2, Mic2, Disc } from 'lucide-react';

const AudioConversionSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'mp3-to-wav', label: 'MP3 to WAV', icon: <Volume2 size={18} /> },
    { id: 'mp3-to-flac', label: 'MP3 to FLAC', icon: <Headphones size={18} /> },
    { id: 'mp3-to-aac', label: 'MP3 to AAC', icon: <Music size={18} /> },
    { id: 'wav-to-mp3', label: 'WAV to MP3', icon: <Disc size={18} /> },
    { id: 'flac-to-mp3', label: 'FLAC to MP3', icon: <Disc size={18} /> },
    { id: 'aac-to-mp3', label: 'AAC to MP3', icon: <Disc size={18} /> },
    { id: 'mp3-to-ogg', label: 'MP3 to OGG', icon: <Volume2 size={18} /> },
    { id: 'wav-to-flac', label: 'WAV to FLAC', icon: <Headphones size={18} /> },
    { id: 'aac-to-wav', label: 'AAC to WAV', icon: <Volume2 size={18} /> },
    { id: 'ogg-to-mp3', label: 'OGG to MP3', icon: <Disc size={18} /> },
    { id: 'flac-to-wav', label: 'FLAC to WAV', icon: <Volume2 size={18} /> },
    { id: 'ac3-to-mp3', label: 'AC3 to MP3', icon: <Disc size={18} /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <div className="header-icon-box" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
          <Music className="text-violet-500" strokeWidth={2.5} size={18} />
        </div>
        <h3 className="header-title-aura">Audio Conversion</h3>
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

export default AudioConversionSidebar;
