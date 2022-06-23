import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import Divider from "./common/Divider";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Chip from "./common/Chip";

const Base = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // 8px
  padding-top: 0.5rem; // 8px

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
  }

  .post-vote-wrapper {
    display: flex;
    align-items: center;
  }

  .post-vote-icon {
    color: ${palette.gray[600]};
  }

  .post-vote {
    color: ${theme.primary};
  }

  .post-comments {
    color: ${theme.primary};
  }

  .post-author {
    font-size: 0.875rem; // 14px
  }
`;

interface Props {
  postId: number;
  title: string;
  contents: string;
  commentCount: number;
  nickname: string;
  createdAt: string;
  community: string;
}

const PostCard: React.FC<Props> = ({
  postId,
  title,
  contents,
  commentCount,
  nickname,
  createdAt,
  community,
}) => {
  const navigate = useNavigate();

  const onClickPostTitle = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <>
      <Base>
        <div className="post-title-area-wrapper">
          <div className="post-title-wrapper">
            <p className="post-title" onClick={onClickPostTitle}>
              {title}
            </p>
            <span className="post-comments">[{commentCount}]</span>
            <Chip size="small">{community}</Chip>
          </div>
          <div className="post-vote-wrapper">
            <KeyboardArrowUpIcon className="post-vote-icon" />
            <span className="post-vote">0</span>
          </div>
        </div>
        <div className="post-contents">{contents}</div>
        <div className="post-metadata-area">
          <p className="post-metadata">
            <span className="post-author">{nickname}</span>

            <span className="time">{createdAt}</span>
            <span className="post-views">조회수 0</span>
          </p>
        </div>
        <Divider />
      </Base>
    </>
  );
};

export default PostCard;
