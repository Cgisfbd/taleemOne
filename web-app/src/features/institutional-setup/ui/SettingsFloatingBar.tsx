"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, AlertCircle } from "lucide-react";
import styles from "./settings-floating-bar.module.css";

interface SettingsFloatingBarProps {
  isVisible: boolean;
  isSaving: boolean;
  onSave: () => void;
  onDiscard: () => void;
  saveLabel?: string;
}

export function SettingsFloatingBar({
  isVisible,
  isSaving,
  onSave,
  onDiscard,
  saveLabel = "Save Changes",
}: SettingsFloatingBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isVisible || !mounted) return null;

  return createPortal(
    <div className={styles.floatingBar} role="alert" aria-live="polite">
      <div className={styles.leftInfo}>
        <span className={styles.warningDot} />
        <AlertCircle size={16} />
        <span>Unsaved changes ready to sync</span>
      </div>

      <div className={styles.actionsGroup}>
        <button
          type="button"
          className={styles.discardBtn}
          onClick={onDiscard}
          disabled={isSaving}
        >
          Discard Changes
        </button>

        <button
          type="button"
          className={styles.saveBtn}
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className={styles.spinner} />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check size={16} />
              <span>{saveLabel}</span>
            </>
          )}
        </button>
      </div>
    </div>,
    document.body
  );
}
