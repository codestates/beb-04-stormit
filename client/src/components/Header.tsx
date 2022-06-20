import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "../store";
import { modalActions } from "../store/modalSlice";

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  padding: 1rem; // 16px
  background-color: ${theme.primary};
  height: 3.5rem; // 56px

  .header-left {
    cursor: pointer;
  }

  .header-right {
    display: flex;
    gap: 1rem; // 16px
    cursor: pointer;
  }
`;

const Header: React.FC = () => {
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);

  const dispatch = useDispatch();

  const openMenuModal = () => {
    dispatch(modalActions.openMenuModal());
  };

  const closeMenuModal = () => {
    dispatch(modalActions.closeMenuModal());
  };

  const openProfileModal = () => {
    dispatch(modalActions.openProfileModal());
  };

  const closeProfileModal = () => {
    dispatch(modalActions.closeProfileModal());
  };

  return (
    <Base>
      <div className="header-left">
        {menuModalOpen && <CloseIcon onClick={closeMenuModal} />}
        {!menuModalOpen && <MenuIcon onClick={openMenuModal} />}
      </div>
      <div className="header-right">
        <SearchIcon />
        {profileModalOpen && <CloseIcon onClick={closeProfileModal} />}
        {!profileModalOpen && <PermIdentityIcon onClick={openProfileModal} />}
      </div>
    </Base>
  );
};

export default Header;
