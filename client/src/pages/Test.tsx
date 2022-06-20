import React from "react";
import styled from "styled-components";
import Dialog from "../components/common/Dialog";

const Base = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px

  padding: 1rem; // 16px
`;

const Test: React.FC = () => {
  return (
    <Base>
      <Dialog>asdasdsd</Dialog>
    </Base>
  );
};

export default Test;
