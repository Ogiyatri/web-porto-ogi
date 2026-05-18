import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ogi Yatri Malakiano — Fullstack Developer",
  description:
    "Fullstack Developer based in Jakarta — built production apps for Kemendagri, DPR RI, and national organizations. Next.js, NestJS, TypeScript, Kubernetes.",
  keywords: ["Fullstack Developer", "Next.js", "NestJS", "TypeScript", "Jakarta", "Indonesia", "Kemendagri", "Backend Engineer"],
  authors: [{ name: "Ogi Yatri Malakiano" }],
  openGraph: {
    title: "Ogi Yatri Malakiano — Fullstack Developer",
    description: "Built production apps for Kemendagri, DPR RI, and national organizations. Based in Jakarta, Indonesia.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ogi Yatri Malakiano — Fullstack Developer",
    description: "Built production apps for Kemendagri, DPR RI, and national organizations. Based in Jakarta, Indonesia.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ogi Yatri Malakiano",
  url: "https://web-porto-ogi.vercel.app",
  jobTitle: "Fullstack Developer",
  worksFor: {
    "@type": "Organization",
    name: "CV. Solusi Teknologi Kreatif",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "South Jakarta",
    addressCountry: "ID",
  },
  sameAs: [
    "https://github.com/ogiyatri",
    "https://www.linkedin.com/in/ogiyatrimalakiano/",
  ],
  knowsAbout: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Kubernetes", "Docker"],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "id")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages}>
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster position="bottom-right" richColors />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
