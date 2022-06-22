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

interface Props {
  nickname: string;
  createdAt: string;
  commentContents: string;
}

const CommentCard: React.FC<Props> = ({
  nickname,
  createdAt,
  commentContents,
}) => {
  return (
    <Base>
      <Divider />
      <div className="comment-metadata">
        <div className="comment-metadata-left-area">
          <p className="comment-author">{nickname}</p>
          <Divider orientation="vertical" />
          <p className="comment-date">{createdAt}</p>
        </div>
        <div className="comment-metadata-right-area">
          <p className="comment-modify">수정</p>
          <Divider orientation="vertical" />
          <p className="comment-delete">삭제</p>
        </div>
      </div>
      <p className="comment-contents">{commentContents}</p>
    </Base>
  );
};

export default CommentCard;
