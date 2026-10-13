"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { BRAND } from "@/shared/config/brand";
import { BrandReveal } from "./BrandReveal";
import styles from "./splash.module.css";

const SPLASH_DURATION_MS = 3400; // Complete entrance animation duration
const FADE_OUT_DURATION_MS = 350; // Smooth exit transition duration

export function SplashScreen() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const isNavigatingRef = useRef(false);

  const navigateToLogin = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      router.replace("/login");
    }, FADE_OUT_DURATION_MS);
  }, [router]);

  useEffect(() => {
    // Auto-transition to login screen after entrance animation completes
    const timer = setTimeout(() => {
      navigateToLogin();
    }, SPLASH_DURATION_MS);

    // Allow user to skip by pressing any key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") return;
      navigateToLogin();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigateToLogin]);

  return (
    <main
      className={`${styles.splash} ${isExiting ? styles.splashExiting : ""}`}
      aria-label={`${BRAND.fullName} welcome screen`}
      onClick={navigateToLogin}
      role="region"
      title="Click or press any key to continue to login"
    >
      <div className={styles.scene} data-testid="splash-scene">
        <BrandReveal />
        <footer className={styles.footer}>
          <div className={styles.footerBadge}>
            <span className={styles.footerGlow} aria-hidden="true" />
            <span className={styles.footerEmblem} aria-hidden="true">
              <span className={styles.footerDiamond} />
            </span>
            <p className={styles.footerText}>
              <span className={styles.footerPrefix}>Powered by </span>
              <strong className={styles.footerBrand}>Barkat Tech</strong>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
