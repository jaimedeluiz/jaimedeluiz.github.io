import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '../types/portfolio';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jdl_lang') as Language;
      if (saved === 'en' || saved === 'es') return saved;
      const navLang = navigator.language.slice(0, 2);
      return navLang === 'es' ? 'es' : 'en';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jdl_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    localStorage.setItem('jdl_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

