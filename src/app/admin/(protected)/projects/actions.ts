"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { CATEGORIES } from "@/lib/constants";

const VALID_CATEGORIES = CATEGORIES.map((c) => c.value);
const VALID_STATUSES = ["CONCEPT", "IN_PROGRESS", "COMPLETED", "DEMO"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath("/");
}

export async function duplicateProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: true,
      features: true,
      tools: true,
      technologies: true,
      sections: true,
    },
  });

  if (!project) return;

  const newSlug = `${project.slug}-copy`;
  const existing = await prisma.project.findUnique({ where: { slug: newSlug } });
  const finalSlug = existing ? `${newSlug}-${Date.now()}` : newSlug;

  const newProject = await prisma.project.create({
    data: {
      title: `${project.title} (Copy)`,
      slug: finalSlug,
      category: project.category,
      shortDescription: project.shortDescription,
      description: project.description,
      client: project.client,
      year: project.year,
      projectDate: project.projectDate,
      status: project.status,
      duration: project.duration,
      thumbnail: project.thumbnail,
      coverImage: project.coverImage,
      videoUrl: project.videoUrl,
      videoThumbnail: project.videoThumbnail,
      liveUrl: project.liveUrl,
      figmaUrl: project.figmaUrl,
      githubUrl: project.githubUrl,
      externalUrl: project.externalUrl,
      challenge: project.challenge,
      approach: project.approach,
      results: project.results,
      deliverables: project.deliverables,
      additionalInfo: project.additionalInfo,
      featured: false,
      published: false,
      isDemo: project.isDemo,
      newBadge: project.newBadge,
      newBadgeUntil: project.newBadgeUntil,
      sortOrder: project.sortOrder + 1,
      images: {
        create: project.images.map((img) => ({
          url: img.url,
          title: img.title,
          alt: img.alt,
          sortOrder: img.sortOrder,
        })),
      },
      features: {
        create: project.features.map((f) => ({
          feature: f.feature,
          sortOrder: f.sortOrder,
        })),
      },
      tools: {
        create: project.tools.map((t) => ({
          name: t.name,
          sortOrder: t.sortOrder,
        })),
      },
      technologies: {
        create: project.technologies.map((t) => ({
          name: t.name,
          sortOrder: t.sortOrder,
        })),
      },
      sections: {
        create: project.sections.map((s) => ({
          title: s.title,
          content: s.content,
          sortOrder: s.sortOrder,
        })),
      },
    },
  });

  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${newProject.id}`);
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title");
  const slugInput = formData.get("slug");
  const category = formData.get("category");
  const shortDescription = formData.get("shortDescription");
  const description = formData.get("description");
  const year = formData.get("year");
  const status = formData.get("status");

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof category !== "string" ||
    !VALID_CATEGORIES.includes(category as (typeof CATEGORIES)[number]["value"]) ||
    typeof shortDescription !== "string" ||
    typeof description !== "string" ||
    typeof year !== "string" ||
    typeof status !== "string" ||
    !VALID_STATUSES.includes(status)
  ) {
    return;
  }

  const slug =
    typeof slugInput === "string" && slugInput.trim()
      ? slugify(slugInput)
      : slugify(title);

  // Ensure unique slug
  let finalSlug = slug;
  let counter = 1;
  while (await prisma.project.findUnique({ where: { slug: finalSlug } })) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  const project = await prisma.project.create({
    data: {
      title: title.trim(),
      slug: finalSlug,
      category,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      year: parseInt(year) || new Date().getFullYear(),
      status,
      thumbnail: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      published: false,
    },
  });

  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${project.id}`);
}

export async function updateProject(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  const title = formData.get("title");
  const slugInput = formData.get("slug");
  const category = formData.get("category");
  const shortDescription = formData.get("shortDescription");
  const description = formData.get("description");
  const client = formData.get("client");
  const year = formData.get("year");
  const projectDate = formData.get("projectDate");
  const status = formData.get("status");
  const duration = formData.get("duration");
  const thumbnail = formData.get("thumbnail");
  const coverImage = formData.get("coverImage");
  const videoUrl = formData.get("videoUrl");
  const videoThumbnail = formData.get("videoThumbnail");
  const liveUrl = formData.get("liveUrl");
  const figmaUrl = formData.get("figmaUrl");
  const githubUrl = formData.get("githubUrl");
  const externalUrl = formData.get("externalUrl");
  const challenge = formData.get("challenge");
  const approach = formData.get("approach");
  const results = formData.get("results");
  const deliverables = formData.get("deliverables");
  const additionalInfo = formData.get("additionalInfo");
  const featured = formData.get("featured");
  const published = formData.get("published");
  const isDemo = formData.get("isDemo");
  const newBadge = formData.get("newBadge");
  const newBadgeDays = formData.get("newBadgeDays");
  const sortOrder = formData.get("sortOrder");
  const featuresRaw = formData.get("features");
  const toolsRaw = formData.get("tools");
  const technologiesRaw = formData.get("technologies");

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof category !== "string" ||
    !VALID_CATEGORIES.includes(category as (typeof CATEGORIES)[number]["value"]) ||
    typeof shortDescription !== "string" ||
    typeof description !== "string" ||
    typeof year !== "string" ||
    typeof status !== "string" ||
    !VALID_STATUSES.includes(status)
  ) {
    return;
  }

  const slug =
    typeof slugInput === "string" && slugInput.trim()
      ? slugify(slugInput)
      : slugify(title);

  // Check slug uniqueness (excluding self)
  const existing = await prisma.project.findFirst({
    where: { slug, id: { not: id } },
  });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  let newBadgeUntil: Date | null = null;
  if (newBadge === "on") {
    const days = parseInt(String(newBadgeDays)) || 14;
    newBadgeUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  const parseLines = (raw: FormDataEntryValue | null): string[] =>
    typeof raw === "string"
      ? raw
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : [];

  const features = parseLines(featuresRaw);
  const tools = parseLines(toolsRaw);
  const technologies = parseLines(technologiesRaw);

  await prisma.$transaction(async (tx) => {
    await tx.project.update({
      where: { id },
      data: {
        title: title.trim(),
        slug: finalSlug,
        category,
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        client: typeof client === "string" && client.trim() ? client.trim() : null,
        year: parseInt(year) || new Date().getFullYear(),
        projectDate:
          typeof projectDate === "string" && projectDate
            ? new Date(projectDate)
            : null,
        status,
        duration: typeof duration === "string" && duration.trim() ? duration.trim() : null,
        thumbnail:
          typeof thumbnail === "string" && thumbnail.trim()
            ? thumbnail.trim()
            : "/placeholder.svg",
        coverImage:
          typeof coverImage === "string" && coverImage.trim()
            ? coverImage.trim()
            : "/placeholder.svg",
        videoUrl:
          typeof videoUrl === "string" && videoUrl.trim() ? videoUrl.trim() : null,
        videoThumbnail:
          typeof videoThumbnail === "string" && videoThumbnail.trim()
            ? videoThumbnail.trim()
            : null,
        liveUrl:
          typeof liveUrl === "string" && liveUrl.trim() ? liveUrl.trim() : null,
        figmaUrl:
          typeof figmaUrl === "string" && figmaUrl.trim() ? figmaUrl.trim() : null,
        githubUrl:
          typeof githubUrl === "string" && githubUrl.trim() ? githubUrl.trim() : null,
        externalUrl:
          typeof externalUrl === "string" && externalUrl.trim()
            ? externalUrl.trim()
            : null,
        challenge:
          typeof challenge === "string" && challenge.trim() ? challenge.trim() : null,
        approach:
          typeof approach === "string" && approach.trim() ? approach.trim() : null,
        results:
          typeof results === "string" && results.trim() ? results.trim() : null,
        deliverables:
          typeof deliverables === "string" && deliverables.trim()
            ? deliverables.trim()
            : null,
        additionalInfo:
          typeof additionalInfo === "string" && additionalInfo.trim()
            ? additionalInfo.trim()
            : null,
        featured: featured === "on",
        published: published === "on",
        isDemo: isDemo === "on",
        newBadge: newBadge === "on",
        newBadgeUntil,
        sortOrder: parseInt(String(sortOrder)) || 0,
      },
    });

    // Replace features
    await tx.projectFeature.deleteMany({ where: { projectId: id } });
    if (features.length > 0) {
      await tx.projectFeature.createMany({
        data: features.map((feature, i) => ({
          projectId: id,
          feature,
          sortOrder: i,
        })),
      });
    }

    // Replace tools
    await tx.projectTool.deleteMany({ where: { projectId: id } });
    if (tools.length > 0) {
      await tx.projectTool.createMany({
        data: tools.map((name, i) => ({
          projectId: id,
          name,
          sortOrder: i,
        })),
      });
    }

    // Replace technologies
    await tx.projectTechnology.deleteMany({ where: { projectId: id } });
    if (technologies.length > 0) {
      await tx.projectTechnology.createMany({
        data: technologies.map((name, i) => ({
          projectId: id,
          name,
          sortOrder: i,
        })),
      });
    }
  });

  revalidatePath("/admin/projects");
  revalidatePath(`/portfolio/${finalSlug}`);
  revalidatePath("/portfolio");
  revalidatePath("/");
  redirect(`/admin/projects/${id}`);
}