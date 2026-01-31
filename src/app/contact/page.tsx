import { ContactContent } from "@/modules/contact";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/shared/config/site";

export async function generateMetadata() {
  const t = await getTranslations("Contact.metadata");

  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
    openGraph: {
      title: t("title"),
      description: t("description", { name: siteConfig.name }),
    },
  };
}

export default function ContactPage() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4 sm:my-2">
      <ContactContent />
    </div>
  );
}
