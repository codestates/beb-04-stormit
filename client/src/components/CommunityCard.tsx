import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";

const Base = styled.div`
  display: flex;

  padding: 1rem 0;
  cursor: pointer;

  .community-card-image-wrapper {
    width: 4rem; // 64px
    height: 4rem; // 64px
    border-radius: 50%;
    background-color: ${palette.gray[200]};
    margin-right: 1rem;
  }

  .community-card-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .community-card-contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  .community-card-title {
    font-size: 1.25rem;
    font-weight: 500;
  }

  .community-card-description {
    color: ${palette.gray[500]};
    line-height: 1.2;
  }
`;

interface Props {
  title: string;
  description: string;
  image: string;
}

const CommunityCard: React.FC<Props> = ({ title, description, image }) => {
  return (
    <Base>
      <div className="community-card-image-wrapper">
        <img className="community-card-image" src={image} alt="" />
      </div>
      <div className="community-card-contents">
        <p className="community-card-title">{title}</p>
        <p className="community-card-description">{description}</p>
      </div>
    </Base>
  );
};

export default CommunityCard;
