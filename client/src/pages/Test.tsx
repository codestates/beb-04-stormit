import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Dialog from "../components/common/Dialog";
import Input from "../components/common/Input";
import Snackbar from "../components/common/Snackbar";
import PostOptionCard from "../components/PostOptionCard";
import DoneIcon from "@mui/icons-material/Done";
import CommentCard from "../components/CommentCard";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

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
      <Button onClick={openSnackbar}>스낵바</Button>
      <Snackbar
        icon={<DoneIcon />}
        open={snackbarOpen}
        onClose={closeSnackbar}
        autoHideDuration={3000}
      >
        로그인되었습니다.
      </Snackbar>
      <CommentCard />
    </Base>
  );
};

export default Test;
