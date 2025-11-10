"use client";

import { getSkillIcon } from "@/lib/utils";
import {
  translateSkillCategory,
  translateProficiency,
} from "@/lib/translations";

interface Skill {
  name: string | null;
  category?: string | null;
  proficiency?: string | null;
  percentage?: number | null;
  yearsOfExperience?: number | null;
  color?: string | null;
  icon?: string | null;
}

interface SkillsBadgeProps {
  skills: Skill[];
}

export default function SkillsBadge({ skills }: SkillsBadgeProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  // Filter out skills without names and handle null values
  const validSkills = skills.filter((skill) => skill.name != null);

  if (validSkills.length === 0) {
    return null;
  }

  // Group skills by category dynamically
  const groupedSkills = new Map<string, typeof validSkills>();

  for (const skill of validSkills) {
    const category = skill.category || "other";
    const existing = groupedSkills.get(category) || [];
    groupedSkills.set(category, [...existing, skill]);
  }

  return (
    <div className="space-y-8">
      {Array.from(groupedSkills.entries()).map(([category, categorySkills]) => {
        if (!categorySkills || categorySkills.length === 0) return null;

        // Use centralized translation for category
        const displayLabel = translateSkillCategory(category);

        return (
          <div
            key={category}
            className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
          >
            {/* Category Header */}
            <div className="border-b bg-muted/50 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{displayLabel}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {categorySkills.length}
                </span>
              </div>
            </div>

            {/* Skills Badges Grid */}
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {categorySkills.map((skill) => {
                  const skillName = skill.name ?? "Unknown";
                  const Icon = getSkillIcon(skillName, skill.icon);
                  const skillColor = skill.color || "hsl(var(--primary))";

                  return (
                    <div
                      key={skillName}
                      className="group relative flex flex-col items-center justify-center p-4 rounded-lg border bg-card hover:bg-accent transition-all duration-200 hover:scale-105 hover:shadow-md"
                      style={
                        skill.color
                          ? {
                              borderColor: `${skillColor}40`,
                            }
                          : undefined
                      }
                    >
                      <div
                        className="mb-2 transition-transform duration-200 group-hover:scale-110"
                        style={{ color: skillColor }}
                      >
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-center line-clamp-2">
                        {skillName}
                      </span>
                      {skill.proficiency && (
                        <span className="text-[10px] text-muted-foreground mt-1">
                          {translateProficiency(skill.proficiency)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
