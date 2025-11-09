import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  SiGo,
  SiFirebase,
  SiStripe,
  SiSpring,
  SiAngular,
  SiAmazonwebservices,
  SiDocker,
  SiFigma,
  SiFlutter,
  SiGooglecloud,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiJenkins,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiGooglegemini,
  SiClerk,
  SiOpenai,
  SiDrizzle,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiShadcnui,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import {
  AiOutlineJava
} from "react-icons/ai"
import {
  Database,
  Users,
  Component,
  Accessibility,
  Calendar,
  MessageCircle,
  Webhook,
  Code,
  Lightbulb,
  Shapes,
  Brain,
  BookOpenText,
} from "lucide-react";
import type { ComponentType } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Icon mapping function
export function getSkillIcon(skillName: string): ComponentType<{ className?: string }> {
  const normalizedName = skillName.toLowerCase().trim();

  // Tech stack icons from react-icons/si
  const iconMap: Record<string, ComponentType<{ className?: string }>> = {
    golang: SiGo,
    go: SiGo,
    firebase: SiFirebase,
    stripe: SiStripe,
    drizzle: SiDrizzle,
    "spring boot": SiSpring,
    springboot: SiSpring,
    shadcn: SiShadcnui,
    java: AiOutlineJava,
    angular: SiAngular,
    aws: SiAmazonwebservices,
    clerk: SiClerk,
    "amazon web services": SiAmazonwebservices,
    docker: SiDocker,
    figma: SiFigma,
    flutter: SiFlutter,
    "google cloud platform": SiGooglecloud,
    gcp: SiGooglecloud,
    gemini: SiGooglegemini,
    googlecloud: SiGooglecloud,
    git: SiGit,
    "github actions": SiGithubactions,
    githubactions: SiGithubactions,
    graphql: SiGraphql,
    jenkins: SiJenkins,
    jest: SiJest,
    kubernetes: SiKubernetes,
    mongodb: SiMongodb,
    "next.js": SiNextdotjs,
    nextjs: SiNextdotjs,
    "node.js": SiNodedotjs,
    nodejs: SiNodedotjs,
    "continuous learning": BookOpenText,
    "openai api": SiOpenai,
    "critical thinking": Lightbulb,
    openai: SiOpenai,
    postgresql: SiPostgresql,
    postgres: SiPostgresql,
    python: SiPython,
    react: SiReact,
    "team work": Shapes,
    "react native": SiReact,
    reactnative: SiReact,
    redis: SiRedis,
    "tailwind css": SiTailwindcss,
    tailwindcss: SiTailwindcss,
    tailwind: SiTailwindcss,
    typescript: SiTypescript,
    ts: SiTypescript,
    vercel: SiVercel,
    websockets: Webhook,
    websocket: Webhook,
  };

  // Check exact match first
  if (iconMap[normalizedName]) {
    return iconMap[normalizedName];
  }

  // Check partial matches (but exclude matches that are too short to avoid false positives)
  for (const [key, icon] of Object.entries(iconMap)) {
    // Skip "ts" to avoid matching it in "websockets" - it will be handled by exact "typescript" match
    if (key === "ts") continue;
    // Only match if key is at least 3 characters to avoid false positives
    if (key.length >= 3 && (normalizedName.includes(key) || key.includes(normalizedName))) {
      return icon;
    }
  }
  
  // Special handling for "ts" - only match if it's typescript-related
  if (normalizedName === "ts" || normalizedName === "typescript") {
    return SiTypescript;
  }

  // Fallback icons for specific skills
  const fallbackMap: Record<string, ComponentType<{ className?: string }>> = {
    drizzle: Database,
    "drizzle orm": Database,
    clerk: Users,
    shadcn: Component,
    convex: Database,
    "web accessibility": Accessibility,
    accessibility: Accessibility,
    "agile/scrum": Calendar,
    agile: Calendar,
    scrum: Calendar,
    communication: MessageCircle,
    "rest api design": Code,
    "rest api": Code,
    "responsive design": Code,
    "problem solving": Brain,
  };

  for (const [key, icon] of Object.entries(fallbackMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return icon;
    }
  }

  // Default fallback
  return Code;
}

export default function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatCourseDate(dateString: string): string {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Sept",
    "Out",
    "Nov",
    "Dez",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}
