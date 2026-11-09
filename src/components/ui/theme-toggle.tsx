"use client";

import { useLayoutEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
}

interface ThemeToggleProps {
  className?: string;
  ariaLabel?: string;
}

export function ThemeToggle({
  className,
  ariaLabel = "Toggle theme",
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Re-apply after React Strict Mode dev remount clears data-theme
  useLayoutEffect(() => {
    const current = getTheme();
    setTheme(current);
    applyTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full",
        "text-[var(--color-fg)] hover:bg-[var(--color-surf)] transition-colors",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]",
        className
      )}
    >
      {/* Sun icon: visible when theme is dark (click to go light) */}
      <Sun
        size={18}
        className="absolute transition-all duration-300"
        style={{
          opacity: theme === "dark" ? 1 : 0,
          transform:
            theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
        }}
      />
      {/* Moon icon: visible when theme is light (click to go dark) */}
      <Moon
        size={18}
        className="absolute transition-all duration-300"
        style={{
          opacity: theme === "light" ? 1 : 0,
          transform:
            theme === "light" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
        }}
      />
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
}
