/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import PrintView from './components/PrintView';
import PrintSettingsModal from './components/PrintSettingsModal';
import ActivitySection from './components/ActivitySection';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Portfolio from './components/Portfolio';
import AILab from './components/AILab';
import Updates from './components/Updates';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import BackToTop from './components/BackToTop';
import Chatbot from './components/Chatbot';
import SectionSeparator from './components/SectionSeparator';
import FadeInSection from './components/FadeInSection';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import VisitorCounter from './components/VisitorCounter';
import LanguageToggle from './components/LanguageToggle';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useCurrentYear } from './hooks/useCurrentYear';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { downloadVCard } from './utils/vcard';
import { Download, Share2 } from 'lucide-react';

function AppContent() {
  const { language } = useLanguage();
  const [showDashboard, setShowDashboard] = useState(false);
  const currentYear = useCurrentYear();
  useKeyboardShortcuts();

  
  const baseTitle = language === 'en' ? 'Nuttanan Foopun | Lead Systems Administrator & Architect' : 'Nuttanan Foopun | ผู้ดูแลระบบอาวุโส และ สถาปนิกระบบ';
  const [title, setTitle] = useState(baseTitle);

  useEffect(() => {
    setTitle(baseTitle);
  }, [baseTitle]);

  useEffect(() => {
    let timeoutId;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTitle(language === 'en' ? 'Away | ' + baseTitle : 'ไม่อยู่ | ' + baseTitle);
      } else {
        setTitle(language === 'en' ? 'Active Session | ' + baseTitle : 'เซสชันเปิดใช้งาน | ' + baseTitle);
        timeoutId = setTimeout(() => {
          setTitle(baseTitle);
        }, 3000);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [baseTitle, language]);

  const description = language === 'en' 
    ? 'Portfolio of Nuttanan Foopun, a Lead Systems Administrator / S-CODE Architect / Founder & Chief Architect at BTRU Logic Co., Ltd. / GSII.' 
    : 'พอร์ตโฟลิโอของ Nuttanan Foopun ผู้ดูแลระบบอาวุโส และ สถาปนิกระบบที่มีความเชี่ยวชาญด้านแอปพลิเคชันเว็บสมัยใหม่, การออกแบบ UI/UX และการพัฒนาแอปพลิเคชันมือถือ';
    
  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://nuttanan.dev';
  const siteName = language === 'en' ? 'Nuttanan Foopun Foopun Portfolio' : 'พอร์ตโฟลิโอ Nuttanan Foopun';
  const ogLocale = language === 'en' ? 'en_US' : 'th_TH';
  const ogImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200';

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nuttanan Foopun",
    "url": currentUrl,
    "jobTitle": "Lead Systems Administrator & Architect",
    "description": description,
    "sameAs": [
      "https://github.com/mhee572422"
    ]
  };

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: description,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert(language === 'en' ? 'Link copied to clipboard!' : 'คัดลอกลิงก์แล้ว!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-[#E0E0E0] selection:bg-primary selection:text-[#0A0A0A]">
      <PrintView />
      <div className="print:hidden">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Nuttanan Foopun" />
        <meta name="keywords" content={language === 'en' ? "Web Developer, Portfolio, React, UI/UX Design, Frontend Engineer, TypeScript" : "นักพัฒนาเว็บไซต์, พอร์ตโฟลิโอ, สร้างเว็บไซต์, โปรแกรมเมอร์, ฟรอนต์เอนด์"} />
        <meta name="theme-color" content="#0A0A0A" />
        
        <link rel="canonical" href={currentUrl} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Nuttanan Foopun Foopun Portfolio Preview" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Nuttanan Foopun Foopun Portfolio Preview" />
        <meta name="twitter:creator" content="@nuttanan" />
        <meta name="twitter:site" content="@nuttanan" />
      </Helmet>
      
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SectionSeparator />
        <FadeInSection><About /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Skills /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Experience /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Certifications /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Portfolio /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><AILab /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Updates /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><ActivitySection /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Testimonials /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Contact /></FadeInSection>
      </main>
      
      <footer className="bg-background text-foreground/40 py-12 flex flex-col items-center justify-center border-t border-foreground/10 relative">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            onClick={downloadVCard}
            className="flex items-center justify-center gap-2 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 px-4 py-2 rounded-full text-xs text-foreground/80 transition-colors uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Download size={14} />
            {language === 'en' ? 'Save Contact (vCard)' : 'บันทึกข้อมูลติดต่อ (vCard)'}
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full text-xs transition-colors uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Share2 size={14} />
            {language === 'en' ? 'Share Portfolio' : 'แชร์พอร์ตโฟลิโอ'}
          </button>
        </div>
        <div className="flex gap-6 mb-6">
          <a href="#" aria-label="LinkedIn" className="text-foreground/40 hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" aria-label="GitHub" className="text-foreground/40 hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="text-foreground/40 hover:text-primary transition-colors">
            <Twitter size={20} />
          </a>
        </div>
        <p 
          className="text-[10px] uppercase tracking-[0.2em] cursor-pointer hover:text-primary transition-colors"
          onDoubleClick={() => setShowDashboard(true)}
          title="Double click for analytics"
        >
          © {currentYear} Nuttanan Foopun. {language === 'en' ? 'All rights reserved.' : 'สงวนลิขสิทธิ์.'}
        </p>
        <VisitorCounter />
      </footer>
      
      {showDashboard && <Dashboard onClose={() => setShowDashboard(false)} />}
      <CommandPalette />
      <Chatbot />
      <LanguageToggle />
      <BackToTop />
      <PrintSettingsModal />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AnalyticsProvider>
        <ThemeProvider>
        <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
      </ThemeProvider>
      </AnalyticsProvider>
    </HelmetProvider>
  );
}
