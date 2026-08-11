 import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getServices, getProjectsForService } from "@/lib/data";
import { SERVICE_SLUGS } from "@/lib/constants";
import { CtaSection } from "@/components/cta-section";

export const metadata = {
  title: "About — ActionMyService",
  description:
    "ActionMyService creates websites, AI videos, AI-powered creative projects, immersive 3D UI/UX experiences and distinctive brand identities.",
};

export default async function AboutPage() {
  const services = await getServices();

  const servicesWithProjects = await Promise.all(
    services.map(async (service) => {
      const category = SERVICE_SLUGS[service.slug as keyof typeof SERVICE_SLUGS] ?? "";
      const projects = await getProjectsForService(category, 1);
      return { service, category, projects };
    })
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container-site">
          <p className="text-sm font-medium text-muted-foreground mb-4">About</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">
            We Create Digital Experiences.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl text-pretty">
            ActionMyService is a creative digital brand focused on websites, AI videos,
            AI-powered creative projects, immersive 3D UI/UX experiences and distinctive
            brand identities. We don't just make websites — we create experiences.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Our Focus</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                What We Do
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Digital Experiences",
                    description:
                      "Websites and web applications that feel premium, fast and engaging.",
                  },
                  {
                    title: "Creative Technology",
                    description:
                      "Modern technology applied with creative vision to build standout digital products.",
                  },
                  {
                    title: "Visual Design",
                    description:
                      "Interfaces and identities designed with strong typography, color and layout.",
                  },
                  {
                    title: "AI Creativity",
                    description:
                      "AI-powered videos, visuals and creative projects that push creative boundaries.",
                  },
                  {
                    title: "3D Experiences",
                    description:
                      "Immersive 3D interfaces and WebGL experiences that feel futuristic.",
                  },
                  {
                    title: "Brand Identity",
                    description:
                      "Complete brand systems that make brands distinctive and memorable.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container-site">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Services</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Six Focused Services
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesWithProjects.map(({ service, projects }, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {projects[0] ? (
                    <Image
                      src={projects[0].coverImage}
                      alt={projects[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                      <span className="text-5xl font-bold text-muted-foreground/20">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Approach</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                How We Work
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Understand",
                    description:
                      "We start by understanding your vision, goals and the experience you want to create.",
                  },
                  {
                    step: "02",
                    title: "Concept",
                    description:
                      "We develop creative concepts and visual directions that align with your brand.",
                  },
                  {
                    step: "03",
                    title: "Create",
                    description:
                      "We design, build and produce — combining technology, creativity and attention to detail.",
                  },
                  {
                    step: "04",
                    title: "Deliver",
                    description:
                      "We refine, test and launch. Every project is polished and ready for the world.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <span className="text-sm font-bold text-accent shrink-0 pt-1">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}