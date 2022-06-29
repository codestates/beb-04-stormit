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
    font-size: 2rem;
    font-weight: 500;
    color: ${palette.gray[400]};
  }

  @media screen and (min-width: 77.5rem) {
    width: 57.5rem;
    margin: 1rem auto;
  }
`;

const About: React.FC = () => {
  return (
    <Base>
      <h1 className="about-heading">Stormit.</h1>
      <p className="about-description">스톰잇은 ERC-20 기반의</p>
    </Base>
  );
};

export default About;
