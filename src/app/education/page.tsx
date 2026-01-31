import { EducationContent } from "@/modules/education";
import { siteConfig } from "@/shared/config/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Education.metadata");
  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
    openGraph: {
      title: t("title"),
      description: t("description", { name: siteConfig.name }),
    },
  };
};

export default function EducationPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4">
      <EducationContent />
    </div>
  );
}
