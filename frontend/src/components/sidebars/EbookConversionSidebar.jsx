import React from 'react';
import { BookOpen, ChevronRight, ArrowRight } from 'lucide-react';

const EBOOK_SECTIONS = [
  {
    label: 'EPUB Conversions',
    color: '#8b5cf6',
    items: [
      { label: 'EPUB to PDF',  path: 'epub-to-pdf' },
      { label: 'EPUB to MOBI', path: 'epub-to-mobi' },
      { label: 'EPUB to AZW3', path: 'epub-to-azw3' },
    ]
  },
  {
    label: 'MOBI Conversions',
    color: '#a78bfa',
    items: [
      { label: 'MOBI to PDF',  path: 'mobi-to-pdf' },
      { label: 'MOBI to EPUB', path: 'mobi-to-epub' },
      { label: 'MOBI to AZW3', path: 'mobi-to-azw3' },
    ]
  },
  {
    label: 'PDF to eBook',
    color: '#7c3aed',
    items: [
      { label: 'PDF to EPUB', path: 'pdf-to-epub' },
      { label: 'PDF to MOBI', path: 'pdf-to-mobi' },
      { label: 'PDF to AZW3', path: 'pdf-to-azw3' },
    ]
  },
  {
    label: 'AZW3 Conversions',
    color: '#6d28d9',
    items: [
      { label: 'AZW3 to PDF',  path: 'azw3-to-pdf' },
      { label: 'AZW3 to EPUB', path: 'azw3-to-epub' },
      { label: 'AZW3 to MOBI', path: 'azw3-to-mobi' },
    ]
  },
];

const EbookConversionSidebar = ({ activeTab, onTabChange }) => (
  <div className="sidebar-section">
    <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 16px 6px', color:'#8b5cf6', fontWeight:900, fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase' }}>
      <BookOpen size={14}/> eBook Conversion
    </div>
    {EBOOK_SECTIONS.map(sec => (
      <div key={sec.label}>
        <div style={{ padding:'8px 16px 4px', color:'#475569', fontSize:10, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase' }}>{sec.label}</div>
        {sec.items.map(item => (
          <button
            key={item.path}
            className={`sidebar-item ${activeTab === item.path ? 'active' : ''}`}
            onClick={() => onTabChange(item.path)}
          >
            <ArrowRight size={14} style={{ color: sec.color }} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    ))}
  </div>
);

export default EbookConversionSidebar;
