const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

if (!code.includes('SettingsMenu')) {
  code = code.replace(
    "import ResumePreviewModal from './ResumePreviewModal';",
    "import ResumePreviewModal from './ResumePreviewModal';\nimport SettingsMenu from './SettingsMenu';"
  );
  
  // Insert SettingsMenu before the language toggle in desktop view
  code = code.replace(
    "<button\n              onClick={toggleLanguage}",
    "<SettingsMenu />\n            <button\n              onClick={toggleLanguage}"
  );
}

fs.writeFileSync('src/components/Navbar.tsx', code);
