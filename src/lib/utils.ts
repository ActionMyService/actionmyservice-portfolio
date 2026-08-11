import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatYear(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.getFullYear().toString();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function isNewProject(createdAt: Date | string, newBadge: boolean, newBadgeUntil?: Date | string | null): boolean {
  if (!newBadge) return false;
  if (newBadgeUntil) {
    const until = typeof newBadgeUntil === "string" ? new Date(newBadgeUntil) : newBadgeUntil;
    return until > new Date();
  }
  const created = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const days = 14;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return created > cutoff;
}