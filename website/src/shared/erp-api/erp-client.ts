import { ApiResponse } from "../types/common.types";

const BASE_URL = process.env.NEXT_PUBLIC_ERP_API_URL || "http://localhost:3001";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ErpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(`${this.baseUrl}${cleanPath}`);

    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val));
        }
      });
    }

    return url.toString();
  }

  public async get<T>(path: string, options?: FetchOptions): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(path, options?.params);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options?.headers,
        },
        ...options,
      });

      if (!res.ok) {
        return {
          success: false,
          error: `HTTP Error: ${res.status} ${res.statusText}`,
          statusCode: res.status,
        };
      }

      const data = await res.json();
      return {
        success: true,
        data,
        statusCode: res.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.message || "Network request failed",
      };
    }
  }

  public async post<T>(path: string, body: any, options?: FetchOptions): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(path, options?.params);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!res.ok) {
        return {
          success: false,
          error: `HTTP Error: ${res.status} ${res.statusText}`,
          statusCode: res.status,
        };
      }

      const data = await res.json();
      return {
        success: true,
        data,
        statusCode: res.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.message || "Network request failed",
      };
    }
  }
}

export const erpClient = new ErpClient(BASE_URL);
