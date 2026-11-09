import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default" &&
          "bg-[var(--color-surf)] text-[var(--color-fg)] border border-[var(--color-bdr)]",
        variant === "accent" &&
          "bg-[var(--color-brand-100)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)] dark:text-[var(--color-brand-200)]",
        variant === "muted" && "bg-[var(--color-surf)] text-[var(--color-mut)]",
        className
      )}
    >
      {children}
    </span>
  );
}
