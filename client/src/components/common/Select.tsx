import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const Base = styled.select`
  height: 2.5rem; // 40px
  padding: 0.5rem; // 8px
  outline: none;
  appearance: none;
  border-radius: 0.25rem; // 4px
  cursor: pointer;

  &:hover {
    border: 1px solid ${theme.primary};
    transition: 0.2s ease;
  }
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<Props> = ({ children, ...props }) => {
  return <Base {...props}>{children}</Base>;
};

export default Select;
