import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "../store";
import { modalActions } from "../store/modalSlice";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Tooltip from "./common/Tooltip";

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1rem; // 16px
  background-color: ${theme.primary};
  height: 3.5rem; // 56px
  box-shadow: 0px 0px 9px 3px rgba(41, 41, 41, 0.25);

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem; // 16px
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

    .header-text {
      font-size: 1.25rem;
      cursor: pointer;
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
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

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
        <Link to="/">
          <span className="header-text">Stormit</span>
        </Link>
      </div>
      <div className="header-left-desktop">
        <Link to="/">
          <span className="header-text">Stormit</span>
        </Link>
        <NavigationBar />
      </div>
      <div className="header-right">
        <Tooltip text="??????" position="bottom">
          <SearchIcon onClick={openSearchInputModal} />
        </Tooltip>
        {profileModalOpen && <CloseIcon onClick={closeProfileModal} />}
        {!profileModalOpen && isLoggedIn && (
          <Tooltip text="?????????" position="bottom">
            <PermIdentityIcon onClick={openProfileModal} />
          </Tooltip>
        )}
        {!profileModalOpen && !isLoggedIn && (
          <Tooltip text="?????????" position="bottom">
            <LoginIcon onClick={openProfileModal} />
          </Tooltip>
        )}
      </div>
    </Base>
  );
};

export default Header;
