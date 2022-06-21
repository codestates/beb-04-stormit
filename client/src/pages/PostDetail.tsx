import React from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import { FAKE_POST_CONTENTS } from "../lib/dummyData";
import Textarea from "../components/common/Textarea";
import Button from "../components/common/Button";
import palette from "../styles/palette";
import CommentCard from "../components/CommentCard";

const Base = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;

  .body {
    display: flex;
  }

  .contents {
    display: flex;
    flex-direction: column;
    gap: 1rem; // 16px
    margin: 1rem; // 16px
  }

  .contents-top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; // 8px
    padding: 2rem 0 1rem 0; // 32px 0
  }

  .post-id {
    color: ${palette.gray[500]};
  }

  .post-detail-metadata {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
  }

  .post-detail-author-profile-image {
    width: 2rem; // 32px
    height: 2rem; // 32px
    border-radius: 50%;
    background-color: ${palette.gray[300]};
  }

  .post-detail-author-name {
    font-weight: 500;
  }

  .post-detail-title {
    font-size: 2rem; // 36px
    font-weight: 500;
  }

  .post-detail-contents {
    line-height: 1.6;
  }

  .comment-title {
    font-size: 1.5rem; // 24px
    padding-top: 1rem; // 16px
  }

  .comment-submit-title {
    font-size: 1.25rem; // 20px
    font-weight: 500;
  }

  .comment-submit-button-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    .contents {
      margin: 0 auto;
      max-width: 37.5rem; // 600px
    }
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    .contents {
      max-width: 52.5rem; // 840px
    }
  }
`;

const PostDetail: React.FC = () => {
  return (
    <Base>
      <div className="body">
        <NavigationRail />
        <div className="contents">
          <div className="contents-top">
            <p className="post-id">#123456</p>
            <p className="post-detail-title">
              블록체인 너무 어려운 것 같습니다..
            </p>
            <div className="post-detail-metadata">
              <div className="post-detail-author-profile-image" />
              <span className="post-detail-author-name">노논크러스트</span>
            </div>
          </div>
          <p className="post-detail-contents">{FAKE_POST_CONTENTS}</p>
          <p className="comment-title">댓글 4개</p>
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <p className="comment-submit-title">댓글 쓰기</p>
          <Textarea placeholder="댓글을 남겨보세요" height="6rem" />
          <div className="comment-submit-button-wrapper">
            <Button variant="contained">등록</Button>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default PostDetail;
