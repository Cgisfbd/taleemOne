"use client";

import {
  Building2,
  Calendar,
  GraduationCap,
  Layers,
  BookOpen,
  BookMarked,
  Award,
  CreditCard,
  FileText,
  Wifi,
} from "lucide-react";
import styles from "./institutional-setup-tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  icon: typeof Building2;
}

export const INSTITUTIONAL_TABS: TabItem[] = [
  { id: "institute-setup", label: "Institute Setup", icon: Building2 },
  { id: "academic-session", label: "Academic Session", icon: Calendar },
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "classes", label: "Classes", icon: Layers },
  { id: "subjects", label: "Subjects", icon: BookOpen },
  { id: "books", label: "Books", icon: BookMarked },
  { id: "exam-marks-setup", label: "Exam & Marks", icon: Award },
  { id: "fees-setup", label: "Fees Setup", icon: CreditCard },
  { id: "schedule-policies", label: "Schedule & Policy", icon: FileText },
  { id: "wifi-setup", label: "WiFi Setup", icon: Wifi },
];

interface InstitutionalSetupTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function InstitutionalSetupTabs({
  activeTab,
  onTabChange,
}: InstitutionalSetupTabsProps) {
  return (
    <div className={styles.tabsContainer} aria-label="Institutional Configuration Sections">
      {/* 10 Equal Columns: Every label fits fully with zero dot-dot-dot ellipsis */}
      <nav className={styles.tabsNav} role="tablist">
        {INSTITUTIONAL_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              title={tab.label}
              className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={14} className={styles.tabIcon} />
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
