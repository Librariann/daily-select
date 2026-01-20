"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
