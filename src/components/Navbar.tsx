import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Globe, Search, Printer, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAnalytics } from '../context/AnalyticsContext';
import ResumePreviewModal from './ResumePreviewModal';
import SettingsMenu from './SettingsMenu';

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const { trackEvent } = useAnalytics();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreviewResume = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent('resume_previewed', { component: 'Navbar', language });
    setIsPreviewOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: language === 'th' ? 'หน้าแรก' : 'Home', 
      href: '#home',
      desc: language === 'th' ? 'กลับสู่หน้าเริ่มต้น' : 'Back to top'
    },
    { 
      name: language === 'th' ? 'เกี่ยวกับ' : 'About', 
      href: '#about',
      desc: language === 'th' ? 'ประวัติส่วนตัวและแนวคิด' : 'My background & philosophy'
    },
    { 
      name: language === 'th' ? 'ทักษะ' : 'Skills', 
      href: '#skills',
      desc: language === 'th' ? 'ความเชี่ยวชาญทางเทคนิค' : 'Technical expertise'
    },
    { 
      name: language === 'th' ? 'ประสบการณ์' : 'Experience', 
      href: '#experience',
      desc: language === 'th' ? 'ประวัติการทำงานที่ผ่านมา' : 'Work history & roles'
    },
    { 
      name: language === 'th' ? 'ผลงาน' : 'Projects', 
      href: '#projects',
      desc: language === 'th' ? 'เคสสตาดีและโปรเจกต์' : 'Case studies & work'
    },
    { 
      name: language === 'th' ? 'รีวิว' : 'Reviews', 
      href: '#testimonials',
      desc: language === 'th' ? 'คำชมจากผู้ร่วมงาน' : 'Client & peer feedback'
    },
    { 
      name: language === 'th' ? 'ติดต่อ' : 'Contact', 
      href: '#contact',
      desc: language === 'th' ? 'ช่องทางการติดต่อ' : 'Get in touch with me'
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-foreground/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        <a href="#" className="text-xl font-serif font-semibold tracking-tight text-foreground">
          Nuttanan Foopun.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <a 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm py-2 block"
                aria-label={`${link.name}: ${link.desc}`}
                title="" // Override default tooltip
              >
                {link.name}
              </a>
              {/* Tooltip */}
              <div 
                role="tooltip"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-surface border border-foreground/10 rounded-md text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none w-max z-50 shadow-xl transform translate-y-1 group-hover:translate-y-0"
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface border-l border-t border-foreground/10 rotate-45"></div>
                <p className="relative z-10 text-[11px] text-foreground/90 font-sans tracking-wide whitespace-nowrap">{link.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center ml-2 border-l border-foreground/10 pl-6 gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm group"
              title="Ctrl/Cmd+K"
            >
              <Sparkles size={14} />
              {language === 'en' ? 'AI Chat' : 'ผู้ช่วย AI'}
              <kbd className="hidden lg:inline-flex items-center gap-1 font-sans text-[9px] bg-foreground/5 border border-foreground/10 px-1.5 py-0.5 rounded text-foreground/40 group-hover:bg-foreground/10 group-hover:text-foreground/60 transition-colors ml-1">
                <span className="text-[10px]">⌘</span>K
              </kbd>
            </button>
            <SettingsMenu />
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              <Globe size={14} />
              {language === 'en' ? 'TH' : 'EN'}
            </button>

            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('trigger-print'))}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              title="Print Portfolio"
            >
              <Printer size={14} />
              {language === 'en' ? 'Print' : 'พิมพ์'}
            </button>
            <button 
              onClick={handlePreviewResume}
              className="flex items-center gap-2 border border-foreground/20 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-foreground hover:bg-foreground/10 transition-colors"
            >
              <Download size={14} />
              {language === 'en' ? 'Resume' : 'เรซูเม่'}
            </button>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? (language === 'en' ? 'Close menu' : 'ปิดเมนู') : (language === 'en' ? 'Open menu' : 'เปิดเมนู')}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            role="region"
            aria-label={language === 'en' ? 'Mobile Menu' : 'เมนูสำหรับมือถือ'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-foreground/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium uppercase tracking-widest text-foreground/70 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-foreground/10 space-y-4">
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('open-command-palette'));
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full border border-foreground/20 px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-foreground hover:bg-foreground/10 transition-colors"
                >
                  <Sparkles size={16} />
                  {language === 'en' ? 'AI Chat (Ctrl+K)' : 'ถามผู้ช่วย AI (Ctrl+K)'}
                </button>
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full border border-foreground/20 px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-foreground hover:bg-foreground/10 transition-colors"
                >
                  <Globe size={16} />
                  {language === 'en' ? 'Switch to Thai' : 'เปลี่ยนเป็นภาษาอังกฤษ'}
                </button>

                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('trigger-print'));
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full border border-foreground/20 px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-foreground hover:bg-foreground/10 transition-colors"
                >
                  <Printer size={16} />
                  {language === 'en' ? 'Print Portfolio' : 'พิมพ์พอร์ตโฟลิโอ'}
                </button>
                <button 
                  onClick={(e) => {
                    handlePreviewResume(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-foreground px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-[#0A0A0A] hover:bg-foreground/90 transition-colors"
                >
                  <Download size={16} />
                  {language === 'en' ? 'Download Resume' : 'ดาวน์โหลดเรซูเม่'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ResumePreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </nav>
  );
}
