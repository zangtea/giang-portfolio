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
    if (!ref.current) return;
    if (!("IntersectionObserver" in window)) {
      ref.current.classList.add("section-visible");
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

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      id={id}
      ref={(element: HTMLElement | null) => {
        ref.current = element;
      }}
      className={cn(
        "section-reveal py-20 px-4 transition-all duration-700 sm:px-6 lg:px-8",
        "motion-reduce:transition-none",
        visible && "section-visible",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </Tag>
  );
}
