import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  // We can't use getDictionary here (not in [lang] context), so use bilingual text
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-8xl font-bold text-[var(--color-brand-500)] mb-4">404</p>
      <h1 className="text-2xl font-semibold mb-2">
        Page not found · Trang không tìm thấy
      </h1>
      <p className="text-[var(--color-mut)] mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. ·
        Trang bạn tìm kiếm không tồn tại.
      </p>
      <Link
        href={`/${siteConfig.defaultLocale}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity"
      >
        ← Về trang chủ / Go home
      </Link>
    </div>
  );
}
