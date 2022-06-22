import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "../store";
import { modalActions } from "../store/modalSlice";
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
      font-weight: 500;
    }

    .menu-modal-subtitle {
      font-size: 0.75rem; // 12px
      color: ${palette.gray[400]};
    }
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    left: 4.5rem;
  }
`;

const MenuModal: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // 페이지 이동 후 모달을 닫습니다
  const moveTo = (url: string) => {
    navigate(url);
    dispatch(modalActions.closeAllModal());
  };

  return (
    <Base>
      <div className="menu-modal-title-wrapper">
        <p className="menu-modal-title">커뮤니티</p>
        <p className="menu-modal-subtitle">다양한 커뮤니티를 찾아보세요</p>
      </div>
      <ListItem onClick={() => moveTo("/community/notice")}>공지사항</ListItem>
      <ListItem onClick={() => moveTo("/community/talk")}>사는얘기</ListItem>
      <ListItem onClick={() => moveTo("/community/forum")}>포럼</ListItem>
      <ListItem onClick={() => moveTo("/community/it")}>IT 행사</ListItem>
      <ListItem onClick={() => moveTo("/community/qa")}>Q&amp;A</ListItem>
    </Base>
  );
};

export default MenuModal;
