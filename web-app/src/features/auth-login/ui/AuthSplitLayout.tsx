"use client";

import { AuthHeroSection } from "./AuthHeroSection";
import { AuthCardSection } from "./AuthCardSection";
import styles from "./split.module.css";

export function AuthSplitLayout() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.splitFrame}>
        <AuthHeroSection />
        <AuthCardSection />
      </div>
    </div>
  );
}
