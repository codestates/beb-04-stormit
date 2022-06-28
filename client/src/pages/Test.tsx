import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Snackbar from "../components/common/Snackbar";

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
  const [open, setOpen] = useState(false);

  return (
    <Base>
      <Snackbar open={open} onClose={() => setOpen(false)}>
        스낵바입니다.
      </Snackbar>
      <Button onClick={() => setOpen(true)}>버튼</Button>
    </Base>
  );
};

export default Test;
