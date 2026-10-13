"use client";

import { useState, useEffect } from "react";
import { Building2, ShieldCheck, Tag } from "lucide-react";
import { resolveAssetUrl } from "@/shared/config/env";
import { useInstituteBranding } from "@/entities/institute";
import styles from "./institute-settings-header.module.css";

interface InstituteSettingsHeaderProps {
  nameEn?: string;
  nameUr?: string;
  tagline?: string;
  instituteType?: string;
  affiliationNumber?: string;
  logoUrl?: string | null;
  isLoading?: boolean;
}

export function InstituteSettingsHeader({
  nameEn,
  nameUr,
  tagline,
  instituteType,
  affiliationNumber,
  logoUrl,
  isLoading,
}: InstituteSettingsHeaderProps) {
  const { logoUrl: liveBrandingLogoUrl } = useInstituteBranding();
  const [imgError, setImgError] = useState(false);

  const effectiveLogo = logoUrl || liveBrandingLogoUrl;
  const resolvedLogo = resolveAssetUrl(effectiveLogo);

  useEffect(() => {
    setImgError(false);
  }, [resolvedLogo]);

  const initial = nameEn?.trim() ? nameEn.trim().charAt(0).toUpperCase() : null;

  return (
    <header className={styles.headerBanner} aria-label="Institutional Live Preview Banner">
      <div className={styles.leftGroup}>
        {/* Logo or Initials Pod */}
        <div className={styles.logoPod} aria-label="Institute Logo">
          {resolvedLogo && !imgError ? (
            <img
              src={resolvedLogo}
              alt={nameEn || "Institute Logo"}
              width={60}
              height={60}
              className={styles.logoImage}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className={styles.logoFallback}>
              {initial ?? <Building2 size={24} />}
            </span>
          )}
        </div>

        {/* Dynamic Titles */}
        <div className={styles.metaGroup}>
          <div className={styles.titleRow}>
            <h1 className={styles.instituteName}>
              {nameEn?.trim() ? (
                nameEn.trim()
              ) : isLoading ? (
                "Loading Institutional Profile..."
              ) : (
                <span className={styles.emptyHint}>Institute Name Not Configured</span>
              )}
            </h1>

            {nameUr?.trim() && (
              <span className={styles.instituteNameUrdu} lang="ur">
                {nameUr.trim()}
              </span>
            )}
          </div>

          {tagline?.trim() ? (
            <p className={styles.tagline}>{tagline.trim()}</p>
          ) : null}
        </div>
      </div>

      {/* Badges Pill Group */}
      <div className={styles.badgesGroup}>
        {instituteType && (
          <div className={styles.classificationPill} title="Institutional Classification">
            <Tag size={12} />
            <span>{instituteType}</span>
          </div>
        )}

        {affiliationNumber?.trim() ? (
          <div className={styles.affiliationBadge} title="Affiliation / Board Registration Number">
            <span className={styles.verifiedDot} />
            <span>Reg: {affiliationNumber.trim()}</span>
          </div>
        ) : null}
      </div>
    </header>
  );
}
