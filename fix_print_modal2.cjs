const fs = require('fs');

let content = fs.readFileSync('src/components/PrintSettingsModal.tsx', 'utf8');

content = content.replace(
  "if ((e.ctrlKey || e.metaKey) && e.key === 'p') {",
  "if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {"
);

fs.writeFileSync('src/components/PrintSettingsModal.tsx', content, 'utf8');
