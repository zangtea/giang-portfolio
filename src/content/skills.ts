export interface Skill {
  name: string;
  context?: { vi: string; en: string };
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
      { name: "React", context: { vi: "Nền tảng cho giao diện Next.js", en: "UI foundation for Next.js" } },
      { name: "Next.js", context: { vi: "App Router và ứng dụng web", en: "App Router and web applications" } },
      { name: "TypeScript", context: { vi: "Ứng dụng web và API", en: "Web applications and APIs" } },
      { name: "Tailwind CSS", context: { vi: "Giao diện responsive", en: "Responsive interfaces" } },
      { name: "EJS", context: { vi: "Giao diện server-rendered", en: "Server-rendered views" } },
    ],
  },
  {
    key: "backend",
    label: { vi: "Backend", en: "Backend" },
    skills: [
      { name: "Node.js", context: { vi: "Backend cho công cụ và ứng dụng web", en: "Backend for tools and web applications" } },
      { name: "Express.js", context: { vi: "API và routing phía máy chủ", en: "APIs and server-side routing" } },
      { name: "Python", context: { vi: "Thành phần IRT/AI trong OmniEdu", en: "IRT/AI components in OmniEdu" } },
    ],
  },
  {
    key: "database",
    label: { vi: "Database", en: "Database" },
    skills: [
      { name: "PostgreSQL", context: { vi: "Cơ sở dữ liệu Supabase", en: "Supabase database" } },
      { name: "MySQL", context: { vi: "Cơ sở dữ liệu BlackBlue Laptop", en: "BlackBlue Laptop database" } },
      { name: "Supabase", context: { vi: "Lớp dữ liệu OmniEdu", en: "OmniEdu data layer" } },
      { name: "Prisma", context: { vi: "ORM cho MySQL", en: "ORM for MySQL" } },
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
      { name: "Git", context: { vi: "Quản lý phiên bản mã nguồn", en: "Source control" } },
      { name: "GitHub", context: { vi: "Lưu trữ mã nguồn dự án", en: "Project source repositories" } },
      { name: "ESLint", context: { vi: "Kiểm tra chất lượng code", en: "Code quality checks" } },
    ],
  },
  {
    key: "testing",
    label: { vi: "Kiểm thử & Đảm bảo chất lượng", en: "Testing & QA" },
    skills: [
      { name: "QA workflow tooling", context: { vi: "AI-powered QA DevTool; chi tiết đang xác minh", en: "AI-powered QA DevTool; details under verification" } },
    ],
  },
  {
    key: "ai-ml",
    label: { vi: "AI / ML", en: "AI / ML" },
    skills: [
      { name: "OpenAI API", context: { vi: "Tích hợp trong QA DevTool", en: "Integration in the QA DevTool" } },
      { name: "Item Response Theory", context: { vi: "Cá nhân hóa học tập trong OmniEdu", en: "Learning personalization in OmniEdu" } },
      { name: "AI tutor", context: { vi: "OmniEdu", en: "OmniEdu" } },
    ],
  },
];
