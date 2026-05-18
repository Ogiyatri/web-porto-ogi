export type Project = {
  id: string;
  title: string;
  description: { en: string; id: string };
  tags: string[];
  liveUrl?: string;
  image?: string;
  status: "live" | "development";
  featured: boolean;
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    id: "api-management",
    title: "API Management Portal",
    description: {
      en: "API gateway platform serving Indonesia's Ministry of Home Affairs — three interconnected portals (Developer, Publisher, Admin) that let government teams publish, discover, and monitor APIs at scale.",
      id: "Platform API gateway untuk Kementerian Dalam Negeri — tiga portal terintegrasi yang memungkinkan tim pemerintah mempublikasikan, menemukan, dan memantau API secara terpusat dan terukur.",
    },
    tags: ["Next.js", "NestJS", "PostgreSQL", "Kubernetes", "Elastic APM"],
    liveUrl: "https://jdi-admin.kemendagri.go.id/",
    image: "/images/projects/sub-admin-portal.png",
    status: "live",
    featured: true,
    highlight: true,
  },
  {
    id: "hemdal",
    title: "Hemdal",
    description: {
      en: "Real-time social media monitoring platform — scrapes keyword-based mentions across platforms and surfaces sentiment trends through live dashboards. Built for teams who need fresh intelligence without manual effort.",
      id: "Platform pemantauan media sosial real-time — mengambil sebutan berbasis kata kunci dari berbagai platform dan menampilkan tren sentimen melalui dashboard langsung. Untuk tim yang butuh data terkini tanpa kerja manual.",
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
      en: "Room scheduling system for Indonesia's House of Representatives — eliminates double-bookings and manual coordination across meeting rooms with real-time availability and automated conflict detection.",
      id: "Sistem penjadwalan ruang untuk DPR RI — menghilangkan pemesanan ganda dan koordinasi manual antar ruang rapat dengan ketersediaan real-time dan deteksi konflik otomatis.",
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
      en: "End-to-end sports management platform for a national basketball organization — live digital scoring, event management, athlete profiles, and a headless CMS for editorial content, all in one system.",
      id: "Platform manajemen olahraga end-to-end untuk organisasi basket nasional — penilaian digital langsung, manajemen event, profil atlet, dan CMS konten editorial dalam satu sistem terintegrasi.",
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
      en: "Regional government financial system for Kemendagri — supports budget planning and expenditure reporting across regional governments throughout Indonesia.",
      id: "Sistem keuangan pemerintah daerah untuk Kemendagri — mendukung perencanaan anggaran dan pelaporan belanja di seluruh pemerintah daerah Indonesia.",
    },
    tags: ["Next.js", "NestJS", "PostgreSQL", "Kubernetes"],
    image: undefined,
    status: "development",
    featured: false,
  },
];
