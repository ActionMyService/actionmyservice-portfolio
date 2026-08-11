import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.projectSection.deleteMany();
  await prisma.projectTechnology.deleteMany();
  await prisma.projectTool.deleteMany();
  await prisma.projectFeature.deleteMany();
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.setting.deleteMany();

  // Create admin user
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "ActionMyService2026!", 12);
  await prisma.adminUser.create({
    data: {
      email: process.env.ADMIN_EMAIL || "admin@actionmyservice.com",
      name: "ActionMyService Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  // Create services
  const services = [
    {
      title: "Website Development",
      slug: "website-development",
      description:
        "Custom websites and interactive digital experiences built with modern technology. From business websites to complex web applications, we develop fast, responsive and premium web experiences.",
      sortOrder: 1,
    },
    {
      title: "Website Design",
      slug: "website-design",
      description:
        "Modern, responsive and premium website interfaces. We design visual experiences that communicate your brand and engage your audience through thoughtful layout, typography and interaction.",
      sortOrder: 2,
    },
    {
      title: "AI Video Creation",
      slug: "ai-video-creation",
      description:
        "AI-powered advertisements, promotional videos and cinematic content. We create stunning videos using advanced AI tools for visuals, voice and motion.",
      sortOrder: 3,
    },
    {
      title: "AI Creative Projects",
      slug: "ai-creative-projects",
      description:
        "Experimental AI-powered visual and creative experiences. We push the boundaries of what's possible with AI to create unique art, characters, concepts and campaigns.",
      sortOrder: 4,
    },
    {
      title: "3D UI/UX Design",
      slug: "3d-ui-ux-design",
      description:
        "Interactive 3D interfaces, immersive websites and WebGL experiences. We design and build futuristic 3D user experiences that feel alive and engaging.",
      sortOrder: 5,
    },
    {
      title: "Branding",
      slug: "branding",
      description:
        "Modern visual identities, logos and complete brand systems. We create distinctive brand identities that make your business memorable and recognizable.",
      sortOrder: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // ============ PROJECT 1: Nova Studio (Website Development) ============
  const novaStudio = await prisma.project.create({
    data: {
      title: "Nova Studio",
      slug: "nova-studio",
      category: "WEBSITE_DEVELOPMENT",
      shortDescription:
        "A modern business website for a creative studio with interactive elements and premium design.",
      description:
        "Nova Studio is a modern business website built for a creative design studio. The project focused on creating a premium digital presence that reflects the studio's creative identity while remaining fast, accessible and easy to navigate. The website features interactive navigation, smooth scroll animations, a dynamic portfolio section and a fully responsive layout that works beautifully across all devices.",
      client: "Nova Studio (Demo Client)",
      year: 2026,
      projectDate: new Date("2026-01-15"),
      status: "COMPLETED",
      duration: "4 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&q=80",
      liveUrl: "https://example.com",
      featured: true,
      published: true,
      isDemo: true,
      newBadge: true,
      newBadgeUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      sortOrder: 1,
      challenge:
        "The goal was to create a modern digital presence that felt premium while remaining fast and easy to navigate. The studio needed a website that could showcase their creative work without overwhelming visitors with too much information.",
      approach:
        "We started with a concept phase to understand the studio's creative identity. After wireframing the key pages, we designed a premium UI with strong typography and generous whitespace. The development phase used Next.js and React to build a fast, SEO-friendly experience with smooth animations and interactive elements.",
      results:
        "The final website delivers a premium, fast-loading experience that effectively showcases the studio's creative work. The site achieves excellent performance scores and provides a seamless browsing experience across all devices.",
      deliverables:
        "Full website, responsive design, interactive portfolio, CMS integration, SEO optimization",
      additionalInfo:
        "This is a demo/concept project created to showcase ActionMyService's website development capabilities.",
      features: {
        create: [
          { feature: "Responsive design", sortOrder: 1 },
          { feature: "Interactive navigation", sortOrder: 2 },
          { feature: "Custom animations", sortOrder: 3 },
          { feature: "Dark/light mode", sortOrder: 4 },
          { feature: "Dynamic portfolio section", sortOrder: 5 },
          { feature: "Mobile optimization", sortOrder: 6 },
          { feature: "SEO optimized", sortOrder: 7 },
          { feature: "Fast loading performance", sortOrder: 8 },
        ],
      },
      tools: {
        create: [
          { name: "Next.js", sortOrder: 1 },
          { name: "React", sortOrder: 2 },
          { name: "TypeScript", sortOrder: 3 },
          { name: "Tailwind CSS", sortOrder: 4 },
          { name: "Figma", sortOrder: 5 },
        ],
      },
      technologies: {
        create: [
          { name: "Next.js", sortOrder: 1 },
          { name: "React", sortOrder: 2 },
          { name: "TypeScript", sortOrder: 3 },
          { name: "Tailwind CSS", sortOrder: 4 },
          { name: "Vercel", sortOrder: 5 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&q=80",
            title: "Nova Studio Homepage",
            alt: "Nova Studio website homepage",
            sortOrder: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=1920&q=80",
            title: "Nova Studio Desktop View",
            alt: "Nova Studio website desktop view",
            sortOrder: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
            title: "Nova Studio Mobile View",
            alt: "Nova Studio website mobile view",
            sortOrder: 3,
          },
        ],
      },
      sections: {
        create: [
          {
            title: "Project Overview",
            content:
              "Nova Studio is a complete website development project for a creative design studio. The project demonstrates ActionMyService's ability to build premium, interactive and performant websites using modern web technologies.",
            sortOrder: 1,
          },
          {
            title: "Design Approach",
            content:
              "The design approach focused on creating a clean, editorial layout with strong typography and generous whitespace. The color palette uses a sophisticated dark theme with subtle accent colors to create a premium feel.",
            sortOrder: 2,
          },
        ],
      },
    },
  });

  // ============ PROJECT 2: Minimal One (Website Design) ============
  const minimalOne = await prisma.project.create({
    data: {
      title: "Minimal One",
      slug: "minimal-one",
      category: "WEBSITE_DESIGN",
      shortDescription:
        "A premium landing page concept focused on minimal design and strong visual hierarchy.",
      description:
        "Minimal One is a premium landing page design concept that demonstrates the power of minimalism in web design. The project focuses on clean layouts, strong typography, and a sophisticated color system to create a memorable first impression. Every element serves a purpose, creating a focused and elegant user experience.",
      client: "Concept Project",
      year: 2026,
      projectDate: new Date("2026-02-01"),
      status: "DEMO",
      duration: "2 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1920&q=80",
      figmaUrl: "https://figma.com",
      featured: true,
      published: true,
      isDemo: true,
      sortOrder: 2,
      challenge:
        "The challenge was to create a landing page that felt premium and modern while using minimal design elements. The design needed to communicate sophistication through simplicity.",
      approach:
        "We began with a research phase to understand what makes minimal design effective. The concept phase explored different layout approaches before settling on a clean, asymmetric grid. The final design uses a refined typography system, generous spacing and a carefully curated color palette.",
      results:
        "The result is a stunning minimal landing page concept that proves less is more. The design is clean, focused and premium, demonstrating how strong typography and whitespace can create a powerful visual impact.",
      deliverables: "Landing page design, Figma file, Design system, Responsive layouts",
      additionalInfo:
        "This is a demo/concept project created to showcase ActionMyService's website design capabilities.",
      features: {
        create: [
          { feature: "Minimal design system", sortOrder: 1 },
          { feature: "Strong typography hierarchy", sortOrder: 2 },
          { feature: "Responsive layouts", sortOrder: 3 },
          { feature: "Color system", sortOrder: 4 },
          { feature: "Component design", sortOrder: 5 },
          { feature: "Interactive prototype", sortOrder: 6 },
        ],
      },
      tools: {
        create: [
          { name: "Figma", sortOrder: 1 },
          { name: "Adobe Photoshop", sortOrder: 2 },
        ],
      },
      technologies: {
        create: [
          { name: "Figma", sortOrder: 1 },
          { name: "Design System", sortOrder: 2 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1920&q=80",
            title: "Minimal One Landing Page",
            alt: "Minimal One landing page design",
            sortOrder: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&q=80",
            title: "Minimal One Design System",
            alt: "Minimal One design system components",
            sortOrder: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80",
            title: "Minimal One Mobile Design",
            alt: "Minimal One mobile design view",
            sortOrder: 3,
          },
        ],
      },
      sections: {
        create: [
          {
            title: "Design Concept",
            content:
              "Minimal One explores the intersection of minimalism and premium design. The concept uses a restrained color palette, sophisticated typography and intentional whitespace to create a landing page that feels both elegant and modern.",
            sortOrder: 1,
          },
          {
            title: "Typography & Color",
            content:
              "The typography system uses a modern sans-serif with strong weight contrast to create visual hierarchy. The color palette is intentionally restrained, using a dark base with a single accent color for emphasis.",
            sortOrder: 2,
          },
        ],
      },
    },
  });

  // ============ PROJECT 3: Future Vision (AI Video Creation) ============
  const futureVision = await prisma.project.create({
    data: {
      title: "Future Vision",
      slug: "future-vision",
      category: "AI_VIDEO_CREATION",
      shortDescription:
        "A cinematic AI promotional video that blends futuristic visuals with powerful storytelling.",
      description:
        "Future Vision is a cinematic AI promotional video created entirely with AI-powered tools. The video takes viewers on a journey through a futuristic world, showcasing the power of AI-generated visuals, voice and motion. The project demonstrates how AI can create stunning, professional-quality video content.",
      client: "Concept Project",
      year: 2026,
      projectDate: new Date("2026-02-15"),
      status: "COMPLETED",
      duration: "1 Week",
      thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      videoThumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&q=80",
      featured: true,
      published: true,
      isDemo: true,
      newBadge: true,
      newBadgeUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      sortOrder: 3,
      challenge:
        "The challenge was to create a cinematic promotional video using only AI tools. The goal was to demonstrate that AI can produce video content that feels premium, emotional and professionally crafted.",
      approach:
        "We started with a creative concept focused on the theme of future technology. After writing the script, we used AI video generation tools to create the visual sequences. AI voice tools were used for narration, and the final edit was assembled with professional video editing software.",
      results:
        "The final video is a stunning 60-second cinematic piece that demonstrates the power of AI video creation. The visuals are immersive, the narration is compelling, and the overall production quality rivals traditional video production.",
      deliverables: "Full video (60s), Vertical version, Social media version, Short version (15s)",
      additionalInfo:
        "This is a demo/concept project created to showcase ActionMyService's AI video creation capabilities.",
      features: {
        create: [
          { feature: "AI-generated visuals", sortOrder: 1 },
          { feature: "AI voice narration", sortOrder: 2 },
          { feature: "Cinematic color grading", sortOrder: 3 },
          { feature: "Motion graphics", sortOrder: 4 },
          { feature: "Sound design", sortOrder: 5 },
          { feature: "Multiple aspect ratios", sortOrder: 6 },
        ],
      },
      tools: {
        create: [
          { name: "Runway", sortOrder: 1 },
          { name: "Midjourney", sortOrder: 2 },
          { name: "ElevenLabs", sortOrder: 3 },
          { name: "Adobe Premiere Pro", sortOrder: 4 },
          { name: "After Effects", sortOrder: 5 },
        ],
      },
      technologies: {
        create: [
          { name: "AI Video Generation", sortOrder: 1 },
          { name: "AI Voice Synthesis", sortOrder: 2 },
          { name: "AI Image Generation", sortOrder: 3 },
          { name: "Video Editing", sortOrder: 4 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&q=80",
            title: "Future Vision Video Frame",
            alt: "Future Vision AI video frame",
            sortOrder: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920&q=80",
            title: "Future Vision Visual",
            alt: "Future Vision AI generated visual",
            sortOrder: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80",
            title: "Future Vision Technology",
            alt: "Future Vision technology theme",
            sortOrder: 3,
          },
        ],
      },
      sections: {
        create: [
          {
            title: "Creative Concept",
            content:
              "Future Vision explores the theme of technological evolution. The video takes viewers from the present into a near-future world where technology and humanity merge seamlessly. The concept was designed to feel aspirational and inspiring.",
            sortOrder: 1,
          },
          {
            title: "Production Process",
            content:
              "The production process was: Concept → Script → Visual Generation → Voice → Editing → Final Video. Each stage leveraged different AI tools to create a cohesive and professional final product.",
            sortOrder: 2,
          },
        ],
      },
    },
  });

  // ============ PROJECT 4: Digital Dream (AI Creative Projects) ============
  const digitalDream = await prisma.project.create({
    data: {
      title: "Digital Dream",
      slug: "digital-dream",
      category: "AI_CREATIVE_PROJECTS",
      shortDescription:
        "An experimental AI visual concept exploring surreal digital landscapes and dreamlike imagery.",
      description:
        "Digital Dream is an experimental AI creative project that explores the boundaries of AI-generated art. The project uses advanced AI image generation to create surreal, dreamlike landscapes that feel both familiar and otherworldly. Each piece in the series was carefully curated and refined to achieve a cohesive artistic vision.",
      client: "Personal Project",
      year: 2026,
      projectDate: new Date("2026-03-01"),
      status: "COMPLETED",
      duration: "3 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80",
      featured: true,
      published: true,
      isDemo: true,
      sortOrder: 4,
      challenge:
        "The challenge was to create a cohesive series of AI-generated artworks that felt intentional and artistic, rather than random AI outputs. The goal was to demonstrate that AI can be a powerful creative tool in the hands of a skilled artist.",
      approach:
        "We began with a creative direction focused on surreal landscapes and dreamlike atmospheres. Using advanced AI image generation tools, we created hundreds of variations before selecting and refining the strongest pieces. Each final artwork was carefully edited and color-graded to achieve a consistent visual language.",
      results:
        "The result is a stunning series of AI-generated artworks that feel cohesive, intentional and deeply artistic. The project demonstrates how AI can be used as a serious creative medium.",
      deliverables: "Artwork series (6 pieces), High-resolution exports, Creative process documentation",
      additionalInfo:
        "This is a demo/concept project created to showcase ActionMyService's AI creative capabilities.",
      features: {
        create: [
          { feature: "AI-generated artwork", sortOrder: 1 },
          { feature: "Surreal visual style", sortOrder: 2 },
          { feature: "Cohesive color grading", sortOrder: 3 },
          { feature: "High-resolution output", sortOrder: 4 },
          { feature: "Creative direction", sortOrder: 5 },
          { feature: "Artistic curation", sortOrder: 6 },
        ],
      },
      tools: {
        create: [
          { name: "Midjourney", sortOrder: 1 },
          { name: "Stable Diffusion", sortOrder: 2 },
          { name: "Adobe Photoshop", sortOrder: 3 },
          { name: "Lightroom", sortOrder: 4 },
        ],
      },
      technologies: {
        create: [
          { name: "AI Image Generation", sortOrder: 1 },
          { name: "Digital Art", sortOrder: 2 },
          { name: "Photo Editing", sortOrder: 3 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80",
            title: "Digital Dream 01",
            alt: "Digital Dream AI artwork 01",
            sortOrder: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1920&q=80",
            title: "Digital Dream 02",
            alt: "Digital Dream AI artwork 02",
            sortOrder: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&q=80",
            title: "Digital Dream 03",
            alt: "Digital Dream AI artwork 03",
            sortOrder: 3,
          },
        ],
      },
      sections: {
        create: [
          {
            title: "Creative Direction",
            content:
              "The creative direction for Digital Dream focused on creating surreal landscapes that feel like scenes from a dream. The visual language combines organic forms with digital aesthetics to create a unique and memorable series.",
            sortOrder: 1,
          },
          {
            title: "Artistic Process",
            content:
              "The process involved iterative AI generation, careful curation and extensive post-processing. Each piece went through multiple refinement cycles to achieve the final artistic quality.",
            sortOrder: 2,
          },
        ],
      },
    },
  });

  // ============ PROJECT 5: Neo Interface (3D UI/UX Design) ============
  const neoInterface = await prisma.project.create({
    data: {
      title: "Neo Interface",
      slug: "neo-interface",
      category: "THREE_D_UI_UX",
      shortDescription:
        "An interactive futuristic 3D interface built with Three.js and React Three Fiber.",
      description:
        "Neo Interface is an interactive 3D UI/UX project that pushes the boundaries of web interfaces. Built with Three.js and React Three Fiber, this project demonstrates how 3D elements can create immersive and engaging user experiences. The interface features interactive 3D objects, smooth camera movements and responsive interactions that work beautifully on both desktop and mobile.",
      client: "Concept Project",
      year: 2026,
      projectDate: new Date("2026-03-15"),
      status: "DEMO",
      duration: "5 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80",
      liveUrl: "https://example.com",
      featured: true,
      published: true,
      isDemo: true,
      newBadge: true,
      newBadgeUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      sortOrder: 5,
      challenge:
        "The challenge was to create a 3D interface that felt futuristic and immersive while remaining performant and accessible. The interface needed to demonstrate the potential of 3D UI/UX without sacrificing usability.",
      approach:
        "We started with a concept phase exploring futuristic interface design. The 3D design phase used Blender to create the core 3D elements. Using React Three Fiber and Three.js, we built an interactive experience with smooth animations, camera movements and responsive touch interactions.",
      results:
        "The result is a stunning interactive 3D interface that feels like something from the future. The experience is smooth, performant and demonstrates the full potential of 3D UI/UX design.",
      deliverables: "Interactive 3D experience, WebGL implementation, Responsive 3D design, Documentation",
      additionalInfo:
        "This is a demo/concept project created to showcase ActionMyService's 3D UI/UX design capabilities.",
      features: {
        create: [
          { feature: "Interactive 3D", sortOrder: 1 },
          { feature: "WebGL", sortOrder: 2 },
          { feature: "3D navigation", sortOrder: 3 },
          { feature: "Product visualization", sortOrder: 4 },
          { feature: "3D animations", sortOrder: 5 },
          { feature: "Motion interactions", sortOrder: 6 },
          { feature: "Scroll-based animation", sortOrder: 7 },
          { feature: "Camera movement", sortOrder: 8 },
          { feature: "Interactive objects", sortOrder: 9 },
          { feature: "Responsive 3D experience", sortOrder: 10 },
        ],
      },
      tools: {
        create: [
          { name: "Three.js", sortOrder: 1 },
          { name: "React Three Fiber", sortOrder: 2 },
          { name: "Blender", sortOrder: 3 },
          { name: "Figma", sortOrder: 4 },
          { name: "GSAP", sortOrder: 5 },
        ],
      },
      technologies: {
        create: [
          { name: "Three.js", sortOrder: 1 },
          { name: "WebGL", sortOrder: 2 },
          { name: "React Three Fiber", sortOrder: 3 },
          { name: "TypeScript", sortOrder: 4 },
          { name: "GSAP", sortOrder: 5 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80",
            title: "Neo Interface 3D View",
            alt: "Neo Interface 3D UI view",
            sortOrder: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&q=80",
            title: "Neo Interface Design",
            alt: "Neo Interface 3D design",
            sortOrder: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80",
            title: "Neo Interface Interaction",
            alt: "Neo Interface interaction preview",
            sortOrder: 3,
          },
        ],
      },
      sections: {
        create: [
          {
            title: "3D Experience",
            content:
              "Neo Interface creates an immersive 3D experience that feels futuristic and engaging. Users can interact with 3D objects, explore the interface through smooth camera movements and experience a new paradigm of web interaction.",
            sortOrder: 1,
          },
          {
            title: "Technical Implementation",
            content:
              "The project uses React Three Fiber for the 3D scene, Three.js for WebGL rendering and GSAP for smooth animations. The 3D assets were created in Blender and optimized for web performance.",
            sortOrder: 2,
          },
        ],
      },
    },
  });

  // ============ PROJECT 6: Mono Brand (Branding) ============
  const monoBrand = await prisma.project.create({
    data: {
      title: "Mono Brand",
      slug: "mono-brand",
      category: "BRANDING",
      shortDescription:
        "A complete modern brand identity concept with logo, color system, typography and brand guidelines.",
      description:
        "Mono Brand is a complete brand identity concept that demonstrates ActionMyService's branding capabilities. The project includes a distinctive logo system, a sophisticated color palette, a refined typography system and comprehensive brand guidelines. The identity is designed to be modern, memorable and versatile across all applications.",
      client: "Concept Project",
      year: 2026,
      projectDate: new Date("2026-04-01"),
      status: "COMPLETED",
      duration: "3 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1920&q=80",
      figmaUrl: "https://figma.com",
      featured: true,
      published: true,
      isDemo: true,
      sortOrder: 6,
      challenge:
        "The challenge was to create a brand identity that felt modern, minimal and premium. The identity needed to be versatile enough to work across digital and print applications while remaining distinctive and memorable.",
      approach:
        "We began with a research phase to understand current branding trends and what makes identities memorable. The concept phase explored multiple logo directions before settling on a minimal, geometric approach. The final identity includes a complete visual system with typography, color and application guidelines.",
      results:
        "The result is a sophisticated brand identity that feels both modern and timeless. The system is comprehensive, versatile and ready for real-world application.",
      deliverables: "Logo system, Brand guidelines, Color palette, Typography system, Social assets, Mockups",
      additionalInfo:
        "This is a demo/concept project created to showcase ActionMyService's branding capabilities.",
      features: {
        create: [
          { feature: "Logo design", sortOrder: 1 },
          { feature: "Brand identity", sortOrder: 2 },
          { feature: "Brand visual system", sortOrder: 3 },
          { feature: "Typography", sortOrder: 4 },
          { feature: "Color system", sortOrder: 5 },
          { feature: "Brand guidelines", sortOrder: 6 },
          { feature: "Social brand assets", sortOrder: 7 },
          { feature: "Product branding", sortOrder: 8 },
        ],
      },
      tools: {
        create: [
          { name: "Figma", sortOrder: 1 },
          { name: "Adobe Illustrator", sortOrder: 2 },
          { name: "Adobe Photoshop", sortOrder: 3 },
        ],
      },
      technologies: {
        create: [
          { name: "Figma", sortOrder: 1 },
          { name: "Adobe Creative Suite", sortOrder: 2 },
          { name: "Brand Strategy", sortOrder: 3 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1920&q=80",
            title: "Mono Brand Identity",
            alt: "Mono Brand identity presentation",
            sortOrder: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80",
            title: "Mono Brand Guidelines",
            alt: "Mono Brand guidelines",
            sortOrder: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80",
            title: "Mono Brand Application",
            alt: "Mono Brand application mockup",
            sortOrder: 3,
          },
        ],
      },
      sections: {
        create: [
          {
            title: "Brand Concept",
            content:
              "Mono Brand explores the power of minimalism in brand identity. The concept uses a geometric logo mark, a restrained color palette and a sophisticated typography system to create a brand that feels both modern and timeless.",
            sortOrder: 1,
          },
          {
            title: "Visual System",
            content:
              "The visual system includes a complete set of brand guidelines covering logo usage, color application, typography rules and asset creation. The system is designed to be flexible and scalable across all brand touchpoints.",
            sortOrder: 2,
          },
        ],
      },
    },
  });

  // ============ ADDITIONAL PROJECTS ============

  // Aurora Web (Website Development)
  await prisma.project.create({
    data: {
      title: "Aurora Web",
      slug: "aurora-web",
      category: "WEBSITE_DEVELOPMENT",
      shortDescription:
        "An interactive portfolio website with smooth animations and a unique visual identity.",
      description:
        "Aurora Web is an interactive portfolio website built for a digital artist. The project features smooth scroll animations, a unique visual identity and a fully responsive design. The website was built with performance and user experience as top priorities.",
      client: "Aurora (Demo Client)",
      year: 2025,
      projectDate: new Date("2025-11-10"),
      status: "COMPLETED",
      duration: "3 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&q=80",
      liveUrl: "https://example.com",
      featured: false,
      published: true,
      isDemo: true,
      sortOrder: 7,
      challenge:
        "The challenge was to create a portfolio website that felt as creative as the artist's work itself. The site needed to be visually striking while remaining fast and easy to navigate.",
      approach:
        "We designed a unique visual identity inspired by the artist's work, then developed the site using Next.js and React. Custom animations and smooth scroll effects were implemented to create an engaging browsing experience.",
      results:
        "The final website is a stunning portfolio that effectively showcases the artist's work. The site loads quickly, feels premium and provides a memorable user experience.",
      deliverables: "Full website, Custom animations, Responsive design, SEO optimization",
      additionalInfo: "This is a demo/concept project.",
      features: {
        create: [
          { feature: "Custom animations", sortOrder: 1 },
          { feature: "Smooth scroll", sortOrder: 2 },
          { feature: "Responsive design", sortOrder: 3 },
          { feature: "Interactive elements", sortOrder: 4 },
        ],
      },
      tools: {
        create: [
          { name: "Next.js", sortOrder: 1 },
          { name: "React", sortOrder: 2 },
          { name: "GSAP", sortOrder: 3 },
        ],
      },
      technologies: {
        create: [
          { name: "Next.js", sortOrder: 1 },
          { name: "React", sortOrder: 2 },
          { name: "GSAP", sortOrder: 3 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&q=80",
            title: "Aurora Web Homepage",
            alt: "Aurora Web homepage",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  // Pixel Perfect (Website Design)
  await prisma.project.create({
    data: {
      title: "Pixel Perfect",
      slug: "pixel-perfect",
      category: "WEBSITE_DESIGN",
      shortDescription:
        "A modern e-commerce website design with a focus on clean product presentation.",
      description:
        "Pixel Perfect is a modern e-commerce website design concept focused on clean product presentation and seamless user experience. The design uses a sophisticated layout system, strong product photography and intuitive navigation to create a premium shopping experience.",
      client: "Concept Project",
      year: 2025,
      projectDate: new Date("2025-10-20"),
      status: "DEMO",
      duration: "2 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&q=80",
      figmaUrl: "https://figma.com",
      featured: false,
      published: true,
      isDemo: true,
      sortOrder: 8,
      challenge:
        "The challenge was to design an e-commerce interface that felt premium and modern while prioritizing product presentation and ease of use.",
      approach:
        "We focused on creating a clean, product-first layout with generous whitespace and strong visual hierarchy. The design system includes reusable components for products, navigation and checkout flows.",
      results:
        "The result is a sophisticated e-commerce design that feels both premium and functional.",
      deliverables: "E-commerce design, Design system, Product page design, Checkout flow",
      additionalInfo: "This is a demo/concept project.",
      features: {
        create: [
          { feature: "Product-first layout", sortOrder: 1 },
          { feature: "Clean design system", sortOrder: 2 },
          { feature: "Responsive design", sortOrder: 3 },
          { feature: "Intuitive navigation", sortOrder: 4 },
        ],
      },
      tools: {
        create: [
          { name: "Figma", sortOrder: 1 },
        ],
      },
      technologies: {
        create: [
          { name: "Figma", sortOrder: 1 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&q=80",
            title: "Pixel Perfect Design",
            alt: "Pixel Perfect e-commerce design",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  // Neon Pulse (AI Video)
  await prisma.project.create({
    data: {
      title: "Neon Pulse",
      slug: "neon-pulse",
      category: "AI_VIDEO_CREATION",
      shortDescription:
        "An energetic AI music video with neon visuals and dynamic motion graphics.",
      description:
        "Neon Pulse is an energetic AI music video that combines neon-soaked visuals with dynamic motion graphics. The video was created entirely with AI tools, demonstrating the power of AI in music video production. The result is a visually stunning piece that feels both futuristic and alive.",
      client: "Concept Project",
      year: 2025,
      projectDate: new Date("2025-09-15"),
      status: "COMPLETED",
      duration: "2 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      videoThumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&q=80",
      featured: false,
      published: true,
      isDemo: true,
      sortOrder: 9,
      challenge:
        "The challenge was to create a music video that felt energetic and visually striking using AI tools. The video needed to sync with the music and create a memorable visual experience.",
      approach:
        "We created a neon-inspired visual concept and used AI video generation to create the core visuals. Motion graphics were added to enhance the energy and rhythm of the video.",
      results:
        "The final video is an energetic, visually stunning piece that demonstrates the creative potential of AI video production.",
      deliverables: "Full music video, Vertical version, Social media clips",
      additionalInfo: "This is a demo/concept project.",
      features: {
        create: [
          { feature: "Neon visual style", sortOrder: 1 },
          { feature: "Dynamic motion graphics", sortOrder: 2 },
          { feature: "Music sync", sortOrder: 3 },
          { feature: "AI-generated visuals", sortOrder: 4 },
        ],
      },
      tools: {
        create: [
          { name: "Runway", sortOrder: 1 },
          { name: "After Effects", sortOrder: 2 },
        ],
      },
      technologies: {
        create: [
          { name: "AI Video Generation", sortOrder: 1 },
          { name: "Motion Graphics", sortOrder: 2 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&q=80",
            title: "Neon Pulse Video",
            alt: "Neon Pulse AI video",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  // Synth Garden (AI Creative)
  await prisma.project.create({
    data: {
      title: "Synth Garden",
      slug: "synth-garden",
      category: "AI_CREATIVE_PROJECTS",
      shortDescription:
        "An AI-generated series of futuristic plant life and organic digital forms.",
      description:
        "Synth Garden is an AI creative project that imagines futuristic plant life through the lens of digital synthesis. The series explores the intersection of nature and technology, creating organic forms that feel both alive and artificial. Each piece was generated with AI and carefully curated to create a cohesive collection.",
      client: "Personal Project",
      year: 2025,
      projectDate: new Date("2025-08-01"),
      status: "COMPLETED",
      duration: "2 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1920&q=80",
      featured: false,
      published: true,
      isDemo: true,
      sortOrder: 10,
      challenge:
        "The challenge was to create a cohesive series of AI artworks exploring the theme of synthetic nature. The pieces needed to feel organic yet clearly digital.",
      approach:
        "We developed a creative direction around the concept of synthetic biology. Using AI image generation, we created a series of plant-like forms with digital aesthetics, then refined each piece through careful post-processing.",
      results:
        "The result is a beautiful series of AI artworks that explore the boundary between nature and technology.",
      deliverables: "Artwork series, High-resolution exports, Process documentation",
      additionalInfo: "This is a demo/concept project.",
      features: {
        create: [
          { feature: "AI-generated art", sortOrder: 1 },
          { feature: "Organic forms", sortOrder: 2 },
          { feature: "Digital aesthetics", sortOrder: 3 },
          { feature: "Cohesive series", sortOrder: 4 },
        ],
      },
      tools: {
        create: [
          { name: "Midjourney", sortOrder: 1 },
          { name: "Photoshop", sortOrder: 2 },
        ],
      },
      technologies: {
        create: [
          { name: "AI Image Generation", sortOrder: 1 },
          { name: "Digital Art", sortOrder: 2 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1920&q=80",
            title: "Synth Garden 01",
            alt: "Synth Garden AI artwork",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  // Quantum UI (3D UI/UX)
  await prisma.project.create({
    data: {
      title: "Quantum UI",
      slug: "quantum-ui",
      category: "THREE_D_UI_UX",
      shortDescription:
        "A 3D product showcase experience with interactive camera controls and WebGL rendering.",
      description:
        "Quantum UI is a 3D product showcase experience that demonstrates the power of interactive 3D in e-commerce. The project features a fully interactive 3D product viewer with camera controls, zoom functionality and smooth animations. Built with Three.js and React Three Fiber, the experience is both immersive and performant.",
      client: "Concept Project",
      year: 2025,
      projectDate: new Date("2025-07-15"),
      status: "DEMO",
      duration: "4 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&q=80",
      liveUrl: "https://example.com",
      featured: false,
      published: true,
      isDemo: true,
      sortOrder: 11,
      challenge:
        "The challenge was to create a 3D product showcase that felt premium and interactive while remaining performant on a variety of devices.",
      approach:
        "We designed a 3D product viewer with intuitive camera controls and smooth interactions. The 3D model was optimized for web performance, and the experience was built with React Three Fiber for maintainable code.",
      results:
        "The result is a stunning 3D product showcase that provides an immersive and engaging user experience.",
      deliverables: "3D product viewer, WebGL experience, Responsive 3D design",
      additionalInfo: "This is a demo/concept project.",
      features: {
        create: [
          { feature: "Interactive 3D", sortOrder: 1 },
          { feature: "Camera controls", sortOrder: 2 },
          { feature: "Zoom functionality", sortOrder: 3 },
          { feature: "Smooth animations", sortOrder: 4 },
          { feature: "WebGL rendering", sortOrder: 5 },
        ],
      },
      tools: {
        create: [
          { name: "Three.js", sortOrder: 1 },
          { name: "React Three Fiber", sortOrder: 2 },
          { name: "Blender", sortOrder: 3 },
        ],
      },
      technologies: {
        create: [
          { name: "Three.js", sortOrder: 1 },
          { name: "WebGL", sortOrder: 2 },
          { name: "React Three Fiber", sortOrder: 3 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&q=80",
            title: "Quantum UI Showcase",
            alt: "Quantum UI 3D product showcase",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  // Vertex Identity (Branding)
  await prisma.project.create({
    data: {
      title: "Vertex Identity",
      slug: "vertex-identity",
      category: "BRANDING",
      shortDescription:
        "A bold geometric brand identity for a technology startup.",
      description:
        "Vertex Identity is a bold geometric brand identity created for a technology startup. The identity features a distinctive geometric logo, a vibrant color system and a comprehensive set of brand guidelines. The design is modern, memorable and built to scale across all brand touchpoints.",
      client: "Vertex (Demo Client)",
      year: 2025,
      projectDate: new Date("2025-06-01"),
      status: "COMPLETED",
      duration: "3 Weeks",
      thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80",
      figmaUrl: "https://figma.com",
      featured: false,
      published: true,
      isDemo: true,
      sortOrder: 12,
      challenge:
        "The challenge was to create a brand identity for a technology startup that felt bold, modern and distinctive in a crowded market.",
      approach:
        "We developed a geometric logo system inspired by the concept of vertices and connections. The color palette uses bold, energetic colors that stand out while remaining professional.",
      results:
        "The result is a bold, memorable brand identity that positions the startup as a modern and innovative player.",
      deliverables: "Logo system, Brand guidelines, Color palette, Social assets",
      additionalInfo: "This is a demo/concept project.",
      features: {
        create: [
          { feature: "Geometric logo", sortOrder: 1 },
          { feature: "Bold color system", sortOrder: 2 },
          { feature: "Brand guidelines", sortOrder: 3 },
          { feature: "Social assets", sortOrder: 4 },
        ],
      },
      tools: {
        create: [
          { name: "Figma", sortOrder: 1 },
          { name: "Illustrator", sortOrder: 2 },
        ],
      },
      technologies: {
        create: [
          { name: "Figma", sortOrder: 1 },
          { name: "Adobe Illustrator", sortOrder: 2 },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80",
            title: "Vertex Identity",
            alt: "Vertex brand identity",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  // Create settings
  await prisma.setting.createMany({
    data: [
      { key: "new_badge_days", value: "14" },
      { key: "site_name", value: "ActionMyService" },
      { key: "site_tagline", value: "We Build. We Create. We Design." },
      { key: "site_description", value: "Creative Digital Experiences, Built to Stand Out." },
    ],
  });

  console.log("Seed data created successfully!");
  console.log(`Projects: ${await prisma.project.count()}`);
  console.log(`Services: ${await prisma.service.count()}`);
  console.log(`Admin user: ${process.env.ADMIN_EMAIL || "admin@actionmyservice.com"}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });