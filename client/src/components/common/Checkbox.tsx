import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Base = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.25rem; // 20px
  height: 1.25rem; // 20px
  border-radius: 50%;
  cursor: pointer;

  accent-color: ${palette.blue[500]};
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  name?: string;
}

const Checkbox: React.FC<Props> = ({ checked, name, ...props }) => {
  return <Base type="checkbox" checked={checked} name={name} {...props} />;
};

export default Checkbox;
