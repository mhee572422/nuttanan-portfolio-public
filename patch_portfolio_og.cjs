const fs = require('fs');
let code = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

code = code.replace(
  /<meta property="og:url" content=\{typeof window !== 'undefined' \? \`\$\{window\.location\.origin\}\/#project-\$\{selectedProject\.id\}\` : ''\} \/>/,
  "<meta property=\"og:url\" content={typeof window !== 'undefined' ? `${window.location.origin}/?project=${selectedProject.id}` : ''} />"
);

fs.writeFileSync('src/components/Portfolio.tsx', code);
