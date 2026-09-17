const fs = require('fs');

let content = fs.readFileSync('src/components/PrintSettingsModal.tsx', 'utf8');

// Modify useEffect to also listen to a custom event
content = content.replace(
  "    window.addEventListener('keydown', handleKeyDown);",
  "    const handleCustomPrint = () => setIsOpen(true);\n    window.addEventListener('keydown', handleKeyDown);\n    window.addEventListener('trigger-print', handleCustomPrint);"
);

content = content.replace(
  "    return () => window.removeEventListener('keydown', handleKeyDown);",
  "    return () => {\n      window.removeEventListener('keydown', handleKeyDown);\n      window.removeEventListener('trigger-print', handleCustomPrint);\n    };"
);

fs.writeFileSync('src/components/PrintSettingsModal.tsx', content, 'utf8');
