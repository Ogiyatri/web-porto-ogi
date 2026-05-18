export type Project = {
  id: string;
  title: string;
  description: { en: string; id: string };
  tags: string[];
  liveUrl?: string;
  image?: string;
  status: "live" | "development";
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "api-management",
    title: "API Management Portal",
    description: {
      en: "Multi-portal government API management platform for Kemendagri consisting of Developer Portal, Publisher Portal, and Admin Portal. Enables API discovery, subscription management, and analytics for government digital services.",
      id: "Platform manajemen API pemerintah multi-portal untuk Kemendagri yang terdiri dari Developer Portal, Publisher Portal, dan Admin Portal. Memungkinkan penemuan API, manajemen langganan, dan analitik untuk layanan digital pemerintah.",
    },
    tags: ["Next.js", "NestJS", "PostgreSQL", "Kubernetes", "Elastic APM"],
    liveUrl: "https://jdi-admin.kemendagri.go.id/",
    image: "/images/projects/sub-admin-portal.png",
    status: "live",
    featured: true,
  },
  {
    id: "hemdal",
    title: "Hemdal",
    description: {
      en: "Social media sentiment analysis platform with keyword-based scraping across multiple platforms using RapidAPI. Provides real-time data collection, analysis workflows, and visualization dashboards.",
      id: "Platform analisis sentimen media sosial dengan scraping berbasis kata kunci di berbagai platform menggunakan RapidAPI. Menyediakan pengumpulan data real-time, alur analisis, dan dashboard visualisasi.",
    },
    tags: ["NestJS", "Next.js", "RapidAPI", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://sentiment-analysis-v2.tech.solusiteknologikreatif.id/",
    image: "/images/projects/hemdal.png",
    status: "live",
    featured: true,
  },
  {
    id: "smart-booking-room",
    title: "Smart Booking Room DPR RI",
    description: {
      en: "Intelligent room booking system for DPR RI (Indonesian House of Representatives). Features real-time availability, automated scheduling, conflict detection, and meeting room management.",
      id: "Sistem pemesanan ruang cerdas untuk DPR RI. Dilengkapi dengan ketersediaan real-time, penjadwalan otomatis, deteksi konflik, dan manajemen ruang rapat.",
    },
    tags: ["NestJS", "Next.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://smart-booking-room.tech.solusiteknologikreatif.id/",
    image: "/images/projects/smart-booking-room.png",
    status: "live",
    featured: true,
  },
  {
    id: "satria-muda-indonesia",
    title: "Satria Muda Indonesia",
    description: {
      en: "Comprehensive sports management platform featuring digital scoring system, event management, athlete & member profiles, and CMS content management. Built for national sports organization.",
      id: "Platform manajemen olahraga komprehensif dengan sistem penilaian digital, manajemen event, profil atlet & anggota, dan manajemen konten CMS. Dibangun untuk organisasi olahraga nasional.",
    },
    tags: ["NestJS", "Next.js", "Shadcn UI", "PostgreSQL", "Sanity CMS"],
    liveUrl: "https://satriamudaindonesia.com/",
    image: "/images/projects/smi-member.png",
    status: "live",
    featured: true,
  },
  {
    id: "sipd-kemendagri",
    title: "SIPD Kemendagri",
    description: {
      en: "Government financial information system (Sistem Informasi Pemerintahan Daerah) for Kemendagri. A comprehensive platform for regional government financial planning and reporting.",
      id: "Sistem Informasi Pemerintahan Daerah untuk Kemendagri. Platform komprehensif untuk perencanaan dan pelaporan keuangan pemerintah daerah.",
    },
    tags: ["Next.js", "NestJS", "PostgreSQL", "Kubernetes"],
    image: undefined,
    status: "development",
    featured: false,
  },
];
