import { Divider } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useDispatch } from "../store";
import { modalActions } from "../store/modalSlice";
import Backdrop from "./common/Backdrop";

const Base = styled.div`
  position: absolute;
  width: 16rem; // 256px
  top: 3.5rem; // 56px // 헤더의 높이만큼 아래로
  left: 0;
  height: calc(100vh - 3.5rem); // top이 3.5rem이기 때문에
  background-color: white;
  z-index: 999;
`;

const MenuModal: React.FC = () => {
  const dispatch = useDispatch();

  const closeMenuModal = () => {
    dispatch(modalActions.closeMenuModal());
  };

  return (
    <>
      <Backdrop onClick={closeMenuModal} />

      <Base>
        <p>aaa</p>
        <Divider />
        <p>aaa</p>
        <Divider />
        <p>ccc</p>
      </Base>
    </>
  );
};

export default MenuModal;
