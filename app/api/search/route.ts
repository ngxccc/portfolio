import { getBlogPostsMetadata } from "@/modules/blog";
import { NextResponse } from "next/server";

export const GET = async () => {
  const posts = await getBlogPostsMetadata();

  const searchData = posts.map((post) => ({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    type: "blog",
  }));

  return NextResponse.json(searchData);
};
