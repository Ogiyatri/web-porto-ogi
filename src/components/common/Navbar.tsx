"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Download, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "experience", href: "#experience" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === "en" ? "id" : "en";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-xl text-primary tracking-tight"
          >
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Ogi.
            </button>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                {t(link.key as "about" | "skills" | "experience" | "projects" | "contact")}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLocale}
              className="relative"
              title="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold uppercase bg-primary text-primary-foreground rounded px-0.5 leading-tight">
                {locale}
              </span>
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            <Button size="sm" asChild className="gap-2">
              <a href="/cv-ogi-yatri-malakiano.pdf" download>
                <Download className="h-3.5 w-3.5" />
                {t("downloadCV")}
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                >
                  {t(link.key as "about" | "skills" | "experience" | "projects" | "contact")}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" onClick={toggleLocale} className="gap-2">
                  <Globe className="h-3.5 w-3.5" />
                  {locale === "en" ? "Bahasa Indonesia" : "English"}
                </Button>
                <Button size="sm" asChild className="gap-2 flex-1">
                  <a href="/cv-ogi-yatri-malakiano.pdf" download>
                    <Download className="h-3.5 w-3.5" />
                    {t("downloadCV")}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
