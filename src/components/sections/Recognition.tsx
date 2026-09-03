"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote, GraduationCap, Building2, ExternalLink, Mail } from "lucide-react";

const LINKEDIN_POST_URL =
  "https://www.linkedin.com/feed/update/urn:li:activity:7460218038714269696/";

export function Recognition() {
  const t = useTranslations("recognition");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="recognition" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono text-sm mb-1">{t("subtitle")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <div className="mt-3 h-px w-12 bg-primary" />
        </motion.div>

        {/* Main testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6"
        >
          <div className="relative bg-background border border-violet-500/30 rounded-2xl p-7 md:p-9 overflow-hidden hover:border-violet-500/60 transition-colors duration-300">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative">
              {/* Label */}
              <div className="flex items-center gap-2 mb-5">
                <Quote className="h-4 w-4 text-violet-400" />
                <span className="text-xs font-medium text-violet-300 font-mono uppercase tracking-wider">
                  {t("techLead.label")}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
                &ldquo;{t("techLead.quote")}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-border">
                <div>
                  <div className="font-semibold">{t("techLead.author")}</div>
                  <div className="text-sm text-muted-foreground">{t("techLead.role")}</div>
                </div>
                <a
                  href={LINKEDIN_POST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
                >
                  {t("techLead.link")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust signals row */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background/50 border border-border rounded-2xl p-6 hover:border-indigo-500/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1.5">
                  {t("education.label")}
                </div>
                <div className="font-semibold text-base">{t("education.title")}</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {t("education.subtitle")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust signal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-background/50 border border-border rounded-2xl p-6 hover:border-violet-500/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1.5">
                  {t("trust.label")}
                </div>
                <div className="font-semibold text-base">{t("trust.title")}</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {t("trust.subtitle")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center"
        >
          <a
            href="mailto:ogiyatrimalakiano@gmail.com?subject=Reference%20request"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span>{t("cta")}</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
