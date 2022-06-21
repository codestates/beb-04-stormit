import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Dialog from "../components/common/Dialog";
import Input from "../components/common/Input";
import PostOptionCard from "../components/PostOptionCard";

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
      <Dialog className="modal">
        <label>변경할 비밀번호</label>
        <Input />
        <label>비밀번호 확인</label>
        <Input />
        <Button variant="contained">변경하기</Button>
      </Dialog>
      <PostOptionCard />
    </Base>
  );
};

export default Test;
