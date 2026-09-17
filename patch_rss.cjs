const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /<link>\$\{domain\}\/#project-\$\{p\.id\}<\/link>/g,
  "<link>${domain}/?project=${p.id}</link>"
);
code = code.replace(
  /<guid>\$\{domain\}\/#project-\$\{p\.id\}<\/guid>/g,
  "<guid>${domain}/?project=${p.id}</guid>"
);

fs.writeFileSync('server.ts', code);
