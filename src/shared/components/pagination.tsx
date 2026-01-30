import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  searchParams?: Record<string, string | undefined>;
}

export const Pagination = ({
  totalPages,
  currentPage,
  baseUrl,
  searchParams = {},
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    // Giữ lại các params cũ
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    if (page > 1) params.set("page", page.toString());

    if (page === 1) params.delete("page");

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  return (
    <div className="mt-12 flex justify-center gap-2">
      {/* Nút Prev */}
      <Link
        href={createPageUrl(currentPage - 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10",
          currentPage <= 1 && "pointer-events-none opacity-50",
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>

      {/* Số trang */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
              currentPage === page
                ? "border-cyan-500 bg-cyan-500/20 text-cyan-400"
                : "border-white/10 bg-white/5 hover:bg-white/10",
            )}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Nút Next */}
      <Link
        href={createPageUrl(currentPage + 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10",
          currentPage >= totalPages && "pointer-events-none opacity-50",
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
};
