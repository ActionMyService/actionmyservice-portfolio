import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 md:px-16 md:py-24 text-center">
          {/* Decorative glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="text-sm font-medium text-muted-foreground mb-4">
              Start a Project
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
              Have an Idea? Let's Build It.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              Tell us what you want to create and let's turn the idea into a
              digital experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
              >
                Explore Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}