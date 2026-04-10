import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx, ui } from "./uiStyles";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-white hover:opacity-90",
  secondary: "bg-foreground/10 text-foreground hover:bg-foreground/15",
  ghost: "bg-transparent text-foreground hover:bg-foreground/10",
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex h-10 items-center justify-center px-4 font-medium",
        ui.radius,
        ui.border,
        ui.focus,
        ui.transition,
        ui.text,
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
