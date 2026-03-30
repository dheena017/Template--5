import '../../styles/sidebars/OrganizePDFSidebar.css';

const Icons = {
  Lock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Unlock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
  PenTool: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 5 5"/><path d="m8.5 8.5 1 1"/></svg>,
  Eraser: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path><path d="M22 21H7"></path><path d="m5 11 9 9"></path></svg>,
  GitCompare: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><polyline points="16 9 18 11 20 9"></polyline><path d="M11 18H8a2 2 0 0 1-2-2V9"></path><polyline points="4 15 6 13 8 15"></polyline></svg>
};

const PDFSecuritySidebar = ({ activeTab, onTabChange }) => {
  const tools = [
    { id: 'lock', label: 'Protect PDF', icon: <Icons.Lock /> },
    { id: 'unlock', label: 'Unlock PDF', icon: <Icons.Unlock /> },
    { id: 'sign', label: 'Sign Document', icon: <Icons.PenTool /> },
    { id: 'redact', label: 'Redact PDF', icon: <Icons.Eraser /> },
    { id: 'compare', label: 'Compare PDF', icon: <Icons.GitCompare /> },
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

export default PDFSecuritySidebar;
