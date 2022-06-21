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
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem; // 8px

    height: 1rem; // 16px
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
`;

const CommentCard: React.FC = () => {
  return (
    <Base>
      <Divider />
      <div className="comment-metadata">
        <p className="comment-author">너구리</p>
        <Divider orientation="vertical" />
        <p className="comment-date">{parseDate(new Date())}</p>
      </div>
      <p className="comment-contents">인정합니다.</p>
    </Base>
  );
};

export default CommentCard;
