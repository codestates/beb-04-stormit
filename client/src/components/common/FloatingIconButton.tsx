import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import theme from "../../styles/theme";

const Base = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.5rem; // 56px
  height: 3.5rem; // 56px
  background-color: ${theme.primary};
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  border: none;
  color: white;
  position: fixed;
  bottom: 1rem; // 16px
  right: 1rem; // 16px
  cursor: pointer;

  &:hover {
    background-color: ${palette.blue[600]};
  }
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const FloatingIconButton: React.FC<Props> = ({ children }) => {
  return <Base>{children}</Base>;
};

export default FloatingIconButton;
