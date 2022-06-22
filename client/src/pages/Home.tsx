import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FloatingIconButton from "../components/common/FloatingIconButton";
import CreateIcon from "@mui/icons-material/Create";
import PostCard from "../components/PostCard";
import NavigationRail from "../components/NavigationRail";
import { useNavigate } from "react-router-dom";

import theme from "../styles/theme";
import palette from "../styles/palette";
import Button from "../components/common/Button";
import { useSelector } from "../store";
import MovetoPost from "../components/MovetoPost";
import { getAllPostAPI } from "../lib/api/post";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .contents-top {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem; // 8px
    padding: 2rem 0; // 32px 0
  }

  .contents {
    margin: 1rem; // 16px
  }

  .body {
    display: flex;
  }

  .stormit {
    font-size: 4rem;
    font-weight: 500;
    color: ${theme.primary};
    padding-bottom: 1rem;
  }

  .stormit-subtitle {
    color: ${palette.gray[600]};
    padding: 0 4rem; // 64px
    line-height: 1.4;
    text-align: center;
  }

  .home-cta-wrapper {
    display: flex;
    gap: 1rem; // 16px
    margin: 2rem 0;
  }

  .section-title {
    font-size: 1.5rem; // 24px
    font-weight: 500;
    padding: 1rem 0; // 16px 0
  }

  .fab-wrapper {
    position: fixed;
    right: 1rem; // 16px
    bottom: 1rem; // 16px
  }
  .loading-spinner-wrapper {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  .observer {
    border-bottom: 1px solid transparent;
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    .contents {
      margin: 0 auto;
      width: 37.5rem; // 600px
    }
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    .contents {
      width: 52.5rem; // 840px
    }

    .contents-top {
      align-items: flex-start;
    }

    .stormit {
      font-size: 5rem;
    }

    .stormit-subtitle {
      padding: 0;
    }

    .fab-wrapper {
      display: none;
    }
  }
`;

const Home: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState<GetAllPostsResponseType>([]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  // // 무한스크롤
  // const observer = useMemo(() => {
  //   return new IntersectionObserver((entries) => {
  //     if (!targetRef?.current) return;

  //     if (entries[0].isIntersecting) {
  //       setLoading(true);

  //       console.log("fetch triggered");

  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     }
  //   });
  // }, []);

  // // 무한스크롤
  // useEffect(() => {
  //   if (!targetRef?.current) return;

  //   observer.observe(targetRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [observer]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAllPostAPI();
      setPostList(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <Base>
      <NavigationRail />
      <section className="contents">
        <div className="contents-top">
          <h1 className="stormit">Stormit.</h1>
          {!isLoggedIn && (
            <>
              <h2 className="stormit-subtitle">
                스톰잇은 ERC-20 기반의 온라인 커뮤니티로, 누구나 자유롭게 이용할
                수 있습니다.
              </h2>
              <h2 className="stormit-subtitle">
                지금 바로 새 글을 작성하고 토큰을 지급받으세요!
              </h2>
              <div className="home-cta-wrapper">
                <Button
                  className="home-cta"
                  variant="contained"
                  onClick={() => navigate("/signup")}
                >
                  시작하기
                </Button>
                <Button
                  className="home-cta-sub"
                  variant="outlined"
                  onClick={() => navigate("/login")}
                >
                  로그인
                </Button>
              </div>
            </>
          )}
        </div>
        <MovetoPost />
        <h2 className="section-title">전체 글 보기</h2>
        <ul className="posts-wrapper">
          {postList.map((post) => (
            <PostCard
              postId={post.post_id}
              commentCount={post.comment_count}
              postTitle={post.post_title}
              postContents={post.post_content}
              community={post.board_name}
              createdAt={post.created_at}
            />
          ))}
          <PostCard
            postId={0}
            commentCount={4}
            postTitle="이건 그냥 글 제목임"
            postContents="이건 그냥 글 내용임"
            community="리그 오브 레전드"
            createdAt="0000년 00월 00일 00:00:00"
          />
        </ul>
        <div className="fab-wrapper">
          <FloatingIconButton onClick={() => navigate("/post")}>
            <CreateIcon />
          </FloatingIconButton>
        </div>
        {/* {loading && (
            <div className="loading-spinner-wrapper">
              <LoadingSpinner />
            </div>
          )} */}
      </section>

      <div className="observer" ref={targetRef} />
    </Base>
  );
};

export default Home;
