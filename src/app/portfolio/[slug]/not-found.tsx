import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-sm font-medium text-muted-foreground mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Project Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The project you're looking for is unavailable.
        </p>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}