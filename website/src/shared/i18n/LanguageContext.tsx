"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LanguageCode, Direction, LanguageConfig, TranslationDictionary } from "./types";
import en from "./en.json";
import ur from "./ur.json";
import ar from "./ar.json";
import hi from "./hi.json";

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: {
    code: "en",
    label: "English",
    nativeName: "English",
    dir: "ltr",
    fontFamily: "Inter, sans-serif",
  },
  ur: {
    code: "ur",
    label: "Urdu",
    nativeName: "اردو",
    dir: "rtl",
    fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
  },
  ar: {
    code: "ar",
    label: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    fontFamily: "'Alyamama', 'Noto Sans Arabic', 'Amiri', serif",
  },
  hi: {
    code: "hi",
    label: "Hindi",
    nativeName: "हिन्दी",
    dir: "ltr",
    fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
  },
};

const dictionaries: Record<LanguageCode, TranslationDictionary> = {
  en: en as unknown as TranslationDictionary,
  ur: ur as unknown as TranslationDictionary,
  ar: ar as unknown as TranslationDictionary,
  hi: hi as unknown as TranslationDictionary,
};

interface LanguageContextValue {
  language: LanguageCode;
  direction: Direction;
  config: LanguageConfig;
  t: TranslationDictionary;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "bah_lang";

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>("ur");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && LANGUAGES[saved]) {
        setLanguageState(saved);
      }
    } catch {
      // Ignore storage errors on restricted environments
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    if (!LANGUAGES[lang]) return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage error
    }
    // Update HTML attributes
    const dir = LANGUAGES[lang].dir;
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  };

  useEffect(() => {
    if (mounted) {
      const dir = LANGUAGES[language].dir;
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", language);
    }
  }, [language, mounted]);

  const value: LanguageContextValue = {
    language,
    direction: LANGUAGES[language].dir,
    config: LANGUAGES[language],
    t: dictionaries[language] || dictionaries.en,
    setLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
