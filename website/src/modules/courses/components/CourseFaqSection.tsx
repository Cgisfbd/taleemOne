"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/shared/i18n";

export const CourseFaqSection: React.FC = () => {
  const { t } = useLanguage();
  const cp = (t as any).coursesPage;
  const faq = cp?.faq;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq || !faq.items) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-black shadow-xs mb-2.5 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{faq.badge}</span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1E1128] dark:text-[#FAF6FC] mb-2">
            {faq.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#6B5A73] dark:text-[#C8BDCF] max-w-xl leading-relaxed">
            {faq.subtitle}
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {faq.items.map((item: any, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-white/80 dark:bg-[#160E1F]/80 backdrop-blur-xl border border-black/10 dark:border-white/10 transition-all shadow-xs text-start"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-start font-bold text-xs sm:text-sm text-[#1E1128] dark:text-[#FAF6FC] hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center bg-amber-500/15 text-amber-900 dark:text-amber-300 text-xs font-black shrink-0">
                      ?
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8E7E96] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-[13px] text-[#5C4A66] dark:text-[#C8BDCF] leading-relaxed border-t border-black/5 dark:border-white/5 pt-3">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
