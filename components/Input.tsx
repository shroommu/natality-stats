import type { InputHTMLAttributes } from "react";
import { cx, ui } from "./uiStyles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export function Input({
  label,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm text-foreground" htmlFor={inputId}>
      {label ? <span className="font-medium">{label}</span> : null}
      <input
        id={inputId}
        className={cx(
          "h-10 w-full px-3 placeholder:text-foreground/45",
          ui.radius,
          ui.border,
          ui.surface,
          ui.focus,
          ui.transition,
          ui.text,
          className,
        )}
        {...props}
      />
      {helperText ? <span className="text-xs text-foreground/70">{helperText}</span> : null}
    </label>
  );
}
