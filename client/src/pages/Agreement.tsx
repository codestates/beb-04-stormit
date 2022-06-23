import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Checkbox from "../components/common/Checkbox";
import { FAKE_AGREEMENT } from "../lib/dummyData";
import palette from "../styles/palette";
import theme from "../styles/theme";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px

  margin: 1rem; // 16px

  .agreement-title {
    font-size: 2rem;
    font-weight: 500;
    margin: 1rem 0; // 16px
  }

  .agreement-subtitle {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${palette.gray[500]};
    margin-top: 1rem;
  }

  .agreement-text {
    height: 16rem; // 256px
    font-size: 0.875rem; // 14px
    border: 1px solid ${palette.gray[200]};
    color: ${palette.gray[400]};
    border-radius: 0.625rem; // 10px
    padding: 1rem; // 16px
    line-height: 1.4;
    overflow: scroll;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox-text-required {
    color: ${theme.primary};
  }

  .agreement-button-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    margin: 1rem auto;
    width: 37.5rem; // 600px
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    width: 52.5rem; // 840px
  }
`;

const Agreement: React.FC = () => {
  return (
    <Base>
      <h1 className="agreement-title">이용약관 및 개인정보 처리 방침</h1>
      <h2 className="agreement-subtitle">이용약관</h2>
      <div className="agreement-text">{FAKE_AGREEMENT}</div>
      <div className="div checkbox-wrapper">
        <Checkbox />
        <p className="checkbox-text-wrapper">
          <span className="checkbox-text-required">[필수] </span>
          <span className="checkbox-text">이용약관에 동의합니다.</span>
        </p>
      </div>
      <h2 className="agreement-subtitle">개인정보 수집 이용 동의</h2>
      <div className="agreement-text">{FAKE_AGREEMENT}</div>
      <div className="div checkbox-wrapper">
        <Checkbox />
        <p className="checkbox-text-wrapper">
          <span className="checkbox-text-required">[필수] </span>
          <span className="checkbox-text">
            개인정보 처리 방침에 동의합니다.
          </span>
        </p>
      </div>
      <div className="agreement-button-wrapper">
        <Button variant="contained">다음</Button>
      </div>
    </Base>
  );
};

export default Agreement;
