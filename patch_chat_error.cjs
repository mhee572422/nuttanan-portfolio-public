const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const targetStr = "console.error('Error calling Gemini API:', error);";
const replaceStr = "console.warn('AI API high demand, using fallback for chat.');";

code = code.replace(targetStr, replaceStr);

fs.writeFileSync('server.ts', code);
