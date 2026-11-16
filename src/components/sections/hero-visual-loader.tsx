"use client";

import dynamic from "next/dynamic";

const HeroVisual = dynamic(() => import("./hero-visual"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-[var(--color-bdr)] bg-[var(--color-surf)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-bdr)_1px,transparent_1px),linear-gradient(90deg,var(--color-bdr)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      <div className="absolute inset-[15%] rounded-full border border-[var(--color-accent)]/40" />
      <div className="absolute inset-[24%] rounded-full border border-dashed border-[var(--color-accent)]/60" />
      <div className="absolute bottom-5 left-5 font-mono text-xs text-[var(--color-mut)]">
        SYSTEMS / PRODUCTS / PEOPLE
      </div>
    </div>
  );
}

export function HeroVisualLoader() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <HeroFallback />
      <div className="absolute inset-0">
        <HeroVisual />
      </div>
    </div>
  );
}