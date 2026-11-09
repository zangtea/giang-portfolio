import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <p className="text-8xl font-bold mb-4" style={{ color: "oklch(57% 0.19 250)" }}>
        404
      </p>
      <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
      <p className="mb-8" style={{ color: "oklch(45% 0 0)" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/vi"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "oklch(57% 0.19 250)" }}
      >
        ← Go home
      </Link>
    </div>
  );
}
