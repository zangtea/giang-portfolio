import { skillCategories } from "@/content/skills";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { SectionProps } from "@/components/sections/types";

export function SkillsSection({ dict, locale }: SectionProps) {
  return (
    <SectionWrapper id="skills" className="bg-[var(--color-surf)]">
      <SectionHeader title={dict.skills.title} subtitle={dict.skills.subtitle} />
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <section key={category.key} aria-labelledby={`skill-${category.key}`}>
            <h3 id={`skill-${category.key}`} className="mb-4 border-b border-[var(--color-bdr)] pb-3 text-base font-semibold">
              {category.label[locale]}
            </h3>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <li key={skill.name} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                  <span className="font-medium">{skill.name}</span>
                  {skill.context ? (
                    <span className="text-xs leading-5 text-[var(--color-mut)]">{skill.context[locale]}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionWrapper>
  );
}