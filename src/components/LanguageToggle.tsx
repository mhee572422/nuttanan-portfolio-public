import { Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="fixed bottom-8 left-8 z-40 bg-surface border border-foreground/10 text-foreground pl-3 pr-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-foreground/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      title={language === 'en' ? 'Switch to Thai' : 'เปลี่ยนเป็นภาษาอังกฤษ'}
      aria-label={language === 'en' ? 'Switch to Thai' : 'เปลี่ยนเป็นภาษาอังกฤษ'}
    >
      <Globe size={18} className="text-primary" />
      <span className="text-[10px] uppercase tracking-widest font-bold mt-0.5">
        {language === 'en' ? 'TH' : 'EN'}
      </span>
    </motion.button>
  );
}
