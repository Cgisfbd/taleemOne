"use client";

import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { notify } from "@/shared/ui";
import { aiService } from "@/shared/api/aiService";
import styles from "./ai-button.module.css";

export interface AiAutoFillButtonProps {
  /** The source English/Roman text to generate from */
  sourceText: string;
  /** Target language: "ur" for Urdu (Nastaliq), "hi" for Hindi (Devanagari) */
  targetLanguage: "ur" | "hi";
  /** If true, uses the multi-line description translation endpoint */
  isDescription?: boolean;
  /** Callback fired when generation succeeds */
  onGenerated: (text: string) => void;
  /** Optional custom button label (defaults to "Auto-Fill" or "Translate") */
  label?: string;
  /** Optional disabled state */
  disabled?: boolean;
  /** Optional custom CSS class */
  className?: string;
}

export function AiAutoFillButton({
  sourceText,
  targetLanguage,
  isDescription = false,
  onGenerated,
  label,
  disabled = false,
  className = "",
}: AiAutoFillButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const langLabel = targetLanguage === "ur" ? "Urdu" : "Hindi";
  const defaultLabel = isDescription ? `Translate ${langLabel}` : `Auto-Fill ${langLabel}`;
  const displayLabel = label || defaultLabel;

  const handleGenerate = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const trimmed = sourceText?.trim();
    if (!trimmed) {
      notify.warning(
        "Source Text Required",
        `Please enter English text first before requesting ${langLabel} generation.`
      );
      return;
    }

    setIsLoading(true);
    try {
      let result = "";
      if (isDescription) {
        result =
          targetLanguage === "ur"
            ? await aiService.translateUrduDescription(trimmed)
            : await aiService.translateHindiDescription(trimmed);
      } else {
        result =
          targetLanguage === "ur"
            ? await aiService.generateUrduScript(trimmed)
            : await aiService.generateHindiScript(trimmed);
      }

      if (result) {
        onGenerated(result);
        notify.ai(
          `${langLabel} Script Generated`,
          isDescription
            ? "Authentic multilingual translation applied to paragraph."
            : `Authentic ${langLabel} script successfully generated and transcribed.`
        );
      } else {
        notify.warning(
          "Empty Result Received",
          "AI Cognitive Service processed the input but returned an empty response."
        );
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : `An unexpected issue occurred while communicating with the AI Cognitive Service.`;
      notify.error("AI Service Notification", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const themeClass = targetLanguage === "ur" ? styles.themeUrdu : styles.themeHindi;

  return (
    <button
      type="button"
      className={`${styles.aiButton} ${themeClass} ${className}`}
      onClick={handleGenerate}
      disabled={disabled || isLoading}
      title={
        isDescription
          ? `Translate description into authentic ${langLabel} using AI`
          : `Generate authentic ${langLabel} script from English text using AI`
      }
      aria-label={displayLabel}
    >
      {isLoading ? (
        <Loader2 size={12} className={styles.spinner} />
      ) : (
        <Sparkles size={12} className={styles.sparkleIcon} />
      )}
      <span>{isLoading ? "Generating..." : displayLabel}</span>
    </button>
  );
}
