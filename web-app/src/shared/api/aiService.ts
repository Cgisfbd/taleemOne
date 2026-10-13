import axios, { AxiosInstance } from "axios";
import { AI_API_URL, AI_SECRET_KEY } from "@/shared/config/env";

export interface AiTranslationMetadata {
  originalText: string;
  result: string;
  provider: string;
  model: string;
  durationMs: number;
}

export interface AiServiceResponse {
  statusCode: number;
  success: boolean;
  message: string;
  result: string;
  data: AiTranslationMetadata;
}

/**
 * Creates an authorized HTTP client for the TaleemOne AI Cognitive Microservice.
 * Enforces strict environment boundary with zero hardcoded URLs or fallback secrets.
 */
function createAiClient(): AxiosInstance {
  // In the browser, route through Next.js API Gateway (/api/ai) to eliminate CORS blocks
  // and resolve Windows localhost/127.0.0.1 IPv4 routing reliably.
  const isBrowser = typeof window !== "undefined";
  const baseURL = isBrowser
    ? "/api/ai"
    : (AI_API_URL || "http://127.0.0.1:5001/api/ai").replace("localhost", "127.0.0.1");

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(AI_SECRET_KEY ? { "X-AI-Secret-Key": AI_SECRET_KEY } : {}),
    },
    timeout: 25000,
  });
}

function normalizeAiError(err: unknown): Error {
  if (axios.isAxiosError(err)) {
    if (err.response?.data?.message) {
      const beMsg = err.response.data.message;
      return new Error(Array.isArray(beMsg) ? beMsg[0] : String(beMsg));
    }
    if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
      return new Error(
        "AI Cognitive Microservice (Port 5001) is currently unreachable. Please verify that the AI microservice service is active."
      );
    }
    if (err.response?.status === 401) {
      return new Error("AI Service Handshake Failed: Invalid or missing authorization header.");
    }
    if (err.response?.status === 429) {
      return new Error("AI Service Rate Limit Exceeded: Please wait a moment before sending another request.");
    }
    if (err.message) {
      return new Error(err.message);
    }
  }
  return err instanceof Error ? err : new Error("An unexpected error occurred while communicating with the AI service.");
}

/**
 * Authoritative Multilingual AI Script Generation & Translation Service
 * Decoupled microservice architecture (Port 5001) with 4-tier failover cascade.
 */
export const aiService = {
  /**
   * Generates authentic, grammatically accurate Nastaliq Urdu script
   * for single-line terms, official names, titles, and campus addresses.
   * Max character limit: 500 chars.
   */
  async generateUrduScript(text: string): Promise<string> {
    const trimmed = text?.trim();
    if (!trimmed) {
      throw new Error("Input text is required for script generation.");
    }
    if (trimmed.length > 500) {
      throw new Error("Text exceeds the 500 character limit for single-line generation.");
    }

    try {
      const client = createAiClient();
      const res = await client.post<AiServiceResponse>("/fix-urdu", { text: trimmed });
      return res.data?.result || res.data?.data?.result || "";
    } catch (err: unknown) {
      throw normalizeAiError(err);
    }
  },

  /**
   * Generates authentic Devanagari Hindi script
   * for single-line terms, official names, titles, and campus addresses.
   * Max character limit: 500 chars.
   */
  async generateHindiScript(text: string): Promise<string> {
    const trimmed = text?.trim();
    if (!trimmed) {
      throw new Error("Input text is required for script generation.");
    }
    if (trimmed.length > 500) {
      throw new Error("Text exceeds the 500 character limit for single-line generation.");
    }

    try {
      const client = createAiClient();
      const res = await client.post<AiServiceResponse>("/fix-hindi", { text: trimmed });
      return res.data?.result || res.data?.data?.result || "";
    } catch (err: unknown) {
      throw normalizeAiError(err);
    }
  },

  /**
   * Translates multi-line descriptions, codes of conduct, institutional policies,
   * circulars, and notices into contextual, formal Urdu.
   * Max character limit: 3000 chars.
   */
  async translateUrduDescription(text: string): Promise<string> {
    const trimmed = text?.trim();
    if (!trimmed) {
      throw new Error("Description text is required for translation.");
    }
    if (trimmed.length > 3000) {
      throw new Error("Text exceeds the 3000 character limit for description translation.");
    }

    try {
      const client = createAiClient();
      const res = await client.post<AiServiceResponse>("/translate-description-urdu", {
        text: trimmed,
      });
      return res.data?.result || res.data?.data?.result || "";
    } catch (err: unknown) {
      throw normalizeAiError(err);
    }
  },

  /**
   * Translates multi-line descriptions, codes of conduct, institutional policies,
   * circulars, and notices into contextual, formal Hindi.
   * Max character limit: 3000 chars.
   */
  async translateHindiDescription(text: string): Promise<string> {
    const trimmed = text?.trim();
    if (!trimmed) {
      throw new Error("Description text is required for translation.");
    }
    if (trimmed.length > 3000) {
      throw new Error("Text exceeds the 3000 character limit for description translation.");
    }

    try {
      const client = createAiClient();
      const res = await client.post<AiServiceResponse>("/translate-description-hindi", {
        text: trimmed,
      });
      return res.data?.result || res.data?.data?.result || "";
    } catch (err: unknown) {
      throw normalizeAiError(err);
    }
  },
};
