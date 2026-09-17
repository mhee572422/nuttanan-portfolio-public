const fs = require('fs');
let code = fs.readFileSync('src/components/TechBadge.tsx', 'utf8');

// Fix colors for dark background, add CMS, etc.
code = code.replace("'Next.js': { icon: <SiNextdotjs />, color: '#000000' }", "'Next.js': { icon: <SiNextdotjs />, color: '#FFFFFF' }");
code = code.replace("'Express': { icon: <SiExpress />, color: '#000000' }", "'Express': { icon: <SiExpress />, color: '#FFFFFF' }");

// Add Lucide generic icons or just map CMS to a generic color and icon from lucide-react if Si doesn't have one
// Let's import LayoutTemplate from lucide-react
if (!code.includes('LayoutTemplate')) {
    code = code.replace("import { FaAws, FaHtml5, FaCss3 } from 'react-icons/fa';", "import { FaAws, FaHtml5, FaCss3, FaWordpress } from 'react-icons/fa';\nimport { LayoutTemplate } from 'lucide-react';");
    code = code.replace("'Framer': { icon: <SiFramer />, color: '#0055FF' },", "'Framer': { icon: <SiFramer />, color: '#0055FF' },\n  'CMS': { icon: <FaWordpress />, color: '#21759B' },\n  'REST API': { icon: <LayoutTemplate />, color: '#E34F26' },");
}

fs.writeFileSync('src/components/TechBadge.tsx', code);
