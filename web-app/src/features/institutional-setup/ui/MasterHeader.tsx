import React from "react";

export interface MasterHeaderProps {
  title: string;
  badgeContent?: React.ReactNode;
  badgeClassName?: string;
  extraContent?: React.ReactNode;
  children?: React.ReactNode;
}

export function MasterHeader({
  title,
  badgeContent,
  badgeClassName,
  extraContent,
  children,
}: MasterHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3 h-9 px-3.5 py-1.5 rounded-xl bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {title}
        </span>
        {extraContent}
      </div>

      <div className="flex items-center gap-3">
        {children}

        {badgeContent && (
          <div
            className={`text-[11px] font-bold px-3.5 py-1.5 rounded-xl border ${
              badgeClassName || "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {badgeContent}
          </div>
        )}
      </div>
    </div>
  );
}
