import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightSlot,
      id,
      required,
      className = "",
      containerClassName = "",
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={`${styles.wrapper} ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputContainer}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            id={inputId}
            ref={ref}
            required={required}
            className={`
              ${styles.input}
              ${leftIcon ? styles.hasLeftIcon : ""}
              ${rightSlot ? styles.hasRightIcon : ""}
              ${error ? styles.inputError : ""}
              ${className}
            `}
            {...props}
          />
          {rightSlot && <span className={styles.rightSlot}>{rightSlot}</span>}
        </div>
        {error && (
          <p className={styles.errorText} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
