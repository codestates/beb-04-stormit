import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import palette from "../styles/palette";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  height: 100vh;

  .login-form {
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
      :hover {
        background-color: ${palette.blue[600]};
      }
      :active {
        transform: scale(0.9);
        background-color: ${palette.blue[600]};
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
    .underline {
      border-bottom: 1px solid ${palette.gray[300]};
      padding-top: 0.5rem;
    }
    .createAccount-btn-container {
      display: flex;
      justify-content: center;
      .createAccount-btn {
        font-size: 1.2rem;
        margin: 1rem;
        padding: 0.7rem;
        border-radius: 0.3rem;
        border: none;
        background-color: #67a74c;
        color: #ffff;
        cursor: pointer;
        transition: 0.3s;
        :hover {
          background-color: #36a420;
        }
        :active {
          transform: scale(0.9);
          background-color: #36a420;
        }
      }
    }
  }

  .logo {
    font-size: 2.5rem;
    font-weight: 600;
    color: ${palette.blue[500]};
    padding-bottom: 20px;
  }
`;

const Login: React.FC = () => {
  return (
    <Base>
      <h1 className="logo">Stormit</h1>
      <form className="login-form">
        <input className="inputBox" type="text" placeholder="아이디" />
        <input className="inputBox" type="password" placeholder="비밀번호" />
        <button className="login-btn">로그인</button>
        <a className="forgot-pw" href="">
          비밀번호를 잊으셨나요?
        </a>
        <div className="underline"></div>
        <div className="createAccount-btn-container">
          <button className="createAccount-btn">새 계정 만들기</button>
        </div>
      </form>
    </Base>
  );
};

export default Login;
