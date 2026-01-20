"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-slate-900 text-white hover:bg-slate-800": variant === "primary",
            "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === "secondary",
            "bg-transparent text-slate-600 hover:bg-slate-100": variant === "ghost",
            "border-2 border-slate-200 bg-white text-slate-900 hover:border-slate-300": variant === "outline",
          },
          {
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
