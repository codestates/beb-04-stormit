import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import Chip from "./common/Chip";
import palette from "../styles/palette";
import Divider from "./common/Divider";
import { shortenPostContents } from "../lib/utils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "./common/IconButton";
import { useNavigate } from "react-router-dom";

const Base = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // 8px

  padding: 0.5rem 0; // 8px 0

  .post-metadata-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-metadata {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
  }

  .time {
    font-size: 0.75rem; // 12px
    color: ${palette.gray[400]};
  }

  .post-title-area-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-title {
    font-size: 0.875rem; // 14px
    color: ${theme.primary};
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  .post-comments-views-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    font-size: 0.75rem; // 12px
    color: ${palette.gray[400]};
  }

  .post-comments-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .post-views-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .post-contents {
    font-size: 0.75rem; // 12px
    line-height: 1.2;
  }

  .chips-wrapper {
    display: flex;
    gap: 0.5rem; // 8px
  }
`;

interface Props {
  postId: number;
  commentCount: number;
  postTitle: string;
  postContents: string;
  community: string;
  createdAt: string;
}

const PostCard: React.FC<Props> = ({
  postId,
  commentCount,
  postTitle,
  postContents,
  community,
  createdAt,
}) => {
  const navigate = useNavigate();

  const onClickPostTitle = () => {
    navigate(`/post/${postId}`);
  };

  const onClickMoreButton = () => {};

  return (
    <>
      <Base>
        <div className="post-metadata-area">
          <p className="post-metadata">
            <span className="replies">{commentCount} comments</span>
            <span className="views">0 views</span>
            <span className="time">{createdAt}</span>
          </p>
          <IconButton onClick={onClickMoreButton}>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="post-title-area-wrapper">
          <p className="post-title" onClick={onClickPostTitle}>
            {postTitle}
          </p>
        </div>
        <p className="post-contents">{shortenPostContents(postContents)}</p>
        <div className="chips-wrapper">
          <Chip size="small">{community}</Chip>
        </div>
      </Base>
      <Divider />
    </>
  );
};

export default PostCard;
