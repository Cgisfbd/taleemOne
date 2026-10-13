"use client";

import { useState, useEffect, useCallback } from "react";
import { Building2, BookOpen, AlertTriangle } from "lucide-react";
import { notify } from "@/shared/ui";
import { useAuthState, useAccessToken } from "@/features/auth-login";
import { useInstituteBranding, useInstituteBrandingStore } from "@/entities/institute";
import { instituteApi } from "../api/instituteApi";
import type {
  InstituteProfileData,
  InstitutePoliciesDocumentsData,
  MultilingualText,
  MultilingualQuote,
} from "../model/types";

const normalizeMultilingual = (val: unknown): MultilingualText => {
  if (!val) return { en: "", ur: "", hi: "" };
  if (typeof val === "string") return { en: val, ur: "", hi: "" };
  if (typeof val === "object") {
    const obj = val as Record<string, any>;
    return {
      en: obj.en || obj.english || "",
      ur: obj.ur || obj.urdu || "",
      hi: obj.hi || obj.hindi || "",
    };
  }
  return { en: "", ur: "", hi: "" };
};

const normalizeQuotes = (val: unknown): MultilingualQuote => {
  if (!val) return { main: "", translation: "", ar: "", ur: "", hi: "", en: "" };
  if (typeof val === "string") return { main: val, translation: "", ar: val, ur: "", hi: "", en: val };
  if (typeof val === "object") {
    const obj = val as Record<string, any>;
    const main = obj.main || obj.ar || obj.en || "";
    const translation = obj.translation || obj.ur || obj.hi || "";
    return {
      main,
      translation,
      ar: obj.ar || main,
      ur: obj.ur || translation,
      en: obj.en || main,
      hi: obj.hi || "",
    };
  }
  return { main: "", translation: "", ar: "", ur: "", hi: "", en: "" };
};
import { InstituteSettingsHeader } from "./InstituteSettingsHeader";
import { InstituteProfileTab } from "./InstituteProfileTab";
import { InstitutePoliciesTab } from "./InstitutePoliciesTab";
import { SettingsFloatingBar } from "./SettingsFloatingBar";
import styles from "./institute-setup-module.module.css";

const EMPTY_PROFILE: InstituteProfileData = {
  name: { en: "", ur: "", hi: "" },
  tagline: { en: "", ur: "", hi: "" },
  quotes: { main: "", translation: "", ar: "", ur: "", hi: "", en: "" },
  address: { en: "", ur: "", hi: "" },
  instituteType: "",
  affiliationNumber: "",
  currencyCode: "",
  currencySymbol: "",
  timezone: "",
  dateFormat: "",
  logoUrl: "",
  bannerUrl: "",
  contactPhones: [],
  contactEmail: "",
  websiteUrl: "",
  whatsappNumber: "",
  whatsappChannelUrl: "",
  instagramUrl: "",
  xUrl: "",
  telegramUrl: "",
  youtubeUrl: "",
};

const EMPTY_POLICIES: InstitutePoliciesDocumentsData = {
  aboutUs: [],
  instituteIntroduction: [],
  founderMessage: [],
  studentRules: [],
  parentRules: [],
  staffRules: [],
  privacyPolicy: [],
};

export function InstituteSetupModule() {
  const authState = useAuthState();
  const accessToken = useAccessToken();
  const { logoUrl: liveLogoUrl, instituteName: liveInstituteName, instituteTagline: liveTagline, branding } = useInstituteBranding();

  const [activeSubTab, setActiveSubTab] = useState<"profile" | "policies">("profile");

  // Initial fetched snapshots (for discard baseline)
  const [initialProfile, setInitialProfile] = useState<InstituteProfileData>(EMPTY_PROFILE);
  const [initialPolicies, setInitialPolicies] = useState<InstitutePoliciesDocumentsData>(EMPTY_POLICIES);

  // Active working state
  const [profileData, setProfileData] = useState<InstituteProfileData>(EMPTY_PROFILE);
  const [policiesData, setPoliciesData] = useState<InstitutePoliciesDocumentsData>(EMPTY_POLICIES);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form errors
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // Dirty state checks
  const isProfileDirty = JSON.stringify(profileData) !== JSON.stringify(initialProfile);
  const isPoliciesDirty = JSON.stringify(policiesData) !== JSON.stringify(initialPolicies);

  const isCurrentTabDirty = activeSubTab === "profile" ? isProfileDirty : isPoliciesDirty;

  // Load Data from authoritative backend
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const [profileRes, policiesRes] = await Promise.allSettled([
        instituteApi.getProfile(),
        instituteApi.getPolicies(),
      ]);

      if (profileRes.status === "fulfilled" && profileRes.value) {
        const fetched = profileRes.value;
        // Merge with live branding logo/name if profile returned empty values
        const merged: InstituteProfileData = {
          ...fetched,
          name: normalizeMultilingual(fetched.name),
          tagline: normalizeMultilingual(fetched.tagline),
          address: normalizeMultilingual(fetched.address),
          quotes: normalizeQuotes(fetched.quotes),
          logoUrl: fetched.logoUrl || liveLogoUrl || "",
          bannerUrl: fetched.bannerUrl || branding?.bannerUrl || "",
          currencyCode: fetched.currencyCode || branding?.currencyCode || "",
          currencySymbol: fetched.currencySymbol || branding?.currencySymbol || "",
          timezone: fetched.timezone || branding?.timezone || "",
          dateFormat: fetched.dateFormat || branding?.dateFormat || "",
        };
        setInitialProfile(merged);
        setProfileData(merged);
      } else {
        // Fallback probe for public profile if auth session still bootstrapping
        try {
          const publicProfile = await instituteApi.getPublicProfile();
          if (publicProfile) {
            const merged: InstituteProfileData = {
              ...EMPTY_PROFILE,
              ...publicProfile,
              name: normalizeMultilingual(publicProfile.name),
              tagline: normalizeMultilingual(publicProfile.tagline),
              address: normalizeMultilingual(publicProfile.address),
              quotes: normalizeQuotes(publicProfile.quotes),
            };
            setInitialProfile(merged);
            setProfileData(merged);
          }
        } catch {
          // Keep empty fields without inventing mock data
        }
      }

      if (policiesRes.status === "fulfilled" && policiesRes.value) {
        setInitialPolicies(policiesRes.value);
        setPoliciesData(policiesRes.value);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to load institutional profile from backend.";
      setFetchError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [liveLogoUrl, branding?.bannerUrl]);

  // Only load protected data when session is confirmed authenticated (prevents 401 race logout on page reload!)
  useEffect(() => {
    if (authState.type === "authenticated" && accessToken) {
      loadData();
    }
  }, [authState.type, accessToken, loadData]);

  // Synchronous Validation
  const runProfileValidation = (): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    const nameStr =
      typeof profileData.name === "object" && profileData.name !== null
        ? profileData.name.en?.trim()
        : typeof profileData.name === "string"
        ? (profileData.name as string).trim()
        : "";

    if (!nameStr) {
      errors["name.en"] = "Official institute name (English) is required.";
    }

    if (!profileData.instituteType?.trim()) {
      errors["instituteType"] = "Institute classification type is required.";
    }

    // Email format validation (only if email is provided)
    if (profileData.contactEmail?.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profileData.contactEmail.trim())) {
        errors["contactEmail"] = "Please enter a valid official email address.";
      }
    }

    setProfileErrors(errors);
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  // Save Handler
  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (activeSubTab === "profile") {
        const { isValid, errors } = runProfileValidation();
        if (!isValid) {
          const firstError = Object.values(errors)[0] || "Required fields missing";
          notify.warning("Validation Required", firstError);
          setIsSaving(false);
          return;
        }

        const updated = await instituteApi.updateProfile(profileData);
        const merged: InstituteProfileData = {
          ...profileData,
          ...(updated && typeof updated === "object" ? updated : {}),
          // Preserve local image preview states if backend did not return updated URLs
          logoUrl: (updated as any)?.logoUrl || profileData.logoUrl,
          bannerUrl: (updated as any)?.bannerUrl || profileData.bannerUrl,
        };
        setInitialProfile(merged);
        setProfileData(merged);
        setProfileErrors({});
        // Force refresh branding store so topbar and other parts of app update immediately
        useInstituteBrandingStore.getState().fetchBranding(true);
        notify.success(
          "Profile Saved Successfully",
          "Institutional identity, names, and contact parameters updated."
        );
      } else {
        const updated = await instituteApi.updatePolicies(policiesData);
        const merged = updated && typeof updated === "object" ? updated : policiesData;
        setInitialPolicies(merged);
        setPoliciesData(merged);
        notify.success(
          "Policies Saved Successfully",
          "Institutional policies, student code of conduct, and documents saved."
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save institutional settings.";
      notify.error("Save Operation Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Discard Handler
  const handleDiscard = () => {
    if (activeSubTab === "profile") {
      setProfileData(initialProfile);
      setProfileErrors({});
    } else {
      setPoliciesData(initialPolicies);
    }
    notify.info(
      "Modifications Discarded",
      "Unsaved modifications were discarded and restored to last saved configuration."
    );
  };

  // While restoring session on refresh or loading profile data, show clean frosted loader
  if (authState.type !== "authenticated" || isLoading) {
    return (
      <div className={styles.loadingShell}>
        <div className={styles.loadingSpinner} />
        <span className={styles.loadingText}>Fetching authoritative institutional configuration...</span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className={styles.errorBanner} role="alert">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AlertTriangle size={20} color="#be123c" />
          <p className={styles.errorText}>{fetchError}</p>
        </div>
        <button type="button" className={styles.retryBtn} onClick={loadData}>
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className={styles.moduleContainer}>
      {/* 1. Real-Time Live Preview Header Banner */}
      <InstituteSettingsHeader
        nameEn={profileData.name?.en || liveInstituteName || ""}
        nameUr={profileData.name?.ur}
        tagline={profileData.tagline?.en || liveTagline || ""}
        instituteType={profileData.instituteType}
        affiliationNumber={profileData.affiliationNumber}
        logoUrl={profileData.logoUrl || liveLogoUrl}
        isLoading={isLoading}
      />

      {/* 2. Sub-Tab Navigation Bar */}
      <nav className={styles.subTabsNav} role="tablist" aria-label="Institute Configuration Sub-Tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === "profile"}
          className={`${styles.subTabBtn} ${
            activeSubTab === "profile" ? styles.subTabBtnActive : ""
          }`}
          onClick={() => setActiveSubTab("profile")}
        >
          <div className={styles.subTabIconPod}>
            <Building2 size={20} />
          </div>
          <div className={styles.subTabMeta}>
            <h4 className={styles.subTabTitle}>Identity, Helplines & Currency</h4>
            <p className={styles.subTabSubtitle}>
              Names, logo, helplines, social channels & currency
            </p>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === "policies"}
          className={`${styles.subTabBtn} ${
            activeSubTab === "policies" ? styles.subTabBtnActive : ""
          }`}
          onClick={() => setActiveSubTab("policies")}
        >
          <div className={styles.subTabIconPod}>
            <BookOpen size={20} />
          </div>
          <div className={styles.subTabMeta}>
            <h4 className={styles.subTabTitle}>Policies & Institutional Documents</h4>
            <p className={styles.subTabSubtitle}>
              Student conduct, parent guidelines, staff ethics & policies
            </p>
          </div>
        </button>
      </nav>

      {/* 3. Sub-Tab Active Workspace */}
      {activeSubTab === "profile" ? (
        <InstituteProfileTab
          data={profileData}
          onChange={setProfileData}
          errors={profileErrors}
        />
      ) : (
        <InstitutePoliciesTab
          data={policiesData}
          onChange={setPoliciesData}
          onSave={handleSave}
          onDiscard={handleDiscard}
          isSaving={isSaving}
          isDirty={isPoliciesDirty}
        />
      )}

      {/* 4. Sticky Floating Action Bar for Unsaved Changes */}
      <SettingsFloatingBar
        isVisible={isCurrentTabDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
        saveLabel={
          activeSubTab === "profile" ? "Save Institute Profile" : "Save Policies & Rules"
        }
      />
    </div>
  );
}
