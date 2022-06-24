import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import CreateAccount from "../components/CreateAccount";
import Divider from "../components/common/Divider";
import { useState } from "react";
// modal 상태를 가지고 있는 파일
import { modalActions } from "../store/modalSlice";
import { userActions } from "../store/userSlice";
// 상태를 활용할 수 있는 useSelector, useDispatch -> store/index에 저장되어 있어서 redux까지가서 import할 필요가 없다
import { useSelector, useDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { snackbarActions } from "../store/snackbarSlice";
// login API
import { authenticateAPI, loginAPI } from "../lib/api/user";

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
  max-height: 24rem;
  max-width: 22rem;
  height: 100%;
  width: 100%;
  padding: 20px;
  border-radius: 1rem;
  box-shadow: 0 1rem 20px rgba(0, 0, 0, 0.1);

  .inputBox {
    font-size: 1.2rem;
    padding: 0.7rem;
    border-radius: 0.3rem;
    border: 1px solid ${palette.gray[300]};
    ::placeholder {
      color: ${palette.gray[300]};
    }
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

  .forgot-pw {
    text-align: center;
    color: ${palette.blue[500]};
    font-size: 0.8rem;
    font-weight: 500;

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
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // e: 이건 타입스크립트에서 event의 타입을 지정해주는것이다.
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const { accessToken } = loginAPIResponse.data;

      // 실패하면 UI 피드백
      if (loginAPIResponse.status !== 201) return;

      document.cookie = `access_token=${accessToken}`;

      const authAPIResponse = await authenticateAPI(accessToken);

      const {
        user_id: userId,
        username: email,
        password: passwordHash,
        nickname,
      } = authAPIResponse.data;

      if (authAPIResponse.status !== 200) return;

      dispatch(userActions.setLoggedIn());
      dispatch(
        userActions.setUserInfo({
          email: email,
          nickname: nickname,
          passwordHash: passwordHash,
          userId: userId,
        })
      );

      dispatch(snackbarActions.openLoginSnackbar());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // 로그인 되어있으면 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Base className={createAccountOpen ? "Backdrop" : ""}>
      <Logo className={createAccountOpen ? "Backlogo" : ""}>Stormit</Logo>
      <LoginForm className={createAccountOpen ? "BackForm" : ""}>
        <input
          className="inputBox"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          className="inputBox"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <button className="login-btn" onClick={onClickLoginButton}>
          로그인
        </button>
        <p className="forgot-pw">비밀번호를 잊으셨나요?</p>
        <Divider />
        <div className="createAccount-btn-container">
          <div className="createAccount-btn" onClick={onCreateAccountBtn}>
            새 계정 만들기
          </div>
        </div>
      </LoginForm>
      {createAccountOpen ? <CreateAccount /> : ""}
    </Base>
  );
};

export default Login;
