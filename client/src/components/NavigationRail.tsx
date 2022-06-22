import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import FloatingIconButton from "./common/FloatingIconButton";
import CreateIcon from "@mui/icons-material/Create";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../store";
import { modalActions } from "../store/modalSlice";

const Base = styled.aside`
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  position: absolute;
  top: 3.5rem;
  left: 0;
  width: 4.5rem; // 72px
  height: calc(100vh - 3.5rem);
  padding: 1rem; // 16px
  border-right: 1px solid ${palette.gray[200]};

  .navigation-logo-wrapper {
    display: flex;
    align-items: center;

    transform: translateX(-0.75rem);
    cursor: pointer;
  }

  .navigation-logo {
    background-color: ${palette.gray[200]};
    width: 2rem; // 32px
    height: 2rem; // 32px
    border-radius: 50%;
  }

  .navigation-icon {
    cursor: pointer;
  }

  // 1024px
  @media screen and (min-width: 77.5rem) {
    display: flex;
  }
`;

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {}

const NavigationRail: React.FC<Props> = ({ ...props }) => {
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);

  const dispatch = useDispatch();

  const openMenuModal = () => {
    dispatch(modalActions.openMenuModal());
  };

  const closeMenuModal = () => {
    dispatch(modalActions.closeMenuModal());
  };

  const navigate = useNavigate();

  return (
    <Base {...props}>
      <div className="navigation-logo-wrapper">
        {!menuModalOpen && (
          <>
            <ArrowRightIcon />
            <MenuIcon onClick={openMenuModal} />
          </>
        )}
        {menuModalOpen && (
          <>
            <ArrowLeftIcon />
            <MenuIcon onClick={closeMenuModal} />
          </>
        )}
      </div>
      <div className="navigation-logo" />
      <FloatingIconButton onClick={() => navigate("/post")}>
        <CreateIcon />
      </FloatingIconButton>
      <MailIcon className="navigation-icon" />
      <SendIcon className="navigation-icon" />
      <SearchIcon className="navigation-icon" />
      <PersonIcon className="navigation-icon" />
    </Base>
  );
};

export default NavigationRail;
