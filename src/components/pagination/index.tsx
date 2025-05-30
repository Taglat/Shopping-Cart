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
        {[...Array(totalPages)].map((_, index) => (
          <button
            onClick={() => handlePageClick(index + 1)}
            className={`px-3 py-1 border rounded ${
              index + 1 === currentPage ? "underline font-bold" : ""
            }`}
            disabled={index + 1 === currentPage}
            key={index}
          >
            {index + 1}
          </button>
        ))}
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
};

export default Pagination;
