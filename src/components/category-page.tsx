import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Category = {
  value: string;
  label: string;
  slug: string;
};

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

interface CategoryPageProps {
  category: Category;
  projects: Project[];
}

export function CategoryPage({ category, projects }: CategoryPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-site">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/portfolio" className="hover:text-foreground transition-colors">
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.label}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {category.label}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            {projects.length} {projects.length === 1 ? "project" : "projects"} in
            this category, created by ActionMyService.
          </p>
        </div>
      </section>

      {/* Category navigation */}
      <section className="border-y border-border">
        <div className="container-site py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/portfolio/${cat.slug}`}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  cat.value === category.value
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                )}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  large={index === 0}
                  className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                No projects in this category yet.
              </h2>
              <p className="text-muted-foreground mb-8">
                Check back soon or explore other categories.
              </p>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}