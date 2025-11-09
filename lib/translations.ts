/**
 * Traduções centralizadas para valores de enum do Sanity
 * Este arquivo mapeia os valores (em inglês) para suas traduções em português
 */

export const translations = {
  // Achievement types
  achievementType: {
    award: "Prêmio",
    hackathon: "Vitória em Hackathon",
    publication: "Publicação",
    speaking: "Palestra",
    "open-source": "Código Aberto",
    milestone: "Marco",
    recognition: "Reconhecimento",
    other: "Outro",
  },

  // Employment types
  employmentType: {
    "full-time": "Tempo Integral",
    "part-time": "Meio Período",
    contract: "Contrato",
    freelance: "Freelance",
    internship: "Estágio",
  },

  // Price types
  priceType: {
    hourly: "Por Hora",
    project: "Por Projeto",
    monthly: "Mensal",
    custom: "Orçamento Personalizado",
  },

  // Availability status
  availability: {
    available: "Disponível para contratação",
    open: "Aberto a oportunidades",
    unavailable: "Não estou procurando",
  },

  // Skill categories
  skillCategory: {
    frontend: "Frontend",
    backend: "Backend",
    "ai-ml": "IA/ML",
    devops: "DevOps",
    database: "Banco de Dados",
    mobile: "Mobile",
    cloud: "Cloud",
    testing: "Testes",
    design: "Design",
    tools: "Ferramentas",
    "soft-skills": "Soft Skills",
    other: "Outro",
  },

  // Proficiency levels
  proficiency: {
    beginner: "Iniciante",
    intermediate: "Intermediário",
    advanced: "Avançado",
    expert: "Expert",
  },

  // Project categories
  projectCategory: {
    "web-app": "Aplicação Web",
    "mobile-app": "App Mobile",
    "ai-ml": "Projeto IA/ML",
    "api-backend": "API/Backend",
    devops: "DevOps/Infraestrutura",
    "open-source": "Open Source",
    "cli-tool": "Ferramenta CLI",
    "desktop-app": "App Desktop",
    "browser-extension": "Extensão de Navegador",
    game: "Jogo",
    other: "Outro",
  },

  // Blog categories
  blogCategory: {
    tutorial: "Tutorial",
    technical: "Técnico",
    "ai-ml": "IA/ML",
    "web-dev": "Desenvolvimento Web",
    career: "Carreira",
    opinion: "Opinião",
    showcase: "Mostra de Projetos",
    "best-practices": "Melhores Práticas",
    news: "Notícias",
  },

  // Contact status
  contactStatus: {
    new: "Novo",
    archived: "Arquivado",
  },
} as const;

/**
 * Funções helper para traduzir valores
 */
export function translateAchievementType(
  type: string | null | undefined,
): string {
  if (!type) return "Conquista";
  return (
    translations.achievementType[type as keyof typeof translations.achievementType] ||
    "Conquista"
  );
}

export function translateEmploymentType(
  type: string | null | undefined,
): string {
  if (!type) return "";
  return (
    translations.employmentType[
      type as keyof typeof translations.employmentType
    ] || type
  );
}

export function translatePriceType(type: string | null | undefined): string {
  if (!type) return "";
  return (
    translations.priceType[type as keyof typeof translations.priceType] || type
  );
}

export function translateAvailability(
  status: string | null | undefined,
): string {
  if (!status) return "";
  return (
    translations.availability[status as keyof typeof translations.availability] ||
    status
  );
}

export function translateSkillCategory(
  category: string | null | undefined,
): string {
  if (!category) return "Outro";
  return (
    translations.skillCategory[
      category as keyof typeof translations.skillCategory
    ] || category
  );
}

export function translateProficiency(
  level: string | null | undefined,
): string {
  if (!level) return "";
  return (
    translations.proficiency[level as keyof typeof translations.proficiency] ||
    level
  );
}

export function translateProjectCategory(
  category: string | null | undefined,
): string {
  if (!category) return "Outro";
  return (
    translations.projectCategory[
      category as keyof typeof translations.projectCategory
    ] || category
  );
}

export function translateBlogCategory(
  category: string | null | undefined,
): string {
  if (!category) return "";
  return (
    translations.blogCategory[
      category as keyof typeof translations.blogCategory
    ] || category
  );
}

export function translateContactStatus(
  status: string | null | undefined,
): string {
  if (!status) return "";
  return (
    translations.contactStatus[
      status as keyof typeof translations.contactStatus
    ] || status
  );
}

