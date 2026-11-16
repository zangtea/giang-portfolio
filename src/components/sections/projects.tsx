"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type ProjectCategory } from "@/content/projects/projects";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { SectionProps } from "@/components/sections/types";

type ProjectFilter = ProjectCategory | "all";

export function ProjectsSection({ dict, locale }: SectionProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const filters: { key: ProjectFilter; label: string }[] = [
    { key: "all", label: dict.projects.filter_all },
    { key: "web-app", label: dict.projects.filter_web },
    { key: "tool", label: dict.projects.filter_tool },
    { key: "e-commerce", label: dict.projects.filter_ecommerce },
    { key: "ai-ml", label: dict.projects.filter_ai },
  ];
  const visibleProjects =
    filter === "all" ? projects : projects.filter((project) => project.category === filter);

  return (
    <SectionWrapper id="projects" className="bg-[var(--color-surf)]">
      <SectionHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={dict.projects.filter_group}>
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={filter === item.key}
            onClick={() => setFilter(item.key)}
            className={`min-h-10 rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === item.key
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                : "border-[var(--color-bdr)] hover:border-[var(--color-accent)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <li key={project.slug}>
            <article className="group flex h-full flex-col border border-[var(--color-bdr)] bg-[var(--color-bg)] p-5 transition-colors hover:border-[var(--color-accent)] sm:p-6">
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[var(--color-mut)]">
                  {project.slug.toUpperCase().replaceAll("-", " / ")}
                </span>
                <span className="h-1 w-16 bg-[var(--color-accent)]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-3 min-h-12 text-sm leading-6 text-[var(--color-mut)]">
                {project.shortDesc[locale]}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={dict.projects.tech_stack}>
                {project.techStack.slice(0, 4).map((technology) => (
                  <li key={technology} className="border border-[var(--color-bdr)] px-2 py-1 font-mono text-xs">
                    {technology}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--color-accent)]"
              >
                {dict.projects.view_detail}
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}