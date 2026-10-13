import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/shared/config/env";

export interface ApiErrorPayload {
  statusCode: number;
  code?: string;
  message: string;
  requestId?: string;
}

export class ApiError extends Error {
  statusCode: number;
  code?: string;
  requestId?: string;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.statusCode = payload.statusCode;
    this.code = payload.code;
    this.requestId = payload.requestId;
  }
}

/**
 * Dependency inversion hooks for higher layers (e.g. features/auth-login)
 * to register token resolution and logout handlers without violating FSD layer rules.
 */
type TokenProvider = () => string | null;
type LogoutHandler = () => void;

let tokenProvider: TokenProvider | null = null;
let logoutHandler: LogoutHandler | null = null;

export function registerAuthInterceptors(provider: TokenProvider, onLogout?: LogoutHandler): void {
  tokenProvider = provider;
  if (onLogout) {
    logoutHandler = onLogout;
  }
}

/**
 * Central Platform Gateway HTTP Client
 * Supreme Law: All application network traffic passes through one central gateway.
 * Zero hardcoded backend URLs, fabricated secrets, or invented endpoints.
 */
export const httpClient: AxiosInstance = axios.create({
  baseURL: typeof window !== "undefined" ? "" : API_BASE_URL || undefined,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
  },
  timeout: 15000,
});

// Request Interceptor: Attach dynamic language and optional injected bearer token
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Dynamic language header (defaulting to en for web app)
    if (!config.headers["Accept-Language"]) {
      config.headers["Accept-Language"] = "en";
    }

    // Attach in-memory Authorization token dynamically if registered
    if (tokenProvider) {
      const token = tokenProvider();
      if (token) {
        const hasAuth =
          typeof config.headers?.get === "function"
            ? Boolean(config.headers.get("Authorization"))
            : Boolean(config.headers?.["Authorization"]);
        if (!hasAuth) {
          if (config.headers && typeof config.headers.set === "function") {
            config.headers.set("Authorization", `Bearer ${token}`);
          } else if (config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
      }
    }

    // If payload is FormData, remove Content-Type so browser/Axios sets correct multipart boundary
    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      if (config.headers && typeof config.headers.delete === "function") {
        config.headers.delete("Content-Type");
        config.headers.delete("content-type");
      } else if (config.headers) {
        delete (config.headers as Record<string, unknown>)["Content-Type"];
        delete (config.headers as Record<string, unknown>)["content-type"];
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Standard Error Formatting & 401 Interception
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorPayload>) => {
    // Standard Backend Error Normalization: { statusCode, code, message, requestId }
    const status = error.response?.status ?? 500;
    const responseData = error.response?.data;
    const rawMessage =
      responseData?.message ??
      (responseData as any)?.error ??
      (responseData as any)?.errors ??
      error.message;

    const formattedMessage = Array.isArray(rawMessage)
      ? rawMessage.join("; ")
      : typeof rawMessage === "object" && rawMessage !== null
      ? JSON.stringify(rawMessage)
      : String(rawMessage || "Unknown backend error");

    const normalizedError = new ApiError({
      statusCode: responseData?.statusCode ?? status,
      code: responseData?.code ?? error.code,
      message: formattedMessage,
      requestId: responseData?.requestId,
    });

    const reqUrl = error.config?.url || "";
    // Background probes or optional user enrichments should NOT trigger immediate global logout
    const isAuthProbe =
      reqUrl.includes("/auth/refresh") ||
      reqUrl.includes("/auth/login") ||
      reqUrl.includes("/auth/2fa") ||
      reqUrl.includes("/auth/me");

    // 401 Unauthorized handling: Redirect protected routes to login (skip for background refresh/auth probes)
    if (status === 401 && !isAuthProbe) {
      if (logoutHandler) {
        logoutHandler();
      }
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(normalizedError);
  }
);
