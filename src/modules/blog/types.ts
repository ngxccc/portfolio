import z from "zod";

export const BlogPostSchema = z.object({
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
