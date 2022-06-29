import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import FloatingIconButton from "./common/FloatingIconButton";
import CreateIcon from "@mui/icons-material/Create";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../store";
import { modalActions } from "../store/modalSlice";
import IconButton from "./common/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "./common/Tooltip";

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
  min-height: 100vh;
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
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const openMenuModal = () => {
    dispatch(modalActions.openMenuModal());
  };

  const closeMenuModal = () => {
    dispatch(modalActions.closeMenuModal());
  };

  const onClickFloatingButton = () => {
    if (isLoggedIn) {
      navigate("/post");
    } else {
      navigate("/login");
    }
  };

  const navigate = useNavigate();

  return (
    <Base {...props}>
      <div className="navigation-logo-wrapper">
        {!menuModalOpen && (
          <>
            <ArrowRightIcon />
            <Tooltip text="메뉴" position="right">
              <MenuIcon onClick={openMenuModal} />
            </Tooltip>
          </>
        )}
        {menuModalOpen && (
          <>
            <ArrowLeftIcon />
            <MenuIcon onClick={closeMenuModal} />
          </>
        )}
      </div>
      {!isLoggedIn && (
        <Tooltip text="로그인" position="right">
          <FloatingIconButton onClick={onClickFloatingButton}>
            <PersonIcon />
          </FloatingIconButton>
        </Tooltip>
      )}
      {isLoggedIn && (
        <Tooltip text="글쓰기" position="right">
          <FloatingIconButton onClick={onClickFloatingButton}>
            <CreateIcon />
          </FloatingIconButton>
        </Tooltip>
      )}
      {isLoggedIn && (
        <>
          <Tooltip text="내정보" position="right">
            <Link to="/mypage">
              <IconButton>
                <PersonIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip text="설정" position="right">
            <Link to="/account">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </>
      )}
      <Tooltip text="정보" position="right">
        <Link to="/about">
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </Base>
  );
};

export default NavigationRail;
