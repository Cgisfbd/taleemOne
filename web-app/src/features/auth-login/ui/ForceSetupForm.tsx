"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import QRCode from "qrcode";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  Check,
  Copy,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  QrCode,
} from "lucide-react";
import { Input, Button, PinInput } from "@/shared/ui";
import { httpClient } from "@/shared/api/httpClient";
import { useAuthStore } from "../model/authStore";
import {
  securitySetupSchema,
  type SecuritySetupFormValues,
} from "../model/securitySetupSchema";
import styles from "./form.module.css";

export function ForceSetupForm() {
  const router = useRouter();
  const authState = useAuthStore((s) => s.state);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const tempToken = authState.type === "force_password_change" ? authState.tempToken : "";
  const twoFactorSecret =
    authState.type === "force_password_change" ? authState.twoFactorSecret : "";
  const totpUri = authState.type === "force_password_change" ? authState.totpUri : "";

  useEffect(() => {
    if (totpUri) {
      QRCode.toDataURL(totpUri, {
        width: 320,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => {
          console.error("[ForceSetupForm] QR generation error:", err);
        });
    }
  }, [totpUri]);

  const form = useForm<SecuritySetupFormValues>({
    resolver: zodResolver(securitySetupSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      pin: "",
      totpOtp: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitted },
    handleSubmit,
  } = form;

  const pinValue = watch("pin") || "";
  const totpValue = watch("totpOtp") || "";

  const handleCopySecret = async () => {
    if (!twoFactorSecret) return;
    try {
      await navigator.clipboard.writeText(twoFactorSecret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const onSubmit = async (values: SecuritySetupFormValues) => {
    setServerError(null);
    try {
      const response = await httpClient.post("/api/v1/auth/setup-security", {
        tempToken,
        newPassword: values.newPassword,
        pin: values.pin,
        totpOtp: values.totpOtp,
      });

      const resData = response.data?.data ?? response.data;
      if (resData?.accessToken) {
        setAuthenticated({
          accessToken: resData.accessToken,
          user: resData.user ?? {
            id: resData.userId || "user",
            username: "user",
          },
        });
        router.push("/dashboard");
        return;
      }

      setServerError("Setup completed, but session token was not returned. Please sign in.");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Security setup failed. Please check your credentials and OTP.";
      setServerError(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div
      role="form"
      onKeyDown={handleKeyDown}
      className={styles.setupForm}
      aria-label="Security setup form"
    >
      {serverError && (
        <div className={styles.alertBanner} role="alert">
          <AlertCircle className={styles.alertIcon} />
          <span>{serverError}</span>
        </div>
      )}

      {/* Sleek Compact Horizontal 2FA Card */}
      <div className={styles.qrCardCompact}>
        <div className={styles.qrBoxCompact}>
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Authenticator QR Code"
              className={styles.qrImageCompact}
            />
          ) : (
            <div
              className={styles.qrImageCompact}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <ShieldCheck className="w-8 h-8 text-[#d97706] animate-pulse" />
            </div>
          )}
        </div>

        <div className={styles.qrInfoCompact}>
          <div className={styles.qrTitleRow}>
            <span className={styles.qrTitleCompact}>
              <QrCode className="w-3.5 h-3.5 text-[#d97706]" />
              Link Authenticator
            </span>
          </div>

          <p className={styles.qrHintCompact}>
            Scan with Google Authenticator or enter key manually:
          </p>

          <div className={styles.singleLineSecretRow}>
            <code className={styles.secretCodeOneLine} title={twoFactorSecret}>
              {twoFactorSecret || "..."}
            </code>
            <button
              type="button"
              className={styles.copyBtnOneLine}
              onClick={handleCopySecret}
              aria-label="Copy key"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Compact 2x2 Grid for Fields */}
      <div className={styles.gridTwoColCompact}>
        <Input
          label="New Password"
          placeholder="Min 8 chars"
          type="text"
          style={{ WebkitTextSecurity: showNewPassword ? "none" : "disc" } as React.CSSProperties}
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
              onClick={() => setShowNewPassword((p) => !p)}
              tabIndex={-1}
            >
              {showNewPassword ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </button>
          }
          error={errors.newPassword?.message}
          required
          {...register("newPassword")}
        />

        <Input
          label="Confirm Password"
          placeholder="Re-enter password"
          type="text"
          style={{ WebkitTextSecurity: showConfirmPassword ? "none" : "disc" } as React.CSSProperties}
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
              onClick={() => setShowConfirmPassword((p) => !p)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </button>
          }
          error={errors.confirmPassword?.message}
          required
          {...register("confirmPassword")}
        />
      </div>

      <PinInput
        label="6-Digit Security PIN"
        mask={true}
        value={pinValue}
        onChange={(val) => {
          setValue("pin", val, { shouldValidate: isSubmitted });
          if (errors.pin) clearErrors("pin");
        }}
        error={errors.pin?.message}
        required
      />

      <PinInput
        label="6-Digit Authenticator Code"
        mask={false}
        value={totpValue}
        onChange={(val) => {
          setValue("totpOtp", val, { shouldValidate: isSubmitted });
          if (errors.totpOtp) clearErrors("totpOtp");
        }}
        error={errors.totpOtp?.message}
        required
      />

      <div className={styles.actionsCompact}>
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          size="md"
          className={styles.submitBtn}
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {isSubmitting ? "Finalizing Setup..." : "Complete Setup & Sign In"}
        </Button>

        <button
          type="button"
          className={styles.secondaryLinkBtn}
          onClick={() => logout()}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & Return to Sign In</span>
        </button>
      </div>
    </div>
  );
}
