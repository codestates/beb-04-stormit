import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FloatingIconButton from "../components/common/FloatingIconButton";
import CreateIcon from "@mui/icons-material/Create";
import PostCard from "../components/PostCard";
import NavigationRail from "../components/NavigationRail";
import { Link } from "react-router-dom";
import theme from "../styles/theme";
import palette from "../styles/palette";
import { useSelector } from "../store";
import MovetoPost from "../components/MovetoPost";
import { getAllPostAPI } from "../lib/api/post";
import PersonIcon from "@mui/icons-material/Person";
import { shortenPostContents, translateCommunityName } from "../lib/utils";
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

  .board-list-wrapper {
    display: flex;
    margin: 0 1rem;
    margin-bottom: 2rem;
    gap: 0.5rem;
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

  .skeleton-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
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
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onClickMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getAllPostAPI();
        setPostList(response.data);

        console.log("@@@ fetch post response @@@");
        console.log(response);
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
        {isLoggedIn && <MovetoPost />}
        <div className="contents-top">
          <h1 className="stormit">Stormit.</h1>
        </div>
        <h2 className="section-title">전체 글 보기</h2>
        <ul className="posts-wrapper">
          {postList &&
            postList.map((post, index) => (
              <PostCard
                key={index}
                postId={post.post_id}
                title={post.post_title}
                commentCount={post.comment_count}
                community={translateCommunityName(post.board_title)}
                createdAt={post.created_at}
                contents={shortenPostContents(post.post_content) || ""}
                nickname="노논"
              />
            ))}
          {!postList && <p>글이 없습니다.</p>}
        </ul>
        {loading &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="skeleton-wrapper">
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
