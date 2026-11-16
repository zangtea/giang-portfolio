import Link from "next/link";
import { projects } from "@/content/projects/projects";
import { experienceItems } from "@/content/experience";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { SectionProps } from "@/components/sections/types";

export function ExperienceSection({ dict, locale }: SectionProps) {
  const education = experienceItems.filter(
    (item) => item.visible && item.type === "education"
  );

  return (
    <SectionWrapper id="experience">
      <SectionHeader title={dict.experience.title} subtitle={dict.experience.subtitle} />
      <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
        {education.length > 0 ? (
          <section aria-labelledby="education-heading">
            <h3 id="education-heading" className="mb-5 text-lg font-semibold">
              {dict.experience.education}
            </h3>
            <ul className="space-y-5">
              {education.map((item) => (
                <li key={item.id} className="border-l-2 border-[var(--color-accent)] pl-4">
                  <p className="font-medium">{item.title[locale]}</p>
                  {item.organization[locale] ? (
                    <p className="mt-1 text-sm text-[var(--color-mut)]">{item.organization[locale]}</p>
                  ) : null}
                  {item.period ? <p className="mt-1 text-xs text-[var(--color-mut)]">{item.period}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <section aria-labelledby="project-work-heading" className="md:col-start-2">
          <h3 id="project-work-heading" className="mb-5 text-lg font-semibold">
            {dict.experience.work}
          </h3>
          <ul className="divide-y divide-[var(--color-bdr)] border-y border-[var(--color-bdr)]">
            {projects.map((project) => (
              <li key={project.slug} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="mt-1 text-sm text-[var(--color-mut)]">{project.role[locale]}</p>
                </div>
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="mt-2 inline-flex w-fit text-sm font-medium text-[var(--color-accent)] hover:underline sm:mt-0"
                >
                  {dict.projects.view_detail}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SectionWrapper>
  );
}