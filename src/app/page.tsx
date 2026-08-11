import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Play, Box, Sparkles, Palette, Code2, Video, Wand2, Layers } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { ThreeDShowcase } from "@/components/three-d-showcase";
import { ThreeDPortfolioPreview } from "@/components/three-d-portfolio-preview";
import { HandDrawnArrow, HumanNote } from "@/components/human-touch";
import { getFeaturedProjects, getRecentProjects, getServices } from "@/lib/data";
import { getCategoryLabel } from "@/lib/constants";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  WEBSITE_DEVELOPMENT: <Code2 className="w-5 h-5" />,
  WEBSITE_DESIGN: <Palette className="w-5 h-5" />,
  AI_VIDEO_CREATION: <Video className="w-5 h-5" />,
  AI_CREATIVE_PROJECTS: <Wand2 className="w-5 h-5" />,
  THREE_D_UI_UX: <Box className="w-5 h-5" />,
  BRANDING: <Layers className="w-5 h-5" />,
};

const SERVICE_SLUGS: Record<string, string> = {
  WEBSITE_DEVELOPMENT: "website-development",
  WEBSITE_DESIGN: "website-design",
  AI_VIDEO_CREATION: "ai-video-creation",
  AI_CREATIVE_PROJECTS: "ai-creative-projects",
  THREE_D_UI_UX: "3d-ui-ux-design",
  BRANDING: "branding",
};

export default async function Home() {
  const [featuredProjects, recentProjects, services] = await Promise.all([
    getFeaturedProjects(),
    getRecentProjects(4),
    getServices(),
  ]);

  const heroProject = featuredProjects[0];
  const secondaryProjects = featuredProjects.slice(1, 3);
  const fullWidthProject = featuredProjects[3];
  const remainingProjects = featuredProjects.slice(4, 6);

  return (
    <>
      <Hero />

      {/* ===== Selected Work ===== */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
                Portfolio
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Selected Work
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                A selection of websites, AI creations, 3D experiences and brand
                projects created by ActionMyService.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Editorial layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Large featured project */}
            {heroProject && (
              <ProjectCard
                project={heroProject}
                large
                className="lg:col-span-2"
              />
            )}

            {/* Two smaller projects */}
            {secondaryProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* Full-width project */}
            {fullWidthProject && (
              <ProjectCard
                project={fullWidthProject}
                large
                className="lg:col-span-2"
              />
            )}

            {/* Remaining projects */}
            {remainingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Our Work in 3D ===== */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
                Interactive Showcase
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Our Work, In 3D.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Explore a selection of our projects in an interactive 3D
                space. Drag to rotate, hover to explore.
              </p>
            </div>
            <Link
              href="/portfolio/3d-ui-ux"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              Explore 3D Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative">
            <ThreeDPortfolioPreview />

            {/* Hand-drawn arrow */}
            <div className="absolute -top-10 -right-4 hidden xl:block text-accent/60">
              <HandDrawnArrow className="w-20 h-10 -scale-x-100 rotate-[200deg]" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
                What We Do
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Six Services. Infinite Possibilities.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                We build. We create. We design. Explore the six core services
                that define ActionMyService.
              </p>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-border bg-background p-8 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  {SERVICE_ICONS[service.slug.toUpperCase().replace(/-/g, "_")] || (
                    <Sparkles className="w-5 h-5" />
                  )}
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Learn More
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3D Showcase ===== */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
                3D UI/UX Design
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Interfaces That Feel{" "}
                <span className="gradient-text">Alive.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                We design and build interactive 3D interfaces, immersive
                websites and WebGL experiences that push the boundaries of what
                the web can do. From product showcases to futuristic UI
                concepts, our 3D work feels alive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Three.js", "WebGL", "React Three Fiber", "GSAP", "Blender"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 rounded-full border border-border text-sm"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/portfolio/3d-ui-ux"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Explore 3D Work
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/services/3d-ui-ux-design"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              <ThreeDShowcase />

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-lg animate-float">
                Interactive 3D
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI Video Showcase ===== */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
                AI Video Creation
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Cinematic. AI-Powered. Unforgettable.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                From AI advertisements to cinematic brand films, we create
                videos that capture attention and tell powerful stories.
              </p>
            </div>
            <Link
              href="/portfolio/ai-videos"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              Watch AI Videos
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {recentProjects
              .filter((p) => p.category === "AI_VIDEO_CREATION")
              .slice(0, 2)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl border border-border bg-card overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                  alt="ActionMyService creative team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl border border-border bg-background p-6 shadow-xl">
                <p className="text-3xl font-bold tracking-tight">6</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Core Creative Services
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
                About ActionMyService
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                We Create Digital Experiences.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                ActionMyService is a creative digital brand focused on websites,
                AI videos, AI-powered creative projects, immersive 3D UI/UX
                experiences and distinctive brand identities.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                We don't just make websites. We create experiences that
                stand out.
              </p>
              <div className="mt-6">
                <HumanNote>
                  No templates. No shortcuts. Just thoughtful, hand-crafted
                  digital work.
                </HumanNote>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  About Us
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Explore Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="relative rounded-3xl border border-border bg-card overflow-hidden px-8 py-16 md:px-16 md:py-24 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent/10 blur-[100px]" />
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Have an Idea? Let's Build It.
              </h2>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Tell us what you want to create and let's turn the idea
                into a digital experience.
              </p>
              <div className="relative mt-10 flex flex-wrap justify-center gap-4">
                <div className="absolute -top-10 left-[15%] hidden md:block text-accent/50">
                  <HandDrawnArrow className="w-16 h-8 rotate-[160deg]" />
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
    </>
  );
}