import React, { useCallback, useEffect, useState } from "react";
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
import {
  deletePostByIdAPI,
  dislikePostAPI,
  getPostByIdAPI,
  likePostAPI,
  submitCommentAPI,
} from "../lib/api/post";
import { useLocation, useNavigate } from "react-router-dom";
import { getLastPathname, translateCommunityName } from "../lib/utils";
import { postActions } from "../store/postSlice";
import parse from "html-react-parser";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "../components/common/Menu";
import MenuItem from "../components/common/MenuItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import { debounce } from "../lib/utils";

interface BaseProps {
  likes: number;
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

  .post-detail-created-at {
    font-size: 0.875rem;
    color: ${palette.gray[400]};
    display: none;
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

  .post-detail-likes-area {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .post-detail-likes {
    font-size: 1.5rem;

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

  .post-detail-chip-wrapper {
    display: flex;
    gap: 0.5rem; // 8px
  }

  .post-detail-edit,
  .post-detail-delete {
    cursor: pointer;
  }

  .post-detail-dropdown-icon-wrapper {
    position: relative;
  }

  .post-detail-dropdown {
    top: 2.8rem;
    right: 0rem;
  }

  .comment-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem; // 16px
  }

  .comment-title {
    font-size: 1.5rem; // 24px
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
      width: 37.5rem; // 600px
    }

    .post-detail-created-at {
      display: block;
    }
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    .contents {
      width: 52.5rem; // 840px
    }
  }
`;

const PostDetail: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [postData, setPostData] = useState({
    postTitle: "",
    postContents: "",
    nickname: "",
    community: "",
    createdAt: "",
    views: 0,
    likes: 0,
  });
  const [commentsData, setCommentsData] = useState<
    {
      comment_nickname: string;
      comment_content: string;
      comment_id: number;
      comment_created_at: string;
    }[]
  >([]);
  const [commentContent, setCommentContent] = useState("");

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const nickname = useSelector((state) => state.user.nickname);
  const userId = useSelector((state) => state.user.userId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const postId = Number(getLastPathname(location.pathname));

  const isMyPost = postData.nickname === nickname;

  const fetchPost = useCallback(async () => {
    try {
      const response = await getPostByIdAPI(postId);

      console.log(response.data);
      const {
        post_title,
        post_content,
        nickname,
        created_at,
        board_title,
        comments,
        views,
        likes,
      } = response.data;

      setPostData({
        postTitle: post_title,
        postContents: post_content,
        nickname: nickname,
        createdAt: created_at,
        community: board_title,
        views: views,
        likes: likes,
      });

      comments && setCommentsData(comments);
    } catch (error) {
      console.log(error);
      navigate("/deleted", { replace: true });
    }
  }, [postId, navigate]);

  const toggleDropdownMenu = () => {
    setDropdownOpen((dropdownOpen) => !dropdownOpen);
  };

  const onChangeCommentContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentContent(event.target.value);
  };

  const onClickRefreshButton = () => {
    debounce(fetchPost());
  };

  const onClickEditButton = () => {
    dispatch(
      postActions.setPostState({
        title: postData.postTitle,
        contents: postData.postContents,
        community: translateCommunityName(postData.community),
      })
    );

    navigate(`/edit/${postId}`);
  };

  const onClickDeleteButton = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deletePostByIdAPI(postId);
        alert("삭제되었습니다.");
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onClickLikeButton = async () => {
    try {
      const response = await likePostAPI(postId);
      console.log(response);
      setTimeout(() => {
        fetchPost();
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDislikeButton = async () => {
    try {
      const response = await dislikePostAPI(postId);
      console.log(response);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async () => {
    const body = {
      user_id: userId,
      post_id: postId,
      comment_content: commentContent,
    };

    console.log(body);
    try {
      await submitCommentAPI(body);
      await fetchPost();
      setCommentContent("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <Base likes={postData.likes}>
      <NavigationRail />
      <div className="contents">
        <div className="contents-top">
          {postData.community && (
            <p className="post-detail-community">
              # {translateCommunityName(postData.community)}
            </p>
          )}
          <p className="post-detail-title">{postData.postTitle}</p>
          <div className="post-detail-metadata">
            <div className="post-detail-metadata-left-area">
              <img
                className="post-detail-author-profile-image"
                src="/profile-image.png"
                alt=""
              />
              <span className="post-detail-author-name">
                {postData.nickname}
              </span>
              <span className="post-detail-created-at">
                {postData.createdAt}
              </span>
              <span className="post-detail-views">조회수 {postData.views}</span>
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
              {!isMyPost && (
                <div className="post-detail-dropdown-icon-wrapper">
                  <IconButton onClick={toggleDropdownMenu}>
                    <MoreVertIcon />
                  </IconButton>
                  {dropdownOpen && (
                    <Menu
                      className="post-detail-dropdown"
                      onClose={() => setDropdownOpen(false)}
                    >
                      <MenuItem
                        label="신고"
                        onClick={() =>
                          alert("안타깝지만 신고 기능은 없습니다.")
                        }
                      />
                    </Menu>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <Divider />
        <div className="post-detail-contents">
          {parse(postData.postContents)}
        </div>
        <div className="post-detail-chip-wrapper">
          <Chip>태그</Chip>
          <Chip>커뮤니티</Chip>
        </div>
        <div className="post-detail-likes-area">
          <IconButton onClick={onClickLikeButton}>
            <KeyboardArrowUpIcon />
          </IconButton>
          <span className="post-detail-likes">{postData.likes}</span>
          <IconButton onClick={onClickDislikeButton}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <div className="comment-title-wrapper">
          <p className="comment-title">댓글 {commentsData.length}개</p>
          <IconButton onClick={onClickRefreshButton}>
            <RefreshIcon />
          </IconButton>
        </div>
        {commentsData.map((comment, index) => (
          <CommentCard
            key={index}
            nickname={comment.comment_nickname}
            createdAt={comment.comment_created_at}
            commentContents={comment.comment_content}
            commentId={comment.comment_id}
            refresh={fetchPost}
          />
        ))}
        {isLoggedIn && (
          <>
            <p className="comment-submit-title">댓글 쓰기</p>
            <Textarea
              value={commentContent}
              onChange={onChangeCommentContent}
              placeholder="댓글을 남겨보세요"
              height="6rem"
            />
            <div className="comment-submit-button-wrapper">
              <Button variant="contained" onClick={submitComment}>
                등록
              </Button>
            </div>
          </>
        )}
      </div>
    </Base>
  );
};

export default PostDetail;
