import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Background3D from "@/shared/components/background-3d";
import Navbar from "@/shared/components/navbar";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/shared/components/footer";
import { siteConfig } from "@/shared/config/site";
import { BackToTop } from "@/shared/components/back-to-top";

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

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
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
        <div className="flex min-h-screen flex-col">
          <Background3D />
          <Navbar />
          <main className="grow pt-16">{children}</main>
          <SpeedInsights />
          <BackToTop />
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
