import type { Metadata } from "next";
import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { AboutContent } from "@/modules/about";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/shared/config/site";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("About.metadata");
  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
  };
};

export default async function AboutPage() {
  const t = await getTranslations("About");
  return (
    <div className="mx-auto my-2 min-h-screen max-w-4xl px-4">
      {/* Tiêu đề chính */}
      <ScrollAnimation>
        <h2 className="gradient-text mb-8 text-4xl font-bold">{t("title")}</h2>
      </ScrollAnimation>

      <AboutContent />
    </div>
  );
}
