import React, { useState } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import Button from "./common/Button";
import Input from "./common/Input";
import Dialog from "./common/Dialog";
import IconButton from "./common/IconButton";
import Divider from "./common/Divider";
// mui icons fontawesome 보다 좋다!
import CloseIcon from "@mui/icons-material/Close";
import { modalActions } from "../store/modalSlice";
import { useSelector, useDispatch } from "../store";
// API 설정
import { signUpAPI } from "../lib/api/user";

const Cover = styled.div`
  .createAccount-section {
    z-index: 999;
    position: absolute;
    max-height: 24rem;
    max-width: 22rem;
    height: 100%;
    width: 100%;
    border-radius: 1rem;
    // 아래 3개는 modal이 middle of screen 가능하게 만든다
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .Intro {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      .header {
        font-size: 2rem;
        font-weight: 500;
        padding: 0 0.5rem 0.5rem 0.5rem;
      }
      .sub {
        font-size: 0.8rem;
        padding: 0 0.5rem 0.5rem 0.5rem;
      }
    }

    .createAccount-form {
      padding-top: 1rem;
      gap: 0.6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .submit {
        margin: 1.5rem 5rem;
        font-size: 1.2rem;
        padding: 1.5rem;
        border: 1px solid;
        background-color: ${palette.blue[500]};
        color: #ffff;
        transition: 0.3s;
        :hover {
          background-color: ${palette.blue[600]};
        }
        :active {
          transform: scale(0.9);
        }
      }
    }
  }
`;

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();

  const onSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSetNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onCreateAccountCloseBtn = () => {
    dispatch(modalActions.closeCreateAccountModal());
  };

  const onClickCreateBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
      nickname: nickname,
    };
    try {
      await signUpAPI(body);
    } catch (error) {
      console.log(error);
    }
    onCreateAccountCloseBtn();
  };
  return (
    <Cover>
      <Dialog className="createAccount-section">
        <div className="Intro">
          <section>
            <h1 className="header">가입하기</h1>
            <span className="sub">빠르고 쉽습니다.</span>
          </section>
          <IconButton color="primary">
            <CloseIcon onClick={onCreateAccountCloseBtn} />
          </IconButton>
        </div>
        <Divider />
        <form className="createAccount-form">
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={onSetNickname}
          />
          <Input
            type="text"
            placeholder="새 이메일"
            value={email}
            onChange={onSetEmail}
          />
          <Input
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={onSetPassword}
          />
          <Button className="submit" onClick={onClickCreateBtn}>
            가입하기
          </Button>
        </form>
      </Dialog>
    </Cover>
  );
};

export default CreateAccount;
