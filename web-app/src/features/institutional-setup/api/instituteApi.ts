import { httpClient } from "@/shared/api/httpClient";
import type {
  InstituteProfileData,
  InstitutePoliciesDocumentsData,
  ApiResponseEnvelope,
} from "../model/types";

export const instituteApi = {
  /**
   * 1. Get Administrative Profile (Authenticated)
   */
  async getProfile(): Promise<InstituteProfileData> {
    const response = await httpClient.get<ApiResponseEnvelope<InstituteProfileData> | InstituteProfileData>(
      "/api/v1/institute-profile"
    );
    const data = response.data;
    if (data && typeof data === "object" && "data" in data) {
      return (data as ApiResponseEnvelope<InstituteProfileData>).data;
    }
    return data as InstituteProfileData;
  },

  /**
   * 2. Save / Update Profile (Authenticated)
   */
  async updateProfile(payload: Partial<InstituteProfileData>): Promise<InstituteProfileData> {
    const clean: Record<string, any> = { ...payload };

    // 1. Strip internal database metadata that triggers NestJS 400 Whitelist errors
    delete clean.id;
    delete clean.createdAt;
    delete clean.updatedAt;

    // 2. Strip read-only immutable system standards (received from backend configuration)
    delete clean.currencyCode;
    delete clean.currencySymbol;
    delete clean.timezone;
    delete clean.dateFormat;

    // 3. Normalize multilingual structures for maximum schema compatibility
    if (typeof clean.name === "string") {
      clean.name = { en: clean.name, ur: "", hi: "" };
    }
    if (typeof clean.tagline === "string") {
      clean.tagline = { en: clean.tagline, ur: "", hi: "" };
    }
    if (typeof clean.address === "string") {
      clean.address = { en: clean.address, ur: "", hi: "" };
    }

    // 4. Ensure quotes provides both main/translation and ar/ur/en
    if (clean.quotes) {
      const q = typeof clean.quotes === "string" ? { main: clean.quotes } : clean.quotes;
      const main = q.main || q.ar || q.en || "";
      const translation = q.translation || q.ur || q.hi || "";
      clean.quotes = {
        main,
        translation,
        ar: main,
        ur: translation,
        en: main,
        hi: q.hi || "",
      };
    }

    // 5. Clean URL fields: delete if empty (never pass null to @IsOptional() @IsUrl())
    // and auto-prefix https:// if missing protocol so @IsUrl() passes.
    const urlFields = [
      "websiteUrl",
      "whatsappChannelUrl",
      "instagramUrl",
      "xUrl",
      "telegramUrl",
      "youtubeUrl",
    ];
    for (const field of urlFields) {
      if (!clean[field] || (typeof clean[field] === "string" && !clean[field].trim())) {
        delete clean[field];
      } else if (typeof clean[field] === "string") {
        let val = clean[field].trim();
        if (!/^https?:\/\//i.test(val)) {
          val = `https://${val}`;
        }
        clean[field] = val;
      }
    }

    // 6. Handle logoUrl and bannerUrl:
    // Raw Base64 data URLs or local blob URLs MUST NOT be sent in JSON PUT/PATCH:
    // they exceed Express 100kb body limit (HTTP 413) and fail @IsUrl() (HTTP 400).
    if (
      !clean.logoUrl ||
      typeof clean.logoUrl !== "string" ||
      !clean.logoUrl.trim() ||
      clean.logoUrl.startsWith("data:") ||
      clean.logoUrl.startsWith("blob:")
    ) {
      delete clean.logoUrl;
    }

    if (
      !clean.bannerUrl ||
      typeof clean.bannerUrl !== "string" ||
      !clean.bannerUrl.trim() ||
      clean.bannerUrl.startsWith("data:") ||
      clean.bannerUrl.startsWith("blob:")
    ) {
      delete clean.bannerUrl;
    }

    // 7. Strip empty strings from phone list
    if (Array.isArray(clean.contactPhones)) {
      clean.contactPhones = clean.contactPhones
        .map((p: any) => String(p).trim())
        .filter(Boolean);
    }

    // 8. Try PUT, fallback to PATCH, fallback to POST
    try {
      const response = await httpClient.put<ApiResponseEnvelope<InstituteProfileData> | InstituteProfileData>(
        "/api/v1/institute-profile",
        clean
      );
      const data = response.data;
      if (data && typeof data === "object" && "data" in data) {
        return (data as ApiResponseEnvelope<InstituteProfileData>).data;
      }
      return data as InstituteProfileData;
    } catch (err: any) {
      // If PUT returns 404 or 405 (Method Not Allowed), retry with PATCH
      if (err?.statusCode === 404 || err?.statusCode === 405) {
        try {
          const patchRes = await httpClient.patch<ApiResponseEnvelope<InstituteProfileData> | InstituteProfileData>(
            "/api/v1/institute-profile",
            clean
          );
          const patchData = patchRes.data;
          if (patchData && typeof patchData === "object" && "data" in patchData) {
            return (patchData as ApiResponseEnvelope<InstituteProfileData>).data;
          }
          return patchData as InstituteProfileData;
        } catch (patchErr: any) {
          // If PATCH also returns 404 or 405, retry with POST (creation/seed endpoint)
          if (patchErr?.statusCode === 404 || patchErr?.statusCode === 405) {
            const postRes = await httpClient.post<ApiResponseEnvelope<InstituteProfileData> | InstituteProfileData>(
              "/api/v1/institute-profile",
              clean
            );
            const postData = postRes.data;
            if (postData && typeof postData === "object" && "data" in postData) {
              return (postData as ApiResponseEnvelope<InstituteProfileData>).data;
            }
            return postData as InstituteProfileData;
          }
          throw patchErr;
        }
      }
      throw err;
    }
  },

  /**
   * 3. Get Public Profile (Unauthenticated)
   */
  async getPublicProfile(): Promise<InstituteProfileData> {
    const response = await httpClient.get<ApiResponseEnvelope<InstituteProfileData> | InstituteProfileData>(
      "/api/v1/institute-profile/public",
      { withCredentials: false }
    );
    const data = response.data;
    if (data && typeof data === "object" && "data" in data) {
      return (data as ApiResponseEnvelope<InstituteProfileData>).data;
    }
    return data as InstituteProfileData;
  },

  /**
   * 4. Get Policies & Documents (Authenticated)
   */
  async getPolicies(): Promise<InstitutePoliciesDocumentsData> {
    const candidateEndpoints = [
      "/api/v1/institute-policies-documents",
      "/api/v1/institute-policies",
      "/api/v1/institute-profile/policies",
      "/api/v1/policies",
    ];

    for (const ep of candidateEndpoints) {
      try {
        const response = await httpClient.get<ApiResponseEnvelope<InstitutePoliciesDocumentsData> | InstitutePoliciesDocumentsData>(
          ep
        );
        const data = response.data;
        if (data && typeof data === "object") {
          const parsed = "data" in data ? (data as ApiResponseEnvelope<InstitutePoliciesDocumentsData>).data : data;
          if (parsed && typeof parsed === "object") {
            return parsed as InstitutePoliciesDocumentsData;
          }
        }
      } catch {
        // Probe next candidate endpoint
      }
    }

    // Check if policies are embedded inside the institute profile
    try {
      const profile = await this.getProfile();
      if (profile && (profile as any).policies) {
        return (profile as any).policies as InstitutePoliciesDocumentsData;
      }
    } catch {
      // Ignore
    }

    return {
      aboutUs: [],
      instituteIntroduction: [],
      founderMessage: [],
      studentRules: [],
      parentRules: [],
      staffRules: [],
      privacyPolicy: [],
    };
  },

  /**
   * 5. Save / Update Policies & Documents (Authenticated)
   */
  async updatePolicies(
    payload: InstitutePoliciesDocumentsData
  ): Promise<InstitutePoliciesDocumentsData> {
    const clean: Record<string, any> = {};

    const policyKeys: (keyof InstitutePoliciesDocumentsData)[] = [
      "aboutUs",
      "instituteIntroduction",
      "founderMessage",
      "studentRules",
      "parentRules",
      "staffRules",
      "privacyPolicy",
    ];

    // Filter out completely blank paragraphs and trim whitespace
    for (const key of policyKeys) {
      const list = payload[key];
      if (Array.isArray(list)) {
        clean[key] = list
          .filter((p) => p && (p.en?.trim() || p.ur?.trim() || p.hi?.trim()))
          .map((p) => ({
            en: p.en?.trim() || "",
            ur: p.ur?.trim() || "",
            hi: p.hi?.trim() || "",
          }));
      } else {
        clean[key] = [];
      }
    }

    const candidateEndpoints = [
      "/api/v1/institute-policies-documents",
      "/api/v1/institute-policies",
      "/api/v1/institute-profile/policies",
      "/api/v1/policies",
    ];

    let lastError: any = null;

    for (const ep of candidateEndpoints) {
      // 1. Try PUT
      try {
        const res = await httpClient.put<ApiResponseEnvelope<InstitutePoliciesDocumentsData> | InstitutePoliciesDocumentsData>(
          ep,
          clean
        );
        const d = res.data;
        return (d && typeof d === "object" && "data" in d ? (d as any).data : d) as InstitutePoliciesDocumentsData;
      } catch (putErr: any) {
        if (putErr?.statusCode !== 404 && putErr?.statusCode !== 405) {
          throw putErr; // Real validation error (e.g. 400), surface to user immediately
        }
        lastError = putErr;
      }

      // 2. Try PATCH
      try {
        const res = await httpClient.patch<ApiResponseEnvelope<InstitutePoliciesDocumentsData> | InstitutePoliciesDocumentsData>(
          ep,
          clean
        );
        const d = res.data;
        return (d && typeof d === "object" && "data" in d ? (d as any).data : d) as InstitutePoliciesDocumentsData;
      } catch (patchErr: any) {
        if (patchErr?.statusCode !== 404 && patchErr?.statusCode !== 405) {
          throw patchErr;
        }
        lastError = patchErr;
      }

      // 3. Try POST
      try {
        const res = await httpClient.post<ApiResponseEnvelope<InstitutePoliciesDocumentsData> | InstitutePoliciesDocumentsData>(
          ep,
          clean
        );
        const d = res.data;
        return (d && typeof d === "object" && "data" in d ? (d as any).data : d) as InstitutePoliciesDocumentsData;
      } catch (postErr: any) {
        if (postErr?.statusCode !== 404 && postErr?.statusCode !== 405) {
          throw postErr;
        }
        lastError = postErr;
      }
    }

    // 4. Fallback: Save as embedded policies on the institute profile update endpoint
    try {
      await httpClient.put("/api/v1/institute-profile", { policies: clean });
      return clean as InstitutePoliciesDocumentsData;
    } catch {
      try {
        await httpClient.patch("/api/v1/institute-profile", { policies: clean });
        return clean as InstitutePoliciesDocumentsData;
      } catch {
        throw lastError || new Error("Failed to save institutional policies: route not available");
      }
    }
  },

  /**
   * 6. Upload Media Asset (Logo or Banner)
   */
  async uploadMedia(file: File, type: "logo" | "banner"): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    // Helper to safely extract image URL from various API envelope shapes
    const extractUrl = (raw: unknown): string | null => {
      if (!raw) return null;
      if (typeof raw === "string") return raw;
      if (typeof raw === "object") {
        const obj = raw as Record<string, any>;
        if (typeof obj.data === "string") return obj.data;
        const sub = obj.data && typeof obj.data === "object" ? obj.data : null;
        return (
          obj.url ||
          obj.fileUrl ||
          obj.bannerUrl ||
          obj.logoUrl ||
          obj.path ||
          sub?.url ||
          sub?.fileUrl ||
          sub?.bannerUrl ||
          sub?.logoUrl ||
          sub?.path ||
          null
        );
      }
      return null;
    };

    // Try primary dedicated upload endpoint
    try {
      const response = await httpClient.post("/api/v1/institute-profile/upload", formData);
      const url = extractUrl(response.data);
      if (url) return url;
    } catch {
      // Try generic media upload endpoint
      try {
        const response = await httpClient.post("/api/v1/media/upload", formData);
        const url = extractUrl(response.data);
        if (url) return url;
      } catch {
        // Fallback: convert file to Base64 Data URL for immediate persistence
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
    }

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};
