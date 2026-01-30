import { getBlogPosts } from "@/shared/lib/blog";
import Link from "next/link";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Calendar, Tag, X } from "lucide-react";
import { Metadata } from "next";

interface BlogPageProps {
  searchParams: Promise<{ tag: string }>;
}

export const metadata: Metadata = {
  title: "Tech Blog - Coding Tutorials & Insights",
  description:
    "Chia sẻ kiến thức về lập trình Web, Next.js, React và các công nghệ mới nhất.",
  keywords: [
    "Tech Blog",
    "Lập trình Web",
    "Next.js Tutorial",
    "React Tips",
    "Coding Life",
  ],
  alternates: {
    canonical: "./",
  },
};

const Blog = async ({ searchParams }: BlogPageProps) => {
  const allPosts = getBlogPosts();
  const { tag } = await searchParams;

  const posts = tag
    ? allPosts.filter((post) => post.tags.includes(tag))
    : allPosts;

  return (
    <div className="mx-auto my-2 min-h-screen max-w-4xl px-4">
      <ScrollAnimation>
        <div className="mb-12">
          <h2 className="gradient-text mb-12 text-4xl font-bold">
            {tag ? `Bài viết với tag "${tag}"` : "Bài viết mới nhất"}
          </h2>

          {tag && (
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" /> Bỏ lọc tag
            </Link>
          )}
        </div>
      </ScrollAnimation>

      <div className="space-y-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <ScrollAnimation key={post.slug}>
              <article className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-500/5">
                <Link href={`/blog/${post.slug}`}>
                  <span className="absolute inset-0" />
                </Link>

                {/* Header: Date & Title */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                    {post.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mb-6 line-clamp-2 text-gray-400">
                  {post.description}
                </p>

                {/* Footer: Tags */}
                <div className="relative z-10 flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  {post.tags.map((t) => (
                    <Link
                      key={t}
                      href={`/blog?tag=${t}`}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        t === tag
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                          : "border-white/5 bg-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </article>
            </ScrollAnimation>
          ))
        ) : (
          <p className="text-gray-400">Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
};
export default Blog;
