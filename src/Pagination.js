import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    const pageLimit = 10;

    // Always include the first page
    pages.push(1);

    // Generate middle pages dynamically based on the current page
    for (let i = 2; i < totalPages; i++) {
      if (i % pageLimit === 0 || i === currentPage) {
        pages.push(i);
      }
    }

    // Always include the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page, index) => (
        <React.Fragment key={page}>
          {index > 0 && pages[index - 1] !== page - 1 && <span>...</span>}
          <button
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        </React.Fragment>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
