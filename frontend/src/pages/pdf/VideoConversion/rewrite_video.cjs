const fs = require('fs');
const files = fs.readdirSync('.');
const cFiles = files.filter(f => f.includes('to') && f.endsWith('.jsx') && f !== 'VideoConversionTool.jsx' && !f.includes('index'));
cFiles.forEach(f => {
    const name = f.replace('.jsx', '');
    const parts = name.split('to');
    if (parts.length === 2) {
        const from = parts[0];
        const to = parts[1];
        const content = "import React from 'react';\nimport VideoConversionTool from './VideoConversionTool';\n\nconst " + name + " = () => <VideoConversionTool fromFormat='" + from + "' toFormat='" + to + "' />;\n\nexport default " + name + ";\n";
        fs.writeFileSync(f, content);
    }
});
console.log('Done rewriting ' + cFiles.length + ' files.');
