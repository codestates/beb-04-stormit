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
import { useDispatch } from "../store";
// API 설정
import { signUpAPI } from "../lib/api/user";
import { useNavigate } from "react-router-dom";

const Cover = styled.div`
  .createAccount-section {
    z-index: 999;
    position: absolute;
    max-height: 30rem;
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
      Input {
        &:focus {
          border: 1px solid ${palette.blue[500]};
        }
      }
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

const InputExplain = styled.span`
  font-size: 0.8rem;
  color: ${(props) =>
    props.color === "type-off"
      ? `${palette.gray[400]}`
      : `${palette.red[400]}`};
`;

const CreateAccount: React.FC = () => {
  // input value를 담는 state
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

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // nickname 유효성 검사
  // issue: 문자와 특수문자 조합시 그대로 유효성 통과됨.
  // solve : 특수문자만 확인하는 special 변수를 만들어서 먼저 통과가 안될시 false
  const validateNickname = (nickname: string) => {
    const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    const re = /^(?=.*[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]).{2,8}$/;
    if (special.test(nickname)) {
      return false;
    }
    return re.test(nickname);
  };

  // email 유효성 검사
  // '@' 포함여부와 대문자,소문자를 구분하지않게 표현식끝에 i 사용
  const validateEmail = (email: string) => {
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  // password 유효성 검사
  // issue: 조건 충족시 문자 삽입해도 통과됨.
  // solve: nickname과 마찬가지로 문자 확인 변수 생성해서 먼저 통과가 안될시 false
  // 참고 https://regexr.com/
  const validatePassword = (password: string) => {
    // gi -> global serch, ignore case
    const re = /^(?=.*[0-9a-zA-Z][$@!%*#?&]).{8,20}$/;
    return re.test(password);
  };

  // inputvaule 감지 및 state 전송 함수
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

  // 모달창 닫는 함수
  const onCreateAccountCloseBtn = () => {
    dispatch(modalActions.closeCreateAccountModal());
  };

  // 가입하기 클릭
  const onSubmitBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      navigate("/email");
    } catch (error) {
      // 피드백 (중복된 닉네임 등)
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
        <form className="createAccount-form" onSubmit={onSubmitBtn}>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={handleInputValue("nickname")}
          />
          {validate.nickname === "pass" ? (
            <InputExplain style={{ color: "#22C55E" }}>
              멋진 닉네임이네요!
            </InputExplain>
          ) : (
            <InputExplain
              color={validate.nickname === "none" ? "type-off" : "type-on"}
            >
              2~8자, 특수문자 사용불가 입니다.
            </InputExplain>
          )}
          <Input
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={handleInputValue("email")}
          />

          {validate.email === "pass" ? (
            <InputExplain style={{ color: "#22C55E" }}>
              사용 가능한 이메일입니다.
            </InputExplain>
          ) : (
            <InputExplain
              color={validate.email === "none" ? "type-off" : "type-on"}
            >
              올바른 이메일 주소를 입력하세요.
            </InputExplain>
          )}
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleInputValue("password")}
          />
          {validate.password === "pass" ? (
            <InputExplain style={{ color: "#22C55E" }}>
              사용 가능한 비밀번호입니다.
            </InputExplain>
          ) : (
            <InputExplain
              color={validate.password === "none" ? "type-off" : "type-on"}
            >
              8~20자, 하나 이상의 특수문자를 사용하세요.
            </InputExplain>
          )}
          <Button className="submit">가입하기</Button>
        </form>
      </Dialog>
    </Cover>
  );
};

export default CreateAccount;
