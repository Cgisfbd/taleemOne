"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUp,
  BookOpen,
  Smartphone,
  ChevronRight,
  HeartHandshake,
  Zap,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const Footer: React.FC = () => {
  const { t, direction } = useLanguage();
  const isRTL = direction === "rtl";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-30 mt-auto w-full overflow-hidden">
      {/* Top Specular Glow Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Main Glassmorphic Footer Container */}
      <div className="glass-ultra border-t border-amber-500/20 bg-white/85 dark:bg-[#140A1E]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* 1. BRAND & MISSION BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-black/5 dark:border-white/10">
            {/* Brand Identity & Mission Text */}
            <div className="flex flex-col text-start max-w-2xl min-w-0">
              <Link href="/" className="inline-flex items-center gap-2.5 group focus:outline-none shrink-0 w-fit">
                <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_0_12px_rgba(245,158,11,0.35)] shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#1A1028] flex items-center justify-center p-0.5">
                    <Image
                      src="/images/logo.png"
                      alt="Jamia Barkat-e-Haram Logo"
                      width={36}
                      height={36}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col text-start min-w-0">
                  <span className="font-display font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-[#854D0E] via-[#D97706] to-[#B45309] dark:from-[#FFFBEB] dark:via-[#FBBF24] dark:to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(217,119,6,0.15)] dark:drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)] truncate">
                    {t.common.appName}
                  </span>
                  <span className="font-display text-[9px] sm:text-[10.5px] font-semibold text-amber-800/90 dark:text-amber-300/90 tracking-normal truncate leading-[1.6] py-0.5">
                    {t.common.tagline}
                  </span>
                </div>
              </Link>

              {/* Mission Statement Description below title */}
              <p className="text-[11px] sm:text-xs text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed mt-2 max-w-2xl">
                {t.footer?.description ||
                  "We provide Islamic and modern education for girls in a safe and nurturing environment, with hostel facilities and strong moral upbringing."}
              </p>
            </div>

            {/* Official Social Media Channels Strip (Exact Sequence) */}
            <div className="flex flex-col items-start lg:items-end gap-1.5 shrink-0">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C7A96] dark:text-[#A394AB]">
                {t.footer?.socialMedia || "Official Social Media"}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {/* 1. WhatsApp */}
                <a
                  href="https://wa.me/917080654147"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="group relative p-2 rounded-xl glass-item-card border border-emerald-500/25 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-all active:scale-95 shadow-sm"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>

                {/* 2. Instagram */}
                <a
                  href="https://instagram.com/jamiabarkateharam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Page"
                  className="group relative p-2 rounded-xl glass-item-card border border-pink-500/25 hover:border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-500/10 transition-all active:scale-95 shadow-sm"
                  title="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* 3. Facebook */}
                <a
                  href="https://facebook.com/jamiabarkateharam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="group relative p-2 rounded-xl glass-item-card border border-blue-500/25 hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-all active:scale-95 shadow-sm"
                  title="Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* 4. YouTube */}
                <a
                  href="https://youtube.com/@jamiabarkateharam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="group relative p-2 rounded-xl glass-item-card border border-rose-500/25 hover:border-rose-500 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-all active:scale-95 shadow-sm"
                  title="YouTube"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* 5. Telegram */}
                <a
                  href="https://t.me/jamiabarkateharam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram Channel"
                  className="group relative p-2 rounded-xl glass-item-card border border-sky-500/25 hover:border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-500/10 transition-all active:scale-95 shadow-sm"
                  title="Telegram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.197 1.006.128.832.942z" />
                  </svg>
                </a>

                {/* 6. X / Twitter */}
                <a
                  href="https://x.com/jamiabarkateharam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter) Handle"
                  className="group relative p-2 rounded-xl glass-item-card border border-slate-500/25 hover:border-slate-500 text-slate-700 dark:text-slate-300 hover:bg-slate-500/10 transition-all active:scale-95 shadow-sm"
                  title="X (Twitter)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 2. DUAL GLASS CARDS ROW (Left: Donation Box Card, Right: Navigation Links Card) */}
          <div className="grid grid-cols-12 gap-2 sm:gap-3.5 my-2.5 sm:my-3.5">
            {/* Left: Donation Box Glass Card */}
            <div className="col-span-7 sm:col-span-8 p-2.5 sm:p-3 rounded-2xl glass-item-card border border-amber-500/25 shadow-sm flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-amber-500/[0.07] via-transparent to-rose-500/[0.05]">
              {/* Top Header Row */}
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="p-1 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                    <HeartHandshake className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-bold text-[#2D1F33] dark:text-white leading-tight">
                    {t.donation?.boxTitle || "Support Girls' Education"}
                  </span>
                </div>
              </div>

              {/* Middle QR & Info Row */}
              <div className="flex items-center gap-2 sm:gap-3.5 py-1.5">
                {/* QR Code Container with Gold Halo */}
                <div className="relative p-1 rounded-xl bg-white dark:bg-[#1A1028] border border-amber-500/30 shadow-sm shrink-0 flex items-center justify-center">
                  <svg className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-12 sm:h-12" viewBox="0 0 100 100" fill="currentColor">
                    <path className="text-amber-950 dark:text-amber-100" d="M10,10 h30 v30 h-30 z M16,16 v18 h18 v-18 z M22,22 h6 v6 h-6 z M60,10 h30 v30 h-30 z M66,16 v18 h18 v-18 z M72,22 h6 v6 h-6 z M10,60 h30 v30 h-30 z M16,66 v18 h18 v-18 z M22,72 h6 v6 h-6 z M45,15 h10 v5 h-10 z M45,25 h5 v10 h-5 z M55,25 h5 v5 h-5 z M45,40 h15 v5 h-15 z M15,45 h10 v5 h-10 z M30,45 h5 v10 h-5 z M40,45 h5 v5 h-5 z M50,50 h15 v5 h-15 z M70,45 h15 v5 h-15 z M75,55 h10 v10 h-10 z M60,60 h10 v5 h-10 z M45,60 h10 v15 h-10 z M55,70 h5 v15 h-5 z M65,70 h15 v5 h-15 z M65,80 h5 v10 h-5 z M75,80 h15 v5 h-15 z M85,70 h5 v5 h-5 z M85,90 h5 v5 h-5 z" />
                  </svg>
                </div>

                {/* Subtitle / UPI ID info */}
                <div className="flex flex-col text-start min-w-0 flex-1">
                  <span className="text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11px] font-bold text-amber-900 dark:text-amber-200 leading-tight">
                    {t.footer?.payUpiTitle || "Pay using UPI"}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[8px] min-[360px]:text-[9px] min-[400px]:text-[10px] font-mono font-semibold text-[#6B5A73] dark:text-[#C8BDCF] leading-tight" dir="ltr">
                      jamiabarkateharam@hdfcbank
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1.5 border-t border-amber-500/15">
                {/* Button 1: Pay using UPI */}
                <a
                  href="upi://pay?pa=jamiabarkateharam@hdfcbank&pn=Mujaddid%20Alf%20Sani%20Education%20and%20Welfare%20Trust&cu=INR"
                  className="group relative flex items-center justify-center h-7 sm:h-8 px-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-extrabold text-[10px] min-[360px]:text-[10.5px] sm:text-xs shadow-[0_2px_8px_rgba(217,119,6,0.25)] transition-all duration-200 active:scale-95 border border-white/20 overflow-hidden text-center"
                >
                  {/* Subtle Shimmer Sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 pointer-events-none" />
                  <span className="whitespace-nowrap">{t.footer?.payUpiBtn || t.donation?.payUpiBtn || "Pay using UPI"}</span>
                </a>

                {/* Button 2: Bank Transfer */}
                <Link
                  href="/donate"
                  className="group flex items-center justify-center h-7 sm:h-8 px-2 rounded-xl glass-item-card border border-amber-500/35 hover:border-amber-500/70 bg-white/70 dark:bg-white/5 hover:bg-amber-500/10 text-[#2D1F33] dark:text-white font-extrabold text-[10px] min-[360px]:text-[10.5px] sm:text-xs shadow-sm transition-all duration-200 active:scale-95 text-center"
                >
                  <span className="whitespace-nowrap">{t.footer?.bankCardBtn || t.donation?.bankCardBtn || "Bank Transfer"}</span>
                </Link>
              </div>
            </div>

            {/* Right: Elegant Styled Micro-List Glass Card */}
            <div className="col-span-5 sm:col-span-4 p-1.5 sm:p-2 rounded-2xl glass-item-card border border-amber-500/20 shadow-sm flex flex-col justify-center">
              <nav className="flex flex-col gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-semibold text-[#4A3B52] dark:text-[#C8BDCF]">
                {/* 1. Home */}
                <Link
                  href="/"
                  className="group flex items-center justify-between ps-1 pe-1.5 py-0.5 sm:py-1 rounded-lg hover:bg-amber-500/15 dark:hover:bg-white/5 hover:text-amber-900 dark:hover:text-amber-200 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 group-hover:scale-125 transition-all shrink-0" />
                    <span className="truncate">{t.nav.home}</span>
                  </div>
                  <ChevronRight
                    className={`w-3 h-3 text-amber-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ${
                      isRTL ? "rotate-180 group-hover:-translate-x-0" : ""
                    }`}
                  />
                </Link>

                {/* 2. Online Apply */}
                <Link
                  href="/students/apply"
                  className="group flex items-center justify-between ps-1 pe-1.5 py-0.5 sm:py-1 rounded-lg hover:bg-amber-500/15 dark:hover:bg-white/5 hover:text-amber-900 dark:hover:text-amber-200 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 group-hover:scale-125 transition-all shrink-0" />
                    <span className="truncate">{t.nav.studentPortalList?.entranceApply || "Online Apply"}</span>
                  </div>
                  <ChevronRight
                    className={`w-3 h-3 text-amber-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ${
                      isRTL ? "rotate-180 group-hover:-translate-x-0" : ""
                    }`}
                  />
                </Link>

                {/* 3. Verify Certificate */}
                <Link
                  href="/students/verify"
                  className="group flex items-center justify-between ps-1 pe-1.5 py-0.5 sm:py-1 rounded-lg hover:bg-amber-500/15 dark:hover:bg-white/5 hover:text-amber-900 dark:hover:text-amber-200 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500/40 group-hover:bg-purple-500 group-hover:scale-125 transition-all shrink-0" />
                    <span className="truncate">{t.nav.studentPortalList?.documentVerify || "Verify Certificate"}</span>
                  </div>
                  <ChevronRight
                    className={`w-3 h-3 text-amber-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ${
                      isRTL ? "rotate-180 group-hover:-translate-x-0" : ""
                    }`}
                  />
                </Link>

                {/* 4. Privacy Policy */}
                <Link
                  href="/privacy"
                  className="group flex items-center justify-between ps-1 pe-1.5 py-0.5 sm:py-1 rounded-lg hover:bg-amber-500/15 dark:hover:bg-white/5 hover:text-amber-900 dark:hover:text-amber-200 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 group-hover:scale-125 transition-all shrink-0" />
                    <span className="truncate">{t.footer.privacyPolicy}</span>
                  </div>
                  <ChevronRight
                    className={`w-3 h-3 text-amber-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ${
                      isRTL ? "rotate-180 group-hover:-translate-x-0" : ""
                    }`}
                  />
                </Link>

                {/* 5. Terms & Conditions */}
                <Link
                  href="/terms"
                  className="group flex items-center justify-between ps-1 pe-1.5 py-0.5 sm:py-1 rounded-lg hover:bg-amber-500/15 dark:hover:bg-white/5 hover:text-amber-900 dark:hover:text-amber-200 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 group-hover:scale-125 transition-all shrink-0" />
                    <span className="truncate">{t.footer.termsConditions}</span>
                  </div>
                  <ChevronRight
                    className={`w-3 h-3 text-amber-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ${
                      isRTL ? "rotate-180 group-hover:-translate-x-0" : ""
                    }`}
                  />
                </Link>
              </nav>
            </div>
          </div>

          {/* 3. COMPACT CONTACT & INFO STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-2.5 pb-2 border-t border-black/5 dark:border-white/10">
            {/* 1. Phone Helpline 1 */}
            <a
              href="tel:+917080654147"
              className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-xl glass-item-card hover:border-amber-500/40 text-[#2D1F33] dark:text-white transition-all active:scale-95 group"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-[10.5px] font-bold truncate" dir="ltr">
                +91 70806 54147
              </span>
            </a>

            {/* 2. Phone Helpline 2 */}
            <a
              href="tel:+919415146640"
              className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-xl glass-item-card hover:border-amber-500/40 text-[#2D1F33] dark:text-white transition-all active:scale-95 group"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-[10.5px] font-bold truncate" dir="ltr">
                +91 94151 46640
              </span>
            </a>

            {/* 3. Wide Email Card (Spans 2 columns / 2 ke barabr card) */}
            <a
              href="mailto:cgisbarkateharam@gmail.com"
              className="col-span-2 sm:col-span-2 flex items-center justify-center gap-2 p-1.5 sm:p-2 rounded-xl glass-item-card hover:border-amber-500/40 text-[#2D1F33] dark:text-white transition-all active:scale-95 group bg-white/60 dark:bg-white/5"
            >
              <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-[10.5px] sm:text-[11.5px] font-bold font-mono tracking-tight text-amber-950 dark:text-amber-200 truncate" dir="ltr">
                cgisbarkateharam@gmail.com
              </span>
            </a>
          </div>

          {/* 4. COMPACT 2-APP DOWNLOAD PILL STRIP */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2 pb-1 border-t border-black/5 dark:border-white/10">
            {/* 1. Android App */}
            <a
              href="/app/android"
              className="flex items-center justify-center gap-1.5 p-1.5 sm:p-2 rounded-xl glass-item-card hover:border-emerald-500/40 text-[#2D1F33] dark:text-white transition-all active:scale-95 group"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] min-[360px]:text-[10.5px] sm:text-xs font-bold truncate">
                {t.footer?.downloadAndroid || "Download Android App"}
              </span>
            </a>

            {/* 2. iOS App */}
            <a
              href="/app/ios"
              className="flex items-center justify-center gap-1.5 p-1.5 sm:p-2 rounded-xl glass-item-card hover:border-amber-500/40 text-[#2D1F33] dark:text-white transition-all active:scale-95 group"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] min-[360px]:text-[10.5px] sm:text-xs font-bold truncate">
                {t.footer?.downloadIos || "Download iOS App"}
              </span>
            </a>
          </div>
        </div>

        {/* 4. COMPACT BOTTOM COPYRIGHT, DEVELOPER CREDIT & BACK-TO-TOP */}
        <div className="border-t border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] py-2.5 px-3.5 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10.5px] sm:text-xs text-[#6B5A73] dark:text-[#A394AB]">
            {/* Left: Copyright & All Rights Reserved */}
            <div className="flex items-center gap-1.5 font-medium text-center sm:text-start flex-wrap justify-center sm:justify-start">
              <span>© {new Date().getFullYear()}</span>
              <span className="font-bold text-[#2D1F33] dark:text-white">{t.common.appName}</span>
              <span className="text-amber-500/50">•</span>
              <span>{t.footer.rightsReserved || "All Rights Reserved"}</span>
            </div>

            {/* Right: Designed and Developed by Nizam-e-Taleem + Scroll Top Button */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap justify-center sm:justify-end">
              <div className="flex items-center gap-1 font-medium">
                <span className="text-[#6B5A73] dark:text-[#A394AB]">{t.footer?.designedBy || "Designed & Developed by"}</span>
                <span className="font-extrabold text-amber-800 dark:text-amber-300">
                  {t.footer?.developerName || "نظامِ تعلیم"}
                </span>
              </div>

              <span className="w-1 h-1 rounded-full bg-amber-500/40 hidden xs:inline-block" />

              {/* Scroll Top Button */}
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 px-2 py-0.5 rounded-lg hover:bg-amber-500/10 active:scale-90 transition-transform shrink-0"
                aria-label="Scroll back to top"
              >
                <span>{t.footer?.scrollTop || "Top"}</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
