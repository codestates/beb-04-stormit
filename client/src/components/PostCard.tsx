import React from "react";
import styled, { css } from "styled-components";
import palette from "../styles/palette";
import Divider from "./common/Divider";
import { Link } from "react-router-dom";
import theme from "../styles/theme";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Chip from "./common/Chip";
import { viewPostAPI } from "../lib/api/post";
import { shortenPostTitle, translateCommunityName } from "../lib/utils";

interface BaseProps {
  likes: number;
}

const Base = styled.li<BaseProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // 8px
  padding: 0.5rem 1rem;

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

    &:hover {
      opacity: 0.7;
    }
  }

  .post-contents {
    font-size: 0.75rem;
    color: ${palette.gray[600]};
    line-height: 1.4;
  }

  .post-likes-wrapper {
    display: flex;
    align-items: center;
  }

  .post-likes-icon {
    color: ${palette.gray[600]};
  }

  .post-likes {
    color: ${theme.primary};

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
    color: ${theme.primary};
  }

  .post-author {
    font-size: 0.875rem; // 14px
  }

  ${({ likes }) =>
    likes > 10 &&
    css`
      background-color: ${palette.blue[50]};
    `}
`;

interface Props {
  postId: number;
  title: string;
  contents: string;
  commentCount: number;
  nickname: string;
  createdAt: string;
  community: string;
  views: number;
  likes: number;
}

const PostCard: React.FC<Props> = ({
  postId,
  title,
  contents,
  commentCount,
  nickname,
  createdAt,
  community,
  views,
  likes,
}) => {
  const viewPost = async () => {
    try {
      await viewPostAPI(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Base likes={likes}>
        <div className="post-title-area-wrapper">
          <div className="post-title-wrapper">
            <Link to={`/post/${postId}`} onClick={viewPost}>
              <p className="post-title">{shortenPostTitle(title, 16)}</p>
            </Link>
            {commentCount !== 0 && (
              <span className="post-comments">[{commentCount}]</span>
            )}
            <Chip size="small">{translateCommunityName(community)}</Chip>
            {commentCount > 10 && <Chip size="small">인기글</Chip>}
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
    </>
  );
};

export default PostCard;
