const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const importPrinter = "import { Menu, X, Download, Globe, Search, Printer } from 'lucide-react';";
content = content.replace("import { Menu, X, Download, Globe, Search } from 'lucide-react';", importPrinter);

const desktopPrintBtn = `
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('trigger-print'))}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
              title="Print Portfolio"
            >
              <Printer size={14} />
              {language === 'en' ? 'Print' : 'พิมพ์'}
            </button>
`;

content = content.replace(
  "            <button \n              onClick={handlePreviewResume}",
  desktopPrintBtn + "            <button \n              onClick={handlePreviewResume}"
);

const mobilePrintBtn = `
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('trigger-print'));
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full border border-white/20 px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-white hover:bg-white/10 transition-colors"
                >
                  <Printer size={16} />
                  {language === 'en' ? 'Print Portfolio' : 'พิมพ์พอร์ตโฟลิโอ'}
                </button>
`;

content = content.replace(
  "                <button \n                  onClick={(e) => {",
  mobilePrintBtn + "                <button \n                  onClick={(e) => {"
);

fs.writeFileSync('src/components/Navbar.tsx', content, 'utf8');
