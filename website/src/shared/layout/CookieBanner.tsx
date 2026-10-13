"use client";

import React, { useState, useEffect } from "react";
import { Cookie, Check } from "lucide-react";
import { useLanguage } from "@/shared/i18n";

const COOKIE_STORAGE_KEY = "bah_cookie_consent";

export const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:end-6 sm:max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="glass-card rounded-2xl p-4 shadow-2xl bg-white/90 dark:bg-[#22162B]/90 backdrop-blur-xl border border-bah-border-card dark:border-bah-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-bah-lavender/15 text-bah-lavender shrink-0 mt-0.5 sm:mt-0">
            <Cookie className="w-5 h-5" />
          </div>
          <p className="text-xs text-bah-text-secondary dark:text-bah-dark-text-secondary leading-relaxed">
            We use privacy-friendly essential cookies to save your language preference & analyze site traffic.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAccept}
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-bah-lavender text-white shadow-sm hover:shadow-bah-lavender/30 active:scale-95 transition-all"
        >
          <Check className="w-3.5 h-3.5" />
          <span>{t.common.accept}</span>
        </button>
      </div>
    </div>
  );
};
