export type Skill = {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "devops";
  level: number; // 1-5
};

export const skills: Skill[] = [
  // Frontend
  { name: "Next.js", icon: "nextjs", category: "frontend", level: 5 },
  { name: "React", icon: "react", category: "frontend", level: 5 },
  { name: "TypeScript", icon: "typescript", category: "frontend", level: 4 },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend", level: 5 },
  { name: "Framer Motion", icon: "framer", category: "frontend", level: 4 },
  { name: "Shadcn UI", icon: "shadcn", category: "frontend", level: 4 },

  // Backend
  { name: "NestJS", icon: "nestjs", category: "backend", level: 5 },
  { name: "Node.js", icon: "nodejs", category: "backend", level: 5 },
  { name: "Laravel", icon: "laravel", category: "backend", level: 4 },
  { name: "Golang", icon: "golang", category: "backend", level: 3 },
  { name: "Express.js", icon: "express", category: "backend", level: 4 },
  { name: "Python", icon: "python", category: "backend", level: 3 },

  // Database
  { name: "PostgreSQL", icon: "postgresql", category: "database", level: 5 },
  { name: "MySQL", icon: "mysql", category: "database", level: 4 },
  { name: "MongoDB", icon: "mongodb", category: "database", level: 4 },
  { name: "Elasticsearch", icon: "elasticsearch", category: "database", level: 3 },
  { name: "Redis", icon: "redis", category: "database", level: 3 },

  // DevOps
  { name: "Kubernetes", icon: "kubernetes", category: "devops", level: 3 },
  { name: "Docker", icon: "docker", category: "devops", level: 4 },
  { name: "Git", icon: "git", category: "devops", level: 5 },
  { name: "Elastic APM", icon: "elastic", category: "devops", level: 3 },
  { name: "OpenTelemetry", icon: "opentelemetry", category: "devops", level: 3 },
];
