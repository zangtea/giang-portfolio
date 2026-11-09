import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <p className="text-sm font-mono font-medium text-[var(--color-accent)] mb-2 tracking-wider uppercase">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      <div
        className={cn(
          "mt-3 h-1 w-12 rounded-full bg-[var(--color-accent)]",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
