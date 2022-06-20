import { Divider } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ListItem from "./common/ListItem";

const Base = styled.div`
  position: absolute;
  width: 16rem; // 256px
  top: 3.5rem; // 56px // 헤더의 높이만큼 아래로
  right: 0;
  height: calc(100vh - 3.5rem); // top이 3.5rem이기 때문에
  background-color: white;
  z-index: 999;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 16px 32px rgba(0, 0, 0, 0.2);
`;

const ProfileModal: React.FC = () => {
  return (
    <Base>
      <ListItem>마이페이지</ListItem>
      <Divider />
      <ListItem>개인정보 변경</ListItem>
      <Divider />

      <ListItem>로그아웃</ListItem>
      <Divider />
    </Base>
  );
};

export default ProfileModal;
