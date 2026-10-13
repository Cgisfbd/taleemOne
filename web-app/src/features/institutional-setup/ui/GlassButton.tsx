import React from "react";
import { cn } from "@/shared/lib/utils";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cancel";
}

export const GlassButton = React.forwardRef<
  HTMLButtonElement,
  GlassButtonProps
>(({ className, variant = "primary", children, ...props }, ref) => {
  const baseStyles =
    "transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  let variantStyles = "";
  if (variant === "primary") {
    variantStyles =
      "px-6 py-2.5 rounded-xl text-white text-xs font-black hover:scale-105 active:scale-95 shadow-lg";
  } else if (variant === "cancel" || variant === "secondary") {
    variantStyles =
      "px-3.5 py-1.5 rounded-xl bg-gray-100/50 dark:bg-white/10 hover:bg-gray-200/50 dark:hover:bg-white/20 text-gray-500 dark:text-gray-300 font-bold text-xs";
  }

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variantStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
});
GlassButton.displayName = "GlassButton";
