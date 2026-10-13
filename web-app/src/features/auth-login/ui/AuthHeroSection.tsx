"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND } from "@/shared/config/brand";
import { resolveAssetUrl } from "@/shared/config/env";
import { useInstituteBranding } from "@/entities/institute";
import styles from "./split.module.css";

export function AuthHeroSection() {
  const { instituteName, instituteTagline, quote, logoUrl, isLoading, fetchBranding } =
    useInstituteBranding();
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    fetchBranding();
  }, [fetchBranding]);

  // Reset logo error if logoUrl changes
  useEffect(() => {
    setLogoError(false);
  }, [logoUrl]);

  const resolvedLogo = resolveAssetUrl(logoUrl);

  return (
    <section className={styles.heroSection} aria-label="Institutional workspace">
      <div className={styles.heroContent}>
        {isLoading ? (
          <div className={styles.identitySkeletonGroup} aria-busy="true" aria-label="Loading institutional branding">
            <div className={styles.skeletonLogo} />
            <div className={styles.skeletonLineLarge} />
            <div className={styles.skeletonLineMedium} />
          </div>
        ) : instituteName ? (
          <div className={styles.dynamicIdentityBox}>
            {resolvedLogo && !logoError ? (
              <div className={styles.instituteLogoWrapper}>
                <img
                  src={resolvedLogo}
                  alt={`${instituteName} logo`}
                  width={80}
                  height={80}
                  className={styles.instituteLogo}
                  loading="eager"
                  decoding="async"
                  onError={() => {
                    setLogoError(true);
                  }}
                />
              </div>
            ) : null}

            <h2 className={styles.instituteHeading}>{instituteName}</h2>

            {instituteTagline ? (
              <p className={styles.instituteTagline}>{instituteTagline}</p>
            ) : null}

            {quote ? (
              <blockquote className={styles.instituteQuoteBox}>
                &ldquo;{quote}&rdquo;
              </blockquote>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Official Platform Brand & Logo */}
      <footer className={styles.heroFooter}>
        <div className={styles.footerRow}>
          <Image
            src={BRAND.crest}
            alt="taleemOne crest"
            width={72}
            height={72}
            className={styles.crestImg}
            priority
          />

          <div className={styles.brandWordmark}>
            <span>taleem</span>
            <span className={styles.brandAccent}>One</span>
            <span className={styles.productTag}>{BRAND.product}</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
