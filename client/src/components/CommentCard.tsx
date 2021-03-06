import React, { useState } from "react";
import styled from "styled-components";
import { deleteCommentAPI, updateCommentAPI } from "../lib/api/post";
import { useSelector } from "../store";
import palette from "../styles/palette";
import Button from "./common/Button";
import Divider from "./common/Divider";
import IconButton from "./common/IconButton";
import Textarea from "./common/Textarea";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "./common/Menu";
import MenuItem from "./common/MenuItem";

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

  .comment-profile-image-wrapper {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }

  .comment-profile-image {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  .comment-metadata-left-area {
    display: flex;
    align-items: center;
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
    align-items: center;
    gap: 1rem;
    color: ${palette.gray[400]};
  }

  .comment-dropdown-wrapper {
    position: relative;
  }

  .comment-dropdown {
    top: 2.8rem;
    right: 0;
  }
`;

interface Props {
  nickname: string;
  createdAt: string;
  commentContents: string;
  commentId: number;
  refresh?: () => void;
}

const CommentCard: React.FC<Props> = ({
  nickname,
  createdAt,
  commentContents,
  commentId,
  refresh,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(commentContents);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const loggedUserNickname = useSelector((state) => state.user.nickname);

  const isMyComment = loggedUserNickname === nickname;

  const toggleDropdownMenu = () => {
    setDropdownOpen((dropdownOpen) => !dropdownOpen);
  };

  const onChangeEditText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(event.target.value);
  };

  const onClickEditButton = () => {
    setEditMode((editMode) => !editMode);
  };

  const onClickDeleteButton = async () => {
    if (window.confirm("?????????????????????????")) {
      try {
        await deleteCommentAPI(commentId);
        if (refresh) refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onClickSubmitButton = async () => {
    if (editText.length > 200) {
      alert("?????? ?????? ?????? ?????? ?????????????????????.");
      return;
    }

    const body = {
      comment_content: editText,
    };

    try {
      await updateCommentAPI(commentId, body);
      setEditMode(false);
      if (refresh) refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Base>
      <Divider />
      <div className="comment-metadata">
        <div className="comment-metadata-left-area">
          <div className="comment-profile-image-wrapper">
            <img
              className="comment-profile-image"
              src="/profile-image.png"
              alt=""
            />
          </div>
          <p className="comment-author">{nickname}</p>
          <Divider orientation="vertical" />
          <p className="comment-date">{createdAt}</p>
        </div>
        <div className="comment-metadata-right-area">
          {isMyComment && (
            <>
              <p className="comment-edit" onClick={onClickEditButton}>
                {editMode ? "??????" : "??????"}
              </p>
              <Divider orientation="vertical" />
              <p className="comment-delete" onClick={onClickDeleteButton}>
                ??????
              </p>
            </>
          )}
          {!isMyComment && (
            <div className="comment-dropdown-wrapper">
              <IconButton onClick={toggleDropdownMenu}>
                <MoreVertIcon />
              </IconButton>
              {dropdownOpen && (
                <Menu
                  className="comment-dropdown"
                  onClose={() => setDropdownOpen(false)}
                >
                  <MenuItem
                    label="??????"
                    onClick={() => alert("??????????????? ?????? ????????? ????????????.")}
                  />
                </Menu>
              )}
            </div>
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
            <p>({editText.length}/200???)</p>
            <Button variant="contained" onClick={onClickSubmitButton}>
              ????????????
            </Button>
          </div>
        </>
      )}
      {!editMode && <p className="comment-contents">{commentContents}</p>}
    </Base>
  );
};

export default CommentCard;
