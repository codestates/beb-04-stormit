import React, { useState } from "react";
import styled from "styled-components";
import CommentCard from "../components/CommentCard";
import Checkbox from "../components/common/Checkbox";
import Skeleton from "../components/common/Skeleton";

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
  const [checked, setChecked] = useState(false);

  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Base>
      <CommentCard
        nickname="노논"
        createdAt="0000년 00월 00일 00:00:00"
        commentContents="댓글 아무거나 입력해"
        commentId={2}
      />
      <CommentCard
        nickname="노논"
        createdAt="0000년 00월 00일 00:00:00"
        commentContents="댓글 아무거나 입력해"
        commentId={2}
      />
      <CommentCard
        nickname="노논"
        createdAt="0000년 00월 00일 00:00:00"
        commentContents="댓글 아무거나 입력해"
        commentId={2}
      />
      <CommentCard
        nickname="노논"
        createdAt="0000년 00월 00일 00:00:00"
        commentContents="댓글 아무거나 입력해"
        commentId={2}
      />
      <Checkbox checked={checked} onChange={onChangeCheckbox} />

      <Skeleton width="500px" height="200px" />
      <Skeleton width="200px" height="200px" variant="circular" />
      <Skeleton width="100px" variant="text" />
    </Base>
  );
};

export default Test;
