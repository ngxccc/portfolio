import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Background3D from "@/shared/components/background-3d";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/shared/config/site";
import { BackToTop } from "@/shared/components/back-to-top";
import { Footer, Navbar } from "@/modules/common";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const generateMetadata = async (): Promise<Metadata> => {
  const [t, s] = await Promise.all([
    getTranslations("HomePage.metadata"),
    getTranslations("MetaData"),
  ]);

  const localizedKeywords = s("keywords")
    .split(",")
    .map((k) => k.trim());

  const allKeywords = [...siteConfig.keywords, ...localizedKeywords];

  return {
    title: {
      default: t("title", { name: siteConfig.name }),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description", { name: siteConfig.name }),
    keywords: allKeywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: siteConfig.url,
      title: siteConfig.name,
      description: t("description", { name: siteConfig.name }),
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "./",
    },
  };
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} data-scroll-behavior="smooth">
      <head>
        <meta
          name="google-site-verification"
          content="44UaAHzsglSAsbWEa_MVdQhAeNTB0JfR5MgYRQ63OOs"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-black text-gray-100 antialiased`}
      >
        <NextIntlClientProvider>
          <div className="flex min-h-screen flex-col">
            <Background3D />
            <Navbar />
            <main className="grow pt-16">{children}</main>
            <SpeedInsights />
            <BackToTop />
            <Footer />
          </div>
        </NextIntlClientProvider>

        <Analytics />
      </body>
    </html>
  );
}
