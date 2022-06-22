import React, { useState } from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import { useLocation } from "react-router-dom";
import {
  FAKE_ARRAY,
  getLastPathname,
  translateCommunityName,
} from "../lib/utils";
import Pagination from "../components/Pagination";
import Button from "../components/common/Button";
import CommunityPostCard from "../components/CommunityPostCard";

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
  const [postData, setPostData] = useState(FAKE_ARRAY);

  const location = useLocation();

  const communityName = getLastPathname(location.pathname);

  return (
    <Base>
      <NavigationRail />
      <div className="contents">
        <div className="contents-top">
          <div className="community-title-area">
            <p className="community-title">
              {translateCommunityName(communityName)}
            </p>
            <Button variant="contained">글쓰기</Button>
          </div>
        </div>
        <ul className="posts-wrapper">
          {postData.map((_, index) => (
            <CommunityPostCard key={index} />
          ))}
        </ul>
        <div className="pagination-wrapper">
          <Pagination />
        </div>
      </div>
    </Base>
  );
};

export default Community;
