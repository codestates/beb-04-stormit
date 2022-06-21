import React, { useState } from "react";
import styled, { css } from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import IconButton from "./common/IconButton";

interface BaseProps {
  pageIndex: number;
  totalPage: number[];
}

const totalPage = Array(34)
  .fill(0)
  .map((_, index) => index + 1);

const Base = styled.div<BaseProps>`
  display: flex;
  align-items: center;

  .pagination-arrow-icon-left {
    cursor: pointer;
  }

  .pagination-arrow-icon-right {
    cursor: pointer;
  }

  ${({ pageIndex }) =>
    pageIndex === 1 &&
    css`
      .pagination-arrow-icon-left {
        opacity: 0;
        cursor: default;
      }
    `}

  ${({ pageIndex, totalPage }) =>
    pageIndex === Math.ceil(totalPage.length / 5) &&
    css`
      .pagination-arrow-icon-right {
        opacity: 0;
        cursor: default;
      }
    `}
`;

// totalPage, currentPage, pageIndex, currentPageList
const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [pageIndex, setPageIndex] = useState(1);

  const currentPageList = totalPage.slice(pageIndex * 5 - 5, pageIndex * 5);

  const loadPrevPageList = () => {
    if (pageIndex === 1) return;

    console.log(currentPageList[currentPageList.length - 1]);
    setPageIndex((pageIndex) => pageIndex - 1);
    setCurrentPage(currentPageList[currentPageList.length - 1] - 5);
  };

  const loadNextPageList = () => {
    if (pageIndex === Math.ceil(totalPage.length / 5)) return;

    console.log(currentPageList[0]);
    setPageIndex((pageIndex) => pageIndex + 1);
    setCurrentPage(currentPageList[0] + 5);
  };

  return (
    <Base pageIndex={pageIndex} totalPage={totalPage}>
      <ArrowLeftIcon
        className="pagination-arrow-icon-left"
        onClick={loadPrevPageList}
      />
      {currentPageList.map((page, index) => (
        <IconButton
          key={index}
          value={page}
          color={currentPage === page ? "primary" : "default"}
          onClick={() => setCurrentPage(page)}
        >
          <span>{page}</span>
        </IconButton>
      ))}
      <ArrowRightIcon
        className="pagination-arrow-icon-right"
        onClick={loadNextPageList}
      />
    </Base>
  );
};

export default Pagination;
