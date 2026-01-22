import type { Metadata } from "next";
import { EducationContent } from "./_components/education-content";

export const metadata: Metadata = {
  title: "Education",
};

export default function EducationPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pt-20 pb-20">
      <EducationContent />
    </div>
  );
}
