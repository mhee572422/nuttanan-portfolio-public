const fs = require('fs');
let code = fs.readFileSync('src/components/AILab.tsx', 'utf8');

const targetStr = "console.error(err);";
const replaceStr = "console.warn('AI Lab generation error:', err);";

code = code.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/AILab.tsx', code);
