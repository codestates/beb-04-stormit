import React from "react";
import styled from "styled-components";
import Chip from "../components/common/Chip";

const Base = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px

  padding: 1rem; // 16px
`;

const Test: React.FC = () => {
  return (
    <Base>
      <Chip size="small">Tag</Chip>
      <Chip size="small">Very Very Long Tag</Chip>

      <Chip size="medium">Tag</Chip>
      <Chip size="large">Tag</Chip>
      <Chip size="large">Very Long Tag</Chip>

      <Chip size="large">Tag</Chip>
    </Base>
  );
};

export default Test;
