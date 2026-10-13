"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import styles from "./module-placeholder.module.css";

interface ModulePlaceholderProps {
  title: string;
  category: string;
  description: string;
}

export function ModulePlaceholder({
  title,
  category,
  description,
}: ModulePlaceholderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        <div className={styles.badge}>
          <Sparkles size={14} />
          <span>{category}</span>
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <Link href="/dashboard" className={styles.backButton}>
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
