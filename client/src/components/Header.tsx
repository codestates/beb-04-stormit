import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "../store";
import { modalActions } from "../store/modalSlice";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;
  color: white;
  padding: 1rem; // 16px
  background-color: ${theme.primary};
  height: 3.5rem; // 56px
  box-shadow: 0px 0px 9px 3px rgba(41, 41, 41, 0.25);

  .header-left {
    cursor: pointer;
  }

  .header-right {
    display: flex;
    gap: 1rem; // 16px
    cursor: pointer;
  }

  .header-left-desktop {
    display: none;
    align-items: center;
    gap: 1rem; // 16px

    cursor: pointer;

    .header-logo {
      background-color: white;
      border-radius: 50%;
      width: 2rem; // 32px
      height: 2rem; // 32px
    }

    .header-text {
      font-size: 1.25rem;
    }
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    position: static;

    .header-left {
      display: none;
    }

    .header-left-desktop {
      display: flex;
    }
  }
`;

const Header: React.FC = () => {
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);
  const searchInputModalOpen = useSelector(
    (state) => state.modal.searchInputModalOpen
  );

  const navigate = useNavigate();

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

  const openSearchInputModal = () => {
    dispatch(modalActions.openSearchInputModal());
  };

  return (
    <Base>
      {searchInputModalOpen && <SearchInput />}
      <div className="header-left">
        {menuModalOpen && <CloseIcon onClick={closeMenuModal} />}
        {!menuModalOpen && <MenuIcon onClick={openMenuModal} />}
      </div>
      <div className="header-left-desktop" onClick={() => navigate("/")}>
        <span className="header-text">Stormit</span>
        <div className="header-logo" />
      </div>
      <div className="header-right">
        <SearchIcon onClick={openSearchInputModal} />
        {profileModalOpen && <CloseIcon onClick={closeProfileModal} />}
        {!profileModalOpen && <PermIdentityIcon onClick={openProfileModal} />}
      </div>
    </Base>
  );
};

export default Header;
