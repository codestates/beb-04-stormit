import React, { useState } from "react";
import styled from "styled-components";
import { deleteCommentAPI, updateCommentAPI } from "../lib/api/post";
import { useSelector } from "../store";
import palette from "../styles/palette";
import Button from "./common/Button";
import Divider from "./common/Divider";
import Textarea from "./common/Textarea";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 8px

  .comment-contents {
    padding-bottom: 0.5rem;
  }

  .comment-metadata {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 1rem; // 16px
  }

  .comment-metadata-left-area {
    display: flex;
    gap: 0.5rem; // 8px
  }

  .comment-metadata-right-area {
    display: flex;
    gap: 0.5rem; // 8px

    height: 1rem; // 16px
    font-size: 0.875rem; // 14px
    color: ${palette.gray[700]};
  }

  .comment-author {
    color: ${palette.gray[600]};
    font-size: 0.875rem; // 14px
    font-weight: 500;
  }

  .comment-date {
    color: ${palette.gray[500]};
    font-size: 0.875rem; // 14px
  }

  .comment-edit,
  .comment-delete {
    cursor: pointer;
  }

  .edit-textarea {
    height: 4rem;
  }

  .submit-button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

interface Props {
  nickname: string;
  createdAt: string;
  commentContents: string;
  commentId: number;
}

const CommentCard: React.FC<Props> = ({
  nickname,
  createdAt,
  commentContents,
  commentId,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(commentContents);

  const loggedUserNickname = useSelector((state) => state.user.nickname);

  const isMyComment = loggedUserNickname === nickname;

  const onChangeEditText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(event.target.value);
  };

  const onClickEditButton = () => {
    setEditMode((editMode) => !editMode);
  };

  const onClickSubmitButton = async () => {
    try {
      const body = {
        comment_id: commentId,
        comment_content: editText,
      };

      await updateCommentAPI(body);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteButton = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteCommentAPI(commentId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Base>
      <Divider />
      <div className="comment-metadata">
        <div className="comment-metadata-left-area">
          <p className="comment-author">{nickname}</p>
          <Divider orientation="vertical" />
          <p className="comment-date">{createdAt}</p>
        </div>
        <div className="comment-metadata-right-area">
          {isMyComment && (
            <>
              <p className="comment-edit" onClick={onClickEditButton}>
                {editMode ? "취소" : "수정"}
              </p>
              <Divider orientation="vertical" />
              <p className="comment-delete" onClick={onClickDeleteButton}>
                삭제
              </p>
            </>
          )}
        </div>
      </div>
      {editMode && (
        <>
          <Textarea
            className="edit-textarea"
            value={editText}
            onChange={onChangeEditText}
          />
          <div className="submit-button-wrapper">
            <Button variant="contained" onClick={onClickSubmitButton}>
              수정하기
            </Button>
          </div>
        </>
      )}
      {!editMode && <p className="comment-contents">{commentContents}</p>}
    </Base>
  );
};

export default CommentCard;
