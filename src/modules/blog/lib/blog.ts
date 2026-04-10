import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { BlogPost, BlogPostSummary, PaginatedResult } from "../types";
import { BlogPostSchema } from "../types";

const postsDir = join(process.cwd(), "contents/posts");
const POSTS_PER_PAGE = 5;

// PERF: Pre-compiled regex or simple string operations are faster for tight loops.
const calculateReadingTime = (content: string): string => {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return `${Math.ceil(words / 200)} phút đọc`;
};

// PERF: Non-blocking I/O Event Loop implementation.
// Time Complexity: O(N log N) | Space Complexity: O(N) (Dropping body content early).
export const getBlogPostsMetadata = cache(
  async (): Promise<BlogPostSummary[]> => {
    if (!existsSync(postsDir)) return [];

    const fileNames = await readdir(postsDir);
    const mdxFiles = fileNames.filter((fileName) => fileName.endsWith(".mdx"));

    const postsPromises = mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = join(postsDir, fileName);

      // FIXME: gray-matter parses the whole file. For massive files, consider a custom stream parser.
      const fileContents = await readFile(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const parsedData = BlogPostSchema.parse(data);

      return {
        slug,
        ...parsedData,
        // HACK: Extract reading time here to store in metadata, avoiding re-parsing later.
        readingTime: calculateReadingTime(content),
      };
    });

    const allPostsMetadata = await Promise.all(postsPromises);
    return allPostsMetadata.sort((a, b) => (a.date < b.date ? 1 : -1));
  },
);

// PERF: Pagination relies strictly on lightweight metadata array, drastically reducing RAM usage.
export const getPaginatedPosts = cache(
  async (page = 1, tag?: string): Promise<PaginatedResult> => {
    const allPosts = await getBlogPostsMetadata();

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

// PERF: Only parse full content when specifically requested.
// Time Complexity: O(1) for fs lookup | Space Complexity: O(M) where M is file size.
export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      const fullPath = join(postsDir, `${slug}.mdx`);
      const fileContents = await readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      const parsedData = BlogPostSchema.parse(data);

      return {
        slug,
        ...parsedData,
        content,
        readingTime: calculateReadingTime(content),
      };
    } catch (error) {
      // BUG: Explicitly handle ENOENT (file not found) vs parsing errors.
      return null;
    }
  },
);
