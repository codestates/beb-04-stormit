import React from "react";
import styled from "styled-components";
import NavigationRail from "../components/NavigationRail";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import palette from "../styles/palette";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  margin-top: 8rem;

  .email-sent-icon {
    width: 6rem;
    height: 6rem;
    color: ${palette.blue[500]};
  }

  .email-sent-title {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .email-sent-description {
    color: ${palette.gray[500]};
    margin: 0 4rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const EmailSent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Base>
      <NavigationRail />
      <CheckCircleIcon className="email-sent-icon" />
      <p className="email-sent-title">회원가입이 완료되었습니다.</p>
      <p className="email-sent-description">
        등록하신 이메일에 인증 요청 메일을 발송했습니다. 메일함을 확인하고
        인증을 진행해주세요.
      </p>
      <Button variant="contained" onClick={() => navigate("/login")}>
        로그인
      </Button>
    </Base>
  );
};

export default EmailSent;
