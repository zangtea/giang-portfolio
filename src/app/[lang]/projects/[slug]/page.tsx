import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { isValidLocale, siteConfig, type Locale } from "@/config/site";
import { projects } from "@/content/projects/projects";

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.locales.flatMap((lang) =>
    projects.map((project) => ({
      lang,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};

  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | ${siteConfig.displayName}`,
    description: project.overview[lang],
    openGraph: {
      title: `${project.title} — ${siteConfig.displayName}`,
      description: project.overview[lang],
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const projectIndex = projects.findIndex((project) => project.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const labels =
    locale === "vi"
      ? {
          back: "Quay lại danh sách dự án",
          role: "Vai trò thực hiện",
          stack: "Công nghệ sử dụng",
          problem: "Vấn đề & Mục tiêu",
          solution: "Giải pháp kỹ thuật",
          architecture: "Kiến trúc hệ thống",
          features: "Các tính năng đã triển khai",
          source: "Xem mã nguồn (GitHub)",
          demo: "Truy cập Live Demo",
          next: "Dự án tiếp theo",
          discuss: "Thảo luận dự án tương tự",
        }
      : {
          back: "Back to projects",
          role: "Role",
          stack: "Tech Stack",
          problem: "Problem & Objectives",
          solution: "Technical Solution",
          architecture: "System Architecture",
          features: "Implemented Features",
          source: "Source Code (GitHub)",
          demo: "Open Live Demo",
          next: "Next Project",
          discuss: "Discuss a Similar Project",
        };

  return (
    <article className="mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}#projects`}
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {labels.back}
      </Link>

      <header className="space-y-4 border-b border-[var(--color-border)] pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded border border-[var(--color-border)] bg-[var(--color-surf)] px-2.5 py-1 text-xs font-mono uppercase">
            {labels.role}: {project.role[locale]}
          </span>
          {project.technicalNote && (
            <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-600 dark:text-amber-400">
              {locale === "vi" ? "Đang xác minh thông tin" : "Verification pending"}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="text-lg leading-relaxed text-[var(--color-muted)]">{project.overview[locale]}</p>

        {project.technicalNote && (
          <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surf)] p-3 text-sm text-[var(--color-muted)]">
            {project.technicalNote[locale]}
          </p>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surf)]"
            >
              <SiGithub size={16} />
              {labels.source}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <ExternalLink size={16} aria-hidden="true" />
              {labels.demo}
            </a>
          )}
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">{labels.stack}</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surf)] px-3 py-1.5 font-mono text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="space-y-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surf)] p-6">
          <h2 className="text-lg font-bold">{labels.problem}</h2>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">{project.problem[locale]}</p>
        </section>

        <section className="space-y-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surf)] p-6">
          <h2 className="text-lg font-bold">{labels.solution}</h2>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">{project.solution[locale]}</p>
        </section>
      </div>

      <section className="space-y-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surf)] p-6">
        <h2 className="text-lg font-bold">{labels.architecture}</h2>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{project.architecture[locale]}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">{labels.features}</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
          {project.features[locale].map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <footer className="flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center">
        <Link
          href={`/${locale}#contact`}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Mail size={16} aria-hidden="true" />
          {labels.discuss}
        </Link>

        <Link
          href={`/${locale}/projects/${nextProject.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--color-accent)]"
        >
          {labels.next}: {nextProject.title}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}