import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('hi');

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('site_language');
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLang(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    localStorage.setItem('site_language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const useLocalized = (data) => {
  const { lang } = useLanguage();
  
  if (!data) return data;
  if (lang === 'en') return data;

  const translate = (obj) => {
    if (!obj) return obj;
    if (typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(item => translate(item));
    
    const result = { ...obj };
    for (const key in result) {
      if (result[`${key}Hi`]) {
        result[key] = result[`${key}Hi`];
      } else if (typeof result[key] === 'object' && result[key] !== null) {
        result[key] = translate(result[key]);
      }
    }
    return result;
  };

  return translate(data);
};
