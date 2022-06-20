import React from "react";
import styled from "styled-components";
import Input from "../components/common/Input";
import Header from "../components/Header";
import MenuModal from "../components/MenuModal";
import ProfileModal from "../components/ProfileModal";
import { useSelector } from "../store";

const Base = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Home: React.FC = () => {
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);

  return (
    <Base>
      <Header />
      {menuModalOpen && <MenuModal />}
      {profileModalOpen && <ProfileModal />}
      <Input />
    </Base>
  );
};

export default Home;
