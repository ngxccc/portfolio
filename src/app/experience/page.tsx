import { ExperienceContent } from "@/modules/experience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "My professional experience as a Software Developer, including internships and projects at various companies.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-5xl px-4 sm:my-2">
      <ExperienceContent />
    </div>
  );
}
