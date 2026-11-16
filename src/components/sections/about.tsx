import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { SectionProps } from "@/components/sections/types";

export function AboutSection({ dict }: SectionProps) {
  return (
    <SectionWrapper id="about">
      <SectionHeader title={dict.about.title} subtitle={dict.about.subtitle} />
      <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
        <p className="font-mono text-sm leading-7 text-[var(--color-accent)]">
          {dict.about.approach_title}
        </p>
        <div>
          <p className="text-lg leading-8 text-[var(--color-fg)]">
            {dict.about.approach}
          </p>
          <h3 className="mt-8 text-sm font-semibold uppercase text-[var(--color-mut)]">
            {dict.about.values_title}
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {dict.about.values.map((value) => (
              <li key={value} className="border-l-2 border-[var(--color-accent)] pl-3 text-sm leading-6">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}