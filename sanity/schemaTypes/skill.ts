import { defineField, defineType } from "sanity";
import { IconSelector } from "../components/IconSelector";

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "IA/ML", value: "ai-ml" },
          { title: "DevOps", value: "devops" },
          { title: "Banco de Dados", value: "database" },
          { title: "Mobile", value: "mobile" },
          { title: "Cloud", value: "cloud" },
          { title: "Testes", value: "testing" },
          { title: "Design", value: "design" },
          { title: "Ferramentas", value: "tools" },
          { title: "Soft Skills", value: "soft-skills" },
          { title: "Outro", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: [
          { title: "Iniciante", value: "beginner" },
          { title: "Intermediário", value: "intermediate" },
          { title: "Avançado", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "percentage",
      title: "Proficiency Percentage",
      type: "number",
      description: "0-100 for visual progress bars",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "color",
      title: "Brand Color",
      type: "string",
      description:
        "Hex color code for the skill badge (e.g., #61DAFB for React)",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description:
       "Start typing to search for icons (e.g., 'kafka', 'react', 'database')",
      components: {
        input: IconSelector,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      proficiency: "proficiency",
    },
    prepare(selection) {
      const { title, subtitle, proficiency } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - ${proficiency}`,
      };
    },
  },
  orderings: [
    {
      title: "Category, then Name",
      name: "categoryName",
      by: [
        { field: "category", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});
