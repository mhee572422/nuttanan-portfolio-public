const fs = require('fs');
const file = 'src/components/Contact.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/error\.errors\[0\]\?/g, "error.issues[0]?");
code = code.replace(/error\.errors\.forEach/g, "error.issues.forEach");

fs.writeFileSync(file, code);
