import React, { useState } from "react";
import styled from "styled-components";
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
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Base>
      <Tabs>
        <Tab label="ONE" value="one" />
        <Tab label="ONE" value="two" />
        <Tab label="ONE" value="three" />
      </Tabs>
    </Base>
  );
};

export default Test;
