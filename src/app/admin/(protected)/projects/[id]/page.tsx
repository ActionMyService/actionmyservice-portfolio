import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/constants";
import { updateProject } from "../actions";

export const metadata = {
  title: "Edit Project — ActionMyService Admin",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      features: { orderBy: { sortOrder: "asc" } },
      tools: { orderBy: { sortOrder: "asc" } },
      technologies: { orderBy: { sortOrder: "asc" } },
      sections: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!project) notFound();

  const formatDate = (d: Date | null) =>
    d ? d.toISOString().split("T")[0] : "";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {project.title} — /portfolio/{project.slug}
        </p>
      </div>

      <form action={updateProject} className="space-y-8">
        <input type="hidden" name="id" value={project.id} />

        {/* Basic Information */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-lg font-semibold">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Project Name *
              </label>
              <input
                id="title"
                name="title"
                required
                defaultValue={project.title}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                defaultValue={project.slug}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={project.category}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status *
              </label>
              <select
                id="status"
                name="status"
                required
                defaultValue={project.status}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="CONCEPT">Concept</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="DEMO">Demo</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="year" className="text-sm font-medium">
                Year *
              </label>
              <input
                id="year"
                name="year"
                type="number"
                required
                defaultValue={project.year}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="projectDate" className="text-sm font-medium">
                Project Date
              </label>
              <input
                id="projectDate"
                name="projectDate"
                type="date"
                defaultValue={formatDate(project.projectDate)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="client" className="text-sm font-medium">
                Client
              </label>
              <input
                id="client"
                name="client"
                defaultValue={project.client ?? ""}
                placeholder="Private Client"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration
              </label>
              <input
                id="duration"
                name="duration"
                defaultValue={project.duration ?? ""}
                placeholder="3 Weeks"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sortOrder" className="text-sm font-medium">
                Sort Order
              </label>
              <input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={project.sortOrder}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="shortDescription" className="text-sm font-medium">
              Short Description *
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              required
              rows={3}
              defaultValue={project.shortDescription}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Full Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={8}
              defaultValue={project.description}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
        </section>

        {/* Media */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-lg font-semibold">Media</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="thumbnail" className="text-sm font-medium">
                Thumbnail URL
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                defaultValue={project.thumbnail}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="coverImage" className="text-sm font-medium">
                Cover Image URL
              </label>
              <input
                id="coverImage"
                name="coverImage"
                defaultValue={project.coverImage}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="videoUrl" className="text-sm font-medium">
                Video URL
              </label>
              <input
                id="videoUrl"
                name="videoUrl"
                defaultValue={project.videoUrl ?? ""}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="videoThumbnail" className="text-sm font-medium">
                Video Thumbnail URL
              </label>
              <input
                id="videoThumbnail"
                name="videoThumbnail"
                defaultValue={project.videoThumbnail ?? ""}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="liveUrl" className="text-sm font-medium">
                Live Demo URL
              </label>
              <input
                id="liveUrl"
                name="liveUrl"
                defaultValue={project.liveUrl ?? ""}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="figmaUrl" className="text-sm font-medium">
                Figma URL
              </label>
              <input
                id="figmaUrl"
                name="figmaUrl"
                defaultValue={project.figmaUrl ?? ""}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="githubUrl" className="text-sm font-medium">
                GitHub URL
              </label>
              <input
                id="githubUrl"
                name="githubUrl"
                defaultValue={project.githubUrl ?? ""}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="externalUrl" className="text-sm font-medium">
                External Project URL
              </label>
              <input
                id="externalUrl"
                name="externalUrl"
                defaultValue={project.externalUrl ?? ""}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </section>

        {/* Story Sections */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-lg font-semibold">Project Story</h2>

          <div className="space-y-2">
            <label htmlFor="challenge" className="text-sm font-medium">
              The Challenge
            </label>
            <textarea
              id="challenge"
              name="challenge"
              rows={4}
              defaultValue={project.challenge ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="approach" className="text-sm font-medium">
              Our Approach
            </label>
            <textarea
              id="approach"
              name="approach"
              rows={4}
              defaultValue={project.approach ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="results" className="text-sm font-medium">
              Results
            </label>
            <textarea
              id="results"
              name="results"
              rows={4}
              defaultValue={project.results ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="deliverables" className="text-sm font-medium">
              Deliverables
            </label>
            <textarea
              id="deliverables"
              name="deliverables"
              rows={3}
              defaultValue={project.deliverables ?? ""}
              placeholder="One per line"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="additionalInfo" className="text-sm font-medium">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              rows={4}
              defaultValue={project.additionalInfo ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
        </section>

        {/* Features, Tools, Technologies */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-lg font-semibold">Features, Tools & Technologies</h2>

          <div className="space-y-2">
            <label htmlFor="features" className="text-sm font-medium">
              Features
            </label>
            <textarea
              id="features"
              name="features"
              rows={4}
              defaultValue={project.features.map((f) => f.feature).join("\n")}
              placeholder="One per line"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <p className="text-xs text-muted-foreground">
              One feature per line. These will be saved as structured data.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="tools" className="text-sm font-medium">
              Tools
            </label>
            <textarea
              id="tools"
              name="tools"
              rows={3}
              defaultValue={project.tools.map((t) => t.name).join("\n")}
              placeholder="One per line"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="technologies" className="text-sm font-medium">
              Technologies
            </label>
            <textarea
              id="technologies"
              name="technologies"
              rows={3}
              defaultValue={project.technologies.map((t) => t.name).join("\n")}
              placeholder="One per line"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
        </section>

        {/* Visibility */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-lg font-semibold">Visibility & Badges</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                name="published"
                defaultChecked={project.published}
                className="w-4 h-4 rounded border-border"
              />
              Published
            </label>
            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project.featured}
                className="w-4 h-4 rounded border-border"
              />
              Featured (shows on homepage)
            </label>
            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                name="isDemo"
                defaultChecked={project.isDemo}
                className="w-4 h-4 rounded border-border"
              />
              Demo / Concept Project
            </label>
            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                name="newBadge"
                defaultChecked={project.newBadge}
                className="w-4 h-4 rounded border-border"
              />
              Show NEW Badge
            </label>
          </div>

          <div className="space-y-2">
            <label htmlFor="newBadgeDays" className="text-sm font-medium">
              NEW Badge Duration (days)
            </label>
            <input
              id="newBadgeDays"
              name="newBadgeDays"
              type="number"
              defaultValue={14}
              min={1}
              max={90}
              className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p className="text-xs text-muted-foreground">
              The NEW badge will automatically expire after this many days.
            </p>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <a
            href="/admin/projects"
            className="px-4 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}