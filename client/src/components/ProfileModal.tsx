import { Divider } from "@mui/material";
import React, { useRef } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "../store";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ToggleButton from "./common/ToggleButton";
import { themeActions } from "../store/themeSlice";
import { modalActions } from "../store/modalSlice";
import { userActions } from "../store/userSlice";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { removeCookie } from "../lib/utils";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { logoutAPI } from "../lib/api/user";

const Base = styled.div`
  position: absolute;
  width: 16rem; // 256px
  top: 3.5rem; // 56px // 헤더의 높이만큼 아래로
  right: 0;
  min-height: 40rem; // 640px
  height: calc(100vh - 3.5rem); // top이 3.5rem이기 때문에
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 16px 32px rgba(0, 0, 0, 0.2);
  z-index: 999;

  .profile-modal-image-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem; // 16px

    padding: 1rem; // 16px
  }

  .profile-modal-image {
    width: 6.25rem; // 100px
    height: 6.25rem; // 100px
    border-radius: 50%;
  }

  .profile-modal-username {
    font-size: 1.25rem; // 20px
    font-weight: 500;
  }

  .profile-modal-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem; // 8px

    height: 3rem; // 48px
    padding: 0.5rem; // 8px
    font-size: 0.875rem; // 14px
    cursor: pointer;

    &:hover {
      background-color: ${palette.gray[100]};
    }
  }

  .profile-modal-item-left {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
  }

  // 코드 중복 개선 필요
  .profile-modal-item-with-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem; // 8px

    height: 3rem; // 48px
    padding: 0.5rem; // 8px
    font-size: 0.875rem; // 14px
    cursor: pointer;

    &:hover {
      background-color: ${palette.gray[100]};
    }
  }
`;

const ProfileModal: React.FC = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const nickname = useSelector((state) => state.user.nickname);

  const dispatch = useDispatch();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleDarkMode = () => {
    dispatch(themeActions.toggleDarkMode());

    if (!isDarkMode) {
      localStorage.setItem("darkMode", "on");
    } else {
      localStorage.removeItem("darkMode");
    }
  };

  const closeModal = () => {
    dispatch(modalActions.closeAllModal());
  };

  const onClickLogOutButton = async () => {
    console.log("log out button clicked");

    await logoutAPI();

    closeModal();
    dispatch(userActions.setLoggedOut());
    removeCookie("access_token");
  };

  useOutsideClick(modalRef, () => dispatch(modalActions.closeProfileModal()));

  return (
    <Base ref={modalRef}>
      {!isLoggedIn && (
        <>
          <Link to="/login">
            <div className="profile-modal-item" onClick={closeModal}>
              로그인
            </div>
          </Link>
          <Divider />
          <Link to="/agreement">
            <div className="profile-modal-item" onClick={closeModal}>
              회원가입
            </div>
          </Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <div className="profile-modal-image-wrapper">
            <img
              className="profile-modal-image"
              src="/profile-image.png"
              alt=""
            />
            <div className="profile-modal-username">{nickname}</div>
          </div>
          <Divider />
          <Link to="/mypage">
            <div className="profile-modal-item" onClick={closeModal}>
              <PersonIcon />
              마이페이지
            </div>
          </Link>
          <Divider />
          <Link to="/account">
            <div className="profile-modal-item" onClick={closeModal}>
              <SettingsIcon />
              개인정보 설정
            </div>
          </Link>
          <Divider />
          <div className="profile-modal-item" onClick={onClickLogOutButton}>
            <LogoutIcon />
            <span>로그아웃</span>
          </div>
          <Divider />
        </>
      )}
      <div className="profile-modal-item-with-button">
        <div className="profile-modal-item-left">
          <DarkModeIcon />
          <span>다크 모드</span>
        </div>
        <ToggleButton checked={isDarkMode} onClick={toggleDarkMode} />
      </div>
      <Divider />
    </Base>
  );
};

export default ProfileModal;
