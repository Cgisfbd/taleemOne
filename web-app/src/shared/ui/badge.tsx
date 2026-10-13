import type { HTMLAttributes, ReactNode } from "react";
import styles from "./badge.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "neutral" | "success" | "warning" | "error" | "amber";
  icon?: ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  icon,
  className = "",
  ...props
}: BadgeProps) {
  const variantClass =
    variant === "success"
      ? styles.success
      : variant === "warning"
      ? styles.warning
      : variant === "error"
      ? styles.error
      : variant === "amber"
      ? styles.amber
      : styles.neutral;

  return (
    <span className={`${styles.badge} ${variantClass} ${className}`} {...props}>
      {icon}
      <span>{children}</span>
    </span>
  );
}
