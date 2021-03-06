import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { submitPostAPI } from "../lib/api/post";
import { staticCommunityList } from "../lib/staticData";
import { translateCommunityName } from "../lib/utils";
import { useSelector } from "../store";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useAuthenticate from "../hooks/useAuthenticate";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px
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
    height: 400px;
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    max-width: 52.5rem;
    margin: 2rem auto;
  }
`;

const Post: React.FC = () => {
  const [community, setCommunity] = useState(staticCommunityList[0]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const userId = useSelector((state) => state.user.userId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const currentCommunity = useSelector(
    (state) => state.community.currentCommunity
  );

  const navigate = useNavigate();

  const authenticate = useAuthenticate();

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
    // ??????????????? ?????????
    if (!(title && contents)) {
      alert("?????? ????????? ??????????????????");
      return;
    }

    if (title.length > 100) {
      alert("????????? 100??? ????????? ??????????????????.");
      return;
    }

    if (contents.length > 1000) {
      alert("????????? ?????? ?????????. 1000??? ????????? ??????????????????");
      return;
    }

    const body = {
      user_id: userId,
      post_content: contents,
      post_title: title,
      board_title: community,
    };

    console.log(body);

    try {
      await submitPostAPI(body);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  // ??????
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

  // ?????? ??????????????? ???????????? ????????? ???????????? ???????????? ??????????????? ??????????????? ?????????
  useEffect(() => {
    if (currentCommunity) setCommunity(currentCommunity);
  }, [currentCommunity]);

  return (
    <Base>
      <p className="post-heading">??? ??? ??????</p>
      <Select value={community} onChange={onChangeCommunity}>
        {staticCommunityList.map((community, index) => (
          <option key={index} value={community}>
            {translateCommunityName(community)}
          </option>
        ))}
      </Select>
      <Input placeholder="??????" value={title} onChange={onChangeTitle} />
      <CKEditor
        config={{
          placeholder: "????????? ???????????????.",
        }}
        editor={ClassicEditor}
        data={contents}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          console.log(data);
          setContents(data);
        }}
      />

      <div className="post-button-wrapper">
        <Button variant="outlined" onClick={onClickCancelButton}>
          ????????????
        </Button>
        <Button variant="contained" onClick={onClickSubmitButton}>
          ????????????
        </Button>
      </div>
    </Base>
  );
};

export default Post;
