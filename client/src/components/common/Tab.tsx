import React, { useState } from "react";
import styled from "styled-components";

const Base = styled.div`
  padding: 1rem;
  background-color: white;
  outline: none;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
}

const Tab: React.FC<Props> = ({ label, value, ...props }) => {
  const [open, setOpen] = useState();

  const [tabValue, setTabValue] = useState(value);

  return (
    <Base {...props}>
      {label}
      <span className="tabs-indicator" />
    </Base>
  );
};

export default Tab;
