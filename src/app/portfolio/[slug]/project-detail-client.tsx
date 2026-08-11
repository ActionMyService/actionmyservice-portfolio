"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Link2,
  Maximize2,
  Minus,
  Play,
  Plus,
  X,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectImage = {
  id: string;
  url: string;
  title?: string | null;
  alt?: string | null;
  sortOrder: number;
};

type ProjectFeature = {
  id: string;
  feature: string;
  sortOrder: number;
};

type ProjectTool = {
  id: string;
  name: string;
  sortOrder: number;
};

type ProjectTechnology = {
  id: string;
  name: string;
  sortOrder: number;
};

type ProjectSection = {
  id: string;
  title: string;
  content: string;
  sortOrder: number;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  client?: string | null;
  year: number;
  projectDate?: Date | null;
  status: string;
  duration?: string | null;
  thumbnail: string;
  coverImage: string;
  videoUrl?: string | null;
  videoThumbnail?: string | null;
  liveUrl?: string | null;
  figmaUrl?: string | null;
  githubUrl?: string | null;
  externalUrl?: string | null;
  challenge?: string | null;
  approach?: string | null;
  results?: string | null;
  deliverables?: string | null;
  additionalInfo?: string | null;
  isDemo?: boolean;
  newBadge?: boolean;
  images: ProjectImage[];
  features: ProjectFeature[];
  tools: ProjectTool[];
  technologies: ProjectTechnology[];
  sections: ProjectSection[];
};

interface ProjectDetailClientProps {
  project: Project;
  categoryLabel: string;
  categorySlug: string;
  processSteps: string[];
  statusLabel: string;
}

export function ProjectDetailClient({
  project,
  categoryLabel,
  categorySlug,
  processSteps,
  statusLabel,
}: ProjectDetailClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const galleryImages = [
    { url: project.coverImage, title: "Cover", alt: project.title },
    ...project.images.map((img) => ({
      url: img.url,
      title: img.title ?? "",
      alt: img.alt ?? project.title,
    })),
  ];

  const isVideo = project.category === "AI_VIDEO_CREATION";
  const is3D = project.category === "THREE_D_UI_UX";
  const isBranding = project.category === "BRANDING";
  const isDesign = project.category === "WEBSITE_DESIGN";
  const isCreative = project.category === "AI_CREATIVE_PROJECTS";
  const isWebsite = project.category === "WEBSITE_DEVELOPMENT";

  const infoFields = [
    { label: "Project Type", value: categoryLabel },
    { label: "Category", value: categoryLabel },
    { label: "Year", value: String(project.year) },
    { label: "Status", value: statusLabel },
    { label: "Duration", value: project.duration },
    { label: "Client", value: project.client },
  ].filter((f) => f.value);

  const allTags = [
    ...project.technologies.map((t) => t.name),
    ...project.tools.map((t) => t.name),
  ];

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoomLevel(1);
  }, []);

  const navigateLightbox = useCallback(
    (direction: 1 | -1) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const next = (current + direction + galleryImages.length) % galleryImages.length;
        setZoomLevel(1);
        return next;
      });
    },
    [galleryImages.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <div>
      {/* ===== PROJECT HERO ===== */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="container-site">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/portfolio" className="hover:text-foreground transition-colors">
              Portfolio
            </Link>
            <span>/</span>
            <Link
              href={`/portfolio/${categorySlug}`}
              className="hover:text-foreground transition-colors"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: Text */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  {categoryLabel}
                </span>
                {project.isDemo && (
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    Demo / Concept
                  </span>
                )}
                {project.newBadge && (
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                    NEW
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
                {project.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {project.year}
                </span>
                {project.duration && (
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {project.duration}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">{statusLabel}</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    View Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Main visual */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>

                {/* Video play overlay */}
                {project.videoUrl && (
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO PLAYER ===== */}
      {project.videoUrl && isVideoPlaying && (
        <section className="py-8">
          <div className="container-site">
            <div className="rounded-2xl overflow-hidden border border-border bg-black">
              <video
                src={project.videoUrl}
                poster={project.videoThumbnail ?? project.coverImage}
                controls
                autoPlay
                className="w-full aspect-video"
              />
            </div>
          </div>
        </section>
      )}

      {/* ===== PROJECT OVERVIEW ===== */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Overview</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Project Overview
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Project info grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                {infoFields.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {field.label}
                    </p>
                    <p className="text-sm font-semibold">{field.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHALLENGE ===== */}
      {project.challenge && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Challenge</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  The Challenge
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.challenge}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== APPROACH / PROCESS ===== */}
      {(project.approach || processSteps.length > 0) && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Process</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Our Approach
                </h2>
              </div>
              <div className="lg:col-span-8">
                {processSteps.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {processSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2"
                      >
                        <span className="text-xs font-bold text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                )}
                {project.approach && (
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {project.approach}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== FEATURES ===== */}
      {project.features.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Features</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Key Features
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-sm">{feature.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== TECHNOLOGIES / TOOLS ===== */}
      {allTags.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Stack</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Technologies & Tools
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-secondary text-sm font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== RESULTS ===== */}
      {project.results && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Results</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Results
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.results}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== DELIVERABLES ===== */}
      {project.deliverables && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Deliverables</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Deliverables
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.deliverables}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== CUSTOM SECTIONS ===== */}
      {project.sections.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="space-y-12">
              {project.sections.map((section) => (
                <div
                  key={section.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
                >
                  <div className="lg:col-span-4">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                      {section.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ADDITIONAL INFO ===== */}
      {project.additionalInfo && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Additional Information
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.additionalInfo}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== LINKS ===== */}
      {(project.liveUrl || project.figmaUrl || project.githubUrl || project.externalUrl) && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Project Links
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.figmaUrl && (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <Link2 className="w-4 h-4" />
                      Figma
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <Link2 className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      External Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== GALLERY ===== */}
      {galleryImages.length > 1 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Gallery</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Project Gallery
                </h2>
              </div>
              <p className="text-sm text-muted-foreground hidden md:block">
                Click to view fullscreen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  onClick={() => setLightboxIndex(index)}
                  className={cn(
                    "relative rounded-xl overflow-hidden border border-border bg-card group cursor-zoom-in",
                    index === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
                  )}
                  aria-label={`View ${image.title || project.title} fullscreen`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== LIGHTBOX ===== */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Zoom controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel((z) => Math.max(0.5, z - 0.25));
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Zoom out"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel((z) => Math.min(3, z + 0.25));
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Zoom in"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const el = document.querySelector("[data-lightbox-image]");
                if (el && el.requestFullscreen) {
                  el.requestFullscreen();
                }
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Prev / Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(-1);
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(1);
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              data-lightbox-image
              className="relative transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src={galleryImages[lightboxIndex].url}
                alt={galleryImages[lightboxIndex].alt || project.title}
                width={1920}
                height={1080}
                className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
              />
            </div>
            <p className="text-center text-white/70 text-sm mt-4">
              {galleryImages[lightboxIndex].title || project.title}
            </p>
            <p className="text-center text-white/50 text-xs mt-1">
              {lightboxIndex + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}