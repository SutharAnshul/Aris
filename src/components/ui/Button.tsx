"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, disabled, ...props }, ref) => {
    const base =
      "flex h-13 min-h-11 w-full items-center justify-between rounded-[4px] pl-6 pr-2 text-[14px] font-medium tracking-wide uppercase transition-colors duration-150";

    const variants: Record<ButtonVariant, string> = {
      primary: disabled
        ? "bg-dark/35 text-surface cursor-not-allowed"
        : "bg-dark text-surface hover:bg-[#2e2e2e]",
      secondary: disabled
        ? "border border-border text-text-muted/50 cursor-not-allowed"
        : "border border-border text-text hover:border-text-muted",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.1 }}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
        {variant === "primary" ? (
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              disabled ? "bg-surface/15 text-surface/40" : "bg-primary text-dark"
            }`}
          >
            <ArrowRight size={16} strokeWidth={2.25} />
          </span>
        ) : null}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
