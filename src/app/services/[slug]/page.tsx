import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getServiceBySlug, getProjectsForService } from "@/lib/data";
import { SERVICE_SLUGS, PROCESS_STEPS } from "@/lib/constants";
import { ProjectCard } from "@/components/project-card";
import { CtaSection } from "@/components/cta-section";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const SERVICE_DETAILS: Record<
  string,
  {
    description: string;
    whatWeCreate: string[];
    capabilities: string[];
    tools: string[];
    faqs: { question: string; answer: string }[];
  }
> = {
  WEBSITE_DEVELOPMENT: {
    description:
      "Custom websites and interactive digital experiences built with modern technology. From business websites to complex web applications, we build fast, responsive and premium digital products.",
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
      "CMS integration",
      "API development",
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Vercel", "PostgreSQL", "Prisma"],
    faqs: [
      {
        question: "How long does a website take to build?",
        answer:
          "A typical website takes 2–6 weeks depending on complexity. We'll provide a clear timeline after understanding your project.",
      },
      {
        question: "Do you build e-commerce websites?",
        answer:
          "We focus on custom websites, portfolios, landing pages and web experiences. For e-commerce, we can build custom storefronts as part of a web application project.",
      },
      {
        question: "Will my website be mobile responsive?",
        answer:
          "Yes. Every website we build is fully responsive and tested across mobile, tablet, laptop and desktop devices.",
      },
    ],
  },
  WEBSITE_DESIGN: {
    description:
      "Modern, responsive and premium website interfaces designed to make a lasting impression. We design interfaces that are both beautiful and functional.",
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
      "Design tokens",
      "Component libraries",
    ],
    tools: ["Figma", "Adobe XD", "Framer", "Illustrator", "Photoshop", "After Effects"],
    faqs: [
      {
        question: "What do you need to start a design project?",
        answer:
          "A brief about your brand, any references you like, and your goals. We handle everything from wireframes to final design.",
      },
      {
        question: "Do you provide design files?",
        answer:
          "Yes. You receive all Figma files, design systems, and exportable assets as part of the project.",
      },
      {
        question: "Can you design for both dark and light mode?",
        answer:
          "Absolutely. We design complete themes for both dark and light modes with proper contrast and accessibility.",
      },
    ],
  },
  AI_VIDEO_CREATION: {
    description:
      "AI-powered advertisements, promotional videos and cinematic content that capture attention. We combine AI generation with professional editing to create videos that stand out.",
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
      "Script writing",
      "Sound design",
    ],
    tools: ["Runway", "Midjourney", "ElevenLabs", "Premiere Pro", "After Effects", "DaVinci Resolve"],
    faqs: [
      {
        question: "What video formats do you deliver?",
        answer:
          "We deliver full-length videos, vertical versions for Reels/Shorts, social media versions and short teaser versions.",
      },
      {
        question: "How long does an AI video take?",
        answer:
          "Most AI videos take 1–3 weeks depending on length and complexity. We'll provide a timeline after the concept is approved.",
      },
      {
        question: "Can you use our brand assets in the video?",
        answer:
          "Yes. We incorporate your brand colors, logo, and visual identity into the video to keep it consistent with your brand.",
      },
    ],
  },
  AI_CREATIVE_PROJECTS: {
    description:
      "Experimental AI-powered visual and creative experiences that push creative boundaries. We explore what's possible when AI meets creative vision.",
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
      "Style exploration",
      "Visual research",
    ],
    tools: ["Midjourney", "DALL·E", "Stable Diffusion", "Runway", "Photoshop", "After Effects"],
    faqs: [
      {
        question: "What is an AI creative project?",
        answer:
          "It's an experimental project where we use AI tools to create visuals, characters, concepts and experiences that would be difficult or impossible to create traditionally.",
      },
      {
        question: "Can you create AI characters for our brand?",
        answer:
          "Yes. We can design unique AI characters and visual concepts that align with your brand identity.",
      },
      {
        question: "Do you own the AI-generated artwork?",
        answer:
          "You receive full commercial usage rights to the final deliverables as part of the project agreement.",
      },
    ],
  },
  THREE_D_UI_UX: {
    description:
      "Interactive 3D interfaces, immersive websites and WebGL experiences that feel futuristic. We create digital experiences that go beyond the screen.",
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
      "Camera & lighting",
      "Texture & material design",
    ],
    tools: ["Three.js", "React Three Fiber", "WebGL", "Blender", "GSAP", "Figma"],
    faqs: [
      {
        question: "Will 3D experiences work on mobile?",
        answer:
          "Yes. We optimize 3D scenes for mobile devices with reduced polygon counts, compressed textures and graceful degradation.",
      },
      {
        question: "How long does a 3D website take?",
        answer:
          "3D experiences typically take 3–8 weeks depending on complexity. We'll provide a detailed timeline after the concept phase.",
      },
      {
        question: "Can you integrate 3D into an existing website?",
        answer:
          "Yes. We can add 3D elements, product showcases or interactive experiences to your existing website.",
      },
    ],
  },
  BRANDING: {
    description:
      "Modern visual identities, logos and complete brand systems that make brands memorable. We build brands that are distinctive, consistent and timeless.",
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
      "Brand applications",
      "Social media assets",
    ],
    tools: ["Figma", "Illustrator", "Photoshop", "InDesign", "After Effects"],
    faqs: [
      {
        question: "What's included in a brand identity project?",
        answer:
          "Logo design, color system, typography, brand guidelines, social assets and brand applications. Everything your brand needs to look consistent.",
      },
      {
        question: "How long does branding take?",
        answer:
          "A complete brand identity typically takes 2–4 weeks including research, concept development and final deliverables.",
      },
      {
        question: "Do you provide brand guidelines?",
        answer:
          "Yes. Every branding project includes a comprehensive brand guidelines document covering logo usage, colors, typography and applications.",
      },
    ],
  },
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found — ActionMyService" };

  return {
    title: `${service.title} — ActionMyService`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const category = SERVICE_SLUGS[service.slug as keyof typeof SERVICE_SLUGS] ?? "";
  const details = SERVICE_DETAILS[category] ?? {
    description: service.description,
    whatWeCreate: [],
    capabilities: [],
    tools: [],
    faqs: [],
  };
  const projects = await getProjectsForService(category, 4);
  const processSteps = PROCESS_STEPS[category] ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-foreground">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8">
                {details.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Start a Project
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
            <div className="lg:col-span-6">
              {projects[0] ? (
                <div className="relative rounded-2xl overflow-hidden border border-border aspect-[16/10]">
                  <Image
                    src={projects[0].coverImage}
                    alt={projects[0].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card aspect-[16/10] flex items-center justify-center">
                  <span className="text-8xl font-bold text-muted-foreground/10">
                    {service.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What We Create */}
      {details.whatWeCreate.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">What We Create</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  What We Create
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {details.whatWeCreate.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      {details.capabilities.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Capabilities</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Key Capabilities
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {details.capabilities.map((capability) => (
                    <div
                      key={capability}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-sm">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {processSteps.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Process</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Our Process
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-3">
                  {processSteps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2"
                    >
                      <span className="text-xs font-bold text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tools */}
      {details.tools.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Tools</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Tools & Technologies
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-2">
                  {details.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 rounded-full bg-secondary text-sm font-medium text-secondary-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Featured Work</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {service.title} Projects
                </h2>
              </div>
              <Link
                href={`/portfolio/${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {details.faqs.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {details.faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </div>
  );
}