import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import FloatingIconButton from "../components/common/FloatingIconButton";
import CreateIcon from "@mui/icons-material/Create";
import PostCard from "../components/PostCard";
import NavigationRail from "../components/NavigationRail";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const FAKE_ARRAY = Array(10).fill(0);

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  /* 
  .contents-top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; // 8px
    padding: 0.5rem; // 16px
  } */

  .body {
    display: flex;
  }

  .section-title {
    font-size: 2rem; // 32px
    text-align: center;
    font-weight: 500;
  }

  .fab-wrapper {
    position: fixed;
    right: 1rem; // 16px
    bottom: 1rem; // 16px
  }

  .navigation-rail {
    display: none;
  }

  .loading-spinner-wrapper {
    display: flex;
    justify-content: center;
    padding: 2rem;
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

    .navigation-rail {
      display: flex;
    }

    .fab-wrapper {
      display: none;
    }
  }
`;

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(FAKE_ARRAY);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  // 무한스크롤
  const observer = useMemo(() => {
    return new IntersectionObserver((entries) => {
      if (!targetRef?.current) return;

      if (entries[0].isIntersecting) {
        setLoading(true);

        console.log("fetch triggered");

        setTimeout(() => {
          const FAKE_FETCH_ARRAY = Array(10).fill(0);

          setPostData((postData) => [...postData, ...FAKE_FETCH_ARRAY]);
          setLoading(false);
        }, 1000);
      }
    });
  }, []);

  // 무한스크롤
  useEffect(() => {
    if (!targetRef?.current) return;

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [observer]);

  return (
    <Base>
      <div className="body">
        <NavigationRail className="navigation-rail" />
        <section className="contents">
          <div className="contents-top">
            {/* <h1 className="section-title">모든 게시글</h1> */}
            {/* <p className="posts-sort">
            <span className="newest">최신순</span>
            <span className="popular">인기순</span>
          </p> */}
          </div>
          <ul className="posts-wrapper">
            {postData.map((_, index) => (
              <PostCard key={index} />
            ))}
          </ul>
          <div className="fab-wrapper">
            <FloatingIconButton onClick={() => navigate("/post")}>
              <CreateIcon />
            </FloatingIconButton>
          </div>
          {loading && (
            <div className="loading-spinner-wrapper">
              <LoadingSpinner />
            </div>
          )}
        </section>
      </div>
      <div className="observer" ref={targetRef} />
    </Base>
  );
};

export default Home;
