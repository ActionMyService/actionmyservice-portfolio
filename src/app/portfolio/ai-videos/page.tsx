import { CategoryPage } from "@/components/category-page";
import { getProjectsByCategorySlug } from "@/lib/data";
import { getCategoryBySlug } from "@/lib/constants";

export const metadata = {
  title: "AI Video Creation — Portfolio | ActionMyService",
  description:
    "Explore AI video creation projects by ActionMyService. Cinematic AI advertisements, product videos and brand films.",
};

export default async function AIVideosPage() {
  const category = getCategoryBySlug("ai-videos")!;
  const projects = await getProjectsByCategorySlug("ai-videos");
  return <CategoryPage category={category} projects={projects} />;
}