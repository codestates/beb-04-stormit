import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconButton from "../components/common/IconButton";
import CommunityPostCard from "../components/CommunityPostCard";
import NavigationRail from "../components/NavigationRail";
import palette from "../styles/palette";
import EditIcon from "@mui/icons-material/Edit";
import Input from "../components/common/Input";
import { updateNameAPI } from "../lib/api/user";
import { useDispatch, useSelector } from "../store";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { userActions } from "../store/userSlice";
import Divider from "../components/common/Divider";
import Tabs from "../components/common/Tabs";
import Tab from "../components/common/Tab";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import useAuthenticate from "../hooks/useAuthenticate";
import { useNavigate } from "react-router-dom";
import { getAllPostAPI } from "../lib/api/post";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .navigation-rail {
    display: none;
  }

  .profile-image-area {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 4rem 1rem;
  }

  .profile-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    margin-right: 1rem;
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
    position: absolute;
    color: ${palette.gray[900]};
    display: none;
  }

  .contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .my-posts {
    font-weight: 500;
    font-size: 1.25rem;
    margin: 1rem;
    margin-top: 2rem;
  }

  .empty-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    height: 8rem;
    color: ${palette.gray[400]};
  }

  .empty-content-icon {
    width: 4rem;
    height: 4rem;
  }

  .profile-nickname-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
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
  }
`;

const Mypage: React.FC = () => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("나의 글");
  const [myPostList, setMyPostList] = useState<GetAllPostsResponseType>([]);

  const nickname = useSelector((state) => state.user.nickname);

  const dispatch = useDispatch();

  const authenticate = useAuthenticate();

  const navigate = useNavigate();

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
    alert("현재 프로필 이미지 변경은 지원하지 않습니다.");
  };

  // 인증
  useEffect(() => {
    console.log("@@@ mypage authenticate @@@");
    try {
      authenticate();
    } catch (error) {
      navigate("/login");
    }
  }, [authenticate, navigate]);

  // 게시물 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPostAPI();

        const myPostsData = response.data.filter(
          (post) => post.nickname === nickname
        );
        setMyPostList(myPostsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [nickname]);

  return (
    <Base>
      <NavigationRail className="navigation-rail" />
      <section className="contents">
        <div className="profile-image-area">
          <div className="profile-image-wrapper" onClick={onClickProfileImage}>
            <img className="profile-image" src="/profile-image.png" alt="" />
            <CameraAltIcon className="profile-image-edit-button" />
          </div>
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
        <Tabs>
          <Tab
            label="내 게시글"
            active={activeTab === "나의 글"}
            onClick={() => setActiveTab("나의 글")}
          />
          <Tab
            label="내 댓글"
            active={activeTab === "나의 댓글"}
            onClick={() => setActiveTab("나의 댓글")}
          />
        </Tabs>
        <Divider />
        {activeTab === "나의 글" && (
          <>
            <p className="my-posts">내가 작성한 게시글</p>
            {myPostList.map((post, index) => (
              <CommunityPostCard
                key={index}
                postId={post.post_id}
                title={post.post_title}
                commentCount={post.comment_count}
                nickname={post.nickname}
                createdAt={post.created_at}
                views={post.views}
                likes={post.likes}
              />
            ))}
            {myPostList.length === 0 && (
              <div className="empty-content">
                <ManageSearchIcon className="empty-content-icon" />
                <p>작성한 게시글이 없습니다.</p>
              </div>
            )}
          </>
        )}
        {activeTab === "나의 댓글" && (
          <>
            <p className="my-posts">내가 작성한 댓글</p>
            {/* fetch commments */}
            <div className="empty-content">
              <ManageSearchIcon className="empty-content-icon" />
              <p>작성한 댓글이 없습니다.</p>
            </div>
          </>
        )}
      </section>
    </Base>
  );
};

export default Mypage;
