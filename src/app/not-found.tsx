import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-sm text-[var(--color-accent)]">404</p>
      <h1 className="mb-2 text-2xl font-semibold">Page not found</h1>
      <p className="mb-8 text-[var(--color-mut)]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-medium text-[var(--color-accent-ink)] transition-opacity hover:opacity-90"
      >
        Go home
      </Link>
    </div>
  );
}
