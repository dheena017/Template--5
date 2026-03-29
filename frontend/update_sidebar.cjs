const fs = require('fs');
let c = fs.readFileSync('c:/Users/dheen/project/completed/all ai tools in on webside/frontend/src/components/Sidebar.jsx', 'utf8');

c = c.replace(
  "import PDFIntelligenceSidebar from './sidebars/PDFIntelligenceSidebar';", 
  "import PDFIntelligenceSidebar from './sidebars/PDFIntelligenceSidebar';\nimport VideoConversionSidebar from './sidebars/VideoConversionSidebar';"
);

c = c.replace(
  "const [isPdfOpen, setIsPdfOpen] = useState(false);",
  "const [isPdfOpen, setIsPdfOpen] = useState(false);\n  const [isConversionOpen, setIsConversionOpen] = useState(false);"
);

c = c.replace(
  "const avatarCategories = [",
  "const conversionCategories = [\n    { id: 'video-conversion', label: 'Video Conversion' },\n    { id: 'audio-conversion', label: 'Audio Conversion' },\n    { id: 'image-conversion-tools', label: 'Image Conversion' },\n    { id: 'document-conversion', label: 'Document Conversion' },\n  ];\n\n  const avatarCategories = ["
);

c = c.replace(
  "const filteredPdf = filterLinks(pdfCategories);",
  "const filteredPdf = filterLinks(pdfCategories);\n  const filteredConversion = filterLinks(conversionCategories);"
);

c = c.replace(
  "|| filteredPdf.length > 0 || filteredAvatar.length > 0",
  "|| filteredPdf.length > 0 || filteredConversion.length > 0 || filteredAvatar.length > 0"
);

c = c.replace(
  "case 'pdf-intelligence': return <PDFIntelligenceSidebar activeTab={activeTab} onTabChange={onTabChange} />;",
  "case 'pdf-intelligence': return <PDFIntelligenceSidebar activeTab={activeTab} onTabChange={onTabChange} />;\n      case 'video-conversion': return <VideoConversionSidebar activeTab={activeTab} onTabChange={onTabChange} />;"
);

let convHtml = `
          {/* CONVERSION SECTION */}
          {(sidebarSearch ? filteredConversion.length > 0 : true) && (
            <>
              <div className="nav-section-divider-aura"></div>
              <li className={\`dropdown-trigger-aura \${(isConversionOpen || sidebarSearch) ? 'open' : ''}\`} onClick={() => {
                if (!sidebarSearch) setIsConversionOpen(!isConversionOpen);
                onTabChange('universal-conversion'); 
              }}>
                 <span className="item-icon-aura"><Icons.Flows /></span>
                 <span className="label-aura">Universal Converters</span>
                 {!sidebarSearch && (
                   <span className="dropdown-arrow-aura">
                     {isConversionOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                   </span>
                 )}
              </li>
              {(isConversionOpen || sidebarSearch) && (
                <ul className="nav-sub-list-aura">
                  {filteredConversion.map((item, idx) => (
                    <li key={item.id} 
                        className={\`sub-item-aura \${sidebarView === item.id ? 'active' : ''} animate-slide-right\`} 
                        style={{ animationDelay: \`\${idx * 0.03}s\` }}
                        onClick={() => { setSidebarView(item.id); onTabChange(item.id); }}>
                      <span className="label-aura">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
`;

c = c.replace(
  "{/* AVATAR SECTION */}",
  convHtml + "\n          {/* AVATAR SECTION */}"
);

fs.writeFileSync('c:/Users/dheen/project/completed/all ai tools in on webside/frontend/src/components/Sidebar.jsx', c);
console.log("Updated Sidebar.jsx successfully.");
