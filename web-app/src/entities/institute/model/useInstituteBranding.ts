"use client";

import { create } from "zustand";
import { httpClient } from "@/shared/api/httpClient";
import type { PublicInstituteBranding, BrandingMeta, BrandingResponseEnvelope } from "./types";

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes short in-memory cache

interface InstituteBrandingState {
  branding: PublicInstituteBranding | null;
  meta: BrandingMeta | null;
  isLoading: boolean;
  isError: boolean;
  lastFetchedAt: number | null;
  fetchBranding: (force?: boolean) => Promise<void>;
}

let inFlightPromise: Promise<void> | null = null;

export const useInstituteBrandingStore = create<InstituteBrandingState>((set, get) => ({
  branding: null,
  meta: null,
  isLoading: true,
  isError: false,
  lastFetchedAt: null,

  fetchBranding: async (force = false) => {
    const { branding, lastFetchedAt } = get();
    const now = Date.now();

    // In-memory cache valid for 10 minutes (Zero localStorage)
    if (!force && branding && lastFetchedAt && now - lastFetchedAt < CACHE_TTL_MS) {
      set({ isLoading: false });
      return;
    }

    // Deduplicate concurrent in-flight requests
    if (inFlightPromise) {
      return inFlightPromise;
    }

    set({ isLoading: true, isError: false });

    inFlightPromise = (async () => {
      try {
        const response = await httpClient.get<BrandingResponseEnvelope | PublicInstituteBranding>(
          "/api/v1/institute-profile/public",
          {
            headers: {
              "Accept-Language": "en",
            },
            withCredentials: false, // Public endpoint: does not require session credentials
          }
        );

        const rawData = response.data;

        // Support both standard envelope { data: { ... }, meta: { ... } } and direct object
        const brandingData =
          rawData && typeof rawData === "object" && "data" in rawData && rawData.data
            ? (rawData as BrandingResponseEnvelope).data
            : (rawData as PublicInstituteBranding);

        const metaData =
          rawData && typeof rawData === "object" && "meta" in rawData
            ? (rawData as BrandingResponseEnvelope).meta ?? null
            : null;

        set({
          branding: brandingData ?? null,
          meta: metaData,
          isLoading: false,
          isError: false,
          lastFetchedAt: Date.now(),
        });
      } catch (err) {
        // Supreme Law: No fallback or fabricated business data.
        // A failed request remains an explicit unavailable state.
        console.error("[TaleemOne Branding] Error fetching public institute profile:", err);
        set({
          branding: null,
          meta: null,
          isLoading: false,
          isError: true,
          lastFetchedAt: null,
        });
      } finally {
        inFlightPromise = null;
      }
    })();

    return inFlightPromise;
  },
}));

/**
 * Hook to access dynamic institute branding.
 * Supreme Law: Returns authoritative backend data or null.
 * Never invents fallback or mock institutional content.
 */
export function useInstituteBranding() {
  const branding = useInstituteBrandingStore((s) => s.branding);
  const meta = useInstituteBrandingStore((s) => s.meta);
  const isLoading = useInstituteBrandingStore((s) => s.isLoading);
  const isError = useInstituteBrandingStore((s) => s.isError);
  const fetchBranding = useInstituteBrandingStore((s) => s.fetchBranding);

  // Authoritative values from backend only (no fake fallback strings)
  const instituteName =
    (typeof branding?.name === "object" && branding?.name !== null
      ? branding.name.en ?? branding.name.ur ?? branding.name.hi
      : typeof branding?.name === "string"
      ? (branding.name as string)
      : null) ?? null;

  const instituteTagline =
    (typeof branding?.tagline === "object" && branding?.tagline !== null
      ? branding.tagline.en ?? branding.tagline.ur ?? branding.tagline.hi
      : typeof branding?.tagline === "string"
      ? (branding.tagline as string)
      : null) ?? null;

  const quote =
    (typeof branding?.quotes === "object" && branding?.quotes !== null
      ? branding.quotes.en ?? branding.quotes.main ?? branding.quotes.translation
      : typeof branding?.quotes === "string"
      ? (branding.quotes as string)
      : null) ?? null;

  const logoUrl = branding?.logoUrl ?? null;
  const poweredBy = meta?.poweredBy ?? null;

  return {
    branding,
    meta,
    instituteName,
    instituteTagline,
    quote,
    logoUrl,
    poweredBy,
    isLoading,
    isError,
    fetchBranding,
  };
}
