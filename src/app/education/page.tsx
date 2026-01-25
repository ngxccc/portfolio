import type { Metadata } from "next";
import { EducationContent } from "./_components/education-content";

export const metadata: Metadata = {
  title: "Education",
};

export default function EducationPage() {
  return (
    <div className="mx-auto my-20 min-h-screen max-w-6xl px-4">
      <EducationContent />
    </div>
  );
}
