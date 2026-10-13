"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { httpClient } from "@/shared/api/httpClient";
import { useAuthStore, useCurrentUser, useAccessToken } from "./authStore";

/**
 * Enterprise Session & Identity Restoration Hook
 * 1. Restores session via POST /api/v1/auth/refresh (using HttpOnly refresh_token cookie).
 * 2. Fetches authoritative profile via GET /api/v1/auth/me (fullName, role).
 * 3. Keeps in-memory auth store synchronized without localStorage persistence.
 */
export function useSession() {
  const router = useRouter();
  const pathname = usePathname();
  const authState = useAuthStore((s) => s.state);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const updateUser = useAuthStore((s) => s.updateUser);
  const logout = useAuthStore((s) => s.logout);
  const user = useCurrentUser();
  const accessToken = useAccessToken();

  const [isLoading, setIsLoading] = useState(true);
  const isRefreshingRef = useRef(false);

  const fetchProfile = useCallback(
    async (token?: string) => {
      try {
        const currentState = useAuthStore.getState().state;
        const inMemoryToken =
          currentState.type === "authenticated" ? currentState.accessToken : null;
        const tokenToUse = token || inMemoryToken;
        const headers = tokenToUse ? { Authorization: `Bearer ${tokenToUse}` } : undefined;
        const res = await httpClient.get("/api/v1/auth/me", { headers });
        const userData = res.data?.data?.user ?? res.data?.user ?? res.data?.data;
        if (userData && typeof userData === "object") {
          updateUser(userData);
          return userData;
        }
      } catch (err) {
        console.warn("[Session] Could not fetch profile from /api/v1/auth/me:", err);
      }
      return null;
    },
    [updateUser]
  );

  const refreshAndRestore = useCallback(async () => {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;
    setIsLoading(true);

    try {
      // 1. Call POST /api/v1/auth/refresh (browser automatically attaches refresh_token cookie)
      const res = await httpClient.post("/api/v1/auth/refresh", {});
      const resData = res.data?.data ?? res.data;
      const newAccessToken =
        resData?.accessToken ||
        resData?.token ||
        resData?.access_token ||
        res.data?.accessToken ||
        res.data?.token ||
        res.data?.access_token;

      if (newAccessToken) {
        // Immediately establish authenticated state so tokenProvider is immediately registered
        setAuthenticated({
          accessToken: newAccessToken,
          user: {
            id: resData?.userId || resData?.user?.id || "",
            username: resData?.username || resData?.user?.username || "",
            fullName: resData?.user?.fullName || resData?.fullName || "",
            role: resData?.user?.role || resData?.role || "",
          },
        });

        // Enrich user profile via /api/v1/auth/me without blocking active session
        try {
          const profile = await fetchProfile(newAccessToken);
          if (profile) {
            updateUser(profile);
          }
        } catch {
          // Keep existing session identity if extended profile is temporarily unavailable
        }
      } else {
        // Unauthenticated
        logout();
        if (pathname?.startsWith("/dashboard")) {
          router.push("/login");
        }
      }
    } catch {
      // Refresh failed (e.g. no valid cookie or session expired)
      logout();
      if (pathname?.startsWith("/dashboard")) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
      isRefreshingRef.current = false;
    }
  }, [fetchProfile, logout, pathname, router, setAuthenticated]);

  useEffect(() => {
    // If logged out on a protected route or initial load, attempt session restoration
    if (authState.type === "logged_out") {
      refreshAndRestore();
    } else if (authState.type === "authenticated") {
      // If authenticated but missing fullName or role, load profile from /api/v1/auth/me
      if (!user?.fullName || !user?.role) {
        fetchProfile(accessToken || undefined);
      }
      setIsLoading(false);
    }
  }, [authState.type, accessToken, user?.fullName, user?.role, fetchProfile, refreshAndRestore]);

  return {
    isLoading,
    user,
    accessToken,
    refetchProfile: fetchProfile,
    restoreSession: refreshAndRestore,
  };
}
