import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Divider: React.FC = () => {
  return <Base />;
};

const Base = styled.div`
  height: 1px;
  background-color: ${palette.gray[200]};
`;

export default Divider;
