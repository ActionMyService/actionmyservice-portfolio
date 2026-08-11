import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ActionMyService — Creative Digital Experiences",
    template: "%s | ActionMyService",
  },
  description:
    "Websites, AI videos, 3D interfaces, creative experiences and brand identities — created by ActionMyService.",
  keywords: [
    "ActionMyService",
    "Website Development",
    "Website Design",
    "AI Video Creation",
    "AI Creative Projects",
    "3D UI/UX Design",
    "Branding",
    "Creative Portfolio",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "ActionMyService — Creative Digital Experiences",
    description:
      "Websites, AI videos, 3D interfaces, creative experiences and brand identities — created by ActionMyService.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ActionMyService — Creative Digital Experiences",
    description:
      "Websites, AI videos, 3D interfaces, creative experiences and brand identities — created by ActionMyService.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SmoothScroll>
            <Header />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}