import React, { useState } from "react";
import styled, { css } from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import IconButton from "./common/IconButton";
import palette from "../styles/palette";
import { useLocation, useNavigate } from "react-router-dom";

interface BaseProps {
  pageListIndex: number;
  totalPage: number[];
}

const Base = styled.div<BaseProps>`
  display: flex;
  align-items: center;

  .pagination-arrow-icon-left {
    color: ${palette.gray[700]};
    cursor: pointer;
  }

  .pagination-arrow-icon-right {
    color: ${palette.gray[700]};
    cursor: pointer;
  }

  ${({ pageListIndex }) =>
    pageListIndex === 1 &&
    css`
      .pagination-arrow-icon-left {
        opacity: 0;
        cursor: default;
      }
    `}

  ${({ pageListIndex, totalPage }) =>
    pageListIndex === Math.ceil(totalPage.length / 5) &&
    css`
      .pagination-arrow-icon-right {
        opacity: 0;
        cursor: default;
      }
    `}
`;

interface Props {
  totalPosts: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// totalPosts (number): 전체 글의 갯수
// totalPage (array): 전체 페이지의 갯수 ex) 서버에서 받아오는 전체 글 갯수가 1000개 -> 100
// currentPage (number): 현재 보여지고 있는 페이지
// pageListIndex (number): 페이지 리스트의 인덱스 ex) 1 -> 1~5, 2 -> 6~10, 3 -> 11~15
// currentPageList (array): 현재 보여지고 있는 페이지 리스트 (pageListIndex로 구함)
const Pagination: React.FC<Props> = ({
  totalPosts,
  currentPage,
  setCurrentPage,
}) => {
  const [pageListIndex, setPageListIndex] = useState(1);

  const location = useLocation();

  const navigate = useNavigate();

  const totalPage = Array(Math.ceil(totalPosts / 10))
    .fill(0)
    .map((_, index) => index + 1);

  const currentPageList = totalPage.slice(
    pageListIndex * 5 - 5,
    pageListIndex * 5
  );

  const loadPrevPageList = () => {
    if (pageListIndex === 1) return;

    setPageListIndex((pageListIndex: number) => pageListIndex - 1);
    setCurrentPage(currentPageList[currentPageList.length - 1] - 5);
    navigate(
      `${location.pathname}?page=${
        currentPageList[currentPageList.length - 1] - 5
      }`
    );
  };

  const loadNextPageList = () => {
    if (pageListIndex === Math.ceil(totalPage.length / 5)) return;

    setPageListIndex((pageListIndex: number) => pageListIndex + 1);
    setCurrentPage(currentPageList[0] + 5);
    navigate(`${location.pathname}?page=${currentPageList[0] + 5}`);
  };

  return (
    <Base pageListIndex={pageListIndex} totalPage={totalPage}>
      <ArrowLeftIcon
        className="pagination-arrow-icon-left"
        onClick={loadPrevPageList}
      />
      {currentPageList.map((page, index) => (
        <IconButton
          key={index}
          value={page}
          color={currentPage === page ? "primary" : "default"}
          onClick={() => {
            setCurrentPage(page);
            navigate(`${location.pathname}?page=${page}`);
            console.log(page);
          }}
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
