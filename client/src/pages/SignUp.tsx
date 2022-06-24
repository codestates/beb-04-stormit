import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { signUpAPI } from "../lib/api/user";
import Divider from "../components/common/Divider";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import palette from "../styles/palette";
import ErrorIcon from "@mui/icons-material/Error";
import { scrollToTop } from "../lib/utils";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px
  margin: 1rem; // 16px

  .signup-heading {
    font-size: 2rem; // 32px
    font-weight: 500;
    margin: 1rem 0; // 16px
  }

  .signup-input-label {
    font-size: 1.25rem; // 20px
  }

  .signup-error-icon {
    color: ${palette.red[500]};
  }

  .signup-input-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .signup-input-message {
    font-size: 0.875rem;
    color: ${palette.gray[500]};
    margin-bottom: 1rem; // 16px
  }

  .signup-input-error-message {
    font-size: 0.875rem;
    color: ${palette.red[500]};
    margin-bottom: 1rem; // 16px
  }

  .signup-submit-button-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 1rem; // 16px
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    margin: 1rem auto; // 16px
    width: 37.5rem; // 600px
  }
`;

const SignUp: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nicknameValid, setNicknameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const navigate = useNavigate();

  const validateNickname = (nickname: string) => {
    const regExp = /^(?=.*[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]).{2,8}$/;
    setNicknameValid(regExp.test(nickname));
  };

  const validateEmail = (email: string) => {
    const regExp =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    setEmailValid(regExp.test(email));
  };

  const validatePassword = (password: string) => {
    const regExp = /^(?=.*[a-z])(?=.*[$@!%*#?&])[a-z0-9$@!%*#?&]{8,20}$/;
    setPasswordValid(regExp.test(password));
  };

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateNickname(event.target.value);
    setNickname(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    validatePassword(event.target.value);
    setPassword(event.target.value);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail(event.target.value);
    setEmail(event.target.value);
  };

  const onClickSubmitButton = async () => {
    validateEmail(email);
    validateNickname(nickname);
    validatePassword(password);

    if (!(emailValid && nicknameValid && passwordValid)) return;

    const body = {
      username: email,
      password: password,
      nickname: nickname,
    };
    try {
      await signUpAPI(body);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Base>
      <h1 className="signup-heading">회원가입</h1>
      <Divider />
      <p className="signup-input-label">닉네임</p>
      <div className="signup-input-wrapper">
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요"
          onChange={onChangeNickname}
          validated={nicknameValid}
          width="100%"
        />
        {!nicknameValid && <ErrorIcon className="signup-error-icon" />}
      </div>
      {nicknameValid && (
        <p className="signup-input-message">
          닉네임은 2~8자의 한글 또는 영어로 이루어져야 합니다.
        </p>
      )}
      {!nicknameValid && (
        <p className="signup-input-error-message">
          닉네임은 2~8자의 한글 또는 영어로 이루어져야 합니다.
        </p>
      )}
      <p className="signup-input-label">이메일 주소</p>
      <div className="signup-input-wrapper">
        <Input
          value={email}
          type="text"
          placeholder="이메일을 입력해주세요"
          onChange={onChangeEmail}
          validated={emailValid}
          width="100%"
        />
        {!emailValid && <ErrorIcon className="signup-error-icon" />}
      </div>
      {emailValid && (
        <p className="signup-input-message">
          이메일 주소는 로그인이나 비밀번호 변경 등에 사용됩니다.
        </p>
      )}
      {!emailValid && (
        <p className="signup-input-error-message">
          올바른 이메일 주소를 입력해주세요.
        </p>
      )}
      <p className="signup-input-label">비밀번호</p>
      <div className="signup-input-wrapper">
        <Input
          value={password}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={onChangePassword}
          validated={passwordValid}
          width="100%"
        />

        {!passwordValid && <ErrorIcon className="signup-error-icon" />}
      </div>
      {passwordValid && (
        <p className="signup-input-message">
          비밀번호는 8~20자 이내이고, 하나 이상의 특수문자를 포함해야 합니다.
        </p>
      )}
      {!passwordValid && (
        <p className="signup-input-error-message">
          비밀번호는 8~20자 이내이고, 하나 이상의 특수문자를 포함해야 합니다.
        </p>
      )}
      <div className="signup-submit-button-wrapper">
        <Button variant="outlined">돌아가기</Button>
        <Button variant="contained" onClick={onClickSubmitButton}>
          가입하기
        </Button>
      </div>
    </Base>
  );
};

export default SignUp;
