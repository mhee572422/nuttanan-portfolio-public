const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// Add specific classes for print targeting
content = content.replace(
  'className="grid grid-cols-1 md:grid-cols-2 gap-4"',
  'className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-4"'
);

// Note: there are two layouts for projects (grid vs list), we'll add portfolio-item to both
content = content.replace(
  'className="group cursor-pointer flex flex-col bg-[#1A1A1A]',
  'className="portfolio-item group cursor-pointer flex flex-col bg-[#1A1A1A]'
);

content = content.replace(
  'className="group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between bg-[#1A1A1A]',
  'className="portfolio-item group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between bg-[#1A1A1A]'
);

fs.writeFileSync('src/components/Portfolio.tsx', content);
