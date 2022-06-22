import React from "react";
import styled from "styled-components";
import CommentCard from "../components/CommentCard";

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
    </Base>
  );
};

export default Test;
