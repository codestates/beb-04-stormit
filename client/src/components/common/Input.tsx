import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  validated?: boolean;
}

const Input: React.FC<Props> = ({ validated, ...props }) => {
  return <Base {...props} />;
};

interface BaseProps {
  validated?: boolean;
}

const Base = styled.input<BaseProps>`
  height: 2.5rem; // 40px
  border: 1px solid ${palette.gray[200]};
  outline: none;
  border-radius: 0.25rem; // 4px
  padding: 0.5rem; // 8px
`;

export default Input;
