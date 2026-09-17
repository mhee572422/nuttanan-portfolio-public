const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const targetStr = "text: `Name: ${name}\\nEmail: ${email}\\n\\nMessage:\\n${message}`,";
const replaceStr = "html: `<h3>New Contact Request</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p><strong>Message:</strong></p><p>${message.replace(/\\n/g, '<br/>')}</p>`,";

code = code.replace(targetStr, replaceStr);
fs.writeFileSync('server.ts', code);
