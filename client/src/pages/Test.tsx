import React, { useState } from "react";
import styled from "styled-components";
import Menu from "../components/common/Menu";
import MenuItem from "../components/common/MenuItem";
import Tab from "../components/common/Tab";
import Tabs from "../components/common/Tabs";

const Base = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px
  padding: 1rem; // 16px

  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem; // 16px
  }
`;

const Test: React.FC = () => {
  return <Base></Base>;
};

export default Test;
