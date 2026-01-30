import { EducationContent } from "@/modules/education";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
};

export default function EducationPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4">
      <EducationContent />
    </div>
  );
}
