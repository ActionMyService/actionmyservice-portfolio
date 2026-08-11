import { prisma } from "@/lib/prisma";
import { getCategoryBySlug } from "@/lib/constants";

export const projectInclude = {
  images: { orderBy: { sortOrder: "asc" as const } },
  features: { orderBy: { sortOrder: "asc" as const } },
  tools: { orderBy: { sortOrder: "asc" as const } },
  technologies: { orderBy: { sortOrder: "asc" as const } },
  sections: { orderBy: { sortOrder: "asc" as const } },
};

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    include: projectInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 6,
  });
}

export async function getRecentProjects(limit = 6) {
  return prisma.project.findMany({
    where: { published: true },
    include: projectInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: limit,
  });
}

export async function getAllProjects() {
  return prisma.project.findMany({
    where: { published: true },
    include: projectInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getProjectsByCategory(category: string) {
  return prisma.project.findMany({
    where: { published: true, category },
    include: projectInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getProjectsByCategorySlug(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return getProjectsByCategory(category.value);
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, published: true },
    include: projectInclude,
  });
}

export async function getRelatedProjects(project: {
  id: string;
  category: string;
}, limit = 4) {
  return prisma.project.findMany({
    where: {
      published: true,
      category: project.category,
      id: { not: project.id },
    },
    include: projectInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: limit,
  });
}

export async function getServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug, published: true },
  });
}

export async function getProjectsForService(category: string, limit = 4) {
  return prisma.project.findMany({
    where: { published: true, category },
    include: projectInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: limit,
  });
}

export async function searchProjects(query: string) {
  if (!query.trim()) return getAllProjects();
  const projects = await getAllProjects();
  const q = query.toLowerCase();
  return projects.filter((project) => {
    const searchable = [
      project.title,
      project.shortDescription,
      project.description,
      project.category,
      project.client ?? "",
      ...project.tools.map((t) => t.name),
      ...project.technologies.map((t) => t.name),
      ...project.features.map((f) => f.feature),
    ]
      .join(" ")
      .toLowerCase();
    return searchable.includes(q);
  });
}

export async function getProjectCounts() {
  const [total, websites, websiteDesign, aiVideos, aiCreatives, threeD, branding] =
    await Promise.all([
      prisma.project.count({ where: { published: true } }),
      prisma.project.count({ where: { published: true, category: "WEBSITE_DEVELOPMENT" } }),
      prisma.project.count({ where: { published: true, category: "WEBSITE_DESIGN" } }),
      prisma.project.count({ where: { published: true, category: "AI_VIDEO_CREATION" } }),
      prisma.project.count({ where: { published: true, category: "AI_CREATIVE_PROJECTS" } }),
      prisma.project.count({ where: { published: true, category: "THREE_D_UI_UX" } }),
      prisma.project.count({ where: { published: true, category: "BRANDING" } }),
    ]);
  return {
    total,
    websites,
    websiteDesign,
    aiVideos,
    aiCreatives,
    threeD,
    branding,
  };
}

export async function getMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}