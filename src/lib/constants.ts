import { Globe, PenTool, Clapperboard, Sparkles, Box, Palette } from "lucide-react";

export const CATEGORIES = [
  { value: "WEBSITE_DEVELOPMENT", label: "Website Development", slug: "websites" },
  { value: "WEBSITE_DESIGN", label: "Website Design", slug: "website-design" },
  { value: "AI_VIDEO_CREATION", label: "AI Video Creation", slug: "ai-videos" },
  { value: "AI_CREATIVE_PROJECTS", label: "AI Creative Projects", slug: "ai-creatives" },
  { value: "THREE_D_UI_UX", label: "3D UI/UX Design", slug: "3d-ui-ux" },
  { value: "BRANDING", label: "Branding", slug: "branding" },
] as const;

export const CATEGORY_META = [
  { value: "WEBSITE_DEVELOPMENT", label: "Website Development", slug: "websites", icon: Globe },
  { value: "WEBSITE_DESIGN", label: "Website Design", slug: "website-design", icon: PenTool },
  { value: "AI_VIDEO_CREATION", label: "AI Video Creation", slug: "ai-videos", icon: Clapperboard },
  { value: "AI_CREATIVE_PROJECTS", label: "AI Creative Projects", slug: "ai-creatives", icon: Sparkles },
  { value: "THREE_D_UI_UX", label: "3D UI/UX Design", slug: "3d-ui-ux", icon: Box },
  { value: "BRANDING", label: "Branding", slug: "branding", icon: Palette },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export function getCategoryLabel(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function getCategorySlug(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.slug ?? value.toLowerCase();
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const SERVICE_SLUGS = {
  "website-development": "WEBSITE_DEVELOPMENT",
  "website-design": "WEBSITE_DESIGN",
  "ai-video-creation": "AI_VIDEO_CREATION",
  "ai-creative-projects": "AI_CREATIVE_PROJECTS",
  "3d-ui-ux-design": "THREE_D_UI_UX",
  branding: "BRANDING",
} as const;

export const PROCESS_STEPS: Record<string, string[]> = {
  WEBSITE_DEVELOPMENT: ["Concept", "Wireframe", "UI Design", "Development", "Testing", "Launch"],
  WEBSITE_DESIGN: ["Research", "Concept", "UI Design", "Prototype", "Refinement", "Final Design"],
  AI_VIDEO_CREATION: ["Concept", "Script", "Visual Generation", "Voice", "Editing", "Final Video"],
  AI_CREATIVE_PROJECTS: ["Concept", "Inspiration", "AI Generation", "Curation", "Post-Processing", "Final Artwork"],
  THREE_D_UI_UX: ["Concept", "3D Design", "UI/UX", "Interaction", "Optimization", "Final Experience"],
  BRANDING: ["Research", "Concept", "Logo", "Visual System", "Brand Assets", "Final Identity"],
};

export const SERVICES = [
  { value: "WEBSITE_DEVELOPMENT", label: "Website Development" },
  { value: "WEBSITE_DESIGN", label: "Website Design" },
  { value: "AI_VIDEO_CREATION", label: "AI Video Creation" },
  { value: "AI_CREATIVE_PROJECTS", label: "AI Creative Projects" },
  { value: "THREE_D_UI_UX", label: "3D UI/UX Design" },
  { value: "BRANDING", label: "Branding" },
] as const;

export const STATUS_LABELS: Record<string, string> = {
  CONCEPT: "Concept",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  DEMO: "Demo",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PORTFOLIO_LINKS = [
  { label: "All Projects", href: "/portfolio" },
  { label: "Websites", href: "/portfolio/websites" },
  { label: "Website Design", href: "/portfolio/website-design" },
  { label: "AI Videos", href: "/portfolio/ai-videos" },
  { label: "AI Creatives", href: "/portfolio/ai-creatives" },
  { label: "3D UI/UX", href: "/portfolio/3d-ui-ux" },
  { label: "Branding", href: "/portfolio/branding" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "YouTube", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "GitHub", href: "" },
];