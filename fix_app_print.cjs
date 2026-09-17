const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importToAdd = "import PrintSettingsModal from './components/PrintSettingsModal';";
if (!content.includes(importToAdd)) {
  content = content.replace("import PrintView from './components/PrintView';", "import PrintView from './components/PrintView';\n" + importToAdd);
}

// Add component
const compToAdd = "<PrintSettingsModal />";
if (!content.includes(compToAdd)) {
  content = content.replace("<BackToTop />", "<BackToTop />\n      " + compToAdd);
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
