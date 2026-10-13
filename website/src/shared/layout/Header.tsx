"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Phone,
  Home,
  Info,
  Image as ImageIcon,
  Mail,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLanguage, LANGUAGES, LanguageCode } from "@/shared/i18n";
import { useTheme } from "@/shared/theme";

export const Header: React.FC = () => {
  const { language, setLanguage, t, direction } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  // 1. High Performance RAF Scroll Listener (Zero Jitter)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isRTL = direction === "rtl";

  return (
    <>
      {/* 1. Slim Luxury Announcement Ribbon (Continuous Smooth Marquee on Mobile) */}
      <div className="relative z-50 w-full overflow-hidden bg-gradient-to-r from-[#21112D] via-[#351842] to-[#21112D] text-amber-200 border-b border-amber-500/20 py-2 sm:py-2 px-2.5 sm:px-6 shadow-sm">
        {/* DESKTOP VIEW: Static Clean Text + Helpline */}
        <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-3">
          {/* Live Pulsing Alert & Text */}
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <p className={`truncate font-medium text-[11px] sm:text-xs text-amber-100/90 tracking-wide ${isRTL ? "font-urduBody text-xs sm:text-[13px] leading-[1.8] py-0.5" : ""}`}>
              {t.nav.topNotice || "✨ Admissions Open 2026-27 | Up to 100% Scholarship Entrance Test"}
            </p>
          </div>

          {/* Quick Helplines on Desktop with Glass Badges */}
          <div className="flex items-center gap-2.5 shrink-0 text-[11px] font-medium">
            <a
              href="tel:+917080654147"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-200/90 hover:text-amber-300 border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span dir="ltr">+91 70806 54147</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-amber-500/40" />
            <a
              href="tel:+919415146640"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-200/90 hover:text-amber-300 border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span dir="ltr">+91 94151 46640</span>
            </a>
          </div>
        </div>

        {/* MOBILE VIEW: Continuous Moving Marquee Ticker */}
        <div className="flex md:hidden items-center gap-2 overflow-hidden w-full relative">
          {/* Live Jewel Badge (Fixed) */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-extrabold shrink-0 z-10 shadow-sm">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
            </span>
            <span>LIVE</span>
          </div>

          {/* Marquee Scrolling Text with Gradient Edge Fade */}
          <div className="overflow-hidden flex-1 relative [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className={`${isRTL ? "animate-marquee-rtl font-urduBody text-xs sm:text-[13px] leading-[1.8] py-0.5" : "animate-marquee-ltr text-[11px]"} flex items-center gap-8 font-medium text-amber-100/90 tracking-wide whitespace-nowrap`}>
              <span>{t.nav.topNotice || "✨ Admissions Open 2026-27 | Up to 100% Scholarship Entrance Test"}</span>
              <span className="text-amber-400/60 font-bold">✦</span>
              <span>{t.nav.topNotice || "✨ Admissions Open 2026-27 | Up to 100% Scholarship Entrance Test"}</span>
              <span className="text-amber-400/60 font-bold">✦</span>
              <span>{t.nav.topNotice || "✨ Admissions Open 2026-27 | Up to 100% Scholarship Entrance Test"}</span>
              <span className="text-amber-400/60 font-bold">✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Floating Glassmorphic Capsule Header (GPU Accelerated) */}
      <header className="sticky top-2 sm:top-3.5 lg:top-4 z-40 w-full px-2 sm:px-6 lg:px-8 mt-2 sm:mt-3.5 lg:mt-4 transform-gpu">
        <div
          className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full glass-ultra transition-[padding,box-shadow] duration-200 ${
            isScrolled ? "py-2 px-3 sm:px-6 shadow-md" : "py-2 sm:py-3 px-3 sm:px-6"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            {/* BRAND LOGO & TITLE */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0 min-w-0"
              aria-label="Jamia Barkat-e-Haram Home"
            >
              {/* Logo with Golden Halo */}
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_0_12px_rgba(245,158,11,0.35)] dark:shadow-[0_0_18px_rgba(245,158,11,0.45)] shrink-0 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#1A1028] flex items-center justify-center p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Jamia Barkat-e-Haram Logo"
                    width={44}
                    height={44}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </div>

              {/* Brand Typography (Bolder & Prominent, Exactly matching Footer Cinzel / Kasheeda) */}
              <div className="flex flex-col text-start min-w-0 py-0.5">
                <span className={`font-display font-extrabold text-[14px] xs:text-base sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-[#854D0E] via-[#D97706] to-[#B45309] dark:from-[#FFFBEB] dark:via-[#FBBF24] dark:to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(217,119,6,0.15)] dark:drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)] truncate ${
                  isRTL ? "font-urduTitle leading-[1.8] py-1 text-[15px] sm:text-2xl" : "leading-[1.35] py-0.5"
                }`}>
                  {t.common.appName}
                </span>
                <span className={`font-display text-[9.5px] xs:text-[11px] sm:text-xs md:text-[12.5px] font-semibold text-amber-800/90 dark:text-amber-300/90 tracking-normal truncate max-w-[210px] xs:max-w-[270px] sm:max-w-[320px] ${
                  isRTL ? "font-urduBody leading-[1.7] py-0.5" : "leading-[1.5] py-0.5"
                }`}>
                  {t.common.tagline}
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION MENU (Smooth GPU transition with Inset Highlights) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 p-1 rounded-full bg-white/40 dark:bg-white/[0.04] border border-white/60 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
              {/* 1. Home */}
              <Link
                href="/"
                className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-150 ${
                  pathname === "/"
                    ? "glass-pill-active text-amber-950 dark:text-amber-100"
                    : "text-[#4A3B52] dark:text-[#E2D9E7] hover:text-[#1F112E] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                }`}
              >
                {t.nav.home}
              </Link>

              {/* 2. Gallery */}
              <Link
                href="/gallery"
                className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-150 ${
                  pathname === "/gallery"
                    ? "glass-pill-active text-amber-950 dark:text-amber-100"
                    : "text-[#4A3B52] dark:text-[#E2D9E7] hover:text-[#1F112E] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                }`}
              >
                {t.nav.gallery}
              </Link>

              {/* 3. Student Portal */}
              <Link
                href="/students"
                className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-150 ${
                  pathname.startsWith("/students")
                    ? "glass-pill-active text-amber-950 dark:text-amber-100"
                    : "text-[#4A3B52] dark:text-[#E2D9E7] hover:text-[#1F112E] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                }`}
              >
                {t.nav.studentPortal}
              </Link>

              {/* 4. Courses & Syllabus */}
              <Link
                href="/courses"
                className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-150 ${
                  pathname === "/courses"
                    ? "glass-pill-active text-amber-950 dark:text-amber-100"
                    : "text-[#4A3B52] dark:text-[#E2D9E7] hover:text-[#1F112E] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                }`}
              >
                {t.nav.courses}
              </Link>

              {/* 5. About Us */}
              <Link
                href="/about"
                className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-150 ${
                  pathname === "/about"
                    ? "glass-pill-active text-amber-950 dark:text-amber-100"
                    : "text-[#4A3B52] dark:text-[#E2D9E7] hover:text-[#1F112E] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                }`}
              >
                {t.nav.about}
              </Link>

              {/* 6. Contact Us */}
              <Link
                href="/contact"
                className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-150 ${
                  pathname === "/contact"
                    ? "glass-pill-active text-amber-950 dark:text-amber-100"
                    : "text-[#4A3B52] dark:text-[#E2D9E7] hover:text-[#1F112E] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                }`}
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* RIGHT UTILITY CONTROLS */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Desktop Language Selector */}
              <div className="relative hidden lg:block" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold glass-item-card hover:border-amber-500/40 text-amber-900 dark:text-amber-200 transition-all focus:outline-none shadow-sm active:scale-95"
                  aria-label="Change Language"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="uppercase tracking-wider font-mono text-[11px]">{language}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      langDropdownOpen ? "rotate-180 text-amber-500" : "opacity-60"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full mt-2 w-44 rounded-2xl p-2 glass-ultra z-50 ${
                        isRTL ? "start-0" : "end-0"
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#A394AB] px-2.5 py-1">
                        Select Language
                      </div>
                      {Object.values(LANGUAGES).map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code as LanguageCode);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                            language === lang.code
                              ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 font-bold border border-amber-500/35 shadow-sm"
                              : "text-[#2D1F33] dark:text-[#E2D9E7] hover:bg-white/60 dark:hover:bg-white/10"
                          }`}
                        >
                          <span style={{ fontFamily: lang.fontFamily }}>{lang.nativeName}</span>
                          {language === lang.code && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Theme Switcher */}
              <button
                type="button"
                onClick={toggleTheme}
                className="hidden lg:flex p-2 rounded-full text-amber-700 dark:text-amber-300 glass-item-card hover:border-amber-500/40 shadow-sm transition-transform active:scale-90"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-purple-700" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>

              {/* Mobile Menu Toggle Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[#2D1F33] dark:text-white glass-item-card hover:border-amber-500/40 transition-transform active:scale-90 shadow-sm"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-amber-600 dark:text-amber-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Full Glass Drawer (Zero-Jitter Hardware Compositing) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden touch-none">
            {/* Backdrop Fade (High performance opacity only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sliding Drawer (Pure hardware GPU translate3d with solid luxury foundation - Zero Jitter) */}
            <motion.div
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className={`fixed inset-y-0 ${
                isRTL ? "start-0" : "end-0"
              } w-[84%] max-w-sm bg-[#FAF7FA] dark:bg-[#140A1E] shadow-2xl border-x border-amber-500/25 flex flex-col justify-between overflow-y-auto p-4 sm:p-5 z-50 transform-gpu`}
            >
              {/* Drawer Top Section */}
              <div>
                {/* Brand Header Card & Close */}
                <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_0_10px_rgba(245,158,11,0.35)] shrink-0">
                      <div className="w-full h-full rounded-full bg-white dark:bg-[#1A1028] p-0.5 flex items-center justify-center">
                        <Image
                          src="/images/logo.png"
                          alt="Jamia Barkat-e-Haram"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col text-start min-w-0">
                      <span className="font-display font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-[#854D0E] via-[#D97706] to-[#B45309] dark:from-[#FFFBEB] dark:via-[#FBBF24] dark:to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(217,119,6,0.15)] dark:drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)] truncate">
                        {t.common.appName}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-amber-800/80 dark:text-amber-300/80 tracking-tight truncate max-w-[190px]">
                        {t.common.tagline}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full text-[#6B5A73] dark:text-[#C8BDCF] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 active:scale-90"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Language Selection Chips */}
                <div className="mt-3.5 p-2 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1.5 px-1">
                    <span>Language / زبان</span>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {Object.values(LANGUAGES).map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setLanguage(lang.code as LanguageCode)}
                        className={`py-1.5 px-1 rounded-xl text-xs font-bold text-center transition-colors truncate ${
                          language === lang.code
                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm"
                            : "text-[#4A3B52] dark:text-[#E2D9E7] hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                        style={{ fontFamily: lang.fontFamily }}
                      >
                        {lang.nativeName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Navigation Cards Flow */}
                <nav className="mt-4 flex flex-col gap-1.5">
                  {/* 1. Home Card */}
                  <Link
                    href="/"
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-150 active:scale-[0.98] ${
                      pathname === "/"
                        ? "glass-pill-active text-amber-950 dark:text-amber-100"
                        : "bg-white/80 dark:bg-white/5 text-[#2D1F33] dark:text-white border-black/5 dark:border-white/10 hover:border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <Home className="w-4 h-4 shrink-0" />
                      </div>
                      <span>{t.nav.home}</span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 text-amber-500 opacity-60 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {/* 2. Gallery Card */}
                  <Link
                    href="/gallery"
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-150 active:scale-[0.98] ${
                      pathname === "/gallery"
                        ? "glass-pill-active text-amber-950 dark:text-amber-100"
                        : "bg-white/80 dark:bg-white/5 text-[#2D1F33] dark:text-white border-black/5 dark:border-white/10 hover:border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
                        <ImageIcon className="w-4 h-4 shrink-0" />
                      </div>
                      <span>{t.nav.gallery}</span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 text-amber-500 opacity-60 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {/* 3. Student Portal Card */}
                  <Link
                    href="/students"
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-150 active:scale-[0.98] ${
                      pathname.startsWith("/students")
                        ? "glass-pill-active text-amber-950 dark:text-amber-100"
                        : "bg-white/80 dark:bg-white/5 text-[#2D1F33] dark:text-white border-black/5 dark:border-white/10 hover:border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <GraduationCap className="w-4 h-4 shrink-0" />
                      </div>
                      <span>{t.nav.studentPortal}</span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 text-amber-500 opacity-60 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {/* 4. Courses & Syllabus Card */}
                  <Link
                    href="/courses"
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-150 active:scale-[0.98] ${
                      pathname === "/courses"
                        ? "glass-pill-active text-amber-950 dark:text-amber-100"
                        : "bg-white/80 dark:bg-white/5 text-[#2D1F33] dark:text-white border-black/5 dark:border-white/10 hover:border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <BookOpen className="w-4 h-4 shrink-0" />
                      </div>
                      <span>{t.nav.courses}</span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 text-amber-500 opacity-60 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {/* 5. About Us Card */}
                  <Link
                    href="/about"
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-150 active:scale-[0.98] ${
                      pathname === "/about"
                        ? "glass-pill-active text-amber-950 dark:text-amber-100"
                        : "bg-white/80 dark:bg-white/5 text-[#2D1F33] dark:text-white border-black/5 dark:border-white/10 hover:border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400">
                        <Info className="w-4 h-4 shrink-0" />
                      </div>
                      <span>{t.nav.about}</span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 text-amber-500 opacity-60 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {/* 6. Contact Us Card */}
                  <Link
                    href="/contact"
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-150 active:scale-[0.98] ${
                      pathname === "/contact"
                        ? "glass-pill-active text-amber-950 dark:text-amber-100"
                        : "bg-white/80 dark:bg-white/5 text-[#2D1F33] dark:text-white border-black/5 dark:border-white/10 hover:border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <Mail className="w-4 h-4 shrink-0" />
                      </div>
                      <span>{t.nav.contact}</span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 text-amber-500 opacity-60 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>
                </nav>
              </div>

              {/* Drawer Bottom Utility Glass Card */}
              <div className="pt-3.5 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-[#6B5A73] dark:text-[#C8BDCF] px-1">
                <a
                  href="tel:+917080654147"
                  className="inline-flex items-center gap-1.5 font-medium p-2 rounded-xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 text-amber-900 dark:text-amber-200 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span dir="ltr">+91 70806 54147</span>
                </a>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-1.5 font-medium p-2 rounded-xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 active:scale-95"
                >
                  {theme === "light" ? (
                    <Moon className="w-3.5 h-3.5 text-purple-600" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
