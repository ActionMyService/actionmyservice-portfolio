import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  FolderKanban,
  Globe,
  Clapperboard,
  Sparkles,
  Box,
  Palette,
  MessageSquare,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORY_META } from "@/lib/constants";

export const metadata = {
  title: "Dashboard — ActionMyService Admin",
};

export default async function AdminDashboardPage() {
  const [totalProjects, messages, recentProjects] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        _count: { select: { images: true, features: true, tools: true } },
      },
    }),
  ]);

  const categoryCounts = await Promise.all(
    CATEGORY_META.map(async (cat) => ({
      ...cat,
      count: await prisma.project.count({ where: { category: cat.value } }),
    }))
  );

  const newMessages = await prisma.contactMessage.count({
    where: { status: "NEW" },
  });

  const stats = [
    { label: "Total Projects", value: totalProjects, icon: FolderKanban },
    ...categoryCounts.map((c) => ({
      label: c.label,
      value: c.count,
      icon: c.icon,
    })),
    { label: "Messages", value: messages, icon: MessageSquare },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your portfolio.
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

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-5 h-5 text-muted-foreground" />
              {stat.label === "Messages" && newMessages > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">
                  {newMessages} new
                </span>
              )}
            </div>
            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
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
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Featured</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                      No projects yet. Create your first project.
                    </td>
                  </tr>
                ) : (
                  recentProjects.map((project) => {
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
                                {project.slug}
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
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium">
                              Featured
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Edit
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
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
    </div>
  );
}