import type { Metadata } from "next";
import { ExperienceContent } from "./_components/experience-content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "My professional experience as a Software Developer, including internships and projects at various companies.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pt-16 pb-16 sm:pt-20 sm:pb-20">
      <ExperienceContent />
    </div>
  );
}
