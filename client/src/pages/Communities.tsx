import React from "react";
import styled from "styled-components";
import Divider from "../components/common/Divider";
import CommunityCard from "../components/CommunityCard";
import NavigationRail from "../components/NavigationRail";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .contents {
    margin: 1rem;
  }

  .communities-title {
    font-size: 2rem;
    font-weight: 500;
    margin: 1rem 0;
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    .contents {
      margin: 1rem auto;
      max-width: 37.5rem; // 600px
    }
  }

  @media screen and (min-width: 77.5rem) {
    .contents {
      width: 52.5rem; // 840px
    }
  }
`;

const Communities: React.FC = () => {
  return (
    <Base>
      <NavigationRail />
      <section className="contents">
        <h1 className="communities-title">전체 커뮤니티</h1>
        <CommunityCard
          title="블록체인"
          description="커뮤니티에 대한 설명을 적어주세요."
          image="/profile-image.png"
        />
        <Divider />
        <CommunityCard
          title="웹개발"
          description="커뮤니티에 대한 설명을 적어주세요."
          image="/profile-image.png"
        />
        <Divider />
        <CommunityCard
          title="BEB"
          description="커뮤니티에 대한 설명을 적어주세요"
          image="/profile-image.png"
        />
        <Divider />
        <CommunityCard
          title="비트코인"
          description="커뮤니티에 대한 설명을 적어주세요."
          image="/profile-image.png"
        />
        <CommunityCard
          title="Q&amp;A"
          description="커뮤니티에 대한 설명을 적어주세요."
          image="/profile-image.png"
        />
      </section>
    </Base>
  );
};

export default Communities;
