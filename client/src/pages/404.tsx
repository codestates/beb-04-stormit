import React from "react";
import { Link } from "react-router-dom";
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

  .error-page-text {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
  }

  .error-page-description {
    color: ${palette.gray[500]};
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 77.5rem) {
    width: 52.5rem; // 840px;
    margin: 1rem auto;
  }
`;

const ErrorPage: React.FC = () => {
  return (
    <Base>
      <h1 className="error-page-header">4O4</h1>
      <Divider />
      <p className="error-page-text">페이지를 찾을 수 없습니다.</p>
      <p className="error-page-description">
        지금 입력하신 주소의 페이지는 사라졌거나 다른 페이지로 변경되었습니다.
        주소를 다시 확인해주세요.
      </p>
      <Link to="/">
        <Button variant="contained">홈으로</Button>
      </Link>
    </Base>
  );
};

export default ErrorPage;
