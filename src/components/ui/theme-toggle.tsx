"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const THEME_CHANGE_EVENT = "theme-change";

function getTheme(): Theme {
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

function applyTheme(theme: Theme, persist = false) {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }
}

function subscribeTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const handleStorage = (event: StorageEvent) => {
    if (event.key === "theme") {
      applyTheme(getTheme());
      callback();
    }
  };

  const handleSystemChange = () => {
    try {
      if (!localStorage.getItem("theme")) {
        applyTheme(getTheme());
        callback();
      }
    } catch {
      applyTheme(getTheme());
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  media.addEventListener("change", handleSystemChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    media.removeEventListener("change", handleSystemChange);
  };
}

interface ThemeToggleProps {
  className?: string;
  ariaLabel?: string;
}

export function ThemeToggle({
  className,
  ariaLabel = "Toggle theme",
}: ThemeToggleProps) {
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    getTheme,
    () => "light"
  );

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next, true);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
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