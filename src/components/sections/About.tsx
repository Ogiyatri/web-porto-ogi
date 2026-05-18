"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, Briefcase, GraduationCap, Zap } from "lucide-react";
import Image from "next/image";

const stats = [
  { key: "projects", value: "7+" },
  { key: "modules", value: "20+" },
  { key: "features", value: "30+" },
  { key: "experience", value: "1+" },
];

function AnimatedCounter({ value }: Readonly<{ value: string }>) {
  return (
    <span className="text-3xl font-bold text-primary">{value}</span>
  );
}

export function About() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-primary font-mono text-sm mb-1">{t("subtitle")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <div className="mt-3 h-px w-12 bg-primary" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <div className="relative w-80 h-96 sm:w-96 sm:h-[28rem]">
                  <Image
                    src="/images/profile/ogi-2.png"
                    alt="Ogi Yatri Malakiano"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 100%" }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Info card floating */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-background border border-border rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-semibold text-xs">Universitas Andalas</div>
                    <div className="text-muted-foreground text-xs">Cumlaude — 3.63 GPA</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-background border border-border rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-xs text-green-500">Available</div>
                    <div className="text-muted-foreground text-xs">Open to opportunities</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t("description1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t("description2")}
              </p>
            </motion.div>

            {/* Info badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm bg-muted rounded-lg px-3 py-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t("location")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-muted rounded-lg px-3 py-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>CV. Solusi Teknologi Kreatif</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-lg px-3 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span>{t("availability")}</span>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="bg-muted/50 border border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
                >
                  <AnimatedCounter value={stat.value} />
                  <div className="text-xs text-muted-foreground mt-1">
                    {t(`stats.${stat.key}` as "stats.projects" | "stats.modules" | "stats.features" | "stats.experience")}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
