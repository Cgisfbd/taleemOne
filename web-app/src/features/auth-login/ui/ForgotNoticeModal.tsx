"use client";

import { GlassCard, Button } from "@/shared/ui";
import { ShieldAlert, X } from "lucide-react";
import styles from "./form.module.css";

interface ForgotNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotNoticeModal({ isOpen, onClose }: ForgotNoticeModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalBackdrop} onClick={onClose} />
      <GlassCard className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalIconWrap}>
            <ShieldAlert className={styles.modalIcon} />
          </div>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className={styles.modalTitle}>Password Recovery Assistance</h3>
        <p className={styles.modalDescription}>
          <strong>taleemOne ERP</strong> operates in a dedicated institutional environment.
          For enterprise security and data privacy, user passwords cannot be reset via public email.
        </p>

        <div className={styles.modalAdviceBox}>
          <p>
            Please contact your <strong>Super Administrator</strong> or <strong>Institute Principal</strong> to verify your identity and have your access credentials securely updated.
          </p>
        </div>

        <div className={styles.modalActions}>
          <Button variant="primary" size="md" onClick={onClose}>
            Understood
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
