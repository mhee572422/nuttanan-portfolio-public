const fs = require('fs');

function fixImport(file) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('React.') && !content.includes('import React')) {
    content = "import React from 'react';\n" + content;
    fs.writeFileSync(file, content, 'utf8');
  }
}

fixImport('src/components/CommandPalette.tsx');
fixImport('src/components/ResumePreviewModal.tsx');
