"use client";

import React from "react";
import { toast as sonnerToast } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Sparkles,
  X,
} from "lucide-react";
import styles from "./premium-toaster.module.css";

export type ToastVariant = "success" | "error" | "warning" | "info" | "ai";

interface EnterpriseToastProps {
  id: string | number;
  type: ToastVariant;
  title: string;
  description?: string;
}

export function EnterpriseToastCard({
  id,
  type,
  title,
  description,
}: EnterpriseToastProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={18} strokeWidth={2.4} />;
      case "error":
        return <AlertCircle size={18} strokeWidth={2.4} />;
      case "warning":
        return <AlertTriangle size={18} strokeWidth={2.4} />;
      case "ai":
        return <Sparkles size={18} strokeWidth={2.4} />;
      case "info":
      default:
        return <Info size={18} strokeWidth={2.4} />;
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case "success":
        return styles.typeSuccess;
      case "error":
        return styles.typeError;
      case "warning":
        return styles.typeWarning;
      case "ai":
        return styles.typeAi;
      case "info":
      default:
        return styles.typeInfo;
    }
  };

  return (
    <div
      className={`${styles.toastCard} ${getTypeClass()}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.iconBox} aria-hidden="true">
        {getIcon()}
      </div>

      <div className={styles.contentBox}>
        <h5 className={styles.toastTitle}>{title}</h5>
        {description && (
          <p className={styles.toastDescription}>{description}</p>
        )}
      </div>

      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => sonnerToast.dismiss(id)}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

function resolveToastArgs(
  defaultTitle: string,
  arg1: string,
  arg2?: string
): { title: string; description?: string } {
  if (arg2 !== undefined && arg2.trim() !== "") {
    return { title: arg1, description: arg2 };
  }
  return { title: defaultTitle, description: arg1 };
}

/**
 * Enterprise Notification Authority
 * Dispatches theme-bound, rich multi-line notifications globally across TaleemOne.
 */
export const notify = {
  success(titleOrMessage: string, description?: string, options?: { duration?: number }) {
    const { title, description: desc } = resolveToastArgs("Changes Saved", titleOrMessage, description);
    return sonnerToast.custom(
      (id) => (
        <EnterpriseToastCard
          id={id}
          type="success"
          title={title}
          description={desc}
        />
      ),
      { duration: options?.duration ?? 4500 }
    );
  },

  error(titleOrMessage: string, description?: string, options?: { duration?: number }) {
    const { title, description: desc } = resolveToastArgs("Action Failed", titleOrMessage, description);
    return sonnerToast.custom(
      (id) => (
        <EnterpriseToastCard
          id={id}
          type="error"
          title={title}
          description={desc}
        />
      ),
      { duration: options?.duration ?? 6500 }
    );
  },

  warning(titleOrMessage: string, description?: string, options?: { duration?: number }) {
    const { title, description: desc } = resolveToastArgs("Attention Required", titleOrMessage, description);
    return sonnerToast.custom(
      (id) => (
        <EnterpriseToastCard
          id={id}
          type="warning"
          title={title}
          description={desc}
        />
      ),
      { duration: options?.duration ?? 5000 }
    );
  },

  info(titleOrMessage: string, description?: string, options?: { duration?: number }) {
    const { title, description: desc } = resolveToastArgs("System Notice", titleOrMessage, description);
    return sonnerToast.custom(
      (id) => (
        <EnterpriseToastCard
          id={id}
          type="info"
          title={title}
          description={desc}
        />
      ),
      { duration: options?.duration ?? 4500 }
    );
  },

  ai(titleOrMessage: string, description?: string, options?: { duration?: number }) {
    const { title, description: desc } = resolveToastArgs("AI Assistant", titleOrMessage, description);
    return sonnerToast.custom(
      (id) => (
        <EnterpriseToastCard
          id={id}
          type="ai"
          title={title}
          description={desc}
        />
      ),
      { duration: options?.duration ?? 5500 }
    );
  },

  dismiss(id?: string | number) {
    sonnerToast.dismiss(id);
  },
};

/**
 * Universal drop-in alias for notify
 */
export const toast = notify;
