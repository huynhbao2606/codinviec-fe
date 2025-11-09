"use client";

import { Button as FBButton, type ButtonProps } from "flowbite-react";
import clsx from "clsx";

interface UiButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "accent" | "outline" | "outlineGoogle";
}

export function UiButton({
  children,
  variant = "primary",
  className,
  ...props
}: UiButtonProps) {
  const variants = {
    primary:
      "bg-primary hover:bg-primary-500 text-white focus:ring-primary-400",
    secondary:
      "bg-secondary hover:bg-secondary-600 text-accent-100 focus:ring-secondary-400",
    accent: "bg-accent hover:bg-accent-400 text-white focus:ring-accent-300",
    outline:
      "border border-red-600 text-red-400 hover:bg-primary-100 focus:ring-red-300",
    outlineGoogle:
      "border border-red-600 text-red-400 hover:bg-primary-100 focus:ring-red-300",
  };

  return (
    <FBButton
      className={clsx(
        "font-semibold rounded-lg transition-all duration-200 h-[44px] max-xl:h-[38px]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </FBButton>
  );
}
