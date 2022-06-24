import React from "react";
import styled from "styled-components";
import ErrorIcon from "@mui/icons-material/Error";
import Button from "../components/common/Button";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  margin-top: 8rem;

  .deleted-icon {
    color: ${theme.primary};
    width: 6rem;
    height: 6rem;
  }

  .deleted-text {
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const DeletedPost: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Base>
      <ErrorIcon className="deleted-icon" />
      <p className="deleted-text">삭제된 게시물입니다.</p>
      <Button variant="contained" onClick={() => navigate(-3)}>
        돌아가기
      </Button>
    </Base>
  );
};

export default DeletedPost;
