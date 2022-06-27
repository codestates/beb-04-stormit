import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { staticCommunityList } from "../lib/staticData";
import { translateCommunityName } from "../lib/utils";
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
    cursor: pointer;

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

  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeMenuModal = () => {
    dispatch(modalActions.closeMenuModal());
  };

  useOutsideClick(modalRef, closeMenuModal);

  return (
    <Base ref={modalRef} onClick={closeMenuModal}>
      <Link to="/communities">
        <div className="menu-modal-title-wrapper">
          <p className="menu-modal-title">커뮤니티</p>
          <p className="menu-modal-subtitle">다양한 커뮤니티를 찾아보세요</p>
        </div>
      </Link>
      {staticCommunityList.map((community, index) => (
        <Link key={index} to={`/community/${community}`}>
          <ListItem>{translateCommunityName(community)}</ListItem>
        </Link>
      ))}
    </Base>
  );
};

export default MenuModal;
