import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Snackbar from "../components/common/Snackbar";
import PostOptionCard from "../components/PostOptionCard";
import DoneIcon from "@mui/icons-material/Done";
import Pagination from "../components/Pagination";
import Select from "../components/common/Select";

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
      <Pagination />
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
      <Select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>
    </Base>
  );
};

export default Test;
