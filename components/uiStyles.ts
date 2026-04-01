export const ui = {
  radius: "rounded-xl",
  border: "border border-foreground/20",
  focus:
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  transition: "transition-colors duration-150",
  text: "text-sm text-foreground",
  surface: "bg-background",
  muted: "bg-foreground/5",
};

export function cx(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}
