import { Award } from "lucide-react";
import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { CertificateList } from "@/modules/certificates";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/shared/config/site";

export async function generateMetadata() {
  const t = await getTranslations("Certificates.metadata");

  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
    openGraph: {
      title: t("title"),
      description: t("description", { name: siteConfig.name }),
    },
  };
}

export default async function CertificatesPage() {
  const t = await getTranslations("Certificates");

  return (
    <div className="mx-auto my-2 min-h-screen max-w-6xl px-4">
      <div className="mb-12">
        <ScrollAnimation>
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-cyan-400" />
            <h2 className="gradient-text text-4xl font-bold">{t("title")}</h2>
          </div>
        </ScrollAnimation>
      </div>

      <CertificateList />
    </div>
  );
}
