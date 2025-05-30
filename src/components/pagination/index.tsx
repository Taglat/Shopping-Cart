const Pagination = ({
  totalPages,
  currentPage,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
}: {
  totalPages: number;
  currentPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handlePageClick: (page: number) => void;
}) => {
  const maxVisible = 5;

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageClick(1)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
        aria-label="First page"
      >
        {"«"}
      </button>
      <button
        disabled={currentPage <= 1}
        onClick={handlePreviousPage}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
        aria-label="Previous page"
      >
        {"<"}
      </button>

      <div className="flex gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage
                ? "bg-gray-300 font-semibold"
                : "hover:bg-gray-200"
            } transition-colors`}
            disabled={page === currentPage}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage >= totalPages}
        onClick={handleNextPage}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
        aria-label="Next page"
      >
        {">"}
      </button>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => handlePageClick(totalPages)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
        aria-label="Last page"
      >
        {"»"}
      </button>
    </div>
  );
};

export default Pagination;
