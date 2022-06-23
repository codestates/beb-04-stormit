import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconButton from "../components/common/IconButton";
import CommunityPostCard from "../components/CommunityPostCard";
import NavigationRail from "../components/NavigationRail";
import { parseDate } from "../lib/utils";
import palette from "../styles/palette";
import EditIcon from "@mui/icons-material/Edit";
import Input from "../components/common/Input";
import { updateNameAPI } from "../lib/api/user";
import { useSelector } from "../store";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

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

  .profile-image {
    position: absolute;
    width: 8rem;
    height: 8rem;
    top: 7rem;
    left: 2rem;

    border-radius: 50%;
    background-color: ${palette.gray[300]};
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

  const email = useSelector((state) => state.user.email);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onClickEditButton = () => {
    setEditMode(true);
  };

  const onClickSubmitButton = async () => {
    const body = { nickname: input };

    try {
      await updateNameAPI(email, body);
    } catch (error) {
      console.log(error);
    }
  };

  // 로그인 되어있지 않으면 로그인 페이지로 이동함
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Base>
      <NavigationRail className="navigation-rail" />
      <section className="contents">
        <div className="profile-legend">
          <div className="profile-image" />
        </div>
        <div className="contents-area">
          <div className="profile-nickname-wrapper">
            {!editMode && (
              <>
                <p className="profile-nickname">스톰잇닉네임</p>
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
                />
                <IconButton variant="contained" onClick={onClickSubmitButton}>
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
