const fs = require('fs');
let content = fs.readFileSync('src/components/TechBadge.tsx', 'utf8');

content = content.replace(/\\\$/g, "$");

fs.writeFileSync('src/components/TechBadge.tsx', content, 'utf8');
