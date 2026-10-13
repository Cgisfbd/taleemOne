"use client";

import { useState } from "react";
import {
  InstitutionalSetupTabs,
  INSTITUTIONAL_TABS,
  InstituteSetupModule,
} from "@/features/institutional-setup";
import styles from "./institutional-setup.module.css";

export default function InstitutionalSetupPage() {
  const [activeTab, setActiveTab] = useState("institute-setup");

  const currentTabObj = INSTITUTIONAL_TABS.find((t) => t.id === activeTab);

  return (
    <div className={styles.container}>
      {/* Top 10-Tab Segmented Control Bar */}
      <InstitutionalSetupTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Unified Workspace Shell for All 10 Tabs */}
      <section
        className={styles.contentArea}
        aria-label={`${currentTabObj?.label ?? "Module"} Workspace`}
      >
        {/* Slim Header Card for tabs without dedicated MasterHeader */}
        {activeTab === "institute-setup" && (
          <div className={styles.topSlimCard}>
            <div className={styles.slimCardLeft}>
              {currentTabObj?.icon && (
                <currentTabObj.icon size={16} className={styles.slimCardIcon} />
              )}
              <span className={styles.slimCardTitle}>{currentTabObj?.label}</span>
            </div>
          </div>
        )}

        {/* Tab 1: Full Institute Setup Module (Live Banner, 2 Sub-Tabs, Dynamic Forms & Floating Save) */}
        {activeTab === "institute-setup" && (
          <InstituteSetupModule />
        )}
      </section>
    </div>
  );
}
