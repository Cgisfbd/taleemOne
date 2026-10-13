"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { httpClient } from "@/shared/api/httpClient";
import { useAuthStore } from "./authStore";
import { loginSchema, type LoginFormValues } from "./loginSchema";

export function useLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const setForcePasswordChange = useAuthStore((s) => s.setForcePasswordChange);
  const setTwoFactorRequired = useAuthStore((s) => s.setTwoFactorRequired);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      const response = await httpClient.post("/api/v1/auth/login", {
        username: values.username,
        password: values.password,
        rememberMe: Boolean(values.rememberMe),
      });

      const resData = response.data?.data ?? response.data;

      // Case 1: Force Password Change + Security Setup
      if (resData?.requiresPasswordChange) {
        setForcePasswordChange({
          tempToken: resData.tempToken,
          twoFactorSecret: resData.twoFactorSecret,
          totpUri: resData.totpUri,
        });
        return;
      }

      // Case 2: 2FA Verification Required
      if (resData?.requires2FA) {
        setTwoFactorRequired({
          tempToken: resData.tempToken,
        });
        return;
      }

      // Case 3: Direct Authenticated
      if (resData?.accessToken) {
        setAuthenticated({
          accessToken: resData.accessToken,
          user: resData.user ?? {
            id: resData.userId || "",
            username: values.username,
          },
        });
        router.push("/dashboard");
        return;
      }

      // Fallback if unexpected format
      setServerError("Unexpected authentication response received from gateway.");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Authentication failed. Please verify your credentials.";
      setServerError(message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    form,
    showPassword,
    serverError,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
    togglePasswordVisibility,
  };
}
