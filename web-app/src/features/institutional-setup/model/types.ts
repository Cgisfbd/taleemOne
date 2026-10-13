import { z } from "zod";

export interface MultilingualText {
  en: string;
  ur?: string;
  hi?: string;
}

export interface MultilingualQuote {
  main?: string;
  translation?: string;
  ar?: string;
  ur?: string;
  en?: string;
  hi?: string;
}

export interface InstituteProfileData {
  id?: string;
  name: MultilingualText;
  tagline?: MultilingualText;
  quotes?: MultilingualQuote;
  address: MultilingualText;
  instituteType: string;
  affiliationNumber?: string;
  currencyCode?: string;
  currencySymbol?: string;
  timezone?: string;
  dateFormat?: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  contactPhones: string[];
  contactEmail: string;
  websiteUrl: string;
  whatsappNumber?: string;
  whatsappChannelUrl?: string;
  instagramUrl?: string;
  xUrl?: string;
  telegramUrl?: string;
  youtubeUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InstitutePoliciesDocumentsData {
  aboutUs?: MultilingualText[];
  instituteIntroduction?: MultilingualText[];
  founderMessage?: MultilingualText[];
  studentRules?: MultilingualText[];
  parentRules?: MultilingualText[];
  staffRules?: MultilingualText[];
  privacyPolicy?: MultilingualText[];
}

export interface ApiResponseEnvelope<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    timestamp?: string;
    poweredBy?: string;
  };
}

// Zod Validation Schemas
export const multilingualTextSchema = z.object({
  en: z.string().min(1, "English text is required"),
  ur: z.string().optional().default(""),
  hi: z.string().optional().default(""),
});

export const instituteProfileSchema = z.object({
  name: z.object({
    en: z.string().min(2, "Official institute name (English) is required"),
    ur: z.string().optional().default(""),
    hi: z.string().optional().default(""),
  }),
  tagline: z
    .object({
      en: z.string().optional().default(""),
      ur: z.string().optional().default(""),
      hi: z.string().optional().default(""),
    })
    .optional(),
  quotes: z
    .object({
      main: z.string().optional().default(""),
      translation: z.string().optional().default(""),
      ar: z.string().optional().default(""),
      ur: z.string().optional().default(""),
      en: z.string().optional().default(""),
      hi: z.string().optional().default(""),
    })
    .optional(),
  address: z.object({
    en: z.string().min(3, "Campus address (English) is required"),
    ur: z.string().optional().default(""),
    hi: z.string().optional().default(""),
  }),
  instituteType: z.string().min(1, "Institute classification type is required"),
  affiliationNumber: z.string().optional().default(""),
  contactPhones: z.array(z.string()).min(1, "At least one contact helpline is required"),
  contactEmail: z.string().email("Please enter a valid email address"),
  websiteUrl: z.string().min(1, "Website URL is required"),
  whatsappNumber: z.string().optional().default(""),
  whatsappChannelUrl: z.string().optional().default(""),
  instagramUrl: z.string().optional().default(""),
  xUrl: z.string().optional().default(""),
  telegramUrl: z.string().optional().default(""),
  youtubeUrl: z.string().optional().default(""),
  logoUrl: z.string().nullable().optional(),
  bannerUrl: z.string().nullable().optional(),
  currencyCode: z.string().optional(),
  currencySymbol: z.string().optional(),
  timezone: z.string().optional(),
  dateFormat: z.string().optional(),
});

export const institutePoliciesSchema = z.object({
  aboutUs: z.array(multilingualTextSchema).optional().default([]),
  instituteIntroduction: z.array(multilingualTextSchema).optional().default([]),
  founderMessage: z.array(multilingualTextSchema).optional().default([]),
  studentRules: z.array(multilingualTextSchema).optional().default([]),
  parentRules: z.array(multilingualTextSchema).optional().default([]),
  staffRules: z.array(multilingualTextSchema).optional().default([]),
  privacyPolicy: z.array(multilingualTextSchema).optional().default([]),
});

export type InstituteProfileFormData = z.infer<typeof instituteProfileSchema>;
export type InstitutePoliciesFormData = z.infer<typeof institutePoliciesSchema>;
