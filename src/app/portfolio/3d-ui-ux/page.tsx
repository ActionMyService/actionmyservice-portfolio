import { CategoryPage } from "@/components/category-page";
import { getProjectsByCategorySlug } from "@/lib/data";
import { getCategoryBySlug } from "@/lib/constants";

export const metadata = {
  title: "3D UI/UX Design — Portfolio | ActionMyService",
  description:
    "Explore 3D UI/UX projects by ActionMyService. Interactive 3D interfaces, immersive websites and WebGL experiences.",
};

export default async function ThreeDUIPage() {
  const category = getCategoryBySlug("3d-ui-ux")!;
  const projects = await getProjectsByCategorySlug("3d-ui-ux");
  return <CategoryPage category={category} projects={projects} />;
}