import React from "react";

export interface GlobalMasterCardProps {
  children?: React.ReactNode;
}

export function GlobalMasterCard({ children }: GlobalMasterCardProps) {
  return (
    <div className="w-full min-h-0 p-4 md:p-5 rounded-2xl bg-white/20 dark:bg-black/20 border border-white/70 dark:border-white/10 backdrop-blur-xl shadow-xl">
      {children}
    </div>
  );
}
