import React from 'react';
import '../../styles/sidebars/OrganizePDFSidebar.css';
import { Film } from 'lucide-react';

const Icons = {
  MP4: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
  AVI: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/></svg>,
  MKV: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  MOV: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></svg>,
  WMV: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="m14.5 5-2.5 14L8 5"/></svg>
};

const VideoConversionSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'avi-to-mp4', label: 'AVI to MP4', icon: <Icons.MP4 /> },
    { id: 'mp4-to-avi', label: 'MP4 to AVI', icon: <Icons.AVI /> },
    { id: 'mkv-to-mp4', label: 'MKV to MP4', icon: <Icons.MP4 /> },
    { id: 'mov-to-mp4', label: 'MOV to MP4', icon: <Icons.MP4 /> },
    { id: 'wmv-to-mp4', label: 'WMV to MP4', icon: <Icons.MP4 /> },
    { id: 'avi-to-mkv', label: 'AVI to MKV', icon: <Icons.MKV /> },
    { id: 'avi-to-mov', label: 'AVI to MOV', icon: <Icons.MOV /> },
    { id: 'avi-to-wmv', label: 'AVI to WMV', icon: <Icons.WMV /> },
    { id: 'mkv-to-avi', label: 'MKV to AVI', icon: <Icons.AVI /> },
    { id: 'mkv-to-mov', label: 'MKV to MOV', icon: <Icons.MOV /> },
    { id: 'mkv-to-wmv', label: 'MKV to WMV', icon: <Icons.WMV /> },
    { id: 'mov-to-avi', label: 'MOV to AVI', icon: <Icons.AVI /> },
    { id: 'mov-to-mkv', label: 'MOV to MKV', icon: <Icons.MKV /> },
    { id: 'mov-to-wmv', label: 'MOV to WMV', icon: <Icons.WMV /> },
    { id: 'mp4-to-mkv', label: 'MP4 to MKV', icon: <Icons.MKV /> },
    { id: 'mp4-to-mov', label: 'MP4 to MOV', icon: <Icons.MOV /> },
    { id: 'mp4-to-wmv', label: 'MP4 to WMV', icon: <Icons.WMV /> },
    { id: 'wmv-to-avi', label: 'WMV to AVI', icon: <Icons.AVI /> },
    { id: 'wmv-to-mkv', label: 'WMV to MKV', icon: <Icons.MKV /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
      <div className="secondary-sidebar-header">
        <div className="header-icon-box" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
          <Film className="text-violet-500" strokeWidth={2.5} size={18} />
        </div>
        <h3 className="header-title-aura">Video Conversion</h3>
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

export default VideoConversionSidebar;
