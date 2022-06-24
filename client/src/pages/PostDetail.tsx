import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import NavigationRail from "../components/NavigationRail";
import Textarea from "../components/common/Textarea";
import Button from "../components/common/Button";
import palette from "../styles/palette";
import CommentCard from "../components/CommentCard";
import Chip from "../components/common/Chip";
import Divider from "../components/common/Divider";
import { useDispatch, useSelector } from "../store";
import IconButton from "../components/common/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import theme from "../styles/theme";
import { deletePostByIdAPI, getPostByIdAPI } from "../lib/api/post";
import { useLocation, useNavigate } from "react-router-dom";
import { getLastPathname, parseDate } from "../lib/utils";
import { postActions } from "../store/postSlice";

interface BaseProps {
  vote: number;
}

const Base = styled.div<BaseProps>`
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

    ${({ vote }) => {
      if (vote > 0) {
        return css`
          color: ${theme.primary};
        `;
      }
      if (vote === 0) {
        return css`
          color: ${palette.black};
        `;
      }
      if (vote < 0) {
        return css`
          color: ${palette.red[500]};
        `;
      }
    }}
  }

  .post-detail-chip-wrapper {
    display: flex;
    gap: 0.5rem; // 8px
  }

  .post-detail-edit,
  .post-detail-delete {
    cursor: pointer;
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
    margin-bottom: 2rem;
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

const FAKE_POST_CONTENTS =
  "들어 피가 목숨이 우리의 아니다. 하였으며, 안고, 천지는 이상 사랑의 그리하였는가? 수 어디 타오르고 시들어 피부가 부패뿐이다. 남는 끓는 오아이스도 노년에게서 안고, 관현악이며, 얼마나 황금시대를 놀이 있는가? 천자만홍이 장식하는 가치를 위하여, 인생에 못할 것은 힘있다. 피어나는 이상의 지혜는 피가 주는 찬미를 불러 그러므로 군영과 위하여서. 거친 하였으며, 위하여 인간은 이상은 부패를 꽃이 청춘의 그들은 아니다. 청춘 피가 싹이 주는 이상은 것은 석가는 넣는 끝에 피다. 찾아 몸이 살았으며, 사막이다.";

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
  const nickname = useSelector((state) => state.user.nickname);
  const vote = useSelector((state) => state.post.vote);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const postId = Number(getLastPathname(location.pathname));

  const isMyPost = postData.nickname === nickname;

  const onClickEditButton = () => {
    dispatch(
      postActions.setPostState({
        title: "글 수정 제목",
        contents: "글 수정 내용",
        community: "공지사항",
      })
    );

    // dispatch(postActions.setPostState({
    //   title: postData.postTitle,
    //   contents: postData.postContents,
    //   community: postData.community
    // }))

    navigate(`/edit/${postId}`);
  };

  const onClickDeleteButton = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      await deletePostByIdAPI(postId);
      navigate(-1);
    }
  };

  const onClickVoteUpButton = () => {
    dispatch(postActions.setVoteUp());
  };

  const onClickVoteDownButton = () => {
    dispatch(postActions.setVoteDown());
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostByIdAPI(postId);
        const {
          post_title,
          post_content,
          nickname,
          created_at,
          board_title,
          comments,
        } = response.data;

        setPostData({
          postTitle: post_title,
          postContents: post_content,
          nickname: nickname,
          createdAt: created_at,
          community: board_title,
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
        navigate("/deleted");
      }
    };

    fetchPost();
  }, [postId, navigate]);

  return (
    <Base vote={vote}>
      <NavigationRail />
      <div className="contents">
        <div className="contents-top">
          <p className="post-detail-community">
            # {postData.community || "블록체인"}
          </p>
          <p className="post-detail-title">
            {postData.postTitle || "해당하는 글이 아무것도 없습니다"}
          </p>
          <div className="post-detail-metadata">
            <div className="post-detail-metadata-left-area">
              <img
                className="post-detail-author-profile-image"
                src="/profile-image.png"
                alt=""
              />
              <span className="post-detail-author-name">
                {postData.nickname || "노논"}
              </span>
              <span className="post-detail-views">조회수 0</span>
            </div>
            <div className="post-detail-metadata-right-area">
              {isMyPost && (
                <>
                  <p className="post-detail-edit" onClick={onClickEditButton}>
                    수정
                  </p>
                  <Divider orientation="vertical" />
                  <p
                    className="post-detail-delete"
                    onClick={onClickDeleteButton}
                  >
                    삭제
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <Divider />
        <p className="post-detail-contents">
          {postData.postContents || FAKE_POST_CONTENTS}
        </p>
        <div className="post-detail-chip-wrapper">
          <Chip>태그</Chip>
          <Chip>커뮤니티</Chip>
        </div>
        <div className="post-detail-vote-area">
          <IconButton onClick={onClickVoteUpButton}>
            <KeyboardArrowUpIcon />
          </IconButton>
          <span className="post-detail-vote">{vote}</span>
          <IconButton onClick={onClickVoteDownButton}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <p className="comment-title">댓글 {commentsData.length || "3"}개</p>
        {commentsData.map((comment) => (
          <CommentCard
            nickname={comment.nickname}
            createdAt={comment.createdAt}
            commentContents={comment.commentContent}
            commentId={comment.commentId}
          />
        ))}
        <CommentCard
          nickname="너구리"
          createdAt={parseDate(new Date())}
          commentContents="와"
          commentId={0}
        />
        <CommentCard
          nickname="너구리"
          createdAt={parseDate(new Date())}
          commentContents="와"
          commentId={0}
        />
        <CommentCard
          nickname="너구리"
          createdAt={parseDate(new Date())}
          commentContents="와"
          commentId={0}
        />
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
