import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import IconButton from "../components/common/IconButton";
import NavigationRail from "../components/NavigationRail";
import PostCard from "../components/PostCard";
import { getAllPostAPI } from "../lib/api/post";
import palette from "../styles/palette";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Skeleton from "../components/common/Skeleton";
import ErrorIcon from "@mui/icons-material/Error";
import { translateCommunityName } from "../lib/utils";

const Base = styled.div`
  .contents {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin: 1rem;
  }

  .search-title {
    font-weight: 500;
  }

  .search-keyword {
    color: ${palette.blue[500]};
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

  .no-result-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
  }

  .no-result-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
  }

  .no-result-error-icon {
    width: 6rem;
    height: 6rem;
    color: ${palette.blue[500]};
  }

  .no-result-text {
    font-size: 1.5rem;
  }

  .no-result-description {
    color: ${palette.gray[400]};
  }

  .no-result-description-wrapper {
    margin-left: 2rem;
  }

  @media screen and (min-width: 77.5rem) {
    margin: 1rem auto;
    width: 52.5rem;
  }
`;

const Search: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [filteredPostList, setFilteredPostList] =
    useState<GetAllPostsResponseType>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  console.log(keyword);

  const onClickMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        if (!keyword) return;

        const response = await getAllPostAPI();

        const postList = response.data;

        const filteredPostList = postList.filter((post) => {
          if (
            post.nickname?.includes(keyword) ||
            post.post_title?.includes(keyword)
          ) {
            return true;
          } else {
            return false;
          }
        });

        setFilteredPostList(filteredPostList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilteredPosts();
  }, [keyword]);

  return (
    <Base>
      <NavigationRail />
      <div className="contents">
        <h1 className="search-title">
          "<span className="search-keyword">{keyword}</span>" 키워드로 검색한
          결과입니다.
        </h1>
        {filteredPostList.map((post) => (
          <PostCard
            postId={post.post_id}
            title={post.post_title}
            contents={post.post_content}
            commentCount={post.comment_count}
            nickname={post.nickname}
            createdAt={post.created_at}
            community={translateCommunityName(post.board_title)}
            views={post.views}
            likes={post.likes}
          />
        ))}
      </div>
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="skeleton-wrapper">
              <Skeleton width="40%" variant="text" />
              <Skeleton width="100%" height="4rem" />
            </div>
          ))}
      {filteredPostList.length > 0 && !loading && (
        <div className="more-button-wrapper" onClick={onClickMorePosts}>
          <IconButton>
            <KeyboardDoubleArrowDownIcon />
          </IconButton>
        </div>
      )}
      {filteredPostList.length === 0 && (
        <div className="no-result-wrapper">
          <div className="no-result-icon-wrapper">
            <ErrorIcon className="no-result-error-icon" />
            <p className="no-result-text">검색 결과가 없습니다.</p>
          </div>
          <div className="no-result-description-wrapper">
            <p className="no-result-description">
              · 단어의 철자가 정확한지 확인해보세요.
            </p>
            <p className="no-result-description">
              · 검색어의 단어 수를 줄이거나 다른 검색어로 검색해 보세요.
            </p>
            <p className="no-result-description">
              · 보다 일반적인 검색어로 다시 검색해 보세요.
            </p>
          </div>
        </div>
      )}
    </Base>
  );
};

export default Search;
