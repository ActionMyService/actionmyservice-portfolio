import { CategoryPage } from "@/components/category-page";
import { getProjectsByCategorySlug } from "@/lib/data";
import { getCategoryBySlug } from "@/lib/constants";

export const metadata = {
  title: "Branding — Portfolio | ActionMyService",
  description:
    "Explore branding projects by ActionMyService. Logos, brand identities and complete visual systems.",
};

export default async function BrandingPage() {
  const category = getCategoryBySlug("branding")!;
  const projects = await getProjectsByCategorySlug("branding");
  return <CategoryPage category={category} projects={projects} />;
}