import React from 'react';
import { FileText, File, Image as ImageIcon, ArrowRight } from 'lucide-react';

const OFFICE_ITEMS = [
  { label: 'Word Merge',      path: 'word-merge',    icon: FileText, color: '#3b82f6' },
  { label: 'Excel Merge',     path: 'excel-merge',   icon: File,     color: '#10b981' },
  { label: 'Excel Split',     path: 'excel-split',   icon: File,     color: '#f59e0b' },
  { label: 'Word Compress',   path: 'word-compress', icon: FileText, color: '#8b5cf6' },
  { label: 'PPT Compress',    path: 'ppt-compress',  icon: File,     color: '#ec4899' },
  { label: 'Image Compress',  path: 'img-compress',  icon: ImageIcon, color: '#f97316' },
];

const OfficeToolsSidebar = ({ activeTab, onTabChange }) => (
  <div className="sidebar-section">
    <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 16px 6px', color:'#3b82f6', fontWeight:900, fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase' }}>
      <FileText size={14}/> Office Tools
    </div>
    {OFFICE_ITEMS.map(item => {
      const Icon = item.icon;
      return (
        <button
          key={item.path}
          className={`sidebar-item ${activeTab === item.path ? 'active' : ''}`}
          onClick={() => onTabChange(item.path)}
        >
          <Icon size={14} style={{ color: item.color }} />
          <span>{item.label}</span>
        </button>
      );
    })}
  </div>
);

export default OfficeToolsSidebar;
