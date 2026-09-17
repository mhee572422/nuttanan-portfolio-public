import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('portfolio_language') as Language;
    if (savedLanguage === 'en' || savedLanguage === 'th') {
      return savedLanguage;
    }
    
    if (navigator.language && navigator.language.toLowerCase().startsWith('th')) {
      return 'th';
    }
  }
  return 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('portfolio_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => setLanguage(l => (l === 'en' ? 'th' : 'en'));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
