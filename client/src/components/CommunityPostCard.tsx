import React from "react";
import styled, { css } from "styled-components";
import palette from "../styles/palette";
import Divider from "./common/Divider";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Chip from "./common/Chip";
import { viewPostAPI } from "../lib/api/post";
import theme from "../styles/theme";
import { shortenPostTitle } from "../lib/utils";

interface BaseProps {
  likes: number;
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

  .post-chip {
    display: inline-block;
    margin-right: 0.5rem;
  }

  .post-title {
    color: ${palette.gray[600]};
    cursor: pointer;
    margin-right: 0.5rem;
  }

  .post-likes-wrapper {
    display: flex;
    align-items: center;
  }

  .post-likes-icon {
    color: ${palette.gray[600]};
  }

  .post-likes {
    color: ${palette.blue[500]};

    ${({ likes }) => {
      if (likes > 0) {
        return css`
          color: ${theme.primary};
        `;
      }
      if (likes === 0) {
        return css`
          color: ${palette.black};
        `;
      }
      if (likes < 0) {
        return css`
          color: ${palette.red[500]};
        `;
      }
    }}
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
  views: number;
  likes: number;
  isPopular?: boolean;
  viewed?: boolean;
  community?: string;
}

const CommunityPostCard: React.FC<Props> = ({
  postId,
  title,
  commentCount,
  nickname,
  createdAt,
  isPopular,
  views,
  likes,
  viewed,
  community,
}) => {
  const viewPost = async () => {
    try {
      await viewPostAPI(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/post/${postId}`} onClick={viewPost}>
      <Base isPopular={isPopular} viewed={viewed} likes={likes}>
        <div className="post-title-area-wrapper">
          <div className="post-title-wrapper">
            {isPopular && (
              <Chip className="post-chip" size="small">
                인기
              </Chip>
            )}
            <span className="post-title">{shortenPostTitle(title, 50)}</span>
            {commentCount !== 0 && (
              <span className="post-comments">[{commentCount}]</span>
            )}
          </div>
          <div className="post-likes-wrapper">
            <KeyboardArrowUpIcon className="post-likes-icon" />
            <span className="post-likes">{likes}</span>
          </div>
        </div>
        <div className="post-metadata-area">
          <p className="post-metadata">
            <span className="post-author">{nickname}</span>
            <span className="time">{createdAt}</span>
            <span className="post-views">조회수 {views}</span>
          </p>
        </div>
      </Base>
      <Divider />
    </Link>
  );
};

export default CommunityPostCard;
