"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
}

export function SectionWrapper({
  id,
  children,
  className,
  as: Tag = "section",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        "py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </Tag>
  );
}
