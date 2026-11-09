// Central configuration - user fills in their info here
export const siteConfig = {
  // --- PERSONAL INFO (fill before going public) ---
  displayName: "[YOUR_NAME]", // e.g. "Nguyen Van Giang"
  title: "Full-stack Developer",
  email: "[YOUR_EMAIL]", // e.g. "hello@example.com"
  github: "[YOUR_GITHUB]", // e.g. "https://github.com/username"
  linkedin: "[YOUR_LINKEDIN]", // e.g. "https://linkedin.com/in/username"
  cvUrl: "/cv.pdf", // place your CV PDF in /public/cv.pdf
  avatarUrl: "/avatar.jpg", // place your photo in /public/avatar.jpg

  // --- SITE CONFIG ---
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.vercel.app",
  defaultLocale: "vi" as const,
  locales: ["vi", "en"] as const,

  // --- HERO CONTENT (fill in) ---
  headline: {
    vi: "Xây dựng sản phẩm web từ ý tưởng đến thực tế",
    en: "Building web products from idea to reality",
  },
  bio: {
    vi: "Tôi là Full-stack Developer với niềm đam mê xây dựng các ứng dụng web hiệu năng cao và trải nghiệm người dùng mượt mà. Tôi làm việc với Next.js, TypeScript, Node.js và Supabase.",
    en: "I'm a Full-stack Developer passionate about building high-performance web applications with great user experiences. I work with Next.js, TypeScript, Node.js, and Supabase.",
  },
} as const;

export type Locale = (typeof siteConfig)["locales"][number];
export function isValidLocale(locale: string): locale is Locale {
  return (siteConfig.locales as readonly string[]).includes(locale);
}
