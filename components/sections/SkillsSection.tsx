import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import SkillsBadge from "./SkillsBadge";

const SKILLS_QUERY =
  defineQuery(`*[_type == "skill"] | order(category asc, order asc){
  name,
  category,
  proficiency,
  percentage,
  yearsOfExperience,
  color,
  icon
}`);

export async function SkillsSection() {
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Habilidades & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma visão geral abrangente das minhas proficiências técnicas e das
            ferramentas com as quais trabalho diariamente.
          </p>
        </div>

        {/* <SkillsChart skills={skills} /> */}
        <SkillsBadge skills={skills} />
      </div>
    </section>
  );
}
