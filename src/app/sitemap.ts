import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://web-porto-ogi.vercel.app";
  const now = new Date();

  return [
    { url: `${base}/en`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/id`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
