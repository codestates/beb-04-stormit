import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import { FAKE_POST_CONTENTS } from "../lib/dummyData";
import Textarea from "../components/common/Textarea";
import Button from "../components/common/Button";
import palette from "../styles/palette";
import CommentCard from "../components/CommentCard";
import Chip from "../components/common/Chip";
import Divider from "../components/common/Divider";
import { useSelector } from "../store";
import IconButton from "../components/common/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import theme from "../styles/theme";
import { getPostByIdAPI } from "../lib/api/post";
import { useLocation } from "react-router-dom";
import { getLastPathname } from "../lib/utils";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

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
    padding-top: 2rem; // 32px
  }

  .post-detail-community {
    color: ${palette.gray[500]};
  }

  .post-detail-metadata {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2rem; // 32px
  }

  .post-detail-metadata-left-area {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
  }

  .post-detail-metadata-right-area {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
    height: 1.5rem; // 24px
    color: ${palette.gray[500]};
  }

  .post-detail-author-profile-image {
    width: 2rem; // 32px
    height: 2rem; // 32px
    border-radius: 50%;
    background-color: ${palette.gray[300]};
  }

  .post-detail-author-name {
    font-weight: 500;
    color: ${palette.gray[700]};
  }

  .post-detail-views {
    font-size: 0.875rem; // 14px
    color: ${palette.gray[400]};
  }

  .post-detail-title {
    font-size: 2rem; // 36px
    font-weight: 500;
    line-height: 1.2;
  }

  .post-detail-contents {
    padding-top: 1rem; // 16px
    line-height: 1.6;
  }

  .post-detail-vote-area {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .post-detail-vote {
    font-size: 1.5rem;
    color: ${theme.primary};
  }

  .post-detail-chip-wrapper {
    display: flex;
    gap: 0.5rem; // 8px
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
      margin: 1rem auto;
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

/*
post_title: string;
  nickname: string;
  created_at: string;
  comment: { nickname: string; comment_content: string; comment_id: number }[];
*/

const PostDetail: React.FC = () => {
  const [postData, setPostData] = useState({
    postTitle: "",
    postContents: "",
    nickname: "",
    community: "",
    createdAt: "",
  });
  const [commentsData, setCommentsData] = useState<
    {
      nickname: string;
      commentContent: string;
      commentId: number;
      createdAt: string;
    }[]
  >([]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const location = useLocation();

  const postId = Number(getLastPathname(location.pathname));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostByIdAPI(postId);
        const {
          post_title,
          post_content,
          nickname,
          created_at,
          board_name,
          comments,
        } = response.data;

        setPostData({
          postTitle: post_title,
          postContents: post_content,
          nickname: nickname,
          createdAt: created_at,
          community: board_name,
        });

        comments.map((comment) =>
          setCommentsData((commentsData) => [
            ...commentsData,
            {
              nickname: comment.nickname,
              commentContent: comment.comment_content,
              commentId: comment.comment_id,
              createdAt: comment.created_at,
            },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  return (
    <Base>
      <NavigationRail />
      <div className="contents">
        <div className="contents-top">
          <p className="post-detail-community"># {postData.community}</p>
          <p className="post-detail-title">{postData.postTitle}</p>
          <div className="post-detail-metadata">
            <div className="post-detail-metadata-left-area">
              <div className="post-detail-author-profile-image" />
              <span className="post-detail-author-name">
                {postData.nickname}
              </span>
              <span className="post-detail-views">조회수 0</span>
            </div>
            <div className="post-detail-metadata-right-area">
              <p className="post-detail-modify">수정</p>
              <Divider orientation="vertical" />
              <p className="post-detail-delete">삭제</p>
            </div>
          </div>
        </div>
        <Divider />
        <p className="post-detail-contents">{postData.postContents}</p>
        <div className="post-detail-chip-wrapper">
          <Chip>태그</Chip>
          <Chip>커뮤니티</Chip>
        </div>
        <div className="post-detail-vote-area">
          <IconButton>
            <KeyboardArrowUpIcon />
          </IconButton>
          <span className="post-detail-vote">0</span>
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <p className="comment-title">댓글 {commentsData.length}개</p>
        {commentsData.map((comment) => (
          <CommentCard
            nickname={comment.nickname}
            createdAt={comment.createdAt}
            commentContents={comment.commentContent}
          />
        ))}
        {isLoggedIn && (
          <>
            <p className="comment-submit-title">댓글 쓰기</p>
            <Textarea placeholder="댓글을 남겨보세요" height="6rem" />
            <div className="comment-submit-button-wrapper">
              <Button variant="contained">등록</Button>
            </div>
          </>
        )}
      </div>
    </Base>
  );
};

export default PostDetail;
