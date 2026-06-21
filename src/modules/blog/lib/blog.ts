import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import type { BlogPost, PaginatedResult } from "../types";
import { BlogPostSchema } from "../types";
import { cacheLife, cacheTag } from "next/cache";

const postsDir = join(process.cwd(), "contents/posts");
const POSTS_PER_PAGE = 5;

// PERF: Pre-compiled regex or simple string operations are faster for tight loops.
const calculateReadingTime = (content: string): string => {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return `${Math.ceil(words / 200)} phút đọc`;
};

// WHY: Raw data fetcher separated from caching wrapper to maintain pure testability.
const fetchMetadataFromFS = async (): Promise<Omit<BlogPost, "content">[]> => {
  if (!existsSync(postsDir)) return [];

  const fileNames = await readdir(postsDir);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith(".mdx"));

  const postsPromises = mdxFiles.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = join(postsDir, fileName);

    const fileContents = await readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const parsedData = BlogPostSchema.parse(data);

    return {
      slug,
      ...parsedData,
      readingTime: calculateReadingTime(content),
    };
  });

  const allPostsMetadata = await Promise.all(postsPromises);
  return allPostsMetadata.sort((a, b) => (a.date < b.date ? 1 : -1));
};

// PERF: Global Data Cache layer.
// Time Complexity: O(1) on cache hit.
export async function getBlogPostsMetadata() {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts");
  return fetchMetadataFromFS();
}

// PERF: Pagination relies strictly on lightweight metadata array, drastically reducing RAM usage.
export async function getPaginatedPosts(page = 1, tag?: string): Promise<PaginatedResult> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts");
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
}

// PERF: Only parse full content when specifically requested.
// Time Complexity: O(1) for fs lookup | Space Complexity: O(M) where M is file size.
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`blog-post-${slug}`);
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
}
