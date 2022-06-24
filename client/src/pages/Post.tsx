import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Chip from "../components/common/Chip";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Textarea from "../components/common/Textarea";
import PostOptionCard from "../components/PostOptionCard";
import { submitPostAPI } from "../lib/api/post";
import { boardList } from "../lib/staticData";
import { useSelector } from "../store";

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

  // 1240px
  @media screen and (min-width: 77.5rem) {
    max-width: 52.5rem;
    margin: 2rem auto;
  }
`;

const Post: React.FC = () => {
  const [community, setCommunity] = useState(boardList[0]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const email = useSelector((state) => state.user.email);

  const navigate = useNavigate();

  const onChangeCommunity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCommunity(event.target.value);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
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

  return (
    <Base>
      <p className="post-heading">새 글 등록</p>
      <Select value={community} onChange={onChangeCommunity}>
        {boardList.map((board, index) => (
          <option key={index} value={board}>
            {board}
          </option>
        ))}
      </Select>
      <Input placeholder="제목" value={title} onChange={onChangeTitle} />
      <PostOptionCard />
      <Textarea
        height="25rem"
        placeholder="내용을 입력해주세요."
        value={contents}
        onChange={onChangeContents}
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
