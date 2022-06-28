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
  /* 
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nicknameValid, setNicknameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true); */
  const [userinfo, setUserinfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  const [validate, setValidate] = useState({
    email: "none",
    password: "none",
    nickname: "none",
  });
  const navigate = useNavigate();

  /*   const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }; */

  // 닉네임 정규표현식
  const validateNickname = (nickname: string) => {
    const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    const regExp = /^(?=.*[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]).{2,8}$/;
    if (special.test(nickname)) {
      return false;
    }
    return regExp.test(nickname);
  };

  // 이메일 정규표현식
  const validateEmail = (email: string) => {
    const regExp =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regExp.test(email);
  };

  // 패스워드 정규표현식
  const validatePassword = (password: string) => {
    const engcheck = /[a-z]/gi;
    const regExp = /^(?=.*[0-9$@!%*#?&]).{8,20}$/;
    if (engcheck.test(password)) {
      return false;
    }
    return regExp.test(password);
  };

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (key === "email") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (validateEmail(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      } else if (key === "nickname") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (validateNickname(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      } else if (key === "password") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (validatePassword(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      }
      setUserinfo({ ...userinfo, [key]: value });
    };

  const onClickSubmitButton = async () => {
    /*     validateEmail(email);
    validateNickname(nickname);
    validatePassword(password); */
    const { email, password, nickname } = userinfo;
    if (!validateNickname(nickname)) {
      alert("pls check your nickname");
      return;
    }
    if (!validateEmail(email)) {
      alert("pls check your email");
      return;
    }
    if (!validatePassword(password)) {
      alert("pls check your password");
      return;
    }

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
          onChange={handleInputValue("nickname")}
          validated={validate.nickname === "fail" ? false : true}
          width="100%"
        />
        {validate.nickname === "fail" && (
          <ErrorIcon className="signup-error-icon" />
        )}
      </div>
      {validate.nickname === "pass" ? (
        <p className="signup-input-message">멋진 닉네임이네요!</p>
      ) : (
        <p
          className={
            validate.nickname === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          닉네임은 2~8자, 특수문자 사용불가 입니다.
        </p>
      )}
      <p className="signup-input-label">이메일 주소</p>
      <div className="signup-input-wrapper">
        <Input
          type="text"
          placeholder="이메일을 입력해주세요"
          onChange={handleInputValue("email")}
          validated={validate.email === "fail" ? false : true}
          width="100%"
        />
        {validate.email === "fail" && (
          <ErrorIcon className="signup-error-icon" />
        )}
      </div>
      {validate.email === "pass" ? (
        <p className="signup-input-message">사용 가능한 이메일입니다.</p>
      ) : (
        <p
          className={
            validate.email === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          {validate.email === "none"
            ? "이메일 주소는 로그인이나 비밀번호 변경 등에 사용됩니다."
            : "올바른 이메일 주소를 입력해주세요."}
        </p>
      )}
      <p className="signup-input-label">비밀번호</p>
      <div className="signup-input-wrapper">
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={handleInputValue("password")}
          validated={validate.password === "fail" ? false : true}
          width="100%"
        />

        {validate.password === "fail" && (
          <ErrorIcon className="signup-error-icon" />
        )}
      </div>
      {validate.password === "pass" ? (
        <p className="signup-input-message">사용 가능한 비밀번호입니다.</p>
      ) : (
        <p
          className={
            validate.password === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          비밀번호는 8~20자 이내이고, 하나 이상의 특수문자를 포함해야 합니다.
        </p>
      )}

      <div className="signup-submit-button-wrapper">
        <Button variant="outlined" onClick={() => navigate(-2)}>
          돌아가기
        </Button>
        <Button variant="contained" onClick={onClickSubmitButton}>
          가입하기
        </Button>
      </div>
    </Base>
  );
};

export default SignUp;
