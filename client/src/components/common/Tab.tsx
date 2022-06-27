import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

interface BaseProps {
  active?: boolean;
}

const Base = styled.div<BaseProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: white;
  cursor: pointer;
  font-weight: 400;

  min-width: 6rem;

  ${({ active }) =>
    active &&
    css`
      border-bottom: 3px solid ${palette.blue[500]};
      font-weight: 500;
    `}
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  active?: boolean;
}

const Tab: React.FC<Props> = ({ label, active, ...props }) => {
  return (
    <Base active={active} {...props}>
      {label}
    </Base>
  );
};

export default Tab;
