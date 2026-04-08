import type { HTMLAttributes, ReactNode } from "react";
import { cx, ui } from "./uiStyles";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  children?: ReactNode;
};

export function Card({
  title,
  description,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cx(
        "p-5",
        ui.radius,
        ui.border,
        ui.surface,
        ui.text,
        className,
      )}
      {...props}
    >
      {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
      {description ? (
        <p className={cx("mt-1 text-sm text-foreground/70")}>{description}</p>
      ) : null}
      {children ? <div className={cx(title || description ? "mt-4" : "")}>{children}</div> : null}
    </div>
  );
}
