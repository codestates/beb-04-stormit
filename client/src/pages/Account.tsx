import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Dialog from "../components/common/Dialog";
import Input from "../components/common/Input";

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
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin: 1rem 0; // 16px 0
  }

  .account-button-wrapper {
    display: flex;
    justify-content: center;
    margin: 1rem 0; // 16px 0
  }

  .private-key {
    margin: 1rem 0; // 16px 0
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    margin: 1rem auto;
    max-width: 37.5rem; // 600px
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    max-width: 52.5rem; // 840px
  }
`;

const Account: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Base>
      <Dialog>
        <div className="account-dialog-contents">
          <p className="account-dialog-title">보안 및 로그인</p>
          <p className="private-key">
            개인 키: anewafkv-ajfnzkvkx1123-dffnwkfsd-sfwefl
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
        </div>
      </Dialog>
    </Base>
  );
};

export default Account;
