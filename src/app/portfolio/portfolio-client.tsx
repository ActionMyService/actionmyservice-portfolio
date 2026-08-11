"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  client?: string | null;
  year: number;
  thumbnail: string;
  videoUrl?: string | null;
  videoThumbnail?: string | null;
  duration?: string | null;
  isDemo?: boolean;
  newBadge?: boolean;
  technologies?: { name: string }[];
  tools?: { name: string }[];
  features?: { feature: string }[];
};

interface PortfolioClientProps {
  projects: Project[];
}

export function PortfolioClient({ projects }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Simulate filtering transition
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeCategory !== "ALL") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const searchable = [
          p.title,
          p.category,
          p.shortDescription,
          p.description,
          p.client,
          ...(p.technologies?.map((t) => t.name) ?? []),
          ...(p.tools?.map((t) => t.name) ?? []),
          ...(p.features?.map((f) => f.feature) ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(q);
      });
    }

    return result;
  }, [projects, activeCategory, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    searchRef.current?.focus();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-site">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Our Work
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Explore everything we create at ActionMyService. From websites and
            AI videos to 3D interfaces and brand identities.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-y border-border">
        <div className="container-site py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Category filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar flex-1">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    activeCategory === category.value
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative lg:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                aria-label="Search projects"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          {/* Result count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
              {activeCategory !== "ALL" && " in this category"}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* Grid */}
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-opacity duration-300",
              isFiltering && "opacity-40"
            )}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                large={index === 0}
                className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                No projects found.
              </h2>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("ALL");
                  setSearchQuery("");
                }}
                className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}