import React from "react";
import { cn } from "@/shared/lib/utils";

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full h-10 px-4 py-2 rounded-xl bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/60 dark:border-white/10 outline-none text-gray-900 dark:text-white transition-all font-bold text-xs placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500",
          className
        )}
        {...props}
      />
    );
  }
);
GlassInput.displayName = "GlassInput";
