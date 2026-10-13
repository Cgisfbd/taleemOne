"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { Button, PinInput } from "@/shared/ui";
import { httpClient } from "@/shared/api/httpClient";
import { useAuthStore } from "../model/authStore";
import { twoFactorSchema, type TwoFactorFormValues } from "../model/twoFactorSchema";
import styles from "./form.module.css";

export function TwoFactorVerifyForm() {
  const router = useRouter();
  const authState = useAuthStore((s) => s.state);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const [serverError, setServerError] = useState<string | null>(null);

  const tempToken = authState.type === "two_factor_required" ? authState.tempToken : "";

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitted },
    handleSubmit,
  } = form;

  const otpValue = watch("otp") || "";

  const onSubmit = async (values: TwoFactorFormValues) => {
    setServerError(null);
    try {
      const response = await httpClient.post("/api/v1/auth/2fa/verify", {
        tempToken,
        otp: values.otp,
      });

      const resData = response.data?.data ?? response.data;
      if (resData?.accessToken) {
        setAuthenticated({
          accessToken: resData.accessToken,
          user: resData.user ?? {
            id: resData.userId || "",
            username: resData.username || "",
          },
        });
        router.push("/dashboard");
        return;
      }

      setServerError("Verification succeeded, but no session token was received. Please sign in.");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid 2FA code. Please check your authenticator app and try again.";
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
      className={styles.form}
      aria-label="Two-factor verification form"
    >
      {serverError && (
        <div className={styles.alertBanner} role="alert">
          <AlertCircle className={styles.alertIcon} />
          <span>{serverError}</span>
        </div>
      )}

      <div className={styles.fieldsContainer}>
        <PinInput
          label="6-Digit Authenticator Security Code"
          value={otpValue}
          onChange={(val) => {
            setValue("otp", val, { shouldValidate: isSubmitted });
            if (errors.otp) clearErrors("otp");
          }}
          error={errors.otp?.message}
          required
          autoFocus
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit(onSubmit)}
        variant="primary"
        size="lg"
        className={styles.submitBtn}
        isLoading={isSubmitting}
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        {isSubmitting ? "Verifying..." : "Verify & Continue"}
      </Button>

      <button
        type="button"
        className={styles.secondaryLinkBtn}
        onClick={() => logout()}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel & Return to Sign In</span>
      </button>
    </div>
  );
}
