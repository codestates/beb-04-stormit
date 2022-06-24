import React, { useState } from "react";
import styled from "styled-components";
import CommentCard from "../components/CommentCard";
import Checkbox from "../components/common/Checkbox";
import Skeleton from "../components/common/Skeleton";
import PostDetail from "./PostDetail";

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
  return <PostDetail />;
};

export default Test;
