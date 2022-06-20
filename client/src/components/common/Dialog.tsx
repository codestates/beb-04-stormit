import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Dialog: React.FC<Props> = ({ children, ...props }) => {
  return <Base {...props}>{children}</Base>;
};

const Base = styled.div`
  background-color: white;
  padding: 1rem; // 16px
  border-radius: 0.625rem; // 10px
  box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15),
    0px 4px 4px rgba(0, 0, 0, 0.3);
`;

export default Dialog;
