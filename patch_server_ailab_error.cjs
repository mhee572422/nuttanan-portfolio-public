const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const targetStr = "console.error('AI Generation Error:', error);";
const replaceStr = "console.warn('AI Generation High Demand / Error:', error.message);";

code = code.replace(targetStr, replaceStr);

fs.writeFileSync('server.ts', code);
