import Link from "next/link";
import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { X } from "lucide-react";
import { Metadata } from "next";
import { BlogCard, getBlogPosts } from "@/modules/blog";

interface BlogPageProps {
  searchParams: Promise<{ tag: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { tag } = await searchParams;

  return {
    title: tag
      ? `Bài viết về ${tag} - Tech Blog`
      : "Tech Blog - Coding Tutorials & Insights",
    description: tag
      ? `Tổng hợp các bài viết hướng dẫn, thủ thuật về ${tag} mới nhất.`
      : "Chia sẻ kiến thức về lập trình Web, Next.js, React và các công nghệ mới nhất.",
    alternates: {
      canonical: tag ? `/blog?tag=${tag}` : "/blog",
    },
  };
}

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
            {tag ? `Chủ đề: "${tag}"` : "Bài viết mới nhất"}
          </h2>

          {/* Tag Filter Indicator */}
          {tag && (
            <div className="flex items-center gap-4">
              <p className="text-gray-400">
                Tìm thấy{" "}
                <span className="font-bold text-white">{posts.length}</span> bài
                viết
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" /> Xóa bộ lọc
              </Link>
            </div>
          )}
        </div>
      </ScrollAnimation>

      {/* Blog List Section */}
      <div className="space-y-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={post.slug} post={post} activeTag={tag} />
          ))
        ) : (
          <div className="py-10 text-center">
            <p className="text-xl text-gray-400">
              Không tìm thấy bài viết nào với tag này.
            </p>
            <Link href="/blog" className="mt-4 text-cyan-400 hover:underline">
              Quay lại danh sách
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Blog;
