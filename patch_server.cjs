const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /try {\n      const { message, language } = req.body;/,
  "const { message, language } = req.body;\n    try {"
);

fs.writeFileSync('server.ts', code);
