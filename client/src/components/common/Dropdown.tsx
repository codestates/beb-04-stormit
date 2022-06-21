import React from "react";
import styled from "styled-components";

const Base = styled.div``;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DropDown: React.FC<Props> = ({ children, ...props }) => {
  return <Base {...props}>DropDown</Base>;
};

export default DropDown;
