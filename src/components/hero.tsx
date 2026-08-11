"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ThreeDHero } from "@/components/three-d-hero";
import { HandDrawnArrow, HandDrawnUnderline, HumanNote } from "@/components/human-touch";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[300px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
      </div>

      <div className="container-site relative grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm text-muted-foreground mb-8">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Creative Digital Experiences, Built to Stand Out
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance">
            We Build Digital Experiences That{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Stand Out.</span>
              <HandDrawnUnderline className="absolute -bottom-3 left-0 w-full text-accent/60" />
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl text-pretty">
            Websites, AI videos, 3D interfaces, creative experiences and brand
            identities — created by ActionMyService.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Explore Portfolio
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
            >
              Start a Project
            </Link>
          </div>

          {/* Human touch note */}
          <div className="mt-8">
            <HumanNote>
              Every project is crafted by real people who care about details.
            </HumanNote>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-8 md:gap-12">
            <div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight">6</p>
              <p className="text-sm text-muted-foreground mt-1">Core Services</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight">12+</p>
              <p className="text-sm text-muted-foreground mt-1">Projects Created</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight">2026</p>
              <p className="text-sm text-muted-foreground mt-1">Current Year</p>
            </div>
          </div>
        </div>

        {/* Right 3D visual composition */}
        <div
          className="relative"
          style={{
            transform: reducedMotion
              ? "none"
              : `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <ThreeDHero />

          {/* Hand-drawn arrow pointing to the 3D scene */}
          <div className="absolute -top-8 -left-8 hidden xl:block text-accent/70">
            <HandDrawnArrow className="w-24 h-12 rotate-[20deg]" />
          </div>

          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-lg animate-float">
            Interactive 3D
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}