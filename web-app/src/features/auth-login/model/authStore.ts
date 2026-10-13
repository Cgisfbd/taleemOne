"use client";

import { create } from "zustand";
import { registerAuthInterceptors } from "@/shared/api/httpClient";

export interface User {
  id: string;
  username: string;
  email?: string;
  role?: string;
  permissions?: string[];
  [key: string]: unknown;
}

/**
 * Strict Finite State Machine for Authentication Flow
 * Supreme Law:
 * 1. Zero localStorage or persistent storage for tokens (in-memory only).
 * 2. As long as state is force_password_change or two_factor_required,
 *    no access to protected routes or /auth/me is permitted.
 */
export type AuthState =
  | { type: "logged_out" }
  | {
      type: "force_password_change";
      tempToken: string;
      twoFactorSecret: string;
      totpUri: string;
    }
  | {
      type: "two_factor_required";
      tempToken: string;
    }
  | {
      type: "authenticated";
      accessToken: string;
      user: User;
    };

interface AuthStore {
  state: AuthState;

  // Actions
  setForcePasswordChange: (payload: {
    tempToken: string;
    twoFactorSecret: string;
    totpUri: string;
  }) => void;

  setTwoFactorRequired: (payload: {
    tempToken: string;
  }) => void;

  setAuthenticated: (payload: {
    accessToken: string;
    user: User;
  }) => void;

  updateUser: (userData: Partial<User>) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  state: { type: "logged_out" },

  setForcePasswordChange: ({ tempToken, twoFactorSecret, totpUri }) =>
    set({
      state: {
        type: "force_password_change",
        tempToken,
        twoFactorSecret,
        totpUri,
      },
    }),

  setTwoFactorRequired: ({ tempToken }) =>
    set({
      state: {
        type: "two_factor_required",
        tempToken,
      },
    }),

  setAuthenticated: ({ accessToken, user }) =>
    set({
      state: {
        type: "authenticated",
        accessToken,
        user,
      },
    }),

  updateUser: (userData) =>
    set((prev) => {
      if (prev.state.type === "authenticated") {
        return {
          state: {
            ...prev.state,
            user: { ...prev.state.user, ...userData },
          },
        };
      }
      return prev;
    }),

  logout: () =>
    set({
      state: { type: "logged_out" },
    }),
}));

/** Helper selectors */
export const useAuthState = () => useAuthStore((s) => s.state);
export const useAccessToken = () =>
  useAuthStore((s) => (s.state.type === "authenticated" ? s.state.accessToken : null));
export const useCurrentUser = () =>
  useAuthStore((s) => (s.state.type === "authenticated" ? s.state.user : null));

// Dependency Inversion: Register token provider from features layer into shared httpClient
if (typeof window !== "undefined") {
  registerAuthInterceptors(
    () => {
      const s = useAuthStore.getState().state;
      return s.type === "authenticated" ? s.accessToken : null;
    },
    () => {
      useAuthStore.getState().logout();
    }
  );
}
