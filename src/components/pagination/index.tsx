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
  const getVisiblePages = () => {
    const maxVisible = 5;

    let pages: (number | null)[] = [];

    if (totalPages <= maxVisible) {
      // Если страниц меньше 5 — показываем все, + null для заполнения
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      while (pages.length < maxVisible) pages.push(null);
      return pages;
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <button
        disabled={currentPage <= 1}
        onClick={handlePreviousPage}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {"<"}
      </button>

      <div className="flex gap-1">
        {visiblePages.map((page, index) =>
          page ? (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? "underline font-bold" : ""
              }`}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ) : (
            <div key={`placeholder-${index}`} className="px-3 py-1 w-8" />
          )
        )}
      </div>

      <button
        disabled={currentPage >= totalPages}
        onClick={handleNextPage}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination