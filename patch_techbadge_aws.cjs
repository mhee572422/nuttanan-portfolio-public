const fs = require('fs');
let content = fs.readFileSync('src/components/TechBadge.tsx', 'utf8');

content = content.replace(
  "import { \n  SiReact",
  "import { FaAws } from 'react-icons/fa';\nimport { \n  SiReact"
);

content = content.replace(
  "  SiAmazonwebservices, \n",
  ""
);

content = content.replace(
  "'AWS': { icon: <SiAmazonwebservices />, color: '#232F3E' },",
  "'AWS': { icon: <FaAws />, color: '#232F3E' },"
);

fs.writeFileSync('src/components/TechBadge.tsx', content, 'utf8');
