const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

const targetStr = "console.error('Error fetching AI summary:', err);";
const replaceStr = "console.warn('Error fetching AI summary, using fallback UI');";

code = code.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/Skills.tsx', code);
