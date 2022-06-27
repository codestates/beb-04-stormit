import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Base = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.gray[500]};
  height: 2.5rem; // 40px
  padding: 1rem;
  font-weight: 500;
  cursor: pointer;

  z-index: 999;

  &:hover {
    background-color: ${palette.gray[100]};
  }
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

const MenuItem: React.FC<Props> = ({ label, ...props }) => {
  return <Base {...props}>{label}</Base>;
};

export default MenuItem;
