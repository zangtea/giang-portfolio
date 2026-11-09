"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import type { ReactNode } from "react";

interface MobileNavItem {
  key: string;
  href: string;
  label: string;
}

interface MobileNavProps {
  locale: Locale;
  navItems: MobileNavItem[];
  openLabel: string;
  closeLabel: string;
  langSwitcher: ReactNode;
}

export function MobileNav({
  locale,
  navItems,
  openLabel,
  closeLabel,
  langSwitcher,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleNavClick(href: string) {
    setIsOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        aria-label={openLabel}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--color-surf)] transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 max-w-full",
          "bg-[var(--color-bg)] border-l border-[var(--color-bdr)]",
          "flex flex-col p-6 shadow-2xl",
          "transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono font-bold text-[var(--color-accent)]">
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label={closeLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--color-surf)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="px-4 py-3 rounded-lg text-base font-medium hover:bg-[var(--color-surf)] hover:text-[var(--color-accent)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="pt-6 border-t border-[var(--color-bdr)] flex items-center justify-between">
          {langSwitcher}
          <Link
            href={`/${locale}#contact`}
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-full bg-[var(--color-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
