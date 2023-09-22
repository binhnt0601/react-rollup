import { useEffect, useState } from "react";

export const Pagination = ({
  currentPage,
  pageSize = 4,
  totalPages,
  onChangePage,
  firstButton = true,
  lastButton = true,
}: {
  currentPage: number;
  pageSize?: number;
  totalPages: number;
  firstButton?: boolean;
  lastButton?: boolean;
  onChangePage: (page: number) => void;
}) => {
  const [pages, setPages] = useState<Array<number>>([]);
  useEffect(() => {
    let newPages: any[] = [];
    let fromIndex: number, toIndex: number;
    const halfSize = Math.floor(pageSize / 2);

    if (totalPages > pageSize) {
      if (
        currentPage < totalPages - halfSize &&
        currentPage !== 1 &&
        currentPage > halfSize
      ) {
        if (pageSize % 2 === 0) {
          const nextPage = currentPage + 1 >= pages[pageSize - 1];
          const previousPage = currentPage < pages[1];
          if (nextPage) {
            fromIndex = currentPage - halfSize;
            toIndex = currentPage + halfSize - 1;
          }
          if (previousPage) {
            fromIndex = currentPage - halfSize + 1;
            toIndex = currentPage + halfSize;
          }
        } else {
          fromIndex = currentPage - halfSize;
          toIndex = currentPage + halfSize;
        }
      }

      if (currentPage === 1 || currentPage <= halfSize) {
        fromIndex = 1;
        toIndex = pageSize;
      }

      if (currentPage >= totalPages - halfSize || currentPage === totalPages) {
        fromIndex = totalPages - pageSize + 1;
        toIndex = totalPages;
      }
    } else {
      fromIndex = 1;
      toIndex = totalPages;
    }

    function loopPaging() {
      for (let i = fromIndex; i <= toIndex; i++) {
        newPages.push(i);
      }
    }
    loopPaging();
    setPages(newPages);
  }, [totalPages, currentPage, pageSize]);

  return (
    <ul className="pagination">
      {firstButton && (
        <li
          className={`page-item previous ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={() => onChangePage(1)}>
            <i className="previous"></i>
            <i className="previous" style={{ marginLeft: "-0.5rem" }}></i>
          </button>
        </li>
      )}
      <li
        className={`page-item previous ${currentPage === 1 ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => onChangePage(currentPage - 1)}
        >
          <i className="previous"></i>
        </button>
      </li>
      {pages.map((i) => (
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => {
              if (currentPage !== i) onChangePage(i);
            }}
          >
            {i}
          </button>
        </li>
      ))}
      <li
        className={`page-item next ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        <button
          className="page-link"
          onClick={() => onChangePage(currentPage + 1)}
        >
          <i className="next"></i>
        </button>
      </li>
      {lastButton && (
        <li
          className={`page-item next ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onChangePage(totalPages)}
          >
            <i className="next"></i>
            <i className="next" style={{ marginLeft: "-0.5rem" }}></i>
          </button>
        </li>
      )}
    </ul>
  );
};
