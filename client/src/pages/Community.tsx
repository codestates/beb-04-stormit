import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import { Link, useLocation } from "react-router-dom";
import {
  FAKE_ARRAY,
  getLastPathname,
  parseDate,
  translateCommunityName,
} from "../lib/utils";
import Pagination from "../components/Pagination";
import Button from "../components/common/Button";
import CommunityPostCard from "../components/CommunityPostCard";
import { getPostsByBoardAPI } from "../lib/api/post";
import Input from "../components/common/Input";
import IconButton from "../components/common/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "../store";
import { communityActions } from "../store/communitySlice";
import Divider from "../components/common/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import palette from "../styles/palette";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .contents {
    margin: 1rem 0;
  }

  .contents-top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; // 8px
    margin: 1rem; // 16px
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
    padding: 1rem; // 16px
  }

  .community-breadcrumb {
    display: flex;
    align-items: center;
    color: ${palette.gray[400]};
  }

  .community-breadcrumb-current {
    color: ${palette.gray[700]};
  }

  .community-search-input-wrapper {
    display: flex;
    justify-content: center;
    gap: 0.5rem; // 8px
    margin-bottom: 2rem; // 32px
  }

  .community-search-input {
    width: 16rem; // 256px
    margin-left: 3rem; // 32px
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
  const [postList, setPostList] = useState<GetPostsByBoardResponseType>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPostList, setCurrentPostList] = useState(postList.slice(0, 10));

  const dispatch = useDispatch();

  const location = useLocation();

  const communityName = getLastPathname(location.pathname);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const body = { board_title: communityName };
        const response = await getPostsByBoardAPI(body);
        setPostList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [communityName]);

  // useEffect(() => {
  //   const simulateFetchPosts = () => {
  //     setPostList(FAKE_ARRAY);
  //     setCurrentPostList(
  //       postList.slice(currentPage * 10 - 10, currentPage * 10)
  //     );
  //   };

  //   simulateFetchPosts();
  // }, [currentPage, postList]);

  useEffect(() => {
    dispatch(communityActions.setCurrentCommunity(communityName));
  }, [communityName, dispatch]);

  return (
    <Base>
      <NavigationRail />
      <div className="contents">
        <div className="contents-top">
          <div className="community-breadcrumb">
            <Link to="/">
              <span>홈</span>
            </Link>
            <ChevronRightIcon />
            <Link to="/communities">
              <span>커뮤니티</span>
            </Link>
            <ChevronRightIcon />
            <span className="community-breadcrumb-current">
              {translateCommunityName(communityName)}
            </span>
          </div>
          <div className="community-title-area">
            <Link to={`/community/${communityName}`}>
              <p className="community-title">
                {translateCommunityName(communityName)}
              </p>
            </Link>
            <Link to="/post">
              <Button variant="contained">글쓰기</Button>
            </Link>
          </div>
        </div>
        <Divider />
        <ul className="posts-wrapper">
          {postList.map((post, index) => (
            <CommunityPostCard
              key={index}
              postId={post.post_id}
              title={post.post_title}
              commentCount={post.comment_count}
              nickname={post.nickname}
              createdAt={post.created_at}
            />
          ))}
          {postList
            .filter((post) => post.comment_count > 10)
            .slice(0, 3)
            .map((post, index) => (
              <CommunityPostCard
                key={index}
                postId={post.post_id}
                title={post.post_title}
                commentCount={post.comment_count}
                nickname={post.nickname}
                createdAt={post.created_at}
                isPopular
              />
            ))}
          {/* {currentPostList.map((post: number, index: number) => (
            <CommunityPostCard
              key={index}
              postId={1}
              title="랜덤 게시물"
              commentCount={post}
              nickname="닉네임"
              createdAt={parseDate(new Date())}
            />
          ))} */}
        </ul>
        <div className="pagination-wrapper">
          <Pagination
            totalPosts={postList.length || 100}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="community-search-input-wrapper">
          <Input className="community-search-input" />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </Base>
  );
};

export default Community;
