import React from "react";
import styled from "styled-components";
import { parseDate } from "../lib/utils";
import palette from "../styles/palette";
import Divider from "./common/Divider";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 8px

  .comment-contents {
    padding-bottom: 0.5rem;
  }

  .comment-metadata {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 1rem; // 16px
  }

  .comment-metadata-left-area {
    display: flex;
    gap: 0.5rem; // 8px
  }

  .comment-metadata-right-area {
    display: flex;
    gap: 0.5rem; // 8px

    height: 1rem; // 16px
    font-size: 0.875rem; // 14px
    color: ${palette.gray[700]};
  }

  .comment-author {
    color: ${palette.gray[600]};
    font-size: 0.875rem; // 14px
    font-weight: 500;
  }

  .comment-date {
    color: ${palette.gray[500]};
    font-size: 0.875rem; // 14px
  }

  .comment-modify,
  .comment-delete {
    cursor: pointer;
  }
`;

const CommentCard: React.FC = () => {
  return (
    <Base>
      <Divider />
      <div className="comment-metadata">
        <div className="comment-metadata-left-area">
          <p className="comment-author">너구리</p>
          <Divider orientation="vertical" />
          <p className="comment-date">{parseDate(new Date())}</p>
        </div>
        <div className="comment-metadata-right-area">
          <p className="comment-modify">수정</p>
          <Divider orientation="vertical" />
          <p className="comment-delete">삭제</p>
        </div>
      </div>
      <p className="comment-contents">인정합니다.</p>
    </Base>
  );
};

export default CommentCard;
