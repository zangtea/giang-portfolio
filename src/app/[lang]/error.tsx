"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const isVietnamese = usePathname()?.startsWith("/vi");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-sm text-[var(--color-accent)]">500</p>
      <h2 className="mb-2 text-2xl font-semibold">
        {isVietnamese ? "Đã xảy ra lỗi" : "Something went wrong"}
      </h2>
      <p className="mb-8 text-[var(--color-mut)]">
        {isVietnamese
          ? "Đã có lỗi không mong muốn. Vui lòng thử lại."
          : "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={retry}
          className="rounded-full bg-[var(--color-accent)] px-6 py-3 font-medium text-[var(--color-accent-ink)] transition-opacity hover:opacity-90"
        >
          {isVietnamese ? "Thử lại" : "Try again"}
        </button>
        <Link
          href={isVietnamese ? "/vi" : "/en"}
          className="rounded-full border border-[var(--color-bdr)] px-6 py-3 font-medium transition-colors hover:bg-[var(--color-surf)]"
        >
          {isVietnamese ? "Về trang chủ" : "Go home"}
        </Link>
      </div>
    </div>
  );
}
