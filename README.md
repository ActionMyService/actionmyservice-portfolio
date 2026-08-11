# ActionMyService — Premium Portfolio Website

**Creative Digital Experiences, Built to Stand Out.**

> We Build. We Create. We Design.

ActionMyService is a portfolio-first creative technology website showcasing websites, AI videos, AI-powered creative projects, immersive 3D UI/UX experiences, and distinctive brand identities.

## ✨ Features

### Public Website
- **Homepage** — Premium hero with mouse-follow floating project cards, editorial "Selected Work" layout, services, interactive 3D showcase (Three.js / React Three Fiber), AI video showcase, CTA
- **Portfolio** (`/portfolio`) — Live search + dynamic category filtering, editorial project cards
- **6 category pages** — Websites, Website Design, AI Videos, AI Creatives, 3D UI/UX, Branding
- **Dynamic project pages** (`/portfolio/[slug]`) — Full case-study format: overview, challenge, approach, category-specific process, features, tools/technologies, lightbox gallery, video player, optional interactive 3D preview, related projects
- **Services** — Overview page + 6 dedicated service detail pages
- **About / Contact** — Contact form with validation, loading/success/error states, rate limiting, and pre-selected service via URL
- **Dark / Light / System mode** — Cinematic premium dark theme + editorial light theme
- **SEO** — Dynamic metadata, Open Graph, sitemap.xml, robots.txt, structured data

### Admin Dashboard (`/admin`)
- Secure authentication (bcrypt + JWT httpOnly cookies, server-side route protection)
- Dashboard with project statistics and recent projects
- Full project CRUD — create, edit, duplicate, delete, publish/unpublish, feature, reorder
- 6 category types with dynamic features/tools/technologies/sections
- Media management (URL-based; Cloudinary/Supabase-ready)
- Contact messages inbox
- Settings

### Data Layer
- **Database:** PostgreSQL (SQLite for local dev)
- **ORM:** Prisma
- All portfolio content is database-driven — new projects automatically receive their own public page. No code changes needed.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Animation | CSS/Intersection Observer (GSAP-ready) |
| 3D | Three.js, React Three Fiber, @react-three/drei |
| Database | PostgreSQL via Prisma ORM |
| Auth | bcryptjs + jose (JWT, httpOnly cookies) |
| Hosting | Vercel-ready |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your own secrets (defaults work for local dev)

# 3. Set up the database (SQLite by default)
npx prisma db push

# 4. Seed demo content + admin user
npx prisma db seed

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** A dev server is already running on port 3000, so the new one may start on port 3001.

## 🔐 Admin Access

| | |
|---|---|
| **URL** | `http://localhost:3000/admin` |
| **Email** | `admin@actionmyservice.com` |
| **Password** | `ActionMyService2026!` |

> ⚠️ Change these credentials in `.env` before deploying to production.

## 📦 Production Deployment (Vercel + Supabase/Neon)

1. Create a PostgreSQL database (Supabase or Neon) and copy the connection string.
2. Set environment variables on Vercel:
   - `DATABASE_URL` — your PostgreSQL URL
   - `JWT_SECRET` — a long random string
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your admin credentials
   - `NEXT_PUBLIC_SITE_URL` — your production domain
3. Push the schema and seed:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
4. Deploy to Vercel.

## 📁 Project Structure

```text
actionmyservice/
├── prisma/
│   ├── schema.prisma      # Database models
│   └── seed.ts            # Demo content + admin user
├── public/                # Static assets
└── src/
    ├── app/               # App Router pages & API routes
    │   ├── portfolio/     # Portfolio list, categories, [slug] detail
    │   ├── services/      # Services list + [slug] detail
    │   ├── admin/         # Admin login + protected dashboard
    │   └── api/           # contact, admin login/logout
    ├── components/        # Header, Footer, Hero, ProjectCard, 3D, etc.
    └── lib/               # prisma, auth, data, constants, utils
```

## 🧩 Demo Content

Six sample projects are seeded, one per service, all clearly labeled as **Demo / Concept**:

| Project | Category |
|---|---|
| Nova Studio | Website Development |
| Minimal One | Website Design |
| Future Vision | AI Video Creation |
| Digital Dream | AI Creative Projects |
| Neo Interface | 3D UI/UX Design |
| Mono Brand | Branding |

## ⚖️ License

© 2026 ActionMyService. All rights reserved.