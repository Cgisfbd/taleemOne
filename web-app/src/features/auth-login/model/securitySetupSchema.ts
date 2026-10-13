import { z } from "zod";

export const securitySetupSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
    pin: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Security PIN must be exactly 6 numeric digits"),
    totpOtp: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Authenticator code must be exactly 6 numeric digits"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SecuritySetupFormValues = z.infer<typeof securitySetupSchema>;
