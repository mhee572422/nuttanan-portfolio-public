const fs = require('fs');

// Patch index.css
let css = fs.readFileSync('src/index.css', 'utf8');
const newPrintCss = `@media print {
  body {
    background-color: white !important;
    color: black !important;
  }
  
  nav, button, .fixed, .sticky {
    display: none !important;
  }
  
  section {
    page-break-inside: avoid;
    padding: 2rem 0 !important;
    background-color: white !important;
    color: black !important;
  }

  /* Ensure portfolio section and grid can break across multiple pages */
  #projects, .portfolio-grid {
    page-break-inside: auto !important;
  }
  
  /* But try to keep individual portfolio items on a single page if possible */
  .portfolio-item, .project-card {
    page-break-inside: avoid !important;
    page-break-after: auto !important;
  }

  h1, h2, h3, h4, h5, h6, p, span, div {
    color: black !important;
  }

  * {
    border-color: #ddd !important;
  }

  a {
    color: black !important;
    text-decoration: underline;
  }
}`;

const oldPrintCssMatch = css.match(/@media print \{[\s\S]*?\n\}/);
if (oldPrintCssMatch) {
    css = css.replace(oldPrintCssMatch[0], newPrintCss);
    fs.writeFileSync('src/index.css', css);
}

// Patch PrintSettingsModal.tsx
let modal = fs.readFileSync('src/components/PrintSettingsModal.tsx', 'utf8');

if (!modal.includes('FileDown')) {
    modal = modal.replace("import { Printer, AlertCircle, X } from 'lucide-react';", "import { Printer, AlertCircle, X, FileDown } from 'lucide-react';");
    
    const oldButtons = `<div className="flex gap-4 w-full">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 hover:text-white transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'ยกเลิก'}
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 bg-[#C5A059] text-[#0A0A0A] py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-[#C5A059]/90 transition-colors rounded-sm"
                >
                  {language === 'en' ? 'Continue to Print' : 'ดำเนินการพิมพ์ต่อ'}
                </button>
              </div>`;
              
    const newButtons = `<div className="flex flex-col gap-3 w-full">
                <button
                  onClick={handleContinue}
                  className="w-full flex items-center justify-center gap-2 bg-[#C5A059] text-[#0A0A0A] py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-[#C5A059]/90 transition-colors rounded-sm"
                >
                  <Printer size={16} />
                  {language === 'en' ? 'Print Document' : 'พิมพ์เอกสาร'}
                </button>
                <button
                  onClick={handleContinue}
                  className="w-full flex items-center justify-center gap-2 border border-[#C5A059]/50 text-[#C5A059] hover:bg-[#C5A059]/10 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors rounded-sm"
                >
                  <FileDown size={16} />
                  {language === 'en' ? 'Export as PDF' : 'ส่งออกเป็น PDF'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 mt-2 text-xs font-bold uppercase tracking-[0.1em] text-white/60 hover:text-white transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'ยกเลิก'}
                </button>
              </div>`;
              
    modal = modal.replace(oldButtons, newButtons);
    
    // Also change the instructional text to mention PDF
    const oldAlert = `{language === 'en' 
                    ? "For the best layout results, please ensure your printer layout is set to 'Portrait' before printing."
                    : "เพื่อให้ได้รูปแบบที่ดีที่สุด โปรดตรวจสอบว่าการตั้งค่าการพิมพ์ของคุณถูกตั้งเป็น 'แนวตั้ง' (Portrait) ก่อนพิมพ์"}`;
                    
    const newAlert = `{language === 'en' 
                    ? "For the best results, ensure your print layout is set to 'Portrait'. To save as PDF, select 'Save as PDF' in the destination dropdown."
                    : "เพื่อให้ได้รูปแบบที่ดีที่สุด โปรดตรวจสอบว่าการตั้งค่าการพิมพ์เป็น 'แนวตั้ง' (Portrait) หากต้องการบันทึกเป็น PDF ให้เลือก 'Save as PDF' ในส่วนของเครื่องพิมพ์"}`;
    
    modal = modal.replace(oldAlert, newAlert);
    
    fs.writeFileSync('src/components/PrintSettingsModal.tsx', modal);
}
