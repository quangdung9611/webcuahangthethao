import React from "react";

const ProductsPaginationControls = ({ currentPage, totalPages, updatePage }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => updatePage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default ProductsPaginationControls;
