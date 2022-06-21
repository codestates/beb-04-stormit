import React from "react";
import styled from "styled-components";

const Base = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media screen and (min-width: 77.5rem) {
  }
`;

const Post: React.FC = () => {
  return <Base></Base>;
};

export default Post;
