import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://actionmyservice.com";

  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/portfolio`, lastModified: new Date() },
    { url: `${baseUrl}/portfolio/websites`, lastModified: new Date() },
    { url: `${baseUrl}/portfolio/website-design`, lastModified: new Date() },
    { url: `${baseUrl}/portfolio/ai-videos`, lastModified: new Date() },
    { url: `${baseUrl}/portfolio/ai-creatives`, lastModified: new Date() },
    { url: `${baseUrl}/portfolio/3d-ui-ux`, lastModified: new Date() },
    { url: `${baseUrl}/portfolio/branding`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/services/website-development`, lastModified: new Date() },
    { url: `${baseUrl}/services/website-design`, lastModified: new Date() },
    { url: `${baseUrl}/services/ai-video-creation`, lastModified: new Date() },
    { url: `${baseUrl}/services/ai-creative-projects`, lastModified: new Date() },
    { url: `${baseUrl}/services/3d-ui-ux-design`, lastModified: new Date() },
    { url: `${baseUrl}/services/branding`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt,
  }));

  return [...staticRoutes, ...projectRoutes];
}