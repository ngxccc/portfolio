import { getBlogPosts } from "@/modules/blog";
import { siteConfig } from "@/shared/config/site";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    { url: "", priority: 1.0 },
    { url: "/blog", priority: 0.8 },
    { url: "/projects", priority: 0.8 },
    { url: "/about", priority: 0.5 },
    { url: "/contact", priority: 0.5 },
    { url: "/skills", priority: 0.5 },
    { url: "/education", priority: 0.5 },
    { url: "/experience", priority: 0.5 },
    { url: "/certificates", priority: 0.5 },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const posts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...posts];
}
