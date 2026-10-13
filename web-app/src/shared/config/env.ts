/**
 * Central Environment Configuration Boundary
 * Supreme Law: Environment is the single source for external connections.
 * No hardcoded fallback business data, guessing, or default backend URLs.
 */

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

// Normalize base URL: strip trailing slashes and /api/v1 so endpoints starting with /api/v1 never duplicate
export const API_BASE_URL = rawBaseUrl
  ? rawBaseUrl.replace(/\/+$/, "").replace(/\/api\/v1\/?$/, "")
  : "";

const rawAiApiUrl = process.env.NEXT_PUBLIC_AI_API_URL?.trim();
export const AI_API_URL = rawAiApiUrl ? rawAiApiUrl.replace(/\/+$/, "") : "";

export const AI_SECRET_KEY = process.env.NEXT_PUBLIC_AI_SECRET_KEY?.trim() || "";

/**
 * Resolves media/asset paths against the validated backend origin.
 * Never guesses an origin or falls back to an implicit relative path if configuration is missing.
 */
export function resolveAssetUrl(value?: string | null): string | null {
  if (!value) return null;
  // Direct pass-through for absolute HTTP(S), Base64 Data URLs, or local Blob URLs
  if (/^(?:https?:\/\/|data:|blob:)/i.test(value)) return value;

  // Extract base origin (stripping /api/v1 if included in base URL), normalizing localhost to 127.0.0.1
  const origin = API_BASE_URL.replace(/\/api\/v1\/?$/, "").replace("localhost", "127.0.0.1");
  if (!origin) {
    // Missing configuration remains an explicit unavailable state
    return null;
  }

  const cleanPath = value.startsWith("/") ? value : `/${value}`;
  return `${origin}${cleanPath}`;
}
