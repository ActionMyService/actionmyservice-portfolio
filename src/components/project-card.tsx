import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, Clock } from "lucide-react";
import { getCategoryLabel } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  year: number;
  thumbnail: string;
  videoUrl?: string | null;
  videoThumbnail?: string | null;
  duration?: string | null;
  isDemo?: boolean;
  newBadge?: boolean;
  technologies?: { name: string }[];
  tools?: { name: string }[];
};

interface ProjectCardProps {
  project: Project;
  className?: string;
  large?: boolean;
  showDescription?: boolean;
}

export function ProjectCard({ project, className, large, showDescription = true }: ProjectCardProps) {
  const isVideo = project.category === "AI_VIDEO_CREATION";
  const is3D = project.category === "THREE_D_UI_UX";
  const isBranding = project.category === "BRANDING";
  const isDesign = project.category === "WEBSITE_DESIGN";
  const isCreative = project.category === "AI_CREATIVE_PROJECTS";

  const tags = project.technologies?.length
    ? project.technologies.slice(0, 3)
    : project.tools?.slice(0, 3) ?? [];

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "group block rounded-2xl border border-border bg-card overflow-hidden card-hover",
        className
      )}
    >
      {/* Visual */}
      <div className={cn("relative overflow-hidden", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes={large ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
            {getCategoryLabel(project.category)}
          </span>
          {project.isDemo && (
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
              Demo
            </span>
          )}
          {project.newBadge && (
            <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
              NEW
            </span>
          )}
        </div>

        {/* Video play button */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Duration */}
        {isVideo && project.duration && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs">
            <Clock className="w-3 h-3" />
            {project.duration}
          </div>
        )}

        {/* 3D badge */}
        {is3D && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
            Interactive 3D
          </div>
        )}

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h3 className={cn("font-semibold tracking-tight", large ? "text-xl md:text-2xl" : "text-lg")}>
            {project.title}
          </h3>
          <span className="text-sm text-muted-foreground shrink-0">{project.year}</span>
        </div>

        {showDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.shortDescription}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className="px-2.5 py-1 rounded-full bg-secondary text-xs text-secondary-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}