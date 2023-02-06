import { useEffect, useState } from "react";

import "./Pagination.style.css";

const Pagination = ({
  activePagesHandler,
  totalPosts,
  postsPerPage,
  currentPage,
}) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers(arr);
  }, [totalPosts, postsPerPage]);

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.length > 0 &&
          pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                style={{
                  backgroundColor:
                    currentPage === pageNumber ? "blue" : "white",
                }}
                className="page-btn"
                onClick={() => activePagesHandler(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
