import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getRelatedProjects } from "@/lib/data";
import { getCategoryLabel, getCategorySlug, PROCESS_STEPS, STATUS_LABELS } from "@/lib/constants";
import { ProjectDetailClient } from "./project-detail-client";
import { ProjectCard } from "@/components/project-card";
import { CtaSection } from "@/components/cta-section";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found — ActionMyService" };

  const categoryLabel = getCategoryLabel(project.category);

  return {
    title: `${project.title} — ${categoryLabel} | ActionMyService`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — ${categoryLabel} | ActionMyService`,
      description: project.shortDescription,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const relatedProjects = await getRelatedProjects(project);
  const categoryLabel = getCategoryLabel(project.category);
  const categorySlug = getCategorySlug(project.category);
  const processSteps = PROCESS_STEPS[project.category] ?? [];
  const statusLabel = STATUS_LABELS[project.status] ?? project.status;

  return (
    <div className="min-h-screen">
      <ProjectDetailClient
        project={project}
        categoryLabel={categoryLabel}
        categorySlug={categorySlug}
        processSteps={processSteps}
        statusLabel={statusLabel}
      />

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container-site">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Related Work
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  More Projects
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedProjects.slice(0, 3).map((related) => (
                <ProjectCard key={related.id} project={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </div>
  );
}