import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Chip from "../components/common/Chip";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import PostOptionCard from "../components/PostOptionCard";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px

  height: 100vh;
  margin: 2rem 1rem; // 32px 16px

  .post-heading {
    font-size: 2rem;
  }

  .community-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem; // 8px
  }

  // 1240px
  @media screen and (min-width: 77.5rem) {
    max-width: 52.5rem;
    margin: 2rem auto;
  }
`;

const Post: React.FC = () => {
  return (
    <Base>
      <p className="post-heading">새 글 등록</p>
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
      <Button variant="contained">등록하기</Button>
    </Base>
  );
};

export default Post;