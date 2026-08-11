import { CategoryPage } from "@/components/category-page";
import { getProjectsByCategorySlug } from "@/lib/data";
import { getCategoryBySlug } from "@/lib/constants";

export const metadata = {
  title: "Website Design — Portfolio | ActionMyService",
  description:
    "Explore website design projects created by ActionMyService. Modern, premium and responsive website interfaces.",
};

export default async function WebsiteDesignPage() {
  const category = getCategoryBySlug("website-design")!;
  const projects = await getProjectsByCategorySlug("website-design");
  return <CategoryPage category={category} projects={projects} />;
}