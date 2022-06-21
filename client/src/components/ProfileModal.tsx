import { Divider } from "@mui/material";
import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "../store";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ToggleButton from "./common/ToggleButton";
import { themeActions } from "../store/themeSlice";
import { modalActions } from "../store/modalSlice";
import { userActions } from "../store/userSlice";

const Base = styled.div`
  position: absolute;
  width: 16rem; // 256px
  top: 3.5rem; // 56px // 헤더의 높이만큼 아래로
  right: 0;
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
    background-color: ${palette.gray[200]};
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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    dispatch(themeActions.toggleDarkMode());
  };

  const closeModal = () => {
    dispatch(modalActions.closeAllModal());
  };

  const onClickMyPageButton = () => {
    closeModal();
    navigate("/mypage");
  };

  const onClickAccountButton = () => {
    closeModal();
    navigate("/account");
  };

  const onClickLoginButton = () => {
    closeModal();
    navigate("/login");
  };

  const onClickSignUpButton = () => {
    closeModal();
    navigate("/signup");
  };

  const onClickLogOutButton = () => {
    closeModal();
    dispatch(userActions.setLoggedOut());
    navigate("/");
  };

  return (
    <Base>
      {!isLoggedIn && (
        <>
          <div className="profile-modal-item" onClick={onClickLoginButton}>
            로그인
          </div>
          <Divider />
          <div className="profile-modal-item" onClick={onClickSignUpButton}>
            회원가입
          </div>
        </>
      )}
      {isLoggedIn && (
        <>
          <div className="profile-modal-image-wrapper">
            <div className="profile-modal-image" />
            <div className="profile-modal-username">스톰잇닉네임</div>
          </div>
          <Divider />
          <div className="profile-modal-item" onClick={onClickMyPageButton}>
            마이페이지
          </div>
          <Divider />
          <div className="profile-modal-item" onClick={onClickAccountButton}>
            개인정보 설정
          </div>

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
