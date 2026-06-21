import { ExperienceContent } from "@/modules/experience";
import { siteConfig } from "@/shared/config/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Education.metadata");

  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
    openGraph: {
      title: t("title"),
      description: t("description", { name: siteConfig.name }),
    },
  };
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-5xl px-4 sm:my-2">
      <ExperienceContent />
    </div>
  );
}
