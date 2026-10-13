"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Layers,
  CalendarCheck,
  CreditCard,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { BRAND } from "@/shared/config/brand";
import styles from "./sidebar.module.css";

export interface NavItemDef {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const PRIMARY_NAV_ITEMS: NavItemDef[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Students", href: "/dashboard/students", icon: GraduationCap },
  { label: "Classes & Batches", href: "/dashboard/classes", icon: Layers },
  { label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
  { label: "Fees & Billing", href: "/dashboard/fees", icon: CreditCard },
  { label: "Staff Members", href: "/dashboard/staff", icon: Users },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""} ${
          mobileOpen ? styles.sidebarMobileOpen : ""
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* Brand header: Click logo card to toggle collapse/expand */}
        <button
          type="button"
          className={styles.brandHeader}
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar navigation" : "Collapse sidebar navigation"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <div className={styles.brandCardCollapsed}>
              <Image
                src={BRAND.crest}
                alt={BRAND.name}
                width={36}
                height={36}
                className={styles.brandLogo}
                priority
              />
            </div>
          ) : (
            <div className={styles.brandCardExpanded}>
              <div className={styles.brandLogoPod}>
                <Image
                  src={BRAND.crest}
                  alt={BRAND.name}
                  width={34}
                  height={34}
                  className={styles.brandLogo}
                  priority
                />
              </div>
              <div className={styles.brandText}>
                <span>{BRAND.name}</span>
                <span className={styles.productBadge}>{BRAND.product}</span>
              </div>
            </div>
          )}
        </button>

        {/* Navigation list */}
        <nav className={styles.navSection} aria-label="Main menu">
          {!collapsed && <div className={styles.navSectionLabel}>Administration</div>}

          {PRIMARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                title={collapsed ? item.label : undefined}
                onClick={onCloseMobile}
              >
                <span className={styles.navIconWrapper}>
                  <Icon size={20} />
                </span>
                {!collapsed && (
                  <>
                    <span className={styles.navLabel}>{item.label}</span>
                    {isActive && <span className={styles.navActiveDot} />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
