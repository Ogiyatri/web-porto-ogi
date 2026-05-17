"use client";

import { motion } from "framer-motion";

const items = [
  "Next.js", "NestJS", "TypeScript", "PostgreSQL", "React",
  "Kubernetes", "Docker", "Tailwind CSS", "Golang", "Laravel",
  "Elastic APM", "OpenTelemetry", "MongoDB", "Elasticsearch", "Framer Motion",
];

const separator = "✦";

function MarqueeRow({ reverse = false }: Readonly<{ reverse?: boolean }>) {
  const content = [...items, ...items];

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-6 items-center"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {[...content, ...content].map((item, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-default">
              {item}
            </span>
            <span className="text-primary/40 text-xs">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative py-6 overflow-hidden border-y border-border bg-muted/20">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <MarqueeRow />
    </div>
  );
}
