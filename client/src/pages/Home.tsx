import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FloatingIconButton from "../components/common/FloatingIconButton";
import CreateIcon from "@mui/icons-material/Create";
import PostCard from "../components/PostCard";
import NavigationRail from "../components/NavigationRail";
import { Link } from "react-router-dom";
import theme from "../styles/theme";
import palette from "../styles/palette";
import Button from "../components/common/Button";
import { useSelector } from "../store";
import MovetoPost from "../components/MovetoPost";
import { getAllPostAPI } from "../lib/api/post";
import PersonIcon from "@mui/icons-material/Person";
import { FAKE_ARRAY, parseDate, shortenPostContents } from "../lib/utils";
import IconButton from "../components/common/IconButton";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Skeleton from "../components/common/Skeleton";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .contents-top {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem; // 8px
    margin: 1rem;
  }

  .contents {
  }

  .stormit {
    font-size: 4rem;
    font-weight: 500;
    color: ${theme.primary};
    padding-bottom: 1rem;
    padding-top: 2rem;
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
    padding: 1rem; // 16px
  }

  .fab-wrapper {
    position: fixed;
    right: 1rem; // 16px
    bottom: 1rem; // 16px
  }
  .loading-skeleton-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .more-button-wrapper {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }

  .observer {
    border-bottom: 1px solid transparent;
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    .contents {
      margin: 1rem auto; // 16px
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
  const [postList, setPostList] = useState<GetAllPostsResponseType>([]);
  const [fakePostList, setFakePostList] = useState(FAKE_ARRAY);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onClickMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setFakePostList((fakePostList) => [...fakePostList, ...FAKE_ARRAY]);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getAllPostAPI();
        setPostList(response.data);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Base>
      <NavigationRail />
      <section className="contents">
        <div className="contents-top">
          {!isLoggedIn && (
            <>
              <h1 className="stormit">Stormit.</h1>
              <h2 className="stormit-subtitle">
                스톰잇은 ERC-20 기반의 온라인 커뮤니티로, 누구나 자유롭게 이용할
                수 있습니다.
              </h2>
              <h2 className="stormit-subtitle">
                지금 바로 새 글을 작성하고 토큰을 지급받으세요!
              </h2>
              <div className="home-cta-wrapper">
                <Link to="/agreement">
                  <Button className="home-cta" variant="contained">
                    시작하기
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="home-cta-sub" variant="outlined">
                    로그인
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
        {isLoggedIn && <MovetoPost />}
        <h2 className="section-title">전체 글 보기</h2>
        <ul className="posts-wrapper">
          {/* {postList.map((post) => (
            <PostCard
              key={post.post_id}
              postId={post.post_id}
              title={post.post_title}
              commentCount={post.comment_count}
              community={post.board_title}
              createdAt={post.created_at}
              contents={shortenPostContents(post.post_content)}
              nickname="노논"
            />
          ))} */}
          {fakePostList.map((_, index) => (
            <PostCard
              key={index}
              postId={0}
              commentCount={index}
              title="이건 그냥 글 제목임"
              community="리그 오브 레전드"
              createdAt={parseDate(new Date())}
              contents="이건 그냥 글 내용임 이건 그냥 글 내용임 이건 그냥 글 내용임 이건 그냥 글 내용임 이건 그냥 글 내용임 이건 그냥 글 내용임 이건 그냥 글 내용임 이건 그냥 글 내용임..."
              nickname="노논"
            />
          ))}
        </ul>
        {loading &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="loading-skeleton-wrapper">
                <Skeleton width="40%" variant="text" />
                <Skeleton width="100%" height="4rem" />
              </div>
            ))}
        {!loading && (
          <div className="more-button-wrapper" onClick={onClickMorePosts}>
            <IconButton>
              <KeyboardDoubleArrowDownIcon />
            </IconButton>
          </div>
        )}
        <div className="fab-wrapper">
          {isLoggedIn && (
            <Link to="/post">
              <FloatingIconButton>
                <CreateIcon />
              </FloatingIconButton>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/login">
              <FloatingIconButton>
                <PersonIcon />
              </FloatingIconButton>
            </Link>
          )}
        </div>
      </section>
    </Base>
  );
};

export default Home;
