import React from "react";
import styled from "styled-components";
import FloatingIconButton from "../components/common/FloatingIconButton";
import Header from "../components/Header";
import MenuModal from "../components/MenuModal";
import ProfileModal from "../components/ProfileModal";
import { useSelector } from "../store";
import AddIcon from "@mui/icons-material/Add";

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
      <FloatingIconButton>
        <AddIcon />
      </FloatingIconButton>
    </Base>
  );
};

export default Home;
