"use client";

import React from "react";
import { AiAutoFillButton } from "@/shared/ui/ai";
import styles from "./identity-triad-card.module.css";

interface IdentityTriadCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  isRequired?: boolean;
  isTextarea?: boolean;
  enValue: string;
  urValue: string;
  hiValue: string;
  onEnChange: (val: string) => void;
  onUrChange: (val: string) => void;
  onHiChange: (val: string) => void;
  enPlaceholder?: string;
  urPlaceholder?: string;
  hiPlaceholder?: string;
  error?: string;
}

export function IdentityTriadCard({
  title,
  subtitle,
  icon,
  isRequired,
  isTextarea,
  enValue,
  urValue,
  hiValue,
  onEnChange,
  onUrChange,
  onHiChange,
  enPlaceholder = "Enter English text...",
  urPlaceholder = "اردو متن درج کریں...",
  hiPlaceholder = "हिंदी विवरण दर्ज करें...",
  error,
}: IdentityTriadCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <div>
          <h4 className={styles.cardTitle}>
            {icon}
            <span>{title}</span>
            {isRequired && <span className={styles.requiredBadge}>*</span>}
          </h4>
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        </div>
      </div>

      <div className={styles.triadGrid}>
        {/* English (Official) */}
        <div className={styles.fieldGroup}>
          <div className={styles.fieldLabelRow}>
            <span className={styles.fieldLabel}>
              English {isRequired && <span className={styles.requiredBadge}>*</span>}
            </span>
            <span className={styles.langPill}>EN</span>
          </div>
          {isTextarea ? (
            <textarea
              className={styles.textarea}
              placeholder={enPlaceholder}
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              rows={3}
            />
          ) : (
            <input
              type="text"
              className={styles.input}
              placeholder={enPlaceholder}
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
            />
          )}
          {error && <span className={styles.errorText}>{error}</span>}
        </div>

        {/* Urdu (RTL Nastaliq) */}
        <div className={styles.fieldGroup}>
          <div className={styles.fieldLabelRow}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className={styles.fieldLabel}>Urdu (اردو)</span>
              <span className={`${styles.langPill} ${styles.langPillUrdu}`}>UR</span>
            </div>
            <AiAutoFillButton
              sourceText={enValue}
              targetLanguage="ur"
              isDescription={isTextarea}
              onGenerated={onUrChange}
            />
          </div>
          {isTextarea ? (
            <textarea
              className={`${styles.textarea} ${styles.inputUrdu}`}
              placeholder={urPlaceholder}
              value={urValue}
              onChange={(e) => onUrChange(e.target.value)}
              rows={3}
              dir="rtl"
            />
          ) : (
            <input
              type="text"
              className={`${styles.input} ${styles.inputUrdu}`}
              placeholder={urPlaceholder}
              value={urValue}
              onChange={(e) => onUrChange(e.target.value)}
              dir="rtl"
            />
          )}
        </div>

        {/* Hindi (Devanagari) */}
        <div className={styles.fieldGroup}>
          <div className={styles.fieldLabelRow}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className={styles.fieldLabel}>Hindi (हिंदी)</span>
              <span className={`${styles.langPill} ${styles.langPillHindi}`}>HI</span>
            </div>
            <AiAutoFillButton
              sourceText={enValue}
              targetLanguage="hi"
              isDescription={isTextarea}
              onGenerated={onHiChange}
            />
          </div>
          {isTextarea ? (
            <textarea
              className={`${styles.textarea} ${styles.inputHindi}`}
              placeholder={hiPlaceholder}
              value={hiValue}
              onChange={(e) => onHiChange(e.target.value)}
              rows={3}
            />
          ) : (
            <input
              type="text"
              className={`${styles.input} ${styles.inputHindi}`}
              placeholder={hiPlaceholder}
              value={hiValue}
              onChange={(e) => onHiChange(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
