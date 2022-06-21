import React, { useState } from "react";
import styled from "styled-components";
import FloatingIconButton from "../components/common/FloatingIconButton";
import NavigationRail from "../components/NavigationRail";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate, useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import {
  FAKE_ARRAY,
  getLastPathname,
  translateCommunityName,
} from "../lib/utils";
import Pagination from "../components/Pagination";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .body {
    display: flex;
  }

  .contents-top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; // 8px
    padding: 2rem 0.5rem 0.5rem; // 32px 8px 8px;
  }

  .fab-wrapper {
    position: fixed;
    right: 1rem; // 16px
    bottom: 1rem; // 16px
  }

  .community-title {
    font-size: 2rem; // 32px
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    padding: 1rem; //16px
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

    .fab-wrapper {
      display: none;
    }
  }
`;

const Community: React.FC = () => {
  const [postData, setPostData] = useState(FAKE_ARRAY);

  const navigate = useNavigate();

  const location = useLocation();

  const communityName = getLastPathname(location.pathname);

  return (
    <Base>
      <div className="body">
        <NavigationRail />
        <div className="contents">
          <div className="contents-top">
            <p className="community-title">
              {translateCommunityName(communityName)}
            </p>
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
          <div className="pagination-wrapper">
            <Pagination />
          </div>
          <div className="fab-wrapper">
            <FloatingIconButton onClick={() => navigate("/post")}>
              <CreateIcon />
            </FloatingIconButton>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Community;
