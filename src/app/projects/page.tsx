import { ProjectsContent } from "@/modules/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4">
      <ProjectsContent />
    </div>
  );
}
