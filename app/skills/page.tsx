import { SkillsContent } from "@/modules/skills";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/shared/config/site";

export async function generateMetadata() {
  const t = await getTranslations("Skills.metadata");

  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
    openGraph: {
      title: t("title"),
      description: t("description", { name: siteConfig.name }),
    },
  };
}

export default function SkillsPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4">
      <SkillsContent />
    </div>
  );
}
