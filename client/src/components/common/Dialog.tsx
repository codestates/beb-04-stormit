import React from "react";
import styled from "styled-components";

const Base = styled.div`
  background-color: white;
  padding: 1rem; // 16px
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Dialog: React.FC<Props> = ({ children, ...props }) => {
  return <Base {...props}>{children}</Base>;
};

export default Dialog;
