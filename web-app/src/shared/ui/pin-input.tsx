"use client";

import {
  useRef,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
} from "react";
import styles from "./pin-input.module.css";

export interface PinInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  mask?: boolean;
  required?: boolean;
  compact?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function PinInput({
  length = 6,
  value = "",
  onChange,
  label,
  error,
  mask = false,
  required = false,
  compact = false,
  disabled = false,
  autoFocus = false,
  className = "",
}: PinInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Array of single characters for the boxes
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const rawVal = e.target.value.replace(/\D/g, ""); // digits only
    if (!rawVal) {
      // Clear this index
      const newDigits = [...digits];
      newDigits[index] = "";
      onChange(newDigits.join(""));
      return;
    }

    // Take the last entered character if multiple characters were typed
    const char = rawVal[rawVal.length - 1];
    const newDigits = [...digits];
    newDigits[index] = char;
    const newVal = newDigits.join("");
    onChange(newVal);

    // Auto-advance to next input box
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Current is already empty, move to previous and clear it
        e.preventDefault();
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    onChange(pasted);

    // Focus the box corresponding to the pasted length or the last box
    const nextFocusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  return (
    <div
      className={`${styles.container} ${compact ? styles.compact : ""} ${className}`}
    >
      {label && (
        <div className={styles.labelRow}>
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        </div>
      )}

      <div className={styles.boxesRow}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            autoFocus={autoFocus && i === 0}
            disabled={disabled}
            autoComplete="off"
            data-form-type="other"
            data-lpignore="true"
            data-1p-ignore="true"
            className={`
              ${styles.box}
              ${digit ? styles.hasValue : ""}
              ${mask ? styles.maskedBox : ""}
              ${error ? styles.boxError : ""}
            `}
            onChange={(e) => handleInputChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            aria-label={`${label || "Security code"} digit ${i + 1}`}
          />
        ))}
      </div>

      {error && (
        <p className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
