import React, { useState } from "react";
import { Pagination as SemanticPagination } from "semantic-ui-react";
import "../assets/css/chatbot.css";

const Pagination = ({ totalPosts, postsPerPage, paginateNumber, openedPage }) => {
  const [activePage, setActivePage] = useState(openedPage);

  const paginate = (pageNumber) => {
    setActivePage(pageNumber);
    paginateNumber(pageNumber);
  };

  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(totalPosts / postsPerPage); index++) {
    pageNumbers.push(index);
  }

  return (
    <>
      {pageNumbers.length > 1 ? (
        <SemanticPagination
          className="paginate"
          boundaryRange={0}
          defaultActivePage={openedPage}
          prevItem={
            pageNumbers.length > 1 && activePage !== 1 ? "<" : "<"
          }
          nextItem={
            pageNumbers.length > 1 && activePage !== pageNumbers.length ? (
              ">"
            ) : (
              <label className="hide_right_arrow">{">"}</label>
            )
          }
          pointing
          firstItem={
            pageNumbers.length >= 5 && activePage !== 1 ? null : null
          }
          lastItem={
            pageNumbers.length >= 5 && activePage !== pageNumbers.length ? null : null
          }
          totalPages={pageNumbers.length}
          siblingRange={4}
          onPageChange={(event, data) => paginate(data.activePage)}
        />
      ) : null}
    </>
  );
};

export default Pagination;
