const fs = require('fs');

let c = fs.readFileSync('c:/Users/dheen/project/completed/all ai tools in on webside/frontend/src/App.jsx', 'utf8');

if (!c.includes("import * as VideoConversions from './pages/pdf/VideoConversion'")) {
    c = c.replace(
        "import * as Pages from './pages'", 
        "import * as Pages from './pages'\nimport * as VideoConversions from './pages/pdf/VideoConversion'"
    );
}

const vTools = [
    'AVItoMP4', 'AVItoMOV', 'AVItoWMV', 'AVItoMKV',
    'MP4toAVI', 'MP4toMOV', 'MP4toWMV', 'MP4toMKV',
    'MOVtoMP4', 'MOVtoAVI', 'MOVtoWMV', 'MOVtoMKV',
    'WMVtoMP4', 'WMVtoAVI', 'WMVtoMKV',
    'MKVtoMP4', 'MKVtoMOV', 'MKVtoWMV', 'MKVtoAVI'
];

let vCases = "";
vTools.forEach(tool => {
    let kebab = tool.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    vCases += `      case '${kebab}': return <VideoConversions.${tool} />;\n`;
});

// also add universal-conversion case
vCases += `      case 'universal-conversion': return <Pages.GenericDashboard />;\n`;
vCases += `      case 'video-conversion': return <Pages.GenericDashboard />;\n`;
vCases += `      case 'audio-conversion': return <Pages.GenericDashboard />;\n`;
vCases += `      case 'image-conversion-tools': return <Pages.GenericDashboard />;\n`;
vCases += `      case 'document-conversion': return <Pages.GenericDashboard />;\n`;

if (!c.includes("case 'avi-to-mp4':")) {
    c = c.replace(
        "case 'pdf/merge':", 
        vCases + "\n      case 'pdf/merge':"
    );
}

fs.writeFileSync('c:/Users/dheen/project/completed/all ai tools in on webside/frontend/src/App.jsx', c);
console.log("Updated App.jsx routing successfully.");
