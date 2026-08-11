import { Suspense } from "react";
import { PortfolioClient } from "./portfolio-client";
import { getAllProjects } from "@/lib/data";
import { ThreeDWorld } from "@/components/three-d-world";

export const metadata = {
  title: "Portfolio — ActionMyService",
  description:
    "Explore everything we create at ActionMyService. Websites, AI videos, 3D interfaces, creative projects and brand identities.",
};

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen relative">
      <ThreeDWorld />
      <div className="relative z-10">
        <Suspense fallback={<PortfolioLoading />}>
          <PortfolioClient projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}

function PortfolioLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-border border-t-accent animate-spin" />
    </div>
  );
}