import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { BlogPost, PaginatedResult } from "../types";
import { BlogPostSchema } from "../types";
import { cache } from "react";

const postsDir = join(process.cwd(), "contents/posts");

const POSTS_PER_PAGE = 5;

export const getPaginatedPosts = cache(
  (page = 1, tag?: string): PaginatedResult => {
    const allPosts = getBlogPosts();

    const filteredPosts = tag
      ? allPosts.filter((post) => post.tags.includes(tag))
      : allPosts;

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const currentPage = Math.max(
      1,
      Math.min(page, totalPages > 0 ? totalPages : 1),
    );

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      metadata: {
        currentPage,
        totalPages,
        totalPosts,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    };
  },
);

const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  // Loại bỏ HTML tags và ký tự đặc biệt để đếm từ chuẩn hơn
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} phút đọc`;
};

export const getBlogPosts = cache((): BlogPost[] => {
  if (!existsSync(postsDir)) return [];

  const fileNames = readdirSync(postsDir);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");

      const fullPath = join(postsDir, fileName);
      const fileContents = readFileSync(fullPath, "utf8");

      // Parse Frontmatter bằng gray-matter
      const { data, content } = matter(fileContents);

      const parsedData = BlogPostSchema.parse(data);

      return {
        slug,
        ...parsedData,
        content,
        readingTime: calculateReadingTime(content),
      } as BlogPost;
    });

  // sort theo bài mới nhất
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPostBySlug = (slug: string): BlogPost | null => {
  try {
    const fullPath = join(postsDir, `${slug}.mdx`);
    const fileContents = readFileSync(fullPath);

    // Parse Frontmatter bằng gray-matter
    const { data, content } = matter(fileContents);

    const parsedData = BlogPostSchema.parse(data);

    return {
      slug,
      ...parsedData,
      content,
      readingTime: calculateReadingTime(content),
    } as BlogPost;
  } catch (error) {
    console.log(error);
    return null;
  }
};
