import { CategoryPage } from "@/components/category-page";
import { getProjectsByCategorySlug } from "@/lib/data";
import { getCategoryBySlug } from "@/lib/constants";

export const metadata = {
  title: "AI Creative Projects — Portfolio | ActionMyService",
  description:
    "Explore AI creative projects by ActionMyService. Experimental AI-powered visuals, characters and creative concepts.",
};

export default async function AICreativesPage() {
  const category = getCategoryBySlug("ai-creatives")!;
  const projects = await getProjectsByCategorySlug("ai-creatives");
  return <CategoryPage category={category} projects={projects} />;
}