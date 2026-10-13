import { z } from "zod";

export const twoFactorSchema = z
  .object({
    otp: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Security OTP must be exactly 6 numeric digits"),
  })
  .strip();

export type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;
