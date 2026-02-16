"use client";

import type { ButtonHTMLAttributes } from "react";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

const variantStyles: Record<NonNullable<AppButtonProps["variant"]>, string> = {
  primary:
    "bg-main h-[50px] text-bg shadow-[0_12px_24px_-16px_rgba(0,47,108,0.7)] rounded-full",
  ghost:
    "h-[68px] bg-bg text-main font-semibold border border-text shadow-[0_10px_20px_-16px_rgba(0,0,0,0.25)] rounded-[20px]",
};

export default function AppButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <button
      type={type}
      className={`flex w-full items-center justify-center text-[18px] tracking-wide transition ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
