import React from "react";
import styled, { css } from "styled-components";
import palette from "../styles/palette";
import Divider from "./common/Divider";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Chip from "./common/Chip";

interface BaseProps {
  isPopular?: boolean;
  viewed?: boolean;
}

const Base = styled.li<BaseProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // 8px
  padding: 0.5rem 1rem; // 8px

  &:hover {
    background-color: ${palette.gray[100]};
  }

  .post-metadata-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.875rem; // 14px
  }

  .post-metadata {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
  }

  .time,
  .post-views {
    font-size: 0.75rem; // 12px
    color: ${palette.gray[400]};
  }

  .post-title-area-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
  }

  .post-title {
    color: ${palette.gray[600]};
    cursor: pointer;
  }

  .post-vote-wrapper {
    display: flex;
    align-items: center;
  }

  .post-vote-icon {
    color: ${palette.gray[600]};
  }

  .post-vote {
    color: ${palette.blue[500]};
  }

  .post-comments {
    color: ${palette.blue[500]};
  }

  .post-author {
    font-size: 0.875rem; // 14px
  }

  ${({ isPopular }) =>
    isPopular &&
    css`
      background-color: ${palette.blue[50]};
      &:hover {
        background-color: ${palette.blue[100]};
      }
    `}

  ${({ viewed }) =>
    viewed &&
    css`
      .post-title {
        color: ${palette.gray[100]};
      }
      .post-comments {
        color: ${palette.blue[200]};
      }
    `}
`;

interface Props {
  postId: number;
  title: string;
  commentCount: number;
  nickname: string;
  createdAt: string;
  isPopular?: boolean;
  viewed?: boolean;
}

const CommunityPostCard: React.FC<Props> = ({
  postId,
  title,
  commentCount,
  nickname,
  createdAt,
  isPopular,
  viewed,
}) => {
  return (
    <Link to={`/post/${postId}`}>
      <Base isPopular={isPopular} viewed={viewed}>
        <div className="post-title-area-wrapper">
          <div className="post-title-wrapper">
            {isPopular && <Chip size="small">인기</Chip>}
            <p className="post-title">{title}</p>
            <span className="post-comments">[{commentCount}]</span>
          </div>
          <div className="post-vote-wrapper">
            <KeyboardArrowUpIcon className="post-vote-icon" />
            <span className="post-vote">0</span>
          </div>
        </div>
        <div className="post-metadata-area">
          <p className="post-metadata">
            <span className="post-author">{nickname}</span>

            <span className="time">{createdAt}</span>
            <span className="post-views">조회수 0</span>
          </p>
        </div>
      </Base>
      <Divider />
    </Link>
  );
};

export default CommunityPostCard;
