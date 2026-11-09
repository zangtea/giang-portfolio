"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-6xl mb-4">⚠️</p>
      <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-[var(--color-mut)] mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
        <Link
          href="/vi"
          className="px-6 py-3 rounded-full border border-[var(--color-bdr)] font-medium hover:bg-[var(--color-surf)] transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
