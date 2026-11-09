import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navItems } from "@/config/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { NavLink } from "@/components/navigation/nav-link";
import type { Locale } from "@/config/site";

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const dict = await getDictionary();

  const navLabels = {
    about: dict.nav.about,
    skills: dict.nav.skills,
    projects: dict.nav.projects,
    experience: dict.nav.experience,
    contact: dict.nav.contact,
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--color-bdr)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link
            href={`/${locale}`}
            className="font-mono font-bold text-lg tracking-tight hover:text-[var(--color-accent)] transition-colors"
            aria-label={`${siteConfig.displayName} - Home`}
          >
            <span className="text-[var(--color-accent)]">&gt;</span>
            <span className="ml-1">
              {siteConfig.displayName === "[YOUR_NAME]"
                ? "Portfolio"
                : siteConfig.displayName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label={dict.aria.main_nav}
            className="hidden md:flex items-center gap-6"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                href={item.href}
                label={navLabels[item.key as keyof typeof navLabels] ?? item.key}
              />
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher
              currentLocale={locale}
              className="hidden sm:flex"
            />
            <ThemeToggle ariaLabel={dict.theme.toggle} />
            <Link
              href={`/${locale}#contact`}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {dict.hero.cta_primary}
            </Link>
            {/* Mobile nav trigger */}
            <MobileNav
              locale={locale}
              navItems={navItems.map((item) => ({
                ...item,
                label:
                  navLabels[item.key as keyof typeof navLabels] ?? item.key,
              }))}
              openLabel={dict.nav.openMenu}
              closeLabel={dict.nav.closeMenu}
              langSwitcher={<LanguageSwitcher currentLocale={locale} />}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
