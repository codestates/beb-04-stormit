import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import PostCard from "../components/PostCard";
import { getAllPostAPI } from "../lib/api/post";

const Base = styled.div`
  .contents {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin: 1rem;
    border: 1px solid red;
  }

  @media screen and (min-width: 77.5rem) {
    margin: 1rem auto;
    width: 52.5rem;
  }
`;

const Search: React.FC = () => {
  const [filteredPostList, setFilteredPostList] =
    useState<GetAllPostsResponseType>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await getAllPostAPI();

        const postList = response.data;

        setFilteredPostList(postList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <Base>
      <NavigationRail />
      <div className="contents">
        <h1 className="search-title">'노논'으로 검색한 결과입니다.</h1>
        {filteredPostList.map((post) => (
          <PostCard
            postId={post.post_id}
            title={post.post_title}
            contents={post.post_content}
            commentCount={post.comment_count}
            nickname={post.nickname}
            createdAt={post.created_at}
            community={post.board_title}
          />
        ))}
      </div>
    </Base>
  );
};

export default Search;
