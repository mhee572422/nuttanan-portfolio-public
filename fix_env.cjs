const fs = require('fs');
let content = fs.readFileSync('.env.example', 'utf8');

if (!content.includes('RESEND_API_KEY')) {
  content += '\n# RESEND_API_KEY: Optional. Used to send real emails from the Contact form.\n';
  content += '# You can get a free key at https://resend.com\n';
  content += 'RESEND_API_KEY=""\n';
  fs.writeFileSync('.env.example', content, 'utf8');
}
