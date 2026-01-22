import type { Metadata } from "next";
import { ProjectsContent } from "./_components/projects-content";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pt-20 pb-20">
      <ProjectsContent />
    </div>
  );
}
