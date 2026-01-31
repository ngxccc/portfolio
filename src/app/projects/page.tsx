import { ProjectsContent } from "@/modules/projects";
import { siteConfig } from "@/shared/config/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Projects.metadata");
  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
  };
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4">
      <ProjectsContent />
    </div>
  );
}
