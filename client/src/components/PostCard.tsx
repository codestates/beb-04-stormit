import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import Chip from "./common/Chip";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import palette from "../styles/palette";
import Divider from "./common/Divider";

const Base = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0.5rem;

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

const PostCard: React.FC = () => {
  return (
    <>
      <Base>
        <p className="post-metadata">
          <span className="votes">0 votes</span>
          <span className="replies">0 replies</span>
          <span className="views">0 views</span>
          <span className="time">2022-06-20 00:00:00</span>
        </p>
        <div className="post-title-area-wrapper">
          <p className="post-title">이것은 게시물의 제목입니다.</p>
          {/* <div className="post-comments-views-wrapper">
            <div className="post-comments-wrapper">
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
              <span className="post-comments">10</span>
            </div>
            <div className="post-views-wrapper">
              <VisibilityOutlinedIcon fontSize="small" />
              <span className="post-views">100</span>
            </div>
          </div> */}
        </div>
        <p className="post-contents">
          싶이 수 우리 이상은 힘있다. 뛰노는 듣기만 너의 있으며, 행복스럽고
          위하여서, 밝은 부패뿐이다. 같이, 행복스럽고 인생을 그들은 것이 과실이
          소금이라 것이다...
        </p>
        <div className="chips-wrapper">
          <Chip size="small">Tag</Chip>
          <Chip size="small">Community</Chip>
          <Chip size="small">Long Community Name</Chip>
        </div>
      </Base>
      <Divider />
    </>
  );
};

export default PostCard;
