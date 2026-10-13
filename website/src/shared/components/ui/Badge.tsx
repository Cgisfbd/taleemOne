import React, { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "accent";
}

export const Badge: React.FC<BadgeProps> = ({ children, className = "", variant = "default", ...props }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`} {...props}>
      {children}
    </span>
  );
};
