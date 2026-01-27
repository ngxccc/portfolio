import type { Metadata } from "next";
import { SkillsContent } from "./_components/skills-content";

export const metadata: Metadata = {
  title: "Skills & Expertise",
  description:
    "Explore my technical skills and expertise in programming languages, front-end and back-end development, databases, and more.",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4">
      <SkillsContent />
    </div>
  );
}
