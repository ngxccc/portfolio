import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const postsDir = join(process.cwd(), "contents/posts");

const BlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date().transform((date) => date.toISOString()),
  tags: z.array(z.string()).default([]),
  isPublished: z.boolean().default(true),
  series: z.string().optional(),
  seriesOrders: z.number().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema> & {
  slug: string;
  content: string;
  readingTime: string;
};

const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  // Loại bỏ HTML tags và ký tự đặc biệt để đếm từ chuẩn hơn
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const getBlogPosts = (): BlogPost[] => {
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
};

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
    return null;
  }
};
