"use client";

import Link from "next/link";
import {
  GraduationCap,
  CalendarCheck,
  CreditCard,
  Layers,
  UserPlus,
  Receipt,
  CheckCircle,
  FileSpreadsheet,
  ArrowUpRight,
  Shield,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCurrentUser } from "@/features/auth-login";
import { useInstituteBranding } from "@/entities/institute";
import styles from "./dashboard-overview.module.css";

export function DashboardOverview() {
  const user = useCurrentUser();
  const { instituteName, instituteTagline, branding } = useInstituteBranding();

  const displayName = user?.username || "Administrator";
  const currencySymbol = branding?.currencySymbol ?? "";

  return (
    <div className={styles.overviewContainer}>
      {/* Hero Welcome Glass Banner */}
      <section className={styles.heroBanner} aria-label="Dashboard Welcome">
        <div className={styles.heroLeft}>
          <div className={styles.institutePill}>
            <Building2 size={14} />
            <span>{instituteName ?? "Academic Workspace"}</span>
          </div>

          <h1 className={styles.heroTitle}>Welcome back, {displayName}</h1>
          <p className={styles.heroSubtitle}>
            {instituteTagline ??
              "Administrative overview and institutional operation controls."}
          </p>
        </div>

        <div className={styles.heroActions}>
          <Link
            href="/dashboard/students"
            className={`${styles.actionCapsule} ${styles.actionCapsulePrimary}`}
          >
            <UserPlus size={16} />
            <span>New Admission</span>
          </Link>

          <Link href="/dashboard/fees" className={styles.actionCapsule}>
            <Receipt size={16} />
            <span>Collect Fee</span>
          </Link>

          <Link href="/dashboard/attendance" className={styles.actionCapsule}>
            <CheckCircle size={16} />
            <span>Mark Attendance</span>
          </Link>
        </div>
      </section>

      {/* KPI Stats Cards (Optical Frosted Glass) */}
      <section className={styles.kpiGrid} aria-label="Key Performance Indicators">
        {/* KPI 1: Active Students */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiTitle}>Total Enrolled</span>
            <div className={styles.kpiIconWrapper}>
              <GraduationCap size={20} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>1,248</span>
            <span className={`${styles.kpiBadge} ${styles.kpiBadgeSuccess}`}>
              <ArrowUpRight size={12} />
              +5.4%
            </span>
          </div>
          <p className={styles.kpiFooter}>Active students in current academic term</p>
        </div>

        {/* KPI 2: Today's Attendance */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiTitle}>Today's Attendance</span>
            <div className={styles.kpiIconWrapper}>
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>96.8%</span>
            <span className={`${styles.kpiBadge} ${styles.kpiBadgeSuccess}`}>
              Present
            </span>
          </div>
          <p className={styles.kpiFooter}>1,208 / 1,248 logged present today</p>
        </div>

        {/* KPI 3: Fee Collection */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiTitle}>Monthly Fees</span>
            <div className={styles.kpiIconWrapper}>
              <CreditCard size={20} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>
              {currencySymbol} 845,000
            </span>
            <span className={`${styles.kpiBadge} ${styles.kpiBadgeAmber}`}>
              Reconciled
            </span>
          </div>
          <p className={styles.kpiFooter}>Collected this month through gateway</p>
        </div>

        {/* KPI 4: Active Batches / Classes */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiTitle}>Classes & Batches</span>
            <div className={styles.kpiIconWrapper}>
              <Layers size={20} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>32</span>
            <span className={`${styles.kpiBadge} ${styles.kpiBadgeSuccess}`}>
              Active
            </span>
          </div>
          <p className={styles.kpiFooter}>100% faculty assignees on schedule</p>
        </div>
      </section>

      {/* Two-Column Detail Section */}
      <section className={styles.contentGrid}>
        {/* Left Column: Recent Activity Feed */}
        <div className={styles.glassSectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Recent Operational Activity</h2>
              <p className={styles.sectionSubtitle}>
                Live administrative log of institutional events
              </p>
            </div>
            <Link
              href="/dashboard/reports"
              className={styles.actionCapsule}
              style={{ height: "36px", padding: "0 14px", fontSize: "0.8rem" }}
            >
              View Full Log
            </Link>
          </div>

          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIconBox}>
                <Receipt size={18} />
              </div>
              <div className={styles.activityDetails}>
                <span className={styles.activityTitle}>
                  Fee voucher reconciled: VCH-2026-092
                </span>
                <span className={styles.activityMeta}>
                  Student Roll #1042 • 10 minutes ago
                </span>
              </div>
              <span className={styles.activityStatus}>Confirmed</span>
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIconBox}>
                <UserPlus size={18} />
              </div>
              <div className={styles.activityDetails}>
                <span className={styles.activityTitle}>
                  New admission submitted: Class 7A
                </span>
                <span className={styles.activityMeta}>
                  Registration #T1-ADM-081 • 45 minutes ago
                </span>
              </div>
              <span className={styles.activityStatus}>Approved</span>
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIconBox}>
                <CalendarCheck size={18} />
              </div>
              <div className={styles.activityDetails}>
                <span className={styles.activityTitle}>
                  Morning attendance sheet signed & locked
                </span>
                <span className={styles.activityMeta}>
                  Classes 1 to 10 • Today 09:30 AM
                </span>
              </div>
              <span className={styles.activityStatus}>Completed</span>
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIconBox}>
                <Shield size={18} />
              </div>
              <div className={styles.activityDetails}>
                <span className={styles.activityTitle}>
                  Two-Factor authentication configured for staff account
                </span>
                <span className={styles.activityMeta}>
                  Security event • Yesterday 18:20
                </span>
              </div>
              <span className={styles.activityStatus}>Secured</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Management Shortcuts */}
        <div className={styles.glassSectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Institutional Shortcuts</h2>
              <p className={styles.sectionSubtitle}>
                Quick access to primary administrative tools
              </p>
            </div>
          </div>

          <div className={styles.quickLinksGrid}>
            <Link href="/dashboard/students" className={styles.quickLinkCard}>
              <div className={styles.quickLinkIcon}>
                <GraduationCap size={18} />
              </div>
              <span className={styles.quickLinkTitle}>Student Directory</span>
              <span className={styles.quickLinkDescription}>
                Profiles, documents & enrollment logs
              </span>
            </Link>

            <Link href="/dashboard/fees" className={styles.quickLinkCard}>
              <div className={styles.quickLinkIcon}>
                <Receipt size={18} />
              </div>
              <span className={styles.quickLinkTitle}>Fee Collection</span>
              <span className={styles.quickLinkDescription}>
                Vouchers, challans & fee adjustments
              </span>
            </Link>

            <Link href="/dashboard/attendance" className={styles.quickLinkCard}>
              <div className={styles.quickLinkIcon}>
                <Clock size={18} />
              </div>
              <span className={styles.quickLinkTitle}>Daily Roll Call</span>
              <span className={styles.quickLinkDescription}>
                Mark & verify present/absent sheets
              </span>
            </Link>

            <Link href="/dashboard/reports" className={styles.quickLinkCard}>
              <div className={styles.quickLinkIcon}>
                <FileSpreadsheet size={18} />
              </div>
              <span className={styles.quickLinkTitle}>Export Statements</span>
              <span className={styles.quickLinkDescription}>
                Official receipts and session summaries
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
