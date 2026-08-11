"use client";

import { useEffect, useRef, useState } from "react";

// ===== Human Touch Elements =====
// Hand-drawn SVG accents, warm microcopy and humanized details
// that make the site feel crafted by people, not just generated.

export function HandDrawnArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 45 C 30 20, 60 10, 110 15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="4 6"
        className="animate-dash"
      />
      <path
        d="M95 8 L 112 15 L 98 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HandDrawnCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 8 C 75 8, 92 25, 92 50 C 92 75, 75 92, 50 92 C 25 92, 8 75, 8 50 C 8 30, 20 15, 38 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="5 7"
        className="animate-dash-slow"
      />
    </svg>
  );
}

export function HandDrawnUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12 C 50 5, 150 5, 195 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-dash"
      />
    </svg>
  );
}

export function HandDrawnStar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 4 L 24 15 L 36 15 L 26 22 L 30 34 L 20 27 L 10 34 L 14 22 L 4 15 L 16 15 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="animate-dash-slow"
      />
    </svg>
  );
}

export function HandDrawnSparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15 2 C 16 10, 20 14, 28 15 C 20 16, 16 20, 15 28 C 14 20, 10 16, 2 15 C 10 14, 14 10, 15 2 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        className="animate-dash"
      />
    </svg>
  );
}

// ===== Humanized Microcopy =====
// Small warm touches that make the site feel human.

export function HumanNote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-border bg-card/80 text-sm text-muted-foreground ${className}`}
    >
      <HandDrawnSparkle className="w-4 h-4 text-accent shrink-0" />
      <span>{children}</span>
    </div>
  );
}

// ===== Cursor Glow =====
// A soft glow that follows the cursor on desktop for a tactile feel.

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (mediaQuery.matches || isTouch) return;
    setEnabled(true);

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 opacity-[0.07]"
      style={{
        background:
          "radial-gradient(circle, #8b5cf6 0%, transparent 60%)",
      }}
      aria-hidden="true"
    />
  );
}

// ===== Scroll Progress =====
// A thin human-colored progress bar at the top of the page.

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (barRef.current) {
          barRef.current.style.width = `${progress}%`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-accent via-purple-500 to-pink-500"
        style={{ width: "0%" }}
      />
    </div>
  );
}