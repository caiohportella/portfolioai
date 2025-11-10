import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Dynamically import all icons from libraries
import * as SiIcons from "react-icons/si";
import * as AiIcons from "react-icons/ai";
import * as LucideIcons from "lucide-react";
import type { ComponentType } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Dynamically create comprehensive icon mapping from all available icons
const createIconNameMap = (): Record<string, ComponentType<{ className?: string }>> => {
  const iconMap: Record<string, ComponentType<{ className?: string }>> = {};

  // Add Lucide Icons FIRST (so they're included and searchable)
  Object.entries(LucideIcons).forEach(([name, Icon]) => {
    // Include all capitalized icon components, excluding internal utilities
    if (
      typeof Icon === "function" &&
      name[0] === name[0].toUpperCase() &&
      name !== "createLucideIcon" &&
      name !== "Icon"
    ) {
      iconMap[name] = Icon as ComponentType<{ className?: string }>;
    }
  });

  // Add Simple Icons (Si*)
  Object.entries(SiIcons).forEach(([name, Icon]) => {
    if (typeof Icon === "function" && name.startsWith("Si")) {
      iconMap[name] = Icon as ComponentType<{ className?: string }>;
    }
  });

  // Add Ant Design Icons (Ai*)
  Object.entries(AiIcons).forEach(([name, Icon]) => {
    if (typeof Icon === "function" && name.startsWith("Ai")) {
      iconMap[name] = Icon as ComponentType<{ className?: string }>;
    }
  });

  return iconMap;
};

// Comprehensive icon mapping by icon name (dynamically loaded)
export const iconNameMap: Record<string, ComponentType<{ className?: string }>> =
  createIconNameMap();

// Icon mapping function - now supports iconName from Sanity
export function getSkillIcon(
  skillName: string,
  iconName?: string | null
): ComponentType<{ className?: string }> {
  // If iconName is provided from Sanity, use it directly
  if (iconName && iconNameMap[iconName]) {
    return iconNameMap[iconName];
  }

  const normalizedName = skillName.toLowerCase().trim();

  // Helper to safely get icons with fallback
  const getIconByName = (name: string): ComponentType<{ className?: string }> | undefined => {
    return iconNameMap[name];
  };

  const getIconSafe = (
    name: string,
    fallback: ComponentType<{ className?: string }>
  ): ComponentType<{ className?: string }> => {
    return getIconByName(name) || fallback;
  };

  const defaultIcon = iconNameMap.Code || (() => null);
  const databaseIcon = iconNameMap.Database || defaultIcon;
  const usersIcon = iconNameMap.Users || defaultIcon;
  const componentIcon = iconNameMap.Component || defaultIcon;
  const bookIcon = iconNameMap.BookOpenText || defaultIcon;
  const lightbulbIcon = iconNameMap.Lightbulb || defaultIcon;
  const shapesIcon = iconNameMap.Shapes || defaultIcon;
  const webhookIcon = iconNameMap.Webhook || defaultIcon;

  // Tech stack icons from react-icons/si (name-based mapping for backward compatibility)
  const iconMap: Record<string, ComponentType<{ className?: string }>> = {
    golang: getIconSafe("SiGo", defaultIcon),
    go: getIconSafe("SiGo", defaultIcon),
    firebase: getIconSafe("SiFirebase", defaultIcon),
    stripe: getIconSafe("SiStripe", defaultIcon),
    drizzle: getIconSafe("SiDrizzle", databaseIcon),
    "spring boot": getIconSafe("SiSpring", defaultIcon),
    springboot: getIconSafe("SiSpring", defaultIcon),
    shadcn: getIconSafe("SiShadcnui", componentIcon),
    java: getIconSafe("AiOutlineJava", defaultIcon),
    angular: getIconSafe("SiAngular", defaultIcon),
    aws: getIconSafe("SiAmazonwebservices", defaultIcon),
    clerk: getIconSafe("SiClerk", usersIcon),
    "amazon web services": getIconSafe("SiAmazonwebservices", defaultIcon),
    docker: getIconSafe("SiDocker", defaultIcon),
    figma: getIconSafe("SiFigma", defaultIcon),
    flutter: getIconSafe("SiFlutter", defaultIcon),
    "google cloud platform": getIconSafe("SiGooglecloud", defaultIcon),
    gcp: getIconSafe("SiGooglecloud", defaultIcon),
    gemini: getIconSafe("SiGooglegemini", defaultIcon),
    googlecloud: getIconSafe("SiGooglecloud", defaultIcon),
    git: getIconSafe("SiGit", defaultIcon),
    "github actions": getIconSafe("SiGithubactions", defaultIcon),
    githubactions: getIconSafe("SiGithubactions", defaultIcon),
    graphql: getIconSafe("SiGraphql", defaultIcon),
    jenkins: getIconSafe("SiJenkins", defaultIcon),
    jest: getIconSafe("SiJest", defaultIcon),
    kubernetes: getIconSafe("SiKubernetes", defaultIcon),
    mongodb: getIconSafe("SiMongodb", databaseIcon),
    "next.js": getIconSafe("SiNextdotjs", defaultIcon),
    nextjs: getIconSafe("SiNextdotjs", defaultIcon),
    "node.js": getIconSafe("SiNodedotjs", defaultIcon),
    nodejs: getIconSafe("SiNodedotjs", defaultIcon),
    "continuous learning": bookIcon,
    "openai api": getIconSafe("SiOpenai", defaultIcon),
    "critical thinking": lightbulbIcon,
    openai: getIconSafe("SiOpenai", defaultIcon),
    postgresql: getIconSafe("SiPostgresql", databaseIcon),
    postgres: getIconSafe("SiPostgresql", databaseIcon),
    python: getIconSafe("SiPython", defaultIcon),
    react: getIconSafe("SiReact", defaultIcon),
    "team work": shapesIcon,
    "react native": getIconSafe("SiReact", defaultIcon),
    reactnative: getIconSafe("SiReact", defaultIcon),
    redis: getIconSafe("SiRedis", databaseIcon),
    "tailwind css": getIconSafe("SiTailwindcss", defaultIcon),
    tailwindcss: getIconSafe("SiTailwindcss", defaultIcon),
    tailwind: getIconSafe("SiTailwindcss", defaultIcon),
    typescript: getIconSafe("SiTypescript", defaultIcon),
    ts: getIconSafe("SiTypescript", defaultIcon),
    vercel: getIconSafe("SiVercel", defaultIcon),
    websockets: webhookIcon,
    websocket: webhookIcon,
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
    return getIconSafe("SiTypescript", defaultIcon);
  }

  // Fallback icons for specific skills
  const accessibilityIcon = iconNameMap.Accessibility || defaultIcon;
  const calendarIcon = iconNameMap.Calendar || defaultIcon;
  const messageIcon = iconNameMap.MessageCircle || defaultIcon;
  const brainIcon = iconNameMap.Brain || defaultIcon;

  const fallbackMap: Record<string, ComponentType<{ className?: string }>> = {
    drizzle: databaseIcon,
    "drizzle orm": databaseIcon,
    clerk: usersIcon,
    kafka: getIconSafe("SiApachekafka", defaultIcon),
    "apache kafka": getIconSafe("SiApachekafka", defaultIcon),
    shadcn: componentIcon,
    convex: databaseIcon,
    "web accessibility": accessibilityIcon,
    accessibility: accessibilityIcon,
    "agile/scrum": calendarIcon,
    agile: calendarIcon,
    scrum: calendarIcon,
    communication: messageIcon,
    "rest api design": defaultIcon,
    "rest api": defaultIcon,
    "responsive design": defaultIcon,
    "problem solving": brainIcon,
  };

  for (const [key, icon] of Object.entries(fallbackMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return icon;
    }
  }

  // Default fallback
  return defaultIcon;
}

// Get available icon names for Sanity schema
export function getAvailableIconNames(): Array<{ title: string; value: string }> {
  return Object.keys(iconNameMap).map((name) => ({
    title: name,
    value: name,
  }));
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
