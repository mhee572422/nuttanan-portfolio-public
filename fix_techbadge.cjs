const fs = require('fs');
let content = fs.readFileSync('src/components/TechBadge.tsx', 'utf8');

// Replace the poorly escaped backticks with actual backticks
content = content.replace(
  "style={{ borderColor: \\`\\${match.color}40\\` }}",
  "style={{ borderColor: `${match.color}40` }}"
);

fs.writeFileSync('src/components/TechBadge.tsx', content, 'utf8');
