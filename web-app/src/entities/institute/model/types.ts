export interface LocalizedString {
  en?: string;
  ur?: string;
  hi?: string;
}

export interface InstituteQuotes {
  main?: string;
  translation?: string;
  ar?: string;
  ur?: string;
  en?: string;
  hi?: string;
}

export interface PublicInstituteBranding {
  name?: LocalizedString;
  tagline?: LocalizedString;
  quotes?: InstituteQuotes;
  address?: LocalizedString;
  instituteType?: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  currencyCode?: string;
  currencySymbol?: string;
  timezone?: string;
  dateFormat?: string;
  contactPhones?: string[];
  contactEmail?: string;
  websiteUrl?: string | null;
}

export interface BrandingMeta {
  timestamp?: string;
  poweredBy?: string;
  traceId?: string;
}

export interface BrandingResponseEnvelope {
  statusCode: number;
  success: boolean;
  message: string;
  data: PublicInstituteBranding;
  meta?: BrandingMeta;
}
