"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";

const sizeByLevel: Record<number, string> = {
  5: "text-base px-4 py-2 font-semibold",
  4: "text-sm px-3 py-1.5 font-medium",
  3: "text-xs px-3 py-1.5",
  2: "text-xs px-2.5 py-1",
  1: "text-xs px-2 py-1 opacity-70",
};

const categoryColor: Record<string, string> = {
  frontend: "border-blue-500/30 bg-blue-500/5 text-blue-400 hover:border-blue-500/60 hover:bg-blue-500/10",
  backend:  "border-red-500/30 bg-red-500/5 text-red-400 hover:border-red-500/60 hover:bg-red-500/10",
  database: "border-green-500/30 bg-green-500/5 text-green-400 hover:border-green-500/60 hover:bg-green-500/10",
  devops:   "border-orange-500/30 bg-orange-500/5 text-orange-400 hover:border-orange-500/60 hover:bg-orange-500/10",
};

const categoryDot: Record<string, string> = {
  frontend: "bg-blue-400",
  backend:  "bg-red-400",
  database: "bg-green-400",
  devops:   "bg-orange-400",
};

export function Skills() {
  const t = useTranslations("skills");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-primary font-mono text-sm mb-1">{t("subtitle")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <div className="mt-3 h-px w-12 bg-primary" />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-10 text-xs text-muted-foreground"
        >
          {Object.entries(categoryColor).map(([cat]) => (
            <span key={cat} className="flex items-center gap-1.5">
              <span className={cn("w-2 h-2 rounded-full", categoryDot[cat])} />
              {t(`categories.${cat}` as "categories.frontend" | "categories.backend" | "categories.database" | "categories.devops")}
            </span>
          ))}
          <span className="text-muted-foreground/60 ml-2">· bigger = more proficient</span>
        </motion.div>

        {/* Organic tag cloud */}
        <motion.div
          className="flex flex-wrap gap-2.5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill.name}
              variants={{
                hidden: { opacity: 0, scale: 0.6, y: 10 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } },
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              className={cn(
                "inline-flex items-center rounded-full border cursor-default transition-colors duration-200",
                sizeByLevel[skill.level] ?? sizeByLevel[3],
                categoryColor[skill.category]
              )}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
