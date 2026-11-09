import { notFound } from "next/navigation";
import { isValidLocale, siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionaries";
import { projects } from "@/content/projects";
import { ProjectDetail } from "@/components/projects/project-detail";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return siteConfig.locales.flatMap((lang) =>
    projects.map((project) => ({ lang, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = isValidLocale(lang) ? lang : siteConfig.defaultLocale;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.shortDesc[locale],
    openGraph: {
      title: project.title,
      description: project.shortDesc[locale],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const dict = await getDictionary();

  return <ProjectDetail project={project} dict={dict} locale={lang} />;
}
