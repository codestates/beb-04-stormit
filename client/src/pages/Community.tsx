import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getLastPathname,
  parseDate,
  translateCommunityName,
} from "../lib/utils";
import Pagination from "../components/Pagination";
import Button from "../components/common/Button";
import CommunityPostCard from "../components/CommunityPostCard";
import { getAllPostAPI } from "../lib/api/post";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .contents {
    margin: 1rem;
  }

  .contents-top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; // 8px
    margin: 1rem 0; // 16px
  }

  .community-title-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .community-title {
    font-size: 1.5rem; // 32px
    font-weight: 500;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    padding: 1rem; //16px
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    .contents {
      margin: 1rem auto;
      width: 37.5rem; // 600px
    }
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    .contents {
      width: 52.5rem; // 840px
    }
  }
`;

const Community: React.FC = () => {
  const [postList, setPostList] = useState<GetAllPostsResponseType>([]);

  const location = useLocation();

  const navigate = useNavigate();

  const communityName = getLastPathname(location.pathname);

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
      <div className="contents">
        <div className="contents-top">
          <div className="community-title-area">
            <p className="community-title">
              {translateCommunityName(communityName)}
            </p>
            <Button variant="contained" onClick={() => navigate("/post")}>
              글쓰기
            </Button>
          </div>
        </div>
        <ul className="posts-wrapper">
          {postList.map((post) => (
            <CommunityPostCard
              postId={post.post_id}
              title={post.post_title}
              commentCount={post.comment_count}
              nickname={post.nickname}
              createdAt={post.created_at}
            />
          ))}
          <CommunityPostCard
            postId={1}
            title="랜덤 게시물"
            commentCount={3}
            nickname="닉네임"
            createdAt={parseDate(new Date())}
          />
          <CommunityPostCard
            postId={1}
            title="랜덤 게시물"
            commentCount={3}
            nickname="닉네임"
            createdAt={parseDate(new Date())}
          />
          <CommunityPostCard
            postId={1}
            title="랜덤 게시물"
            commentCount={3}
            nickname="닉네임"
            createdAt={parseDate(new Date())}
          />
          <CommunityPostCard
            postId={1}
            title="랜덤 게시물"
            commentCount={3}
            nickname="닉네임"
            createdAt={parseDate(new Date())}
          />
        </ul>
        <div className="pagination-wrapper">
          <Pagination />
        </div>
      </div>
    </Base>
  );
};

export default Community;
