import { OfflineContent } from "@/modules/offline";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/shared/config/site";

export async function generateMetadata() {
  const t = await getTranslations("Offline.metadata");

  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function OfflinePage() {
  return <OfflineContent />;
}
