import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ogi Yatri Malakiano — Fullstack Developer",
  description:
    "Results-driven Fullstack Developer with 1+ years of experience delivering scalable web applications. Skilled in Next.js, NestJS, TypeScript, and DevOps tools.",
  keywords: ["Fullstack Developer", "Next.js", "NestJS", "TypeScript", "Jakarta", "Indonesia"],
  authors: [{ name: "Ogi Yatri Malakiano" }],
  openGraph: {
    title: "Ogi Yatri Malakiano — Fullstack Developer",
    description: "Fullstack Developer based in Jakarta, Indonesia",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "id")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster position="bottom-right" richColors />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
