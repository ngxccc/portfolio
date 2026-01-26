import { getBlogPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

// Build cái API này thành file tĩnh (static)
export const dynamic = "force-static";

export const GET = () => {
  const posts = getBlogPosts();

  const searchData = posts.map((post) => ({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    type: "blog",
  }));

  return NextResponse.json(searchData);
};
