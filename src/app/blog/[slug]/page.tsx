import { MDXContent } from "@/components/mdx-content";
import { getBlogPosts, getPostBySlug } from "@/lib/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
    <article className="mx-auto my-20 max-w-3xl px-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold md:text-5xl">{post.title}</h1>
        <div className="text-gray-400">
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
      </div>

      <div className="mdx-container">
        <MDXContent source={post.content} />
      </div>
    </article>
  );
};
export default BlogPost;
