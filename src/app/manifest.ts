import { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations("HomePage");
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: t("description"),
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Blog",
        url: "/blog",
        description:
          "Chia sẻ kiến thức về lập trình Web, Next.js, React và các công nghệ mới nhất.",
        icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
