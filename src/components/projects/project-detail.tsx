import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects, type Project } from "@/content/projects/projects";
import { siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/components/sections/types";

interface ProjectDetailProps {
  project: Project;
  dict: Dictionary;
  locale: Locale;
}

export function ProjectDetail({ project, dict, locale }: ProjectDetailProps) {
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link href={`/${locale}#projects`} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-mut)] hover:text-[var(--color-accent)]">
        <ArrowLeft size={16} aria-hidden="true" />
        {dict.projects.back_to_projects}
      </Link>
      <header className="border-b border-[var(--color-bdr)] py-10 sm:py-14">
        <p className="mb-4 font-mono text-sm text-[var(--color-accent)]">{dict.projects.project_label}</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{project.title}</h1>
        <h2 className="mt-6 text-base font-semibold">{dict.projects.overview}</h2>
        <p className="mt-2 max-w-2xl text-lg leading-8 text-[var(--color-mut)]">{project.overview[locale]}</p>
        {project.technicalNote ? (
          <p className="mt-5 border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-6 text-[var(--color-mut)]">
            {project.technicalNote[locale]}
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 border border-[var(--color-bdr)] px-4 py-2 text-sm font-semibold hover:border-[var(--color-accent)]">
              <SiGithub size={16} aria-hidden="true" />
              {dict.projects.source_code}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 border border-[var(--color-bdr)] px-4 py-2 text-sm font-semibold hover:border-[var(--color-accent)]">
              {dict.projects.view_demo}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </header>

      <div className="divide-y divide-[var(--color-bdr)]">
        <DetailSection title={dict.projects.problem}>
          <p>{project.problem[locale]}</p>
        </DetailSection>
        <DetailSection title={dict.projects.solution}>
          <p>{project.solution[locale]}</p>
        </DetailSection>
        <DetailSection title={dict.projects.architecture}>
          <p>{project.architecture[locale]}</p>
        </DetailSection>
        <DetailSection title={dict.projects.features}>
          <ul className="list-disc space-y-2 pl-5">
            {project.features[locale].map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </DetailSection>
        <DetailSection title={dict.projects.tech_stack}>
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((technology) => (
              <li key={technology} className="border border-[var(--color-bdr)] px-3 py-1.5 font-mono text-sm">{technology}</li>
            ))}
          </ul>
        </DetailSection>
        <DetailSection title={dict.projects.my_role}>
          <p>{project.role[locale]}</p>
        </DetailSection>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-bdr)] pt-6">
        <Link href={`/${locale}/projects/${nextProject.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--color-accent)]">
          {dict.projects.next_project}: {nextProject.title}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link href={`/${locale}#contact`} className="text-sm font-semibold text-[var(--color-accent)] hover:underline">
          {dict.projects.contact_cta} {siteConfig.displayName}
        </Link>
      </div>
    </article>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 py-7 sm:grid-cols-[200px_1fr] sm:gap-8">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="space-y-3 leading-7 text-[var(--color-mut)]">{children}</div>
    </section>
  );
}