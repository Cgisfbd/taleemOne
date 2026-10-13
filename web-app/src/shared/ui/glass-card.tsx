import type { HTMLAttributes, ReactNode } from "react";
import styles from "./glass-card.module.css";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "elevated" | "flat";
  className?: string;
}

export function GlassCard({
  children,
  variant = "elevated",
  className = "",
  ...props
}: GlassCardProps) {
  const variantClass = variant === "flat" ? styles.cardFlat : "";

  return (
    <div
      className={`${styles.card} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
