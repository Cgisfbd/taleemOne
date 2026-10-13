"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/widgets/sidebar";
import { Topbar } from "@/widgets/topbar";
import { useInstituteBranding } from "@/entities/institute";
import { useSession } from "@/features/auth-login";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { fetchBranding } = useInstituteBranding();
  useSession();

  useEffect(() => {
    // Prime dynamic institute branding
    fetchBranding();
  }, [fetchBranding]);

  return (
    <div className={styles.dashboardShell}>
      {/* L-SHAPE SEAMLESS OPTICAL GLASS BASE */}
      <div className={styles.lShapeGlassContainer} aria-hidden="true">
        <div
          className={styles.lShapeGlassBase}
          style={{
            clipPath: collapsed
              ? "polygon(0 0, 100% 0, 100% 56px, calc(100% - 2px) 68px, calc(100% - 9px) 79px, calc(100% - 20px) 86px, calc(100% - 32px) 88px, 132px 88px, 120px 90px, 109px 97px, 102px 108px, 100px 120px, 100px calc(100% - 32px), 98px calc(100% - 20px), 91px calc(100% - 9px), 80px calc(100% - 2px), 68px 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 56px, calc(100% - 2px) 68px, calc(100% - 9px) 79px, calc(100% - 20px) 86px, calc(100% - 32px) 88px, 320px 88px, 308px 90px, 297px 97px, 290px 108px, 288px 120px, 288px calc(100% - 32px), 286px calc(100% - 20px), 279px calc(100% - 9px), 268px calc(100% - 2px), 256px 100%, 0 100%)",
          }}
        />
      </div>

      {/* PERFECT L-SHAPE OUTLINE & 32PX CURVED GOLAYI */}
      <div className={styles.lShapeOutline} aria-hidden="true">
        <div className={styles.outlineTop} />
        <div className={styles.outlineLeft} />
        <div className={styles.outlineRight} />
        <div
          className={`${styles.outlineBottom} ${
            collapsed ? styles.outlineBottomCollapsed : styles.outlineBottomExpanded
          }`}
        />

        <div
          className={`${styles.outlineSidebarRight} ${
            collapsed ? styles.outlineSidebarRightCollapsed : styles.outlineSidebarRightExpanded
          }`}
        />
        <div
          className={`${styles.outlineTopbarBottom} ${
            collapsed ? styles.outlineTopbarBottomCollapsed : styles.outlineTopbarBottomExpanded
          }`}
        />

        {/* 1. Corner curve: Topbar right end curve */}
        <div className={styles.cornerTopbarEnd} />
        {/* 2. Corner curve: Sidebar bottom right curve */}
        <div
          className={`${styles.cornerSidebarBottom} ${
            collapsed ? styles.cornerSidebarBottomCollapsed : styles.cornerSidebarBottomExpanded
          }`}
        />
        {/* 3. Corner curve: Inner junction curve where Topbar meets Sidebar */}
        <div
          className={`${styles.cornerInnerJunction} ${
            collapsed ? styles.cornerInnerJunctionCollapsed : styles.cornerInnerJunctionExpanded
          }`}
        />
      </div>

      {/* FOREGROUND SHELL CONTENT */}
      <div className={styles.foregroundContainer}>
        {/* Slidebar (Sidebar with navigation buttons) */}
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Main Wrapper */}
        <div className={styles.mainWrapper}>
          {/* Topbar with search box, well icon, and profile icon */}
          <Topbar isSidebarCollapsed={collapsed} />

          {/* Scrollable Dashboard View */}
          <main className={styles.contentScrollArea} id="main-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
