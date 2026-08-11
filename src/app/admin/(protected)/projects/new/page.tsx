import { createProject } from "../actions";
import { CATEGORIES } from "@/lib/constants";

export const metadata = {
  title: "New Project — ActionMyService Admin",
};

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">New Project</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create a new portfolio project. You can add full details after creation.
        </p>
      </div>

      <form
        action={createProject}
        className="space-y-6 rounded-2xl border border-border bg-card p-6"
      >
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Project Name *
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="e.g. Nova Studio"
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
            placeholder="auto-generated from title"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <p className="text-xs text-muted-foreground">
            Leave empty to auto-generate from the project name.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
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
          <label htmlFor="shortDescription" className="text-sm font-medium">
            Short Description *
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            required
            rows={3}
            placeholder="A brief description shown on cards and listings."
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
            rows={6}
            placeholder="The complete project story shown on the detail page."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-medium">
              Year *
            </label>
            <input
              id="year"
              name="year"
              type="number"
              required
              defaultValue={new Date().getFullYear()}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status *
            </label>
            <select
              id="status"
              name="status"
              required
              defaultValue="COMPLETED"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="CONCEPT">Concept</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="DEMO">Demo</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
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
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}