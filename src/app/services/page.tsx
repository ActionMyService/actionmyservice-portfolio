import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getServices, getProjectsForService } from "@/lib/data";
import { SERVICE_SLUGS } from "@/lib/constants";
import { CtaSection } from "@/components/cta-section";

export const metadata = {
  title: "Services — ActionMyService",
  description:
    "Website Development, Website Design, AI Video Creation, AI Creative Projects, 3D UI/UX Design and Branding — created by ActionMyService.",
};

const SERVICE_DETAILS: Record<
  string,
  {
    description: string;
    whatWeCreate: string[];
    capabilities: string[];
    tools: string[];
  }
> = {
  WEBSITE_DEVELOPMENT: {
    description:
      "Custom websites and interactive digital experiences built with modern technology.",
    whatWeCreate: [
      "Business Websites",
      "Portfolio Websites",
      "Landing Pages",
      "Custom Web Experiences",
      "Interactive Websites",
      "Web Applications",
      "Responsive Websites",
    ],
    capabilities: [
      "Next.js & React development",
      "TypeScript",
      "Tailwind CSS",
      "Custom animations",
      "Performance optimization",
      "SEO-ready architecture",
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Vercel"],
  },
  WEBSITE_DESIGN: {
    description:
      "Modern, responsive and premium website interfaces designed to make a lasting impression.",
    whatWeCreate: [
      "Modern Website Design",
      "Premium Landing Page Design",
      "Figma Website Design",
      "Responsive UI",
      "Interactive Web Design",
      "Motion-Based Website Design",
      "Creative Website Concepts",
    ],
    capabilities: [
      "UI/UX design",
      "Design systems",
      "Wireframing & prototyping",
      "Typography & color systems",
      "Responsive layouts",
      "Interaction design",
    ],
    tools: ["Figma", "Adobe XD", "Framer", "Illustrator", "Photoshop"],
  },
  AI_VIDEO_CREATION: {
    description:
      "AI-powered advertisements, promotional videos and cinematic content that capture attention.",
    whatWeCreate: [
      "AI Advertisement",
      "AI Product Video",
      "AI Brand Video",
      "AI Promotional Video",
      "AI Explainer Video",
      "AI Cinematic Video",
      "AI Social Media Video",
      "AI Reels & Shorts",
      "AI Story Videos",
    ],
    capabilities: [
      "AI visual generation",
      "AI voice & narration",
      "Cinematic editing",
      "Motion graphics",
      "Color grading",
      "Multi-format delivery",
    ],
    tools: ["Runway", "Midjourney", "ElevenLabs", "Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
  AI_CREATIVE_PROJECTS: {
    description:
      "Experimental AI-powered visual and creative experiences that push creative boundaries.",
    whatWeCreate: [
      "AI Visual Concepts",
      "AI Characters",
      "AI Product Concepts",
      "AI Art",
      "AI Motion Concepts",
      "AI Storytelling",
      "AI Creative Campaigns",
      "Experimental AI Projects",
    ],
    capabilities: [
      "AI art direction",
      "Character design",
      "Concept development",
      "Visual storytelling",
      "Motion & animation",
      "Creative campaigns",
    ],
    tools: ["Midjourney", "DALL·E", "Stable Diffusion", "Runway", "Photoshop", "After Effects"],
  },
  THREE_D_UI_UX: {
    description:
      "Interactive 3D interfaces, immersive websites and WebGL experiences that feel futuristic.",
    whatWeCreate: [
      "3D UI",
      "3D UX",
      "Interactive 3D Interfaces",
      "3D Websites",
      "3D Landing Pages",
      "Interactive Product Experiences",
      "3D Product Showcase",
      "WebGL Experiences",
      "Three.js Experiences",
      "3D Motion",
      "Interactive Animations",
      "Immersive Digital Experiences",
    ],
    capabilities: [
      "Three.js & WebGL",
      "React Three Fiber",
      "3D modeling",
      "Interactive animations",
      "Scroll-based experiences",
      "Performance optimization",
    ],
    tools: ["Three.js", "React Three Fiber", "WebGL", "Blender", "GSAP", "Figma"],
  },
  BRANDING: {
    description:
      "Modern visual identities, logos and complete brand systems that make brands memorable.",
    whatWeCreate: [
      "Logo Design",
      "Brand Identity",
      "Brand Visual System",
      "Typography",
      "Color System",
      "Brand Guidelines",
      "Social Brand Assets",
      "Creative Brand Concepts",
      "Product Branding",
    ],
    capabilities: [
      "Logo design",
      "Visual identity",
      "Brand strategy",
      "Typography systems",
      "Color systems",
      "Brand guidelines",
    ],
    tools: ["Figma", "Illustrator", "Photoshop", "InDesign", "After Effects"],
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  // Fetch projects for all services in parallel
  const servicesWithProjects = await Promise.all(
    services.map(async (service) => {
      const category = SERVICE_SLUGS[service.slug as keyof typeof SERVICE_SLUGS] ?? "";
      const projects = await getProjectsForService(category, 2);
      return { service, category, projects };
    })
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container-site">
          <p className="text-sm font-medium text-muted-foreground mb-4">Services</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">
            What We Create
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">
            Six focused services. One creative vision. Explore what ActionMyService
            can build, design and create for you.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="pb-20 md:pb-28">
        <div className="container-site">
          <div className="space-y-6">
            {servicesWithProjects.map(({ service, category, projects }, index) => {
              const details = SERVICE_DETAILS[category] ?? {
                description: service.description,
                whatWeCreate: [],
                capabilities: [],
                tools: [],
              };

              return (
                <div
                  key={service.id}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Number */}
                    <div className="lg:col-span-1 flex items-start justify-center pt-8">
                      <span className="text-sm font-bold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 text-pretty">
                        {details.description}
                      </p>

                      {details.whatWeCreate.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {details.whatWeCreate.slice(0, 5).map((item) => (
                            <span
                              key={item}
                              className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Explore Service
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/portfolio/${service.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                        >
                          View Projects
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Visual */}
                    <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[400px]">
                      {projects[0] ? (
                        <Image
                          src={projects[0].coverImage}
                          alt={projects[0].title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                          <span className="text-6xl font-bold text-muted-foreground/20">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}