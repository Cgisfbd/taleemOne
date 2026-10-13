"use client";

import { useState, useRef, useEffect } from "react";
import {
  Building2,
  FileCheck,
  Globe,
  Mail,
  Phone,
  Image as ImageIcon,
  MessageSquare,
  Share2,
  Plus,
  X,
  Quote,
  Upload,
  Trash2,
  Loader2,
  Lock,
} from "lucide-react";
import { notify } from "@/shared/ui";
import { resolveAssetUrl } from "@/shared/config/env";
import { useInstituteBranding } from "@/entities/institute";
import { instituteApi } from "../api/instituteApi";
import type { InstituteProfileData } from "../model/types";
import { IdentityTriadCard } from "./IdentityTriadCard";
import styles from "./institute-profile-tab.module.css";

interface InstituteProfileTabProps {
  data: InstituteProfileData;
  onChange: (updated: InstituteProfileData) => void;
  errors?: Record<string, string>;
}

export function InstituteProfileTab({
  data,
  onChange,
  errors = {},
}: InstituteProfileTabProps) {
  const { logoUrl: liveLogoUrl, branding } = useInstituteBranding();
  const [newPhoneInput, setNewPhoneInput] = useState("");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const resolvedLogo = resolveAssetUrl(data.logoUrl || liveLogoUrl);
  const resolvedBanner = resolveAssetUrl(data.bannerUrl || branding?.bannerUrl);

  const displayLogo = logoPreview || resolvedLogo;
  const displayBanner = bannerPreview || resolvedBanner;

  useEffect(() => {
    setLogoError(false);
  }, [resolvedLogo]);

  useEffect(() => {
    setBannerError(false);
  }, [resolvedBanner]);

  const updateField = <K extends keyof InstituteProfileData>(
    field: K,
    val: InstituteProfileData[K]
  ) => {
    onChange({
      ...data,
      [field]: val,
    });
  };

  const handleLogoFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify.warning(
        "Invalid File Format",
        "Please upload a valid image file (PNG, JPG, SVG, WebP)."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      notify.warning(
        "File Too Large",
        "Logo crest file size must be less than 5MB."
      );
      return;
    }

    // Instant local preview via Object URL (zero latency, zero network dependency)
    const localUrl = URL.createObjectURL(file);
    setLogoPreview(localUrl);
    setLogoError(false);

    setIsUploadingLogo(true);
    try {
      const uploadedUrl = await instituteApi.uploadMedia(file, "logo");
      if (uploadedUrl) {
        updateField("logoUrl", uploadedUrl);
      }
      notify.success(
        "Logo Uploaded",
        "Official institutional logo crest uploaded successfully."
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload logo";
      notify.error("Upload Failed", msg);
    } finally {
      setIsUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  const handleBannerFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify.warning(
        "Invalid File Format",
        "Please upload a valid image file (PNG, JPG, WebP)."
      );
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      notify.warning(
        "File Too Large",
        "Hero banner file size must be less than 8MB."
      );
      return;
    }

    // Instant local preview via Object URL (zero latency, zero network dependency)
    const localUrl = URL.createObjectURL(file);
    setBannerPreview(localUrl);
    setBannerError(false);

    setIsUploadingBanner(true);
    try {
      const uploadedUrl = await instituteApi.uploadMedia(file, "banner");
      if (uploadedUrl) {
        updateField("bannerUrl", uploadedUrl);
      }
      notify.success(
        "Banner Uploaded",
        "Campus hero banner uploaded successfully."
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload banner";
      notify.error("Upload Failed", msg);
    } finally {
      setIsUploadingBanner(false);
      if (bannerInputRef.current) bannerInputRef.current.value = "";
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setLogoError(false);
    updateField("logoUrl", "");
    if (logoInputRef.current) logoInputRef.current.value = "";
    notify.info("Logo Removed", "Official institutional logo crest removed.");
  };

  const handleRemoveBanner = () => {
    setBannerPreview(null);
    setBannerError(false);
    updateField("bannerUrl", "");
    if (bannerInputRef.current) bannerInputRef.current.value = "";
    notify.info("Banner Removed", "Campus hero banner removed.");
  };

  const handleAddPhone = () => {
    const trimmed = newPhoneInput.trim();
    if (!trimmed) return;
    const currentPhones = data.contactPhones || [];
    if (!currentPhones.includes(trimmed)) {
      updateField("contactPhones", [...currentPhones, trimmed]);
    }
    setNewPhoneInput("");
  };

  const handleRemovePhone = (index: number) => {
    const currentPhones = data.contactPhones || [];
    updateField("contactPhones", currentPhones.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.formContainer}>
      {/* SECTION A: Classification & Affiliation Number */}
      <section className={styles.sectionCard} aria-labelledby="section-classification">
        <div className={styles.sectionHeader}>
          <div>
            <h3 id="section-classification" className={styles.sectionTitle}>
              <Building2 size={18} />
              <span>Classification & Registration</span>
            </h3>
            <p className={styles.sectionDesc}>
              Institutional category and official board / registration identifier.
            </p>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <span>Institute Classification Type</span>
              <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter classification type..."
              value={data.instituteType || ""}
              onChange={(e) => updateField("instituteType", e.target.value)}
            />
            {errors["instituteType"] && (
              <span className={styles.errorText}>{errors["instituteType"]}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <span>Affiliation / Board Registration Number</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter affiliation or registration number..."
              value={data.affiliationNumber || ""}
              onChange={(e) => updateField("affiliationNumber", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* SECTION B: Multilingual Triad Cards */}
      <section className={styles.formContainer} aria-label="Multilingual Identity">
        {/* 1. Official Institute Name */}
        <IdentityTriadCard
          title="Official Institute Name"
          subtitle="Display title used across reports, ID cards, receipts and public portals."
          icon={<FileCheck size={18} />}
          isRequired
          enValue={data.name?.en || ""}
          urValue={data.name?.ur || ""}
          hiValue={data.name?.hi || ""}
          onEnChange={(en) =>
            updateField("name", { en, ur: data.name?.ur || "", hi: data.name?.hi || "" })
          }
          onUrChange={(ur) =>
            updateField("name", { en: data.name?.en || "", ur, hi: data.name?.hi || "" })
          }
          onHiChange={(hi) =>
            updateField("name", { en: data.name?.en || "", ur: data.name?.ur || "", hi })
          }
          enPlaceholder="Enter official institute name..."
          urPlaceholder="ادارے کا نام درج کریں..."
          hiPlaceholder="संस्थान का नाम दर्ज करें..."
          error={errors["name.en"]}
        />

        {/* 2. Motto / Tagline */}
        <IdentityTriadCard
          title="Institutional Motto / Tagline"
          subtitle="Inspiring quote or motto displayed under the crest in official documents."
          icon={<MessageSquare size={18} />}
          enValue={data.tagline?.en || ""}
          urValue={data.tagline?.ur || ""}
          hiValue={data.tagline?.hi || ""}
          onEnChange={(en) =>
            updateField("tagline", { en, ur: data.tagline?.ur || "", hi: data.tagline?.hi || "" })
          }
          onUrChange={(ur) =>
            updateField("tagline", { en: data.tagline?.en || "", ur, hi: data.tagline?.hi || "" })
          }
          onHiChange={(hi) =>
            updateField("tagline", { en: data.tagline?.en || "", ur: data.tagline?.ur || "", hi })
          }
          enPlaceholder="Enter institutional motto or tagline..."
          urPlaceholder="ادارے کا موٹو یا نعرہ درج کریں..."
          hiPlaceholder="संस्थान का आदर्श वाक्य दर्ज करें..."
        />

        {/* 3. Physical Address */}
        <IdentityTriadCard
          title="Campus Physical Address"
          subtitle="Full institutional premises location printed on official letterheads and receipts."
          icon={<Building2 size={18} />}
          isRequired
          isTextarea
          enValue={data.address?.en || ""}
          urValue={data.address?.ur || ""}
          hiValue={data.address?.hi || ""}
          onEnChange={(en) =>
            updateField("address", { en, ur: data.address?.ur || "", hi: data.address?.hi || "" })
          }
          onUrChange={(ur) =>
            updateField("address", { en: data.address?.en || "", ur, hi: data.address?.hi || "" })
          }
          onHiChange={(hi) =>
            updateField("address", { en: data.address?.en || "", ur: data.address?.ur || "", hi })
          }
          enPlaceholder="Enter campus physical address..."
          urPlaceholder="ادارے کا پتہ درج کریں..."
          hiPlaceholder="संस्थान का पता दर्ज करें..."
          error={errors["address.en"]}
        />

        {/* 4. Institutional Quotes Card */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>
                <Quote size={18} />
                <span>Institutional Quotes & Verse</span>
              </h3>
              <p className={styles.sectionDesc}>
                Inspirational quotes printed on diplomas, banners, and portals.
              </p>
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Primary Quote / Verse</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter primary quote or verse (in any language)..."
                value={data.quotes?.main ?? data.quotes?.ar ?? data.quotes?.en ?? ""}
                onChange={(e) =>
                  updateField("quotes", {
                    ...data.quotes,
                    main: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Quote Translation / Meaning</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter translation, explanation or meaning..."
                value={data.quotes?.translation ?? data.quotes?.ur ?? ""}
                onChange={(e) =>
                  updateField("quotes", {
                    ...data.quotes,
                    translation: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: Regional Standards & Currency (Read-Only from API Authority) */}
      <section className={styles.sectionCard} aria-labelledby="section-localization">
        <div className={styles.sectionHeader}>
          <div>
            <h3 id="section-localization" className={styles.sectionTitle}>
              <Globe size={18} />
              <span>Regional Standards & Currency</span>
              <span className={styles.readOnlySectionBadge}>
                <Lock size={12} /> Read-Only (API Authority)
              </span>
            </h3>
            <p className={styles.sectionDesc}>
              Institutional currency code, currency symbol, timezone, and date format are system-managed standards received from backend configuration and cannot be modified manually.
            </p>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <span>Currency ISO Code</span>
              <span className={styles.readOnlyTag}>
                <Lock size={10} /> Immutable
              </span>
            </label>
            <input
              type="text"
              className={styles.readOnlyInput}
              value={data.currencyCode || branding?.currencyCode || "—"}
              readOnly
              disabled
              title="Configured by backend API authority"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <span>Currency Symbol</span>
              <span className={styles.readOnlyTag}>
                <Lock size={10} /> Immutable
              </span>
            </label>
            <input
              type="text"
              className={styles.readOnlyInput}
              value={data.currencySymbol || branding?.currencySymbol || "—"}
              readOnly
              disabled
              title="Configured by backend API authority"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <span>Institutional Timezone</span>
              <span className={styles.readOnlyTag}>
                <Lock size={10} /> Immutable
              </span>
            </label>
            <input
              type="text"
              className={styles.readOnlyInput}
              value={data.timezone || branding?.timezone || "—"}
              readOnly
              disabled
              title="Configured by backend API authority"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <span>Date Display Format</span>
              <span className={styles.readOnlyTag}>
                <Lock size={10} /> Immutable
              </span>
            </label>
            <input
              type="text"
              className={styles.readOnlyInput}
              value={data.dateFormat || branding?.dateFormat || "—"}
              readOnly
              disabled
              title="Configured by backend API authority"
            />
          </div>
        </div>
      </section>

      {/* SECTION D: Media & Crest Branding */}
      <section className={styles.sectionCard} aria-labelledby="section-media">
        <div className={styles.sectionHeader}>
          <div>
            <h3 id="section-media" className={styles.sectionTitle}>
              <ImageIcon size={18} />
              <span>Media & Crest Branding</span>
            </h3>
            <p className={styles.sectionDesc}>
              Upload official logo crest for receipts & documents, and hero banner for student/parent portals.
            </p>
          </div>
        </div>

        <div className={styles.mediaRow}>
          {/* Logo Card */}
          <div className={styles.mediaCard}>
            <div
              className={styles.mediaPreviewPod}
              style={{ cursor: "pointer" }}
              onClick={() => logoInputRef.current?.click()}
              title="Click to choose logo image"
            >
              {displayLogo && !logoError ? (
                <img
                  src={displayLogo}
                  alt="Institute Logo Preview"
                  width={90}
                  height={90}
                  className={styles.mediaPreviewImg}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Building2 size={36} color="rgba(18,62,53,0.4)" />
              )}
            </div>

            <span className={styles.label}>Official Logo / Crest</span>

            {/* Hidden File Input */}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoFileSelect}
              style={{ display: "none" }}
            />

            <div className={styles.mediaUploadActionRow}>
              <button
                type="button"
                className={styles.mediaUploadBtn}
                onClick={() => logoInputRef.current?.click()}
                disabled={isUploadingLogo}
              >
                {isUploadingLogo ? (
                  <>
                    <Loader2 size={14} className={styles.spinner} />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    <span>{data.logoUrl || logoPreview ? "Change Logo" : "Upload Logo"}</span>
                  </>
                )}
              </button>

              {data.logoUrl || logoPreview ? (
                <button
                  type="button"
                  className={styles.mediaRemoveBtn}
                  onClick={handleRemoveLogo}
                  disabled={isUploadingLogo}
                  title="Remove Logo"
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              ) : null}
            </div>

            <span className={styles.mediaHint}>PNG, JPG, SVG, WebP (Max 5MB)</span>
          </div>

          {/* Banner Card */}
          <div className={styles.mediaCard}>
            <div
              className={styles.bannerPreviewPod}
              style={{ cursor: "pointer" }}
              onClick={() => bannerInputRef.current?.click()}
              title="Click to choose banner image"
            >
              {displayBanner && !bannerError ? (
                <img
                  src={displayBanner}
                  alt="Campus Banner Preview"
                  width={300}
                  height={100}
                  className={styles.mediaPreviewImg}
                  onError={() => setBannerError(true)}
                />
              ) : (
                <ImageIcon size={36} color="rgba(18,62,53,0.4)" />
              )}
            </div>

            <span className={styles.label}>Campus Hero Banner</span>

            {/* Hidden File Input */}
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              onChange={handleBannerFileSelect}
              style={{ display: "none" }}
            />

            <div className={styles.mediaUploadActionRow}>
              <button
                type="button"
                className={styles.mediaUploadBtn}
                onClick={() => bannerInputRef.current?.click()}
                disabled={isUploadingBanner}
              >
                {isUploadingBanner ? (
                  <>
                    <Loader2 size={14} className={styles.spinner} />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    <span>{data.bannerUrl || bannerPreview ? "Change Banner" : "Upload Banner"}</span>
                  </>
                )}
              </button>

              {data.bannerUrl || bannerPreview ? (
                <button
                  type="button"
                  className={styles.mediaRemoveBtn}
                  onClick={handleRemoveBanner}
                  disabled={isUploadingBanner}
                  title="Remove Banner"
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              ) : null}
            </div>

            <span className={styles.mediaHint}>PNG, JPG, WebP (Max 8MB, Recommended 1200x400)</span>
          </div>
        </div>
      </section>

      {/* SECTION E: Helplines & Social Channels */}
      <section className={styles.sectionCard} aria-labelledby="section-contact">
        <div className={styles.sectionHeader}>
          <div>
            <h3 id="section-contact" className={styles.sectionTitle}>
              <Phone size={18} />
              <span>Helplines & Digital Communication</span>
            </h3>
            <p className={styles.sectionDesc}>
              Official phones, support email, website and institutional broadcast channels.
            </p>
          </div>
        </div>

        {/* Contact Phones Chip Manager */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <span>Official Helpline Numbers</span>
            <span className={styles.requiredStar}>*</span>
          </label>

          <div className={styles.chipsContainer}>
            {data.contactPhones && data.contactPhones.length > 0 ? (
              data.contactPhones.map((phone, idx) => (
                <span key={idx} className={styles.phoneChip}>
                  <Phone size={12} />
                  <span>{phone}</span>
                  <button
                    type="button"
                    className={styles.chipRemoveBtn}
                    onClick={() => handleRemovePhone(idx)}
                    aria-label={`Remove phone ${phone}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))
            ) : (
              <span style={{ fontSize: "0.78rem", color: "rgba(18,62,53,0.5)" }}>
                No helplines added yet. Add at least one below.
              </span>
            )}
          </div>

          <div className={styles.addPhoneRow}>
            <input
              type="text"
              className={styles.addPhoneInput}
              placeholder="Enter phone number..."
              value={newPhoneInput}
              onChange={(e) => setNewPhoneInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddPhone();
                }
              }}
            />
            <button
              type="button"
              className={styles.addPhoneBtn}
              onClick={handleAddPhone}
            >
              <Plus size={15} />
              <span>Add Phone Number</span>
            </button>
          </div>
          {errors["contactPhones"] && (
            <span className={styles.errorText}>{errors["contactPhones"]}</span>
          )}
        </div>

        {/* Digital Contacts */}
        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <Mail size={14} />
              <span>Official Support Email</span>
              <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter official email address..."
              value={data.contactEmail || ""}
              onChange={(e) => updateField("contactEmail", e.target.value)}
            />
            {errors["contactEmail"] && (
              <span className={styles.errorText}>{errors["contactEmail"]}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <Globe size={14} />
              <span>Official Website URL</span>
            </label>
            <input
              type="url"
              className={styles.input}
              placeholder="https://..."
              value={data.websiteUrl || ""}
              onChange={(e) => updateField("websiteUrl", e.target.value)}
            />
            {errors["websiteUrl"] && (
              <span className={styles.errorText}>{errors["websiteUrl"]}</span>
            )}
          </div>
        </div>

        {/* Social & Messaging Channels Grid */}
        <div className={styles.sectionHeader} style={{ marginTop: 8 }}>
          <h4 className={styles.sectionTitle} style={{ fontSize: "0.88rem" }}>
            <Share2 size={16} />
            <span>Social & Messaging Broadcast Channels</span>
          </h4>
        </div>

        <div className={styles.grid3}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>WhatsApp Helpline</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter WhatsApp number..."
              value={data.whatsappNumber || ""}
              onChange={(e) => updateField("whatsappNumber", e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>WhatsApp Channel URL</label>
            <input
              type="url"
              className={styles.input}
              placeholder="https://whatsapp.com/channel/..."
              value={data.whatsappChannelUrl || ""}
              onChange={(e) => updateField("whatsappChannelUrl", e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Instagram URL</label>
            <input
              type="url"
              className={styles.input}
              placeholder="https://instagram.com/..."
              value={data.instagramUrl || ""}
              onChange={(e) => updateField("instagramUrl", e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>X / Twitter URL</label>
            <input
              type="url"
              className={styles.input}
              placeholder="https://x.com/..."
              value={data.xUrl || ""}
              onChange={(e) => updateField("xUrl", e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Telegram Channel</label>
            <input
              type="url"
              className={styles.input}
              placeholder="https://t.me/..."
              value={data.telegramUrl || ""}
              onChange={(e) => updateField("telegramUrl", e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>YouTube Channel</label>
            <input
              type="url"
              className={styles.input}
              placeholder="https://youtube.com/@..."
              value={data.youtubeUrl || ""}
              onChange={(e) => updateField("youtubeUrl", e.target.value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
