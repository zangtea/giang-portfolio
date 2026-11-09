export interface Skill {
  name: string;
  context?: string; // brief usage context
}

export interface SkillCategory {
  key: string;
  label: { vi: string; en: string };
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    label: { vi: "Frontend", en: "Frontend" },
    skills: [
      { name: "React", context: "SPA, SSR, RSC" },
      { name: "Next.js", context: "App Router, SSR, SSG" },
      { name: "TypeScript", context: "Strict mode" },
      { name: "Tailwind CSS", context: "v3, v4" },
      { name: "Framer Motion", context: "Animation" },
    ],
  },
  {
    key: "backend",
    label: { vi: "Backend", en: "Backend" },
    skills: [
      { name: "Node.js", context: "API, scripting" },
      { name: "Express.js", context: "REST API" },
      { name: "Python", context: "AI/ML engine" },
    ],
  },
  {
    key: "database",
    label: { vi: "Database", en: "Database" },
    skills: [
      { name: "PostgreSQL", context: "Supabase, raw SQL" },
      { name: "MySQL", context: "Prisma ORM" },
      { name: "Supabase", context: "Auth, Storage, RLS" },
      { name: "Prisma", context: "ORM" },
    ],
  },
  {
    key: "languages",
    label: { vi: "Ngôn ngữ lập trình", en: "Programming Languages" },
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "SQL" },
    ],
  },
  {
    key: "tools",
    label: { vi: "Công cụ & Quy trình", en: "Tools & Workflow" },
    skills: [
      { name: "Git", context: "GitHub, branching" },
      { name: "Vercel", context: "Deploy, CI/CD" },
      { name: "Docker", context: "Container basics" },
      { name: "ESLint", context: "Code quality" },
      { name: "Figma", context: "UI reference" },
    ],
  },
  {
    key: "ai-ml",
    label: { vi: "AI / ML", en: "AI / ML" },
    skills: [
      { name: "OpenAI API", context: "GPT integration" },
      { name: "Item Response Theory", context: "OmniEdu" },
      { name: "Prompt Engineering" },
    ],
  },
];
