"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, ChevronDown, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, PORTFOLIO_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container-site flex h-16 md:h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="font-semibold text-lg tracking-tight">
            ActionMyService
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            if (link.href === "/portfolio") {
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors",
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                    <div className="w-56 rounded-xl border border-border bg-card shadow-xl p-2">
                      {PORTFOLIO_LINKS.map((pl) => (
                        <Link
                          key={pl.href}
                          href={pl.href}
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors"
                        >
                          {pl.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          <Link
            href="/contact"
            className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 overflow-y-auto">
          <div className="container-site py-8 flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              if (link.href === "/portfolio") {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setPortfolioOpen(!portfolioOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium rounded-xl hover:bg-secondary transition-colors"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform",
                          portfolioOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {portfolioOpen && (
                      <div className="pl-4 flex flex-col gap-1 pb-2">
                        {PORTFOLIO_LINKS.map((pl) => (
                          <Link
                            key={pl.href}
                            href={pl.href}
                            className="px-4 py-2.5 text-base text-muted-foreground rounded-xl hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            {pl.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-lg font-medium rounded-xl hover:bg-secondary transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-4 flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-foreground text-background text-base font-medium"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}