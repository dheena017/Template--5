import '../../styles/sidebars/OrganizePDFSidebar.css';

const Icons = {
  Minimize: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v5H3"/><path d="m3 3 5 5"/><path d="M16 21v-5h5"/><path d="m21 21-5-5"/></svg>,
  Wrench: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Scan: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="10" height="8" x="7" y="8" rx="1"/></svg>,
};

const OptimizePDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'compress', label: 'Compress PDF', icon: <Icons.Minimize /> },
    { id: 'repair', label: 'Repair PDF', icon: <Icons.Wrench /> },
    { id: 'ocr-pdf', label: 'OCR PDF', icon: <Icons.Scan /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
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
