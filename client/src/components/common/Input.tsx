import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

interface BaseProps {
  validated?: boolean;
}

const Base = styled.input<BaseProps>`
  height: 2.5rem; // 40px
  border: 1px solid ${palette.gray[200]};
  outline: none;
  border-radius: 0.25rem; // 4px
  padding: 0.5rem; // 8px

  ${({ validated }) =>
    !validated &&
    css`
      border: 1px solid ${palette.red[500]};
    `}
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  validated?: boolean;
}

const Input: React.FC<Props> = ({ validated = true, ...props }) => {
  return <Base validated={validated} {...props} />;
};

export default Input;
