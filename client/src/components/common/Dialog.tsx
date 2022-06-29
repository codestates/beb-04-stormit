import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Base = styled.div`
  background-color: white;
  padding: 1rem; // 16px
  box-shadow: 0px 0px 9px 3px rgba(41, 41, 41, 0.25);

  @media screen and (min-width: 37.5rem) {
    border: 1px solid ${palette.gray[200]};
    box-shadow: none;
  }
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Dialog: React.FC<Props> = ({ children, ...props }) => {
  return <Base {...props}>{children}</Base>;
};

export default Dialog;
