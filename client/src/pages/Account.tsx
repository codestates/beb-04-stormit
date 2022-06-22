import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useDispatch } from "../store";
import { userActions } from "../store/userSlice";
import palette from "../styles/palette";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem; // 16px

  .account-dialog-contents {
    display: flex;
    flex-direction: column;
    gap: 1rem; // 16px
  }

  .account-dialog-title {
    font-size: 1.5rem;
    font-weight: 500;

    margin: 1rem 0; // 16px 0
  }

  .account-button-wrapper {
    display: flex;
    justify-content: center;
    margin: 1rem 0; // 16px 0
  }

  .private-key-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
    margin: 1rem 0; // 16px 0
  }

  .private-key {
    font-size: 0.875rem; // 14px
    color: ${palette.gray[400]};
  }

  .unregister {
    text-align: right;
    color: ${palette.gray[300]};
    text-decoration: underline;
    cursor: pointer;
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    margin: 1rem auto;
    max-width: 37.5rem; // 600px
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    max-width: 25rem; // 400px
  }
`;

const Account: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onClickUnregisterButton = () => {
    if (
      window.confirm("한 번 탈퇴하면 되돌릴 수 없습니다. 탈퇴하시겠습니까?")
    ) {
      dispatch(userActions.setLoggedOut());
      navigate("/");
    }
  };

  return (
    <Base>
      <div className="account-dialog-contents">
        <p className="account-dialog-title">보안 및 로그인</p>
        <p className="private-key-wrapper">
          <span>개인 키:</span>
          <span className="private-key">
            anewafkv-ajfnzkvkx1123-dffnwkfsd-sfwefl
          </span>
        </p>
        <label className="password-label">비밀번호</label>
        <Input placeholder="변경할 비밀번호" />
        <label className="password-label">비밀번호 재입력</label>
        <Input placeholder="비밀번호 확인" />
        <div className="account-button-wrapper">
          <Button variant="contained" onClick={() => navigate("/")}>
            저장하기
          </Button>
        </div>
        <p className="unregister" onClick={onClickUnregisterButton}>
          회원탈퇴
        </p>
      </div>
    </Base>
  );
};

export default Account;
