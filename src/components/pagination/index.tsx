import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxVisible = 5;

  const generateUrl = (page: number) => {
    const url = new URL(baseUrl, "http://localhost");
    url.searchParams.set("page", page.toString());
    return `${url.pathname}${url.search}`;
  };

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={`flex items-center justify-center gap-2 p-4 font-sans ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* First page button */}
      {currentPage > 1 ? (
        <Link
          href={generateUrl(1)}
          className="px-3 py-2 rounded-lg border transition-colors duration-200"
          aria-label="First page"
        >
          {"«"}
        </Link>
      ) : (
        <span
          className="px-3 py-2 rounded-lg border cursor-not-allowed text-gray-400"
          aria-disabled="true"
        >
          {"«"}
        </span>
      )}
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={generateUrl(currentPage - 1)}
          className="px-3 py-2 rounded-lg border transition-colors duration-200"
          aria-label="Previous page"
        >
          {"<"}
        </Link>
      ) : (
        <span
          className="px-3 py-2 rounded-lg border cursor-not-allowed text-gray-400"
          aria-disabled="true"
        >
          {"<"}
        </span>
      )}
      {/* Page numbers */}
      <div className="flex gap-1">
        {visiblePages.map((page) =>
          page === currentPage ? (
            <span
              key={page}
              className="px-3 py-2 border rounded-lg text-[var(--background)] bg-[var(--foreground)]"
              aria-label={`Page ${page}`}
              aria-current="page"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={generateUrl(page)}
              className="px-3 py-2 rounded-lg border"
              aria-label={`Page ${page}`}
            >
              {page}
            </Link>
          )
        )}
      </div>
      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={generateUrl(currentPage + 1)}
          className="px-3 py-2 rounded-lg border transition-colors duration-200"
          aria-label="Next page"
        >
          {">"}
        </Link>
      ) : (
        <span
          className="px-3 py-2 rounded-lg border cursor-not-allowed text-gray-400"
          aria-disabled="true"
        >
          {">"}
        </span>
      )}
      {/* Last page button */}
      {currentPage < totalPages ? (
        <Link
          href={generateUrl(totalPages)}
          className="px-3 py-2 rounded-lg border transition-colors duration-200"
          aria-label="Last page"
        >
          {"»"}
        </Link>
      ) : (
        <span
          className="px-3 py-2 rounded-lg border cursor-not-allowed text-gray-400"
          aria-disabled="true"
        >
          {"»"}
        </span>
      )}
    </nav>
  );
}
