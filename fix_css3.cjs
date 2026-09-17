const fs = require('fs');
let content = fs.readFileSync('src/components/TechBadge.tsx', 'utf8');

content = content.replace("SiCss3,", "");
content = content.replace("SiHtml5,", "");

content = content.replace(
  "import { FaAws } from 'react-icons/fa';",
  "import { FaAws, FaHtml5, FaCss3 } from 'react-icons/fa';"
);

content = content.replace(
  "'HTML': { icon: <SiHtml5 />, color: '#E34F26' },",
  "'HTML': { icon: <FaHtml5 />, color: '#E34F26' },"
);

content = content.replace(
  "'CSS': { icon: <SiCss3 />, color: '#1572B6' },",
  "'CSS': { icon: <FaCss3 />, color: '#1572B6' },"
);

fs.writeFileSync('src/components/TechBadge.tsx', content, 'utf8');
