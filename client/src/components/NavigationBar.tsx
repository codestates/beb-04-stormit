import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Base = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;

  .navigation-bar-items-wrapper {
    display: flex;
    gap: 1.5rem;
    font-size: 0.875rem;
    cursor: pointer;
  }
`;

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Base>
      <ul className="navigation-bar-items-wrapper">
        <li onClick={() => navigate("/community")}>커뮤니티</li>
        <li onClick={() => navigate("/mypage")}>마이페이지</li>
        <li onClick={() => navigate("/account")}>개인정보</li>
      </ul>
    </Base>
  );
};

export default NavigationBar;
