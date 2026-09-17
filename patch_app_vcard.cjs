const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add imports
if (!content.includes('downloadVCard')) {
  content = content.replace(
    "import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';",
    "import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';\nimport { downloadVCard } from './utils/vcard';\nimport { Download } from 'lucide-react';"
  );
  
  const oldFooter = `<footer className="bg-[#0A0A0A] text-white/40 py-12 flex flex-col items-center justify-center border-t border-white/10 relative">
        <div className="flex gap-6 mb-6">`;
        
  const newFooter = `<footer className="bg-[#0A0A0A] text-white/40 py-12 flex flex-col items-center justify-center border-t border-white/10 relative">
        <button 
          onClick={downloadVCard}
          className="mb-8 flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs text-white/80 transition-colors uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
        >
          <Download size={14} />
          {language === 'en' ? 'Save Contact (vCard)' : 'บันทึกข้อมูลติดต่อ (vCard)'}
        </button>
        <div className="flex gap-6 mb-6">`;
        
  content = content.replace(oldFooter, newFooter);
  
  fs.writeFileSync('src/App.tsx', content, 'utf8');
}
