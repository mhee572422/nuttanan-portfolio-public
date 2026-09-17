const fs = require('fs');
let content = fs.readFileSync('src/components/CommandPalette.tsx', 'utf8');

content = content.replace(
  "rounded-2xl text-sm leading-relaxed ${",
  "rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${"
);

fs.writeFileSync('src/components/CommandPalette.tsx', content, 'utf8');
