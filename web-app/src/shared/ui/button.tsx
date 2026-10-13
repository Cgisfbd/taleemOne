import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  pill = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "glass"
      ? styles.variantGlass
      : variant === "outline"
      ? styles.variantOutline
      : styles.variantPrimary;

  const sizeClass =
    size === "sm" ? styles.sizeSm : size === "lg" ? styles.sizeLg : styles.sizeMd;

  const radiusClass = pill ? styles.pillRadius : styles.standardRadius;

  return (
    <button
      className={`${styles.base} ${variantClass} ${sizeClass} ${radiusClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
