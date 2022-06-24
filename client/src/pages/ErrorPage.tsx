import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Divider from "../components/common/Divider";
import palette from "../styles/palette";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
  height: 100vh;

  .error-page-header {
    font-size: 4rem;
    font-weight: 500;
    color: ${palette.gray[700]};
    margin-top: 4rem;
  }

  .error-page-description {
    margin-bottom: 4rem;
    margin-left: 0.5rem;
  }

  @media screen and (min-width: 77.5rem) {
    width: 52.5rem; // 840px;
    margin: 1rem auto;
  }
`;

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Base>
      <h1 className="error-page-header">404</h1>
      <Divider />
      <p className="error-page-description">페이지를 찾을 수 없습니다.</p>
      <Button variant="contained" onClick={() => navigate("/")}>
        홈으로
      </Button>
    </Base>
  );
};

export default ErrorPage;
