import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import ListItem from "./common/ListItem";

const Base = styled.div`
  position: absolute;
  width: 16rem; // 256px
  top: 3.5rem; // 56px // 헤더의 높이만큼 아래로
  left: 0;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 16px 32px rgba(0, 0, 0, 0.2);
  padding-bottom: 1rem;
  z-index: 999;

  .menu-modal-title-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding: 1rem;

    .menu-modal-title {
      font-size: 1.25rem; // 20px
      font-weight: 600;
    }

    .menu-modal-subtitle {
      font-size: 0.75rem; // 12px
      color: ${palette.gray[400]};
    }
  }
`;

const MenuModal: React.FC = () => {
  return (
    <Base>
      <div className="menu-modal-title-wrapper">
        <p className="menu-modal-title">커뮤니티</p>
        <p className="menu-modal-subtitle">다양한 커뮤니티를 찾아보세요</p>
      </div>
      <ListItem>All</ListItem>
      <ListItem>공지사항</ListItem>
      <ListItem>사는얘기</ListItem>
      <ListItem>포럼</ListItem>
      <ListItem>IT 행사</ListItem>
      <ListItem>Q&amp;A</ListItem>
    </Base>
  );
};

export default MenuModal;
