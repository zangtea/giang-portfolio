"use client";

import { useState, useEffect, useRef } from "react";
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
  contactLabel: string;
  menuTitle: string;
}

export function MobileNav({
  locale,
  navItems,
  openLabel,
  closeLabel,
  langSwitcher,
  contactLabel,
  menuTitle,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Keep keyboard focus inside the open drawer and restore it to the trigger.
  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
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
        ref={triggerRef}
        type="button"
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
        ref={menuRef}
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
          aria-label={menuTitle}
          aria-hidden={!isOpen}
          inert={!isOpen}
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
            ref={closeRef}
            type="button"
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
            className="px-4 py-2 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {contactLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
