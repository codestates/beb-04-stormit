import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import Chip from "./common/Chip";
import palette from "../styles/palette";
import Divider from "./common/Divider";
import { parseDate, shortenPostContents } from "../lib/utils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "./common/IconButton";
import { useNavigate } from "react-router-dom";

const CONTENTS_PLACEHOLDER =
  "싶이 수 우리 이상은 힘있다. 뛰노는 듣기만 너의 있으며 행복스럽고 위하여서 밝은 부패뿐이다 같이 행복스럽고 인생을 그들은 것이 과실이 소금이라 것이다 그들은 것이 과실이 소금이라 것이다 그들은 것이 과실이 소금이라 것이다 그들은 것이 과실이 소금이라 것이다 그들은 것이 과실이 소금이라 것이다 그들은 것이 과실이 소금이라 것이다 그들은 것이 과실이 소금이라 것이다";

const Base = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0.5rem;

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

const PostCard: React.FC = () => {
  const navigate = useNavigate();

  const onClickPostTitle = () => {
    navigate(`/post/${128234}`);
  };

  return (
    <>
      <Base>
        <div className="post-metadata-area">
          <p className="post-metadata">
            <span className="votes">0 votes</span>
            <span className="replies">0 replies</span>
            <span className="views">0 views</span>
            <span className="time">{parseDate(new Date())}</span>
          </p>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="post-title-area-wrapper">
          <p className="post-title" onClick={onClickPostTitle}>
            이것은 게시물의 제목입니다.
          </p>
        </div>
        <p className="post-contents">
          {shortenPostContents(CONTENTS_PLACEHOLDER)}
        </p>
        <div className="chips-wrapper">
          <Chip size="small">태그</Chip>
          <Chip size="small">커뮤니티</Chip>
          <Chip size="small">아주 긴 커뮤니티 이름</Chip>
        </div>
      </Base>
      <Divider />
    </>
  );
};

export default PostCard;
