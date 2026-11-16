import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { siteConfig } from "@/config/site";
import { HeroVisualLoader } from "@/components/sections/hero-visual-loader";
import type { SectionProps } from "@/components/sections/types";

export function HeroSection({ dict, locale }: SectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[var(--color-bdr)]"
    >
      <div className="mx-auto grid min-h-[min(760px,calc(100svh-4rem))] max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 flex items-center gap-3 text-sm font-medium text-[var(--color-mut)]">
            {siteConfig.avatarUrl ? (
              <Image src={siteConfig.avatarUrl} alt={siteConfig.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-bdr)] font-mono text-sm text-[var(--color-accent)]">TG</span>
            )}
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              {dict.hero.greeting}
            </span>
          </div>
          <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl">
            <span className="block text-[var(--color-fg)]">{siteConfig.displayName}</span>
            <span className="mt-3 block text-[var(--color-accent)]">
              {dict.hero.headline}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--color-mut)] sm:text-lg">
            {siteConfig.bio[locale]}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}#contact`}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[var(--color-accent-strong)]"
            >
              {dict.hero.cta_primary}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}#projects`}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-[var(--color-bdr)] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[var(--color-surf)]"
            >
              {dict.hero.cta_secondary}
              <ArrowDown size={16} aria-hidden="true" />
            </Link>
            {siteConfig.cvUrl ? (
              <a
                href={siteConfig.cvUrl}
                download
                className="inline-flex min-h-11 items-center gap-2 px-2 py-3 text-sm font-semibold text-[var(--color-mut)] transition-colors hover:text-[var(--color-fg)]"
              >
                <Download size={16} aria-hidden="true" />
                {dict.hero.cta_cv}
              </a>
            ) : null}
          </div>
          <div className="mt-9 flex items-center gap-4">
            <span className="text-xs font-medium uppercase text-[var(--color-mut)]">
              {dict.hero.find_me}
            </span>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-bdr)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <SiGithub size={17} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-bdr)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <FaLinkedinIn size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <HeroVisualLoader />
      </div>
    </section>
  );
}