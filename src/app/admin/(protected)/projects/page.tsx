import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, ArrowUpRight, Star, Eye, EyeOff } from "lucide-react";
import { CATEGORY_META } from "@/lib/constants";
import { DeleteProjectButton } from "./delete-project-button";

export const metadata = {
  title: "Projects — ActionMyService Admin",
};

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      _count: { select: { images: true, features: true, tools: true } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all portfolio projects.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Project</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Year</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 font-medium">Published</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                    No projects yet. Create your first project.
                  </td>
                </tr>
              ) : (
                projects.map((project) => {
                  const cat = CATEGORY_META.find(
                    (c) => c.value === project.category
                  );
                  return (
                    <tr
                      key={project.id}
                      className="border-b border-border/50 last:border-0 hover:bg-card/50 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-card shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={project.thumbnail}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <p className="text-xs text-muted-foreground">
                              /portfolio/{project.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          {cat?.icon && <cat.icon className="w-3.5 h-3.5" />}
                          {cat?.label ?? project.category}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            project.status === "COMPLETED"
                              ? "bg-success/15 text-success"
                              : project.status === "IN_PROGRESS"
                              ? "bg-warning/15 text-warning"
                              : project.status === "CONCEPT"
                              ? "bg-muted text-muted-foreground"
                              : "bg-accent/15 text-accent"
                          }`}
                        >
                          {project.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {project.year}
                      </td>
                      <td className="px-5 py-3">
                        {project.featured ? (
                          <Star className="w-4 h-4 text-accent" />
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {project.published ? (
                          <Eye className="w-4 h-4 text-success" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Edit
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/portfolio/${project.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            View
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteProjectButton
                            id={project.id}
                            title={project.title}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}