"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ExternalLink, Lock, Loader2, Star } from "lucide-react";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function TiltCard({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
}

function ProjectImage({ project, imageErrors, onError, className }: {
  project: Project;
  imageErrors: Record<string, boolean>;
  onError: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("relative bg-gradient-to-br from-violet-600/20 to-indigo-600/20 overflow-hidden", className)}>
      {project.image && !imageErrors[project.id] ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          onError={() => onError(project.id)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Loader2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <span className="text-xs">Screenshot coming soon</span>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

      {/* Status badge */}
      <div className="absolute top-3 right-3">
        <span className={cn(
          "text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm",
          project.status === "live"
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
        )}>
          {project.status === "live" ? "● Live" : "⚙ Dev"}
        </span>
      </div>

      {/* Featured badge */}
      {project.featured && !project.highlight && (
        <div className="absolute top-3 left-3">
          <span className="text-xs px-2 py-1 rounded-full font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30 backdrop-blur-sm flex items-center gap-1">
            <Star className="h-2.5 w-2.5 fill-current" />
            Featured
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectActions({ project, t }: { project: Project; t: (key: string) => string }) {
  return (
    <div className="flex gap-2">
      {project.liveUrl ? (
        <Button size="sm" className="flex-1 gap-2" asChild>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            {t("viewLive")}
          </a>
        </Button>
      ) : (
        <Button size="sm" className="flex-1 gap-2" disabled>
          <ExternalLink className="h-3.5 w-3.5" />
          {t("viewLive")}
        </Button>
      )}
      <Button size="sm" variant="outline" className="gap-2" disabled title={t("privateRepo")}>
        <Lock className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) =>
    setImageErrors((prev) => ({ ...prev, [id]: true }));

  const highlight = projects.find((p) => p.highlight);
  const rest = projects.filter((p) => !p.highlight);

  return (
    <section id="projects" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">{t("subtitle")}</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">{t("title")}</h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mx-auto" />
        </motion.div>

        <div className="space-y-6" style={{ perspective: "1000px" }}>
          {/* Highlighted project — wide card */}
          {highlight && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <TiltCard>
                <div className="bg-background border border-violet-500/40 rounded-2xl overflow-hidden hover:border-violet-500/70 hover:shadow-2xl hover:shadow-violet-500/15 transition-all duration-300 relative">
                  {/* Subtle glow behind card */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-600/10 to-indigo-600/10 -z-10" />

                  <div className="flex flex-col md:flex-row">
                    {/* Image — takes 45% on desktop */}
                    <div className="relative md:w-[45%] h-56 md:h-auto flex-shrink-0">
                      <ProjectImage
                        project={highlight}
                        imageErrors={imageErrors}
                        onError={handleImageError}
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Top label */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
                            <Star className="h-3 w-3 fill-current" />
                            Top Project
                          </span>
                          <span className="text-xs text-muted-foreground font-mono">Kemendagri · Government</span>
                        </div>

                        <h3 className="font-bold text-xl md:text-2xl mb-3">{highlight.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-5">
                          {locale === "en" ? highlight.description.en : highlight.description.id}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {highlight.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs py-0.5 px-2 bg-primary/5 border-primary/20 text-primary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="max-w-xs">
                          <ProjectActions project={highlight} t={t} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* Remaining projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
              >
                <TiltCard className="h-full">
                  <div className="h-full bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">
                    <ProjectImage
                      project={project}
                      imageErrors={imageErrors}
                      onError={handleImageError}
                      className="h-44"
                    />

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-base mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                        {locale === "en" ? project.description.en : project.description.id}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs py-0.5 px-2 bg-primary/5 border-primary/20 text-primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <ProjectActions project={project} t={t} />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
