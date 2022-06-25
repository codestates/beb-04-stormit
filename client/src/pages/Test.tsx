import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Tooltip from "../components/common/Tooltip";

const Base = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px
  padding: 1rem; // 16px

  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem; // 16px
  }
`;

const Test: React.FC = () => {
  return (
    <Base>
      <Tooltip text="커뮤니티">
        <Button>버튼</Button>
      </Tooltip>
    </Base>
  );
};

export default Test;
