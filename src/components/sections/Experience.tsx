"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    {
      company: "CV. Solusi Teknologi Kreatif",
      role: locale === "en" ? "Fullstack Web Developer" : "Fullstack Web Developer",
      period: locale === "en" ? "June 2024 – Present" : "Juni 2024 – Sekarang",
      location: locale === "en" ? "South Jakarta" : "Jakarta Selatan",
      type: locale === "en" ? "Full Time" : "Full Time",
      current: true,
      highlights: locale === "en" ? [
        "Contributed to 7 software projects including multi-portal government platforms (Kemendagri)",
        "Implemented monitoring & observability with Elastic APM, Elasticsearch, and Kibana",
        "Built structured logging with Pino & OpenTelemetry in Kubernetes environments",
        "Developed social media scraping system using RapidAPI for keyword-based sentiment analysis",
        "Delivered 30+ production-ready UI features from Figma mockups (React, Next.js, Tailwind)",
        "Built 20+ backend modules with Laravel and NestJS ensuring data integrity at scale",
      ] : [
        "Berkontribusi pada 7 proyek software termasuk platform multi-portal pemerintahan (Kemendagri)",
        "Mengimplementasikan monitoring & observabilitas dengan Elastic APM, Elasticsearch, dan Kibana",
        "Membangun structured logging dengan Pino & OpenTelemetry di lingkungan Kubernetes",
        "Mengembangkan sistem scraping media sosial menggunakan RapidAPI untuk analisis sentimen",
        "Menghasilkan 30+ fitur UI production-ready dari mockup Figma (React, Next.js, Tailwind)",
        "Membangun 20+ modul backend dengan Laravel dan NestJS",
      ],
    },
    {
      company: locale === "en"
        ? "West Sumatra Provincial Dept. of Communication, Information & Statistics"
        : "Dinas Komunikasi, Informatika & Statistik Prov. Sumatera Barat",
      role: locale === "en" ? "IT Security Intern" : "Magang Keamanan IT",
      period: locale === "en" ? "Jan 2023 – Feb 2023" : "Jan 2023 – Feb 2023",
      location: "Padang",
      type: locale === "en" ? "Internship" : "Magang",
      current: false,
      highlights: locale === "en" ? [
        "Conducted network and website security analysis using NMAP and Acunetix",
        "Identified and documented system vulnerabilities with mitigation recommendations",
        "Analyzed server infrastructure and network systems in a public sector environment",
      ] : [
        "Melakukan analisis keamanan jaringan dan website menggunakan NMAP dan Acunetix",
        "Mengidentifikasi dan mendokumentasikan kerentanan sistem beserta rekomendasi mitigasi",
        "Menganalisis infrastruktur server dan sistem jaringan di lingkungan sektor publik",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl -z-10" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
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

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-12">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-primary shadow-lg shadow-primary/20">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>

                {/* Card */}
                <div className="bg-background/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.role}</h3>
                      <p className="text-primary font-medium mt-0.5">{item.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={item.current ? "glow" : "secondary"} className="text-xs">
                        {item.type}
                      </Badge>
                      {item.current && (
                        <span className="flex items-center gap-1 text-xs text-green-500">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                          </span>
                          {t("present")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {item.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.2 + j * 0.05 + 0.3 }}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        <span>{h}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative pl-16"
            >
              <div className="absolute left-0 top-1 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-indigo-500 shadow-lg shadow-indigo-500/20">
                <span className="text-xl">🎓</span>
              </div>

              <div className="bg-background/50 border border-border rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-xl font-bold">
                      {locale === "en" ? "Bachelor of Computer Engineering" : "S1 Teknik Komputer"}
                    </h3>
                    <p className="text-indigo-500 font-medium mt-0.5">Universitas Andalas</p>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
                    {locale === "en" ? "Cum Laude" : "Cumlaude"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {locale === "en" ? "2020 – 2024" : "2020 – 2024"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Padang, West Sumatra
                  </span>
                  <span className="font-medium text-foreground">GPA 3.63 / 4.00</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
