import type { SelectHTMLAttributes } from "react";
import { cx, ui } from "./uiStyles";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: SelectOption[];
};

export function Select({ label, options, className, id, ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm text-foreground" htmlFor={selectId}>
      {label ? <span className="font-medium">{label}</span> : null}
      <select
        id={selectId}
        className={cx(
          "h-10 w-full px-3",
          ui.radius,
          ui.border,
          ui.surface,
          ui.focus,
          ui.transition,
          ui.text,
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
