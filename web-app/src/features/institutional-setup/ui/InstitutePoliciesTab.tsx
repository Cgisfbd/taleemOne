"use client";

import { useState } from "react";
import {
  ScrollText,
  Building,
  Quote,
  GraduationCap,
  Users,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  Check,
  Loader2,
} from "lucide-react";
import type {
  InstitutePoliciesDocumentsData,
  MultilingualText,
} from "../model/types";
import { MultilingualParagraphListField } from "./MultilingualParagraphListField";
import styles from "./institute-policies-tab.module.css";

interface PolicySectionDef {
  key: keyof InstitutePoliciesDocumentsData;
  title: string;
  desc: string;
  icon: typeof ScrollText;
}

const POLICY_SECTIONS: PolicySectionDef[] = [
  {
    key: "aboutUs",
    title: "About Us",
    desc: "Institutional overview, historical establishment and fundamental mission.",
    icon: ScrollText,
  },
  {
    key: "instituteIntroduction",
    title: "Institute Introduction",
    desc: "Campus facilities, infrastructure, smart classrooms, libraries and boarding.",
    icon: Building,
  },
  {
    key: "founderMessage",
    title: "Founder's / Director's Message",
    desc: "Official welcome address, vision and moral leadership guidance.",
    icon: Quote,
  },
  {
    key: "studentRules",
    title: "Student Code of Conduct",
    desc: "Daily punctuality, mandatory uniform, discipline and assembly guidelines.",
    icon: GraduationCap,
  },
  {
    key: "parentRules",
    title: "Parent Guidelines & Cooperation",
    desc: "Meeting visiting hours, fee obligations, attendance monitoring & PTM.",
    icon: Users,
  },
  {
    key: "staffRules",
    title: "Staff Regulations & Faculty Ethics",
    desc: "Teaching code of conduct, biometric punch timings and responsibilities.",
    icon: Briefcase,
  },
  {
    key: "privacyPolicy",
    title: "Institutional Privacy Policy & Terms",
    desc: "Data protection standards for student records and financial ledgers.",
    icon: ShieldCheck,
  },
];

interface InstitutePoliciesTabProps {
  data: InstitutePoliciesDocumentsData;
  onChange: (updated: InstitutePoliciesDocumentsData) => void;
  onSave?: () => void;
  onDiscard?: () => void;
  isSaving?: boolean;
  isDirty?: boolean;
}

export function InstitutePoliciesTab({
  data,
  onChange,
  onSave,
  onDiscard,
  isSaving = false,
  isDirty = false,
}: InstitutePoliciesTabProps) {
  // Allow multi-open or default first open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    aboutUs: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleUpdateSection = (
    key: keyof InstitutePoliciesDocumentsData,
    paragraphs: MultilingualText[]
  ) => {
    onChange({
      ...data,
      [key]: paragraphs,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.introBanner}>
        <p className={styles.introText}>
          Manage official institutional policies, codes of conduct, and public documents. These
          multilingual rules are synced to staff, student, and guardian applications.
        </p>
      </div>

      {POLICY_SECTIONS.map((sec) => {
        const Icon = sec.icon;
        const isOpen = !!openSections[sec.key];
        const paragraphs = (data[sec.key] as MultilingualText[]) || [];

        return (
          <div
            key={sec.key}
            className={`${styles.accordionCard} ${isOpen ? styles.accordionCardOpen : ""}`}
          >
            <button
              type="button"
              className={styles.accordionHeader}
              onClick={() => toggleSection(sec.key)}
              aria-expanded={isOpen}
            >
              <div className={styles.headerLeft}>
                <div className={styles.iconPod}>
                  <Icon size={18} />
                </div>
                <div className={styles.titleGroup}>
                  <h4 className={styles.title}>{sec.title}</h4>
                  <p className={styles.desc}>{sec.desc}</p>
                </div>
              </div>

              <div className={styles.headerRight}>
                <span className={styles.paragraphBadge}>
                  {paragraphs.length} {paragraphs.length === 1 ? "paragraph" : "paragraphs"}
                </span>
                <ChevronDown
                  size={18}
                  className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ""}`}
                />
              </div>
            </button>

            {isOpen && (
              <div className={styles.accordionBody}>
                <MultilingualParagraphListField
                  documentName={sec.title}
                  paragraphs={paragraphs}
                  onChange={(updated) => handleUpdateSection(sec.key, updated)}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* In-Page Primary Action Bar */}
      {onSave && (
        <div className={styles.bottomActionBar}>
          {onDiscard && isDirty && (
            <button
              type="button"
              className={styles.discardBtn}
              onClick={onDiscard}
              disabled={isSaving}
            >
              Discard Modifications
            </button>
          )}

          <button
            type="button"
            className={styles.saveBtn}
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className={styles.spinner} />
                <span>Saving Policies & Rules...</span>
              </>
            ) : (
              <>
                <Check size={16} />
                <span>Save Policies & Documents</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
