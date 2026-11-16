import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ContactForm } from "@/components/sections/contact-form";
import type { SectionProps } from "@/components/sections/types";

export function ContactSection({ dict }: SectionProps) {
  return (
    <SectionWrapper id="contact">
      <SectionHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="max-w-md leading-7 text-[var(--color-mut)]">{dict.contact.description}</p>
          <ul className="mt-8 space-y-4">
            <li>
              <a className="inline-flex items-center gap-3 hover:text-[var(--color-accent)]" href={`mailto:${siteConfig.email}`}>
                <Mail size={18} aria-hidden="true" />
                <span>{siteConfig.email}</span>
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-3 hover:text-[var(--color-accent)]" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                <SiGithub size={18} aria-hidden="true" />
                <span>{dict.contact.github_label}</span>
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-3 hover:text-[var(--color-accent)]" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={18} aria-hidden="true" />
                <span>{dict.contact.linkedin_label}</span>
              </a>
            </li>
          </ul>
        </div>

        <ContactForm labels={dict.contact} />
      </div>
    </SectionWrapper>
  );
}