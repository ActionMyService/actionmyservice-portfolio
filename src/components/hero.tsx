"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Sparkles, Box } from "lucide-react";

const FLOATING_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80",
    alt: "Website project preview",
    label: "Website",
    className: "top-[12%] left-[4%] w-40 md:w-56 rotate-[-6deg]",
    delay: "0s",
  },
  {
    src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80",
    alt: "AI video project preview",
    label: "AI Video",
    className: "top-[8%] right-[5%] w-44 md:w-64 rotate-[5deg]",
    delay: "1.5s",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
    alt: "3D interface preview",
    label: "3D UI/UX",
    className: "bottom-[18%] left-[8%] w-36 md:w-52 rotate-[4deg]",
    delay: "3s",
  },
  {
    src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&q=80",
    alt: "Brand identity preview",
    label: "Branding",
    className: "bottom-[12%] right-[8%] w-40 md:w-56 rotate-[-4deg]",
    delay: "4.5s",
  },
];

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
            <span className="gradient-text">Stand Out.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl text-pretty">
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

          {/* Stats */}
          <div className="mt-14 flex items-center gap-8 md:gap-12">
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

        {/* Right visual composition */}
        <div className="relative h-[500px] md:h-[600px] hidden lg:block">
          {/* Central visual */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: reducedMotion
                ? "none"
                : `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="relative w-[320px] h-[400px] md:w-[380px] md:h-[460px] rounded-3xl border border-border bg-card overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
                alt="3D interface showcase"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Box className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                    3D UI/UX Design
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl">Neo Interface</h3>
              </div>
            </div>
          </div>

          {/* Floating project cards */}
          {FLOATING_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`absolute ${item.className} animate-float`}
              style={{
                animationDelay: item.delay,
                transform: reducedMotion
                  ? "none"
                  : `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
                transition: "transform 0.4s ease-out",
              }}
            >
              <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
                <div className="relative h-24 md:h-32">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 160px, 256px"
                  />
                </div>
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-xs font-medium">{item.label}</span>
                  {item.label === "AI Video" && (
                    <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
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