import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import CreateAccount from "../components/CreateAccount";
import Divider from "../components/common/Divider";
import { useState } from "react";
// eye icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// modal 상태를 가지고 있는 파일
import { modalActions } from "../store/modalSlice";
import { userActions } from "../store/userSlice";
// 상태를 활용할 수 있는 useSelector, useDispatch -> store/index에 저장되어 있어서 redux까지가서 import할 필요가 없다
import { useSelector, useDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { snackbarActions } from "../store/snackbarSlice";
// login API
import { authenticateAPI, loginAPI } from "../lib/api/user";
import { setCookie } from "../lib/utils";
import Input from "../components/common/Input";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) =>
    props.className === "Backdrop" ? "8.5rem" : "5rem"};
  height: 100vh;
  // modal창 생성시 적용 css
  position: ${(props) => (props.className === "Backdrop" ? "fixed" : "")};
  top: ${(props) => (props.className === "Backdrop" ? "0" : "")};
  left: ${(props) => (props.className === "Backdrop" ? "0" : "")};
  bottom: ${(props) => (props.className === "Backdrop" ? "0" : "")};
  right: ${(props) => (props.className === "Backdrop" ? "0" : "")};
  background-color: ${(props) =>
    props.className === "Backdrop" ? "rgba(76, 76, 76, 0.5)" : ""};
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${palette.blue[500]};
  padding-bottom: 20px;
  opacity: ${(props) => (props.className === "Backlogo" ? "0.5" : "1")};
`;

const LoginForm = styled.form`
  opacity: ${(props) => (props.className === "BackForm" ? "0.5" : "1")};
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.gray[300]};
  gap: 1rem;
  max-height: 30rem;
  max-width: 22rem;
  width: 100%;
  padding: 20px;

  box-shadow: 0 1rem 20px rgba(0, 0, 0, 0.1);

  .validation-text {
    color: ${palette.red[500]};
    font-size: 0.875rem; // 14px
  }

  .login-btn {
    font-size: 1.2rem;
    padding: 0.7rem;
    border-radius: 0.3rem;
    border: none;
    background-color: ${palette.blue[500]};
    color: #ffff;
    cursor: pointer;
    transition: 0.3s;
    text-align: center;
    :hover {
      background-color: ${palette.blue[600]};
    }
    :active {
      transform: scale(0.9);
    }
  }

  .google-login-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    gap: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid ${palette.gray[200]};
    cursor: pointer;
  }

  .google-login-button {
    width: 1.5rem;
    height: 1.5rem;
  }

  .google-login-text {
    font-weight: 500;
    color: ${palette.gray[400]};
  }

  .forgot-pw {
    text-align: center;
    color: ${palette.blue[500]};
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;

    :hover {
      text-decoration: underline;
    }
  }
  .createAccount-btn-container {
    display: flex;
    justify-content: center;
    .createAccount-btn {
      text-align: center;
      font-size: 1.2rem;
      margin: 1rem;
      padding: 0.7rem;
      border-radius: 0.3rem;
      border: none;
      background-color: ${palette.green[500]};
      color: #ffff;
      cursor: pointer;
      transition: 0.3s;
      :hover {
        background-color: ${palette.green[600]};
      }
      :active {
        transform: scale(0.9);
      }
    }
  }
  // 겉에를 absolute로 감싸고 내부에 relative를 적용하면 화면 크기 전환에도 맞게 변한다
  .password-container {
    cursor: pointer;
    position: absolute;
    color: ${palette.gray[400]};
    transition: 0.3s;
    &:hover {
      color: ${palette.gray[600]};
    }
    .password-container-visibile {
      position: relative;
      top: 4rem;
      left: 17rem;
    }
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("nonon@gmail.com");
  const [password, setPassword] = useState("1234!@#$");
  const [validated, setValidated] = useState(true);

  // passwordType state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onClickGoogleButton = () => {
    window.location.assign("http://localhost:4000/user/google");
  };

  // e: 이건 타입스크립트에서 event의 타입을 지정해주는것이다.
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setPassword(e.target.value);
  };

  // 계정생성 클릭 시 모달창 생성
  const createAccountOpen = useSelector(
    (state) => state.modal.createAccountOpen
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onCreateAccountBtn = () => {
    dispatch(modalActions.openCreateAccountModal());
  };

  const onClickLoginButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const body = {
      username: email,
      password: password,
    };
    try {
      const loginAPIResponse = await loginAPI(body);

      console.log("login API response");
      console.log(loginAPIResponse.data);

      const { access_token } = loginAPIResponse.data;

      setCookie("access_token", access_token, "7200");

      if (loginAPIResponse.status !== 201) return;

      console.log("@@@ login auth API @@@");
      console.log(access_token);
      const authAPIResponse = await authenticateAPI(access_token);

      const {
        user_id: userId,
        username: email,
        nickname,
      } = authAPIResponse.data;

      if (authAPIResponse.status !== 200) return;

      dispatch(userActions.setLoggedIn());
      dispatch(
        userActions.setUserInfo({
          email: email,
          nickname: nickname,
          userId: userId,
        })
      );

      dispatch(snackbarActions.openLoginSnackbar());
      navigate("/");
    } catch (error) {
      setValidated(false);
    }
  };
  // password type을 변경하는 함수
  const onVisible = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      } else {
        return { type: "password", visible: false };
      }
    });
  };

  // 로그인 되어있으면 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <Base className={createAccountOpen ? "Backdrop" : ""}>
      <Logo className={createAccountOpen ? "Backlogo" : ""}>Stormit</Logo>
      <LoginForm className={createAccountOpen ? "BackForm" : ""}>
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <Input
          type={passwordType.type}
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <div className="password-container" onClick={onVisible}>
          <div className="password-container-visibile">
            {!passwordType.visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>
        {!validated && (
          <p className="validation-text">
            이메일 또는 비밀번호가 잘못되었습니다.
          </p>
        )}
        <button className="login-btn" onClick={onClickLoginButton}>
          로그인
        </button>
        <p className="forgot-pw" onClick={() => navigate("/password")}>
          비밀번호를 잊으셨나요?
        </p>
        <Divider />
        <div className="createAccount-btn-container">
          <div className="createAccount-btn" onClick={onCreateAccountBtn}>
            새 계정 만들기
          </div>
        </div>
        <div className="google-login-button-wrapper">
          <img className="google-login-button" src="/google-logo.png" alt="" />
          <div className="google-login-text" onClick={onClickGoogleButton}>
            구글 계정으로 로그인
          </div>
        </div>
      </LoginForm>
      {createAccountOpen ? <CreateAccount /> : ""}
    </Base>
  );
};

export default Login;
