import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Calendar, Tag } from "lucide-react";

const Blog = () => {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto my-20 min-h-screen max-w-4xl px-4">
      <ScrollAnimation>
        <h2 className="gradient-text mb-12 text-4xl font-bold">Latest Posts</h2>
      </ScrollAnimation>

      <div className="space-y-8">
        {posts.map((post) => (
          <ScrollAnimation key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-500/5">
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
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-gray-300 transition-colors group-hover:border-white/10 group-hover:bg-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};
export default Blog;
