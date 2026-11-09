"use client";

import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function NavLink({ href, label, className }: NavLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "text-sm font-medium text-[var(--color-mut)] hover:text-[var(--color-fg)] transition-colors",
        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
        "after:bg-[var(--color-accent)] after:transition-all after:duration-200",
        "hover:after:w-full",
        className
      )}
    >
      {label}
    </a>
  );
}
