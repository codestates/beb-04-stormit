import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Chip from "../components/common/Chip";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Textarea from "../components/common/Textarea";
import PostOptionCard from "../components/PostOptionCard";

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

const Edit: React.FC = () => {
  const navigate = useNavigate();

  const onClickCancelButton = () => {
    navigate(-1);
  };

  const onClickSubmitButton = () => {
    navigate(-1);
  };

  return (
    <Base>
      <p className="post-heading">수정하기</p>
      <Select>
        <option>공지사항</option>
        <option>커뮤니티</option>
        <option>사는얘기</option>
      </Select>
      <Input placeholder="제목" />
      <PostOptionCard />
      <Textarea height="25rem" placeholder="내용을 입력해주세요." />
      <div className="community-wrapper">
        <Chip>Tag</Chip>
        <Chip>Community</Chip>
        <Chip>Long Community Name</Chip>
        <Chip>Random</Chip>
        <Chip>Select</Chip>
        <Chip>One</Chip>
        <Chip>Community</Chip>
      </div>
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
