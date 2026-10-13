"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Shield,
  ShieldCheck,
  UserCog,
  UserPlus,
} from "lucide-react";
import { useAuthStore, useCurrentUser, useAccessToken } from "@/features/auth-login";
import { httpClient } from "@/shared/api/httpClient";
import { resolveAssetUrl } from "@/shared/config/env";
import styles from "./topbar.module.css";

interface TopbarProps {
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export function Topbar({ onToggleSidebar, isSidebarCollapsed }: TopbarProps = {}) {
  const router = useRouter();
  const accessToken = useAccessToken();
  const user = useCurrentUser();
  const logout = useAuthStore((s) => s.logout);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Authoritative Backend Identity: STRICT ZERO Hardcoding
  const displayName = (() => {
    if (!user) return null;
    if (typeof user.fullName === "string" && user.fullName.trim()) return user.fullName.trim();
    if (typeof user.name === "string" && user.name.trim()) return user.name.trim();
    if (typeof user.displayName === "string" && user.displayName.trim()) return user.displayName.trim();
    const first = typeof user.firstName === "string" ? user.firstName.trim() : "";
    const last = typeof user.lastName === "string" ? user.lastName.trim() : "";
    if (first || last) return `${first} ${last}`.trim();
    if (typeof user.username === "string" && user.username.trim()) return user.username.trim();
    if (typeof user.email === "string" && user.email.trim()) return user.email.trim();
    return null;
  })();

  const displayRole = (() => {
    if (!user) return null;
    let rawRole: string | null = null;
    if (typeof user.role === "string" && user.role.trim()) {
      rawRole = user.role.trim();
    } else if (Array.isArray(user.roles) && typeof user.roles[0] === "string" && user.roles[0].trim()) {
      rawRole = user.roles[0].trim();
    } else if (typeof user.designation === "string" && user.designation.trim()) {
      rawRole = user.designation.trim();
    }
    if (!rawRole) return null;
    return rawRole
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  })();

  const displayEmail = (() => {
    if (!user) return null;
    if (typeof user.email === "string" && user.email.trim()) return user.email.trim();
    return null;
  })();

  const avatarSrc = (() => {
    if (!user) return null;
    const url = typeof user.avatarUrl === "string" ? user.avatarUrl.trim() : null;
    if (!url) return null;
    return resolveAssetUrl(url);
  })();

  const getInitials = (nameStr?: string | null): string => {
    if (!nameStr) return "";
    const parts = nameStr.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = displayName ? getInitials(displayName) : "";

  // On mount, if user is authenticated and missing role or full profile, query /api/v1/auth/me from backend
  useEffect(() => {
    if (accessToken && (!user?.role || !user?.fullName)) {
      httpClient
        .get("/api/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const resData = res.data?.data?.user ?? res.data?.user ?? res.data?.data ?? res.data;
          if (resData && typeof resData === "object") {
            updateUser(resData);
          }
        })
        .catch(() => {
          // If endpoint is not yet available, keep existing session data without fabricating
        });
    }
  }, [accessToken, user?.role, user?.fullName, updateUser]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setShowProfileMenu(false);
      await httpClient.post("/api/v1/auth/logout", {}).catch(() => {});
    } finally {
      logout();
      router.push("/login");
    }
  };

  return (
    <header className={styles.topbar} aria-label="Dashboard Top Bar">
      {/* Center section: Polished Centered Search Box */}
      <div className={styles.centerGroup}>
        <div className={styles.searchBox}>
          <div className={styles.searchIconPod}>
            <Search size={17} className={styles.searchIcon} />
          </div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search dashboard records"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.searchClearBtn}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <div className={styles.searchKbdWrapper}>
            <kbd className={styles.searchKbd}>
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </div>
        </div>
      </div>

      {/* Right section: Well icon (Notifications), Profile Icon */}
      <div className={styles.rightGroup}>

        {/* Well Icon (Notification bell) */}
        <div className={styles.iconButtonWrapper} ref={notifRef}>
          <button
            type="button"
            className={`${styles.iconButton} ${showNotifications ? styles.iconButtonActive : ""}`}
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={20} />
            <span className={styles.badgeDot} />
          </button>

          {/* Notifications Dropdown (Frosted Optical Glass) */}
          {showNotifications && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                <h4 className={styles.dropdownTitle}>Notifications</h4>
                <p className={styles.dropdownSubtitle}>
                  Recent institutional system activity
                </p>
              </div>

              <div className={styles.notificationList}>
                <div className={styles.notificationEmpty}>
                  <Bell size={22} className={styles.notificationEmptyIcon} />
                  <span className={styles.notificationEmptyText}>
                    No unread notifications
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown Container (Frontend Style) */}
        <div className={styles.iconButtonWrapper} ref={profileRef}>
          <button
            type="button"
            className={styles.profileTrigger}
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
              setShowNotifications(false);
            }}
            aria-label="Staff User Profile"
            aria-expanded={showProfileMenu}
            title={displayName ? `${displayName}${displayRole ? ` (${displayRole})` : ""}` : undefined}
          >
            <div
              className={`${styles.profileAvatarRing} ${
                showProfileMenu ? styles.profileAvatarRingActive : ""
              }`}
            >
              <div className={styles.profileAvatarInner}>
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={displayName ?? "User"}
                    className={styles.avatarImage}
                  />
                ) : initials ? (
                  initials
                ) : (
                  <User size={18} className={styles.profileUserFallbackIcon} />
                )}
              </div>
            </div>

            <div className={styles.profileMeta}>
              <span className={styles.profileName}>
                {displayName ?? <span className={styles.skeletonLineShort} />}
              </span>
              <span className={styles.profileRole}>
                {displayRole ?? <span className={styles.skeletonLineTiny} />}{" "}
                <ChevronDown
                  size={12}
                  className={`${styles.profileChevron} ${
                    showProfileMenu ? styles.profileChevronActive : ""
                  }`}
                />
              </span>
            </div>
          </button>

          {/* Profile Dropdown Menu Card (Frontend Style) */}
          {showProfileMenu && (
            <div className={styles.profileDropdownCard}>
              <div className={styles.dropdownCardHeader}>
                <div className={styles.dropdownHeaderUserRow}>
                  <div className={styles.dropdownHeaderAvatar}>
                    <div className={styles.dropdownHeaderAvatarInner}>
                      {avatarSrc ? (
                        <img
                          src={avatarSrc}
                          alt={displayName ?? "User"}
                          className={styles.avatarImage}
                        />
                      ) : initials ? (
                        initials
                      ) : (
                        <User size={16} className={styles.profileUserFallbackIcon} />
                      )}
                    </div>
                  </div>
                  <div className={styles.dropdownHeaderMeta}>
                    <p className={styles.dropdownHeaderName}>
                      {displayName ?? <span className={styles.skeletonLineShort} />}
                    </p>
                    <p className={styles.dropdownHeaderEmail}>
                      {displayEmail ?? <span className={styles.skeletonLineTiny} />}
                    </p>
                  </div>
                </div>

                {displayRole && (
                  <div className={styles.dropdownHeaderRoleBadge}>
                    <ShieldCheck size={12} className={styles.badgeShieldIcon} />
                    <span>{displayRole}</span>
                  </div>
                )}
              </div>

              <div className={styles.dropdownCardBody}>
                <Link
                  href="/dashboard/institutional-setup"
                  onClick={() => setShowProfileMenu(false)}
                  className={styles.dropdownActionItem}
                >
                  <div className={styles.actionIconPod}>
                    <Shield size={16} />
                  </div>
                  <span className={styles.actionLabel}>Institutional Setup</span>
                </Link>

                <Link
                  href="/dashboard/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className={styles.dropdownActionItem}
                >
                  <div className={styles.actionIconPod}>
                    <UserCog size={16} />
                  </div>
                  <span className={styles.actionLabel}>Profile Settings</span>
                </Link>

                <Link
                  href="/dashboard/staff"
                  onClick={() => setShowProfileMenu(false)}
                  className={styles.dropdownActionItem}
                >
                  <div className={styles.actionIconPod}>
                    <UserPlus size={16} />
                  </div>
                  <span className={styles.actionLabel}>User Accounts</span>
                </Link>

                <div className={styles.dropdownDivider} />

                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${styles.dropdownActionItem} ${styles.actionLogout}`}
                >
                  <div className={`${styles.actionIconPod} ${styles.actionLogoutIconPod}`}>
                    <LogOut size={16} />
                  </div>
                  <span className={styles.actionLabel}>Secure Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
