"use client";

import { Plus, Trash2 } from "lucide-react";
import { AiAutoFillButton } from "@/shared/ui/ai";
import type { MultilingualText } from "../model/types";
import styles from "./multilingual-paragraph.module.css";

interface MultilingualParagraphListFieldProps {
  paragraphs: MultilingualText[];
  onChange: (paragraphs: MultilingualText[]) => void;
  documentName: string;
}

export function MultilingualParagraphListField({
  paragraphs,
  onChange,
  documentName,
}: MultilingualParagraphListFieldProps) {
  const handleAdd = () => {
    onChange([
      ...paragraphs,
      { en: "", ur: "", hi: "" },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(paragraphs.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, key: keyof MultilingualText, value: string) => {
    const updated = [...paragraphs];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    onChange(updated);
  };

  return (
    <div className={styles.container}>
      {paragraphs.length === 0 ? (
        <div className={styles.emptyState}>
          No paragraphs added for {documentName} yet. Click below to add the first paragraph.
        </div>
      ) : (
        paragraphs.map((p, idx) => (
          <div key={idx} className={styles.paragraphCard}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>Paragraph #{idx + 1}</span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => handleRemove(idx)}
                aria-label={`Remove paragraph ${idx + 1}`}
                title="Remove paragraph"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className={styles.inputsGrid}>
              {/* English */}
              <div className={styles.textareaField}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>English</label>
                </div>
                <textarea
                  className={styles.textarea}
                  placeholder="Enter English paragraph..."
                  value={p.en || ""}
                  onChange={(e) => handleUpdate(idx, "en", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Urdu (RTL) */}
              <div className={styles.textareaField}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>Urdu (اردو)</label>
                  <AiAutoFillButton
                    sourceText={p.en || ""}
                    targetLanguage="ur"
                    isDescription={true}
                    onGenerated={(val) => handleUpdate(idx, "ur", val)}
                  />
                </div>
                <textarea
                  className={`${styles.textarea} ${styles.textareaUrdu}`}
                  placeholder="اردو پیراگراف درج کریں..."
                  value={p.ur || ""}
                  onChange={(e) => handleUpdate(idx, "ur", e.target.value)}
                  dir="rtl"
                  rows={3}
                />
              </div>

              {/* Hindi */}
              <div className={styles.textareaField}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>Hindi (हिंदी)</label>
                  <AiAutoFillButton
                    sourceText={p.en || ""}
                    targetLanguage="hi"
                    isDescription={true}
                    onGenerated={(val) => handleUpdate(idx, "hi", val)}
                  />
                </div>
                <textarea
                  className={`${styles.textarea} ${styles.textareaHindi}`}
                  placeholder="हिंदी विवरण दर्ज करें..."
                  value={p.hi || ""}
                  onChange={(e) => handleUpdate(idx, "hi", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className={styles.addBtn}
        onClick={handleAdd}
      >
        <Plus size={15} />
        <span>Add Paragraph</span>
      </button>
    </div>
  );
}
