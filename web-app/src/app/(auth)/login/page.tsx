import type { Metadata } from "next";
import { LoginView } from "@/features/auth-login";
import { BRAND } from "@/shared/config/brand";

export const metadata: Metadata = {
  title: `Staff Sign In | ${BRAND.fullName}`,
  description: `Sign in to access your administrative workspace on ${BRAND.fullName}. ${BRAND.attribution}.`,
};

export default function LoginPage() {
  return <LoginView />;
}
