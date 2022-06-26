import React from "react";
import styled from "styled-components";

const Base = styled.div``;

interface Props {
  children: React.ReactNode;
}

const Tabs: React.FC<Props> = ({ children }) => {
  return <Base>{children}</Base>;
};

export default Tabs;
