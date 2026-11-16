import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/config/site";

const currentYear = new Date().getFullYear();

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const dict = await getDictionary(locale);

  const socialLinks = [
    {
      href: siteConfig.github,
      icon: SiGithub,
      label: dict.contact.github_label,
      show: true,
    },
    {
      href: siteConfig.linkedin,
      icon: FaLinkedinIn,
      label: dict.contact.linkedin_label,
      show: true,
    },
    {
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      label: dict.contact.email_label,
      show: true,
    },
  ].filter((link) => link.show);

  return (
    <footer className="border-t border-[var(--color-bdr)] bg-[var(--color-surf)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-[var(--color-mut)]">
            © {currentYear}{" "}
            <Link href={`/${locale}`} className="font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)]">
              {siteConfig.displayName}
            </Link>
            . {dict.footer.rights}.
          </p>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div
              className="flex items-center gap-3"
              aria-label={dict.aria.social_links}
            >
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-mut)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surf-hover)] transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}

          {/* Built with */}
          <p className="text-xs text-[var(--color-mut)]">
            {dict.footer.built_with}{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1"
            >
              Next.js
              <ExternalLink size={10} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
