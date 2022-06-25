import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "../components/common/IconButton";
import CommunityPostCard from "../components/CommunityPostCard";
import NavigationRail from "../components/NavigationRail";
import { parseDate } from "../lib/utils";
import palette from "../styles/palette";
import EditIcon from "@mui/icons-material/Edit";
import Input from "../components/common/Input";
import { updateNameAPI } from "../lib/api/user";
import { useDispatch, useSelector } from "../store";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { userActions } from "../store/userSlice";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .navigation-rail {
    display: none;
  }

  .profile-legend {
    position: relative;
    background-color: ${palette.gray[100]};
    height: 12.5rem; // 200px
    margin-bottom: 4rem; // 32px
  }

  .body {
    display: flex;
  }

  .contents-area {
    margin: 1rem; // 16px

    display: flex;
    flex-direction: column;
    gap: 1rem; // 16px
  }

  .profile-image-wrapper {
    position: absolute;
    top: 7rem;
    left: 2rem;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      opacity: 0.7;

      .profile-image-edit-button {
        display: block;
      }
    }
  }

  .profile-image {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  .profile-image-edit-button {
    color: ${palette.gray[900]};
    position: absolute;
    top: 3.7rem;
    left: 3.3rem;
    display: none;
  }

  .contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .my-posts {
    font-weight: 500;
  }

  .profile-nickname-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px

    margin-bottom: 3rem; // 48px
  }

  .profile-nickname {
    font-size: 2rem; // 32px
    font-weight: 500;
  }

  .profile-nickname-input {
    width: 11rem; // 176px
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    .contents {
      margin: 0 auto;
      width: 37.5rem; // 600px
    }
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    .contents {
      width: 52.5rem; // 840px
    }

    .navigation-rail {
      display: flex;
    }

    .profile-image {
    }
  }
`;

const Mypage: React.FC = () => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);

  const nickname = useSelector((state) => state.user.nickname);

  const dispatch = useDispatch();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onClickEditButton = () => {
    setEditMode(true);
  };

  const submitNickname = async () => {
    const body = { nickname: input };

    try {
      await updateNameAPI(body);
      setEditMode(false);
      dispatch(userActions.setNickname(input));
    } catch (error) {
      console.log(error);
    }
  };

  const onEnterNickname = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") submitNickname();
  };

  const onClickProfileImage = () => {
    alert("현재 프로필 변경은 지원하지 않습니다.");
  };

  return (
    <Base>
      <NavigationRail className="navigation-rail" />
      <section className="contents">
        <div className="profile-legend">
          <div className="profile-image-wrapper" onClick={onClickProfileImage}>
            <img className="profile-image" src="/profile-image.png" alt="" />
            <CameraAltIcon className="profile-image-edit-button" />
          </div>
        </div>
        <div className="contents-area">
          <div className="profile-nickname-wrapper">
            {!editMode && (
              <>
                <p className="profile-nickname">{nickname}</p>
                <IconButton>
                  <EditIcon onClick={onClickEditButton} />
                </IconButton>
              </>
            )}
            {editMode && (
              <>
                <Input
                  className="profile-nickname-input"
                  value={input}
                  onChange={onChangeInput}
                  onKeyDown={onEnterNickname}
                />
                <IconButton variant="contained" onClick={submitNickname}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => setEditMode(false)}>
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </div>
          <p className="my-posts">내가 작성한 게시글</p>
          <CommunityPostCard
            postId={1}
            title="나의 글"
            commentCount={2}
            nickname="노논"
            createdAt={parseDate(new Date())}
          />
          <CommunityPostCard
            postId={1}
            title="나의 글"
            commentCount={2}
            nickname="노논"
            createdAt={parseDate(new Date())}
          />
          <CommunityPostCard
            postId={1}
            title="나의 글"
            commentCount={2}
            nickname="노논"
            createdAt={parseDate(new Date())}
          />
          <CommunityPostCard
            postId={1}
            title="나의 글"
            commentCount={2}
            nickname="노논"
            createdAt={parseDate(new Date())}
          />
        </div>
      </section>
    </Base>
  );
};

export default Mypage;
