import React, { useState, useRef, useEffect } from 'react';
import { Settings, Moon, Sun, Monitor, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const themes = [
    { id: 'light', icon: Sun, labelEn: 'Light', labelTh: 'สว่าง' },
    { id: 'dark', icon: Moon, labelEn: 'Dark', labelTh: 'มืด' },
    { id: 'system', icon: Monitor, labelEn: 'System', labelTh: 'ระบบ' },
  ] as const;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-border flex justify-between items-center bg-surface-alt/50">
              <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                {language === 'en' ? 'Settings' : 'การตั้งค่า'}
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-foreground/40 hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="p-2">
              <div className="px-2 py-1.5 text-[10px] uppercase tracking-widest text-foreground/40 font-semibold mb-1">
                {language === 'en' ? 'Theme' : 'ธีม'}
              </div>
              
              <div className="flex flex-col gap-1">
                {themes.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        theme === t.id 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-foreground/80 hover:bg-surface-alt hover:text-foreground'
                      }`}
                    >
                      <Icon size={16} className={theme === t.id ? 'text-primary' : 'text-foreground/60'} />
                      <span>{language === 'en' ? t.labelEn : t.labelTh}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
