import Link from "next/link";
import { ScrollAnimation } from "@/shared/components/scroll-animation";
import { X } from "lucide-react";
import type { Metadata } from "next";
import { BlogCard, getPaginatedPosts } from "@/modules/blog";
import { Pagination } from "@/shared/components/pagination";
import { getTranslations } from "next-intl/server";

interface BlogPageProps {
  searchParams: Promise<{ tag: string; page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { tag, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const t = await getTranslations("Blog.meta");
  const tMain = await getTranslations("Blog");
  const { posts } = getPaginatedPosts(currentPage, tag);

  const isEmptyPage = posts.length === 0 && currentPage > 1;

  let canonicalUrl = "/blog";
  const params = new URLSearchParams();

  if (tag) params.set("tag", tag);

  if (currentPage > 1) params.set("page", currentPage.toString());

  const queryString = params.toString();
  if (queryString) canonicalUrl += `?${queryString}`;

  return {
    title: tag
      ? t("tag_title", { tag, page: currentPage })
      : t("page_title", { page: currentPage }),
    description: tag ? t("tag_desc", { tag }) : tMain("description"),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !isEmptyPage,
      follow: true,
      googleBot: {
        index: !isEmptyPage,
        follow: true,
      },
    },
  };
}

const Blog = async ({ searchParams }: BlogPageProps) => {
  const { tag, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const t = await getTranslations("Blog.listing");

  const { posts, metadata } = getPaginatedPosts(currentPage, tag);

  return (
    <div className="mx-auto my-2 min-h-screen max-w-4xl px-4">
      <ScrollAnimation>
        <div className="mb-12">
          <h2 className="gradient-text mb-12 text-4xl font-bold">
            {tag ? t("tag_title", { tag }) : t("latest_title")}
          </h2>

          {/* Tag Filter Indicator */}
          {tag && (
            <div className="flex items-center gap-4">
              <p className="text-gray-400">
                {t.rich("found_result", {
                  count: posts.length,
                  bold: (chunks) => (
                    <span className="font-bold text-white">{chunks}</span>
                  ),
                })}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" /> {t("clear_filter")}
              </Link>
            </div>
          )}

          {/* page info */}
          <p className="mt-2 text-sm text-gray-500">
            {t("pagination_info", {
              count: posts.length,
              total: metadata.totalPosts,
            })}
          </p>
        </div>
      </ScrollAnimation>

      {/* Blog List Section */}
      <div className="space-y-8">
        {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} activeTag={tag} />
            ))}

            <Pagination
              totalPages={metadata.totalPages}
              currentPage={metadata.currentPage}
              baseUrl="/blog"
              searchParams={{ tag }}
            />
          </>
        ) : (
          <div className="py-10 text-center">
            <p className="text-xl text-gray-400">{t("empty_title")}</p>
            <Link href="/blog" className="mt-4 text-cyan-400 hover:underline">
              {t("back_to_start")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Blog;
