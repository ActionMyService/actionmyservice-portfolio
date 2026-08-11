import { CategoryPage } from "@/components/category-page";
import { getProjectsByCategorySlug } from "@/lib/data";
import { getCategoryBySlug } from "@/lib/constants";

export const metadata = {
  title: "Website Development — Portfolio | ActionMyService",
  description:
    "Explore website development projects created by ActionMyService. Custom websites, landing pages and interactive web experiences.",
};

export default async function WebsitesPage() {
  const category = getCategoryBySlug("websites")!;
  const projects = await getProjectsByCategorySlug("websites");
  return <CategoryPage category={category} projects={projects} />;
}