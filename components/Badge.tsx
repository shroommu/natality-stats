import type { HTMLAttributes, ReactNode } from "react";
import { cx, ui } from "./uiStyles";

type BadgeVariant = "default" | "muted";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-foreground text-white",
  muted: "bg-foreground/10 text-foreground",
};

export function Badge({
  children,
  variant = "muted",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium",
        ui.radius,
        ui.transition,
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
