import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { updatePostAPI } from "../lib/api/post";
import { staticCommunityList } from "../lib/staticData";
import { getLastPathname, translateCommunityName } from "../lib/utils";
import { useSelector } from "../store";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useAuthenticate from "../hooks/useAuthenticate";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px

  height: 100vh;
  margin: 2rem 1rem; // 32px 16px

  .post-heading {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .community-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem; // 8px
  }

  .post-button-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    height: 25rem;
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    max-width: 52.5rem;
    margin: 2rem auto;
  }
`;

const Edit: React.FC = () => {
  const [community, setCommunity] = useState("공지사항");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const prevTitle = useSelector((state) => state.post.title);
  const prevContents = useSelector((state) => state.post.contents);
  const prevCommunity = useSelector((state) => state.post.community);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();

  const location = useLocation();

  const authenticate = useAuthenticate();

  const postId = Number(getLastPathname(location.pathname));

  const onChangeCommunity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCommunity(event.target.value);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onClickCancelButton = () => {
    navigate(-1);
  };

  const onClickSubmitButton = async () => {
    // 밸리데이션 피드백
    if (!(title && contents)) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    const body = {
      board_title: community,
      post_title: title,
      post_content: contents,
    };

    try {
      await updatePostAPI(postId, body);
      navigate(`/community/post/${postId}`);
    } catch (error) {
      alert("무언가 잘못되었습니다. 다시 시도해주세요.");
      console.log(error);
    }
  };

  useEffect(() => {
    const protectPage = async () => {
      try {
        await authenticate();
        !isLoggedIn && navigate("/login", { replace: true });
      } catch (error) {
        console.log(error);
      }
    };

    protectPage();
  }, [authenticate, navigate, isLoggedIn]);

  useEffect(() => {
    setTitle(prevTitle);
    setCommunity(prevCommunity);
    setContents(prevContents);
  }, [prevCommunity, prevTitle, prevContents]);

  return (
    <Base>
      <p className="post-heading">수정하기</p>
      <Select value={community} onChange={onChangeCommunity}>
        {staticCommunityList.map((community, index) => (
          <option key={index} value={community}>
            {translateCommunityName(community)}
          </option>
        ))}
      </Select>
      <Input placeholder="제목" value={title} onChange={onChangeTitle} />
      <CKEditor
        config={{
          placeholder: "내용을 입력하세요.",
        }}
        editor={ClassicEditor}
        data={contents}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          setContents(data);
        }}
      />
      <div className="post-button-wrapper">
        <Button variant="outlined" onClick={onClickCancelButton}>
          돌아가기
        </Button>
        <Button variant="contained" onClick={onClickSubmitButton}>
          수정하기
        </Button>
      </div>
    </Base>
  );
};

export default Edit;
