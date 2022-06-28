import React from "react";
import styled from "styled-components";

const Base = styled.div`
  display: flex;
  height: 2.5rem; // 40px
  padding: 0 1rem;
`;

interface Props {
  children: React.ReactNode;
}

const Tabs: React.FC<Props> = ({ children }) => {
  return <Base>{children}</Base>;
};

export default Tabs;
