import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLastPathname, translateCommunityName } from "../lib/utils";
import Pagination from "../components/Pagination";
import Button from "../components/common/Button";
import CommunityPostCard from "../components/CommunityPostCard";
import { getPostsByBoardAPI } from "../lib/api/post";
import Input from "../components/common/Input";
import IconButton from "../components/common/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "../store";
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
  const [popularPostList, setPopularPostList] =
    useState<GetPostsByBoardResponseType>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  console.log(currentPage);

  const currentPostList = postList.slice(
    currentPage * 10 - 10,
    currentPage * 10
  );

  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const communityName = getLastPathname(location.pathname);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const searchParams = new URLSearchParams(location.search);

  const pageQueryString = searchParams.get("page");

  const keywordQueryString = searchParams.get("keyword");

  console.log(keywordQueryString);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`${location.pathname}?keyword=${searchInput}`);
    }
  };

  const onClickPostButton = () => {
    if (!isLoggedIn) navigate("/login");
    if (isLoggedIn) navigate("/post");
  };

  const onClickSearchButton = () => {
    if (!searchInput) return;
    navigate(`${location.pathname}?keyword=${searchInput}`);
  };

  // 게시물 가져오기
  useEffect(() => {
    console.log("@@@ useEffect @@@");
    const fetchPosts = async () => {
      try {
        const body = { board_title: communityName };
        console.log(body);
        const response = await getPostsByBoardAPI(body);

        // reverse(): 최신순으로 배열 뒤집기
        const postData = response.data.reverse();

        setPostList(postData);
        setPopularPostList(
          postData.filter((post) => post.likes >= 5).slice(0, 3)
        );

        console.log(postData.filter((post) => post.likes >= 5).slice(0, 3));

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [communityName]);

  // 현재 커뮤니티 지정
  useEffect(() => {
    dispatch(communityActions.setCurrentCommunity(communityName));
  }, [communityName, dispatch]);

  // 쿼리스트링에서 현재 페이지 번호 가져오기
  useEffect(() => {
    if (!pageQueryString) {
      setCurrentPage(1);
    } else {
      setCurrentPage(Number(pageQueryString));
    }
  }, [pageQueryString]);

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
            <Button variant="contained" onClick={onClickPostButton}>
              글쓰기
            </Button>
          </div>
        </div>
        <Divider />
        <ul className="posts-wrapper">
          {popularPostList.map((post, index) => (
            <CommunityPostCard
              key={index}
              postId={post.post_id}
              title={post.post_title}
              commentCount={post.comment_count}
              nickname={post.nickname}
              createdAt={post.created_at}
              views={post.views}
              likes={post.likes}
              isPopular
            />
          ))}
          {currentPostList.map((post, index) => (
            <CommunityPostCard
              key={index}
              postId={post.post_id}
              title={post.post_title}
              commentCount={post.comment_count}
              nickname={post.nickname}
              createdAt={post.created_at}
              views={post.views}
              likes={post.likes}
            />
          ))}
        </ul>
        <div className="pagination-wrapper">
          <Pagination
            totalPosts={postList.length || 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="community-search-input-wrapper">
          <Input
            className="community-search-input"
            onKeyDown={onEnter}
            value={searchInput}
            onChange={onChangeSearchInput}
          />
          <IconButton onClick={onClickSearchButton}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </Base>
  );
};

export default Community;
