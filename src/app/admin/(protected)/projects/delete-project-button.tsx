"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteProject } from "./actions";

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    const formData = new FormData();
    formData.set("id", id);

    startTransition(() => {
      deleteProject(formData);
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-error transition-colors disabled:opacity-50"
      aria-label={`Delete ${title}`}
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}