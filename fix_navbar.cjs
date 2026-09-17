const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Replace Search with Sparkles
content = content.replace("import { Menu, X, Download, Globe, Search, Printer } from 'lucide-react';", "import { Menu, X, Download, Globe, Search, Printer, Sparkles } from 'lucide-react';");

content = content.replace(
  "<Search size={14} />\n              {language === 'en' ? 'Search' : 'ค้นหา'}",
  "<Sparkles size={14} />\n              {language === 'en' ? 'AI Chat' : 'ผู้ช่วย AI'}"
);

content = content.replace(
  "<Search size={16} />\n                  {language === 'en' ? 'Search (Ctrl+K)' : 'ค้นหา (Ctrl+K)'}",
  "<Sparkles size={16} />\n                  {language === 'en' ? 'AI Chat (Ctrl+K)' : 'ถามผู้ช่วย AI (Ctrl+K)'}"
);

fs.writeFileSync('src/components/Navbar.tsx', content, 'utf8');
