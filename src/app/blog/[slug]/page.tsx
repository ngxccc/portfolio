import { MDXContent } from "@/components/mdx-content";
import { TableOfContents } from "@/components/table-of-contents";
import { getBlogPosts, getPostBySlug } from "@/lib/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => {
  const posts = getBlogPosts();

  return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Ngxc"],
    },
  };
};

const BlogPost = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-2 md:py-4">
      <header className="mx-auto mb-5 max-w-3xl text-center">
        <h1 className="gradient-text mb-6 text-3xl font-bold md:text-5xl">
          {post.title}
        </h1>

        <div className="mb-4 flex items-center justify-center gap-4 text-sm text-gray-400">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="mx-2">•</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm text-cyan-400">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </aside>

        <article className="prose prose-invert max-w-none">
          <div id="mdx-content">
            <MDXContent source={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
};
export default BlogPost;
