import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Chip from "../components/common/Chip";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { submitPostAPI } from "../lib/api/post";
import { staticCommunityList } from "../lib/staticData";
import { translateCommunityName } from "../lib/utils";
import { useSelector } from "../store";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

  const email = useSelector((state) => state.user.email);
  const currentCommunity = useSelector(
    (state) => state.community.currentCommunity
  );

  const navigate = useNavigate();

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
      alert("필수 항목을 입력해주세요");
      return;
    }

    const body = {
      username: email,
      post_content: contents,
      post_title: title,
      board_title: community,
    };

    try {
      await submitPostAPI(body);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  // 특정 게시판에서 글쓰기를 누르면 해당하는 게시판이 초기값으로 선택되도록 합니다
  useEffect(() => {
    if (currentCommunity) setCommunity(currentCommunity);
  }, [currentCommunity]);

  return (
    <Base>
      <p className="post-heading">새 글 등록</p>
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
          console.log(data);
          setContents(data);
        }}
      />
      <div className="community-wrapper">
        <Chip>Tag</Chip>
        <Chip>Community</Chip>
        <Chip>Long Community Name</Chip>
      </div>
      <div className="post-button-wrapper">
        <Button variant="outlined" onClick={onClickCancelButton}>
          돌아가기
        </Button>
        <Button variant="contained" onClick={onClickSubmitButton}>
          등록하기
        </Button>
      </div>
    </Base>
  );
};

export default Post;
