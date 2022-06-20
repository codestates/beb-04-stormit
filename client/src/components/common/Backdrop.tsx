import React from "react";
import styled from "styled-components";

const Base = styled.div`
  background-color: black;
  opacity: 0.4;
  position: absolute;
  top: 3.5rem; // 56px
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 998;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Backdrop: React.FC<Props> = ({ ...props }) => {
  return <Base {...props} />;
};

export default Backdrop;
