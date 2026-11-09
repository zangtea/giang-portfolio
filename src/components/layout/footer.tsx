import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/config/site";

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const dict = await getDictionary();
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      href: siteConfig.github,
      icon: Github,
      label: dict.contact.github_label,
      show: siteConfig.github !== "[YOUR_GITHUB]",
    },
    {
      href: siteConfig.linkedin,
      icon: Linkedin,
      label: dict.contact.linkedin_label,
      show: siteConfig.linkedin !== "[YOUR_LINKEDIN]",
    },
    {
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      label: dict.contact.email_label,
      show: siteConfig.email !== "[YOUR_EMAIL]",
    },
  ].filter((link) => link.show);

  return (
    <footer className="border-t border-[var(--color-bdr)] bg-[var(--color-surf)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-[var(--color-mut)]">
            © {year}{" "}
            {siteConfig.displayName === "[YOUR_NAME]"
              ? "Portfolio"
              : siteConfig.displayName}
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
