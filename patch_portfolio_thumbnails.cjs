const fs = require('fs');
let code = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

code = code.replace(
  /onClick=\{\(\) => setActiveImageIndex\(i\)\}/g,
  "onClick={() => { setActiveImageIndex(i); setLightboxOpen(true); }}"
);

fs.writeFileSync('src/components/Portfolio.tsx', code);
