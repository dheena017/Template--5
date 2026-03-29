const fs = require('fs');
let c = fs.readFileSync('c:/Users/dheen/project/completed/all ai tools in on webside/frontend/src/App.jsx', 'utf8');

const replacements = [
  {from: "case 'avito-", to: "case 'avi-to-"},
  {from: "case 'mp4to-", to: "case 'mp4-to-"},
  {from: "case 'movto-", to: "case 'mov-to-"},
  {from: "case 'wmvto-", to: "case 'wmv-to-"},
  {from: "case 'mkvto-", to: "case 'mkv-to-"}
];

replacements.forEach(r => {
  c = c.split(r.from).join(r.to);
});

fs.writeFileSync('c:/Users/dheen/project/completed/all ai tools in on webside/frontend/src/App.jsx', c);
console.log("Fixed kebab cases successfully.");
