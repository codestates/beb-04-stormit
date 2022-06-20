import React from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import palette from "../styles/palette";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .navigation-rail {
    display: none;
  }

  .profile-legend {
    position: relative;
    background-color: ${palette.gray[100]};
    height: 12.5rem; // 200px
    margin-bottom: 2rem; // 32px
  }

  .body {
    display: flex;
  }

  .contents-area {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .profile-image {
    position: absolute;
    top: 10rem;
    left: 2rem;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background-color: ${palette.gray[300]};
  }

  .contents {
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem; // 16px
  }

  .profile-username {
    font-size: 2rem;
    font-weight: 500;
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

    .profile-image {
      top: 8rem;
      left: 8rem;
      width: 10rem;
      height: 10rem;
    }
  }
`;

const Mypage: React.FC = () => {
  return (
    <Base>
      <div className="body">
        <NavigationRail className="navigation-rail" />
        <div className="contents-area">
          <div className="profile-legend" />
          <div className="profile-image" />
          <section className="contents">
            <p className="profile-username">스톰잇닉네임</p>
          </section>
        </div>
      </div>
    </Base>
  );
};

export default Mypage;
