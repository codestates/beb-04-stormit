import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import Divider from "./common/Divider";
import { parseDate } from "../lib/utils";
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

  .post-title-wrapper {
    display: flex;
  }

  .post-title {
    color: ${palette.gray[600]};
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  .post-views-comments-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px

    color: ${palette.gray[500]};
  }

  .post-author {
    font-size: 0.875rem; // 14px
  }
`;

const CommunityPostCard: React.FC = () => {
  const navigate = useNavigate();

  const onClickPostTitle = () => {
    navigate(`/post/${128234}`);
  };

  return (
    <>
      <Base>
        <div className="post-title-area-wrapper">
          <div className="post-title-wrapper">
            <p className="post-title" onClick={onClickPostTitle}>
              이것은 게시물의 제목입니다.
            </p>
            <span className="post-comments">3</span>
          </div>
          <div className="post-views-wrapper">
            <p className="post-views">100</p>
          </div>
        </div>
        <div className="post-metadata-area">
          <p className="post-metadata">
            <span className="post-author">스팀잇닉네임</span>

            <span className="time">{parseDate(new Date())}</span>
          </p>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <Divider />
      </Base>
    </>
  );
};

export default CommunityPostCard;
