"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Send, Loader2, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Inline SVGs to avoid deprecated lucide brand icons
function GitHubIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

function getButtonContent(
  isSubmitting: boolean,
  submitted: boolean,
  t: (key: string) => string
) {
  if (isSubmitting) {
    return (
      <span className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t("form.sending")}
      </span>
    );
  }
  if (submitted) {
    return (
      <span className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4" />
        {t("form.success")}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2">
      <Send className="h-4 w-4" />
      {t("form.send")}
    </span>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        reset();
        toast.success(t("form.success"));
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(t("form.error"));
      }
    } catch {
      toast.error(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      id: "email",
      icon: <Mail className="h-5 w-5" />,
      label: t("info.email"),
      value: "ogiyatrimalakiano@gmail.com",
      href: "mailto:ogiyatrimalakiano@gmail.com",
    },
    {
      id: "location",
      icon: <MapPin className="h-5 w-5" />,
      label: t("info.location"),
      value: "South Jakarta, Indonesia",
      href: null,
    },
    {
      id: "timezone",
      icon: <Clock className="h-5 w-5" />,
      label: t("info.availability"),
      value: "GMT+7 (WIB)",
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

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
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-1">{t("subtitle")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <div className="mt-3 h-px w-12 bg-primary mx-auto" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">{t("description")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => (
              <div key={info.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{info.label}</div>
                  {info.href ? (
                    <a href={info.href} className="font-medium hover:text-primary transition-colors text-sm break-all">
                      {info.value}
                    </a>
                  ) : (
                    <div className="font-medium text-sm">{info.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/Ogiyatri" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GitHubIcon className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/ogiyatrimalakiano/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href="mailto:ogiyatrimalakiano@gmail.com">
                  <Mail className="h-3.5 w-3.5" />
                  Email me
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-background border border-border rounded-2xl p-6 shadow-xl">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("form.name")}</label>
                  <input
                    {...register("name")}
                    placeholder="John Doe"
                    className={cn(
                      "w-full rounded-lg border bg-muted/30 px-3 py-2.5 text-sm outline-none transition-colors",
                      "focus:border-primary focus:ring-1 focus:ring-primary/30",
                      errors.name ? "border-destructive" : "border-border"
                    )}
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("form.email")}</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    className={cn(
                      "w-full rounded-lg border bg-muted/30 px-3 py-2.5 text-sm outline-none transition-colors",
                      "focus:border-primary focus:ring-1 focus:ring-primary/30",
                      errors.email ? "border-destructive" : "border-border"
                    )}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("form.subject")}</label>
                <input
                  {...register("subject")}
                  placeholder="Project collaboration / Job opportunity"
                  className={cn(
                    "w-full rounded-lg border bg-muted/30 px-3 py-2.5 text-sm outline-none transition-colors",
                    "focus:border-primary focus:ring-1 focus:ring-primary/30",
                    errors.subject ? "border-destructive" : "border-border"
                  )}
                />
                {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("form.message")}</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={cn(
                    "w-full rounded-lg border bg-muted/30 px-3 py-2.5 text-sm outline-none transition-colors resize-none",
                    "focus:border-primary focus:ring-1 focus:ring-primary/30",
                    errors.message ? "border-destructive" : "border-border"
                  )}
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || submitted}
                className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25"
                size="lg"
              >
                {getButtonContent(isSubmitting, submitted, t)}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
