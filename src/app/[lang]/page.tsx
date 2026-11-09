import { isValidLocale, siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { ContactSection } from "@/components/sections/contact";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary();

  return (
    <>
      <HeroSection dict={dict} locale={lang} />
      <AboutSection dict={dict} locale={lang} />
      <SkillsSection dict={dict} locale={lang} />
      <ProjectsSection dict={dict} locale={lang} />
      <ExperienceSection dict={dict} locale={lang} />
      <ContactSection dict={dict} locale={lang} />
    </>
  );
}
