import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { findPasswordAPI } from "../lib/api/user";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;

  .find-password-title {
    font-weight: 500;
    margin: 1rem 0;
  }

  .find-password-button-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  @media screen and (min-width: 37.5rem) {
    margin: 1rem auto;
    width: 37.5rem;
  }
`;

const FindPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onClickSendButton = async () => {
    const body = { username: email };
    try {
      await findPasswordAPI(body);
      alert("이메일이 발송되었습니다. 메일함을 확인해주세요.");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Base>
      <h1 className="find-password-title">비밀번호 찾기</h1>
      <p>이메일을 입력하시면 임시 비밀번호를 보내드립니다.</p>
      <Input
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={onChangeEmail}
      />
      <div className="find-password-button-wrapper">
        <Button variant="contained" onClick={onClickSendButton}>
          보내기
        </Button>
      </div>
    </Base>
  );
};

export default FindPassword;
