import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;

  .about-heading {
    font-size: 4rem;
    color: ${palette.blue[500]};
  }

  .about-description {
    font-size: 1.5rem; // 24px
    font-weight: 500;
    color: ${palette.gray[400]};
  }

  @media screen and (min-width: 77.5rem) {
    width: 57.5rem;
    margin: 1rem auto;
  }
`;

// react-reveal 버전이 현재 react 버전과 맞지 않아서 install 안됨
// https://elvanov.com/2195 참고
// 일단 보류 ㅠ.ㅜ

const About: React.FC = () => {
  return (
    <Base>
      <h1 className="about-heading">Stormit.</h1>
      <p className="about-description">
        스톰잇은 ERC-20 기반의 온라인 커뮤니티입니다.
      </p>
    </Base>
  );
};

export default About;
