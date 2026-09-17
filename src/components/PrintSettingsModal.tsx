import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Printer, AlertCircle, X, FileDown } from 'lucide-react';

export default function PrintSettingsModal() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isPrintingRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        if (isPrintingRef.current) return; // Allow native print if we initiated it
        e.preventDefault();
        setIsOpen(true);
      }
    };

    const handleCustomPrint = () => setIsOpen(true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('trigger-print', handleCustomPrint);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('trigger-print', handleCustomPrint);
    };
  }, []);

  const handleContinue = () => {
    setIsOpen(false);
    isPrintingRef.current = true;
    setTimeout(() => {
      window.print();
      // Reset after a short delay to allow the dialog to open
      setTimeout(() => {
        isPrintingRef.current = false;
      }, 1000);
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#141414] border border-primary/30 w-full max-w-md shadow-2xl relative p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Printer size={24} />
              </div>
              
              <h2 className="text-xl font-serif text-foreground mb-4">
                {language === 'en' ? 'Print Settings' : 'การตั้งค่าการพิมพ์'}
              </h2>
              
              <div className="bg-foreground/5 border border-foreground/10 p-4 rounded-sm flex items-start gap-3 mb-8 w-full text-left">
                <AlertCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-gray-300">
                  {language === 'en' 
                    ? "For the best results, ensure your print layout is set to 'Portrait'. To save as PDF, select 'Save as PDF' in the destination dropdown."
                    : "เพื่อให้ได้รูปแบบที่ดีที่สุด โปรดตรวจสอบว่าการตั้งค่าการพิมพ์เป็น 'แนวตั้ง' (Portrait) หากต้องการบันทึกเป็น PDF ให้เลือก 'Save as PDF' ในส่วนของเครื่องพิมพ์"}
                </p>
              </div>
              
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={handleContinue}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-[#0A0A0A] py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-primary/90 transition-colors rounded-sm"
                >
                  <Printer size={16} />
                  {language === 'en' ? 'Print Document' : 'พิมพ์เอกสาร'}
                </button>
                <button
                  onClick={handleContinue}
                  className="w-full flex items-center justify-center gap-2 border border-primary/50 text-primary hover:bg-primary/10 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors rounded-sm"
                >
                  <FileDown size={16} />
                  {language === 'en' ? 'Export as PDF' : 'ส่งออกเป็น PDF'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 mt-2 text-xs font-bold uppercase tracking-[0.1em] text-foreground/60 hover:text-foreground transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'ยกเลิก'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
