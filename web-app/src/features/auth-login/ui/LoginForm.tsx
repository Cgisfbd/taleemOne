"use client";

import { useState } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { Input, Button } from "@/shared/ui";
import { useLoginForm } from "../model/useLoginForm";
import { ForgotNoticeModal } from "./ForgotNoticeModal";
import styles from "./form.module.css";

export function LoginForm() {
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const {
    form,
    showPassword,
    serverError,
    isSubmitting,
    onSubmit,
    togglePasswordVisibility,
  } = useLoginForm();

  const {
    register,
    formState: { errors },
  } = form;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <>
      <div
        role="form"
        onKeyDown={handleKeyDown}
        className={styles.form}
        aria-label="Sign in form"
      >
        {serverError && (
          <div className={styles.alertBanner} role="alert">
            <AlertCircle className={styles.alertIcon} />
            <span>{serverError}</span>
          </div>
        )}

        <div className={styles.fieldsContainer}>
          <Input
            label="Username"
            placeholder="Enter institutional username"
            autoComplete="off"
            data-form-type="other"
            data-lpignore="true"
            data-1p-ignore="true"
            spellCheck={false}
            leftIcon={<User className="w-4 h-4" />}
            error={errors.username?.message}
            required
            {...register("username")}
          />

          <Input
            label="Password"
            placeholder="••••••••••••"
            type="text"
            style={{ WebkitTextSecurity: showPassword ? "none" : "disc" } as React.CSSProperties}
            autoComplete="off"
            data-form-type="other"
            data-lpignore="true"
            data-1p-ignore="true"
            spellCheck={false}
            leftIcon={<Lock className="w-4 h-4" />}
            rightSlot={
              <button
                type="button"
                className={styles.passwordToggleBtn}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
            error={errors.password?.message}
            required
            {...register("password")}
          />
        </div>

        <div className={styles.optionsRow}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              {...register("rememberMe")}
            />
            <span>Remember this device</span>
          </label>

          <button
            type="button"
            className={styles.forgotBtn}
            onClick={() => setIsForgotModalOpen(true)}
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="button"
          onClick={onSubmit}
          variant="primary"
          size="lg"
          className={styles.submitBtn}
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {isSubmitting ? "Authenticating..." : "Authenticate & Continue"}
        </Button>
      </div>

      <ForgotNoticeModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </>
  );
}
