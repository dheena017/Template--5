import '../../styles/sidebars/OrganizePDFSidebar.css';

const Icons = {
  Combine: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 18H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5"/><rect width="10" height="10" x="12" y="12" rx="2"/></svg>,
  Split: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2v20M15 7l-3-3-3 3M9 17l3 3 3-3"/></svg>,
  Layers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.1 6.27a2 2 0 0 0 0 3.64l9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09a2 2 0 0 0 0-3.64z"/><path d="m2.1 14.73 9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09"/><path d="m2.1 19.08 9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09"/></svg>,
  Remove: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 5H4V19H20V5Z"/><path d="M16 2.5V5H8V2.5H16Z"/><path d="M10 10H14V14H10V10Z"/></svg>,
  Extract: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>,
  Scan: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2-2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="12" y1="7" x2="12" y2="17"/></svg>,
};

const OrganizePDFSidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'merge', label: 'Merge PDF', icon: <Icons.Combine /> },
    { id: 'split', label: 'Split PDF', icon: <Icons.Split /> },
    { id: 'remove-pages', label: 'Remove Pages', icon: <Icons.Remove /> },
    { id: 'extract-pages', label: 'Extract Pages', icon: <Icons.Extract /> },
    { id: 'scan-to-pdf', label: 'Scan to PDF', icon: <Icons.Scan /> },
    { id: 'organize-pdf', label: 'Organize PDF', icon: <Icons.Layers /> },
  ];

  return (
    <div className="secondary-sidebar-aura">
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

export default OrganizePDFSidebar;
