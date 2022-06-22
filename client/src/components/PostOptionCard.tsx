import React from "react";
import styled from "styled-components";
import Divider from "./common/Divider";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

const Base = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 2.5rem; // 40px
  padding: 0.5rem; // 8px
  gap: 0.5rem; // 8px
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .heading-option-dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0.25rem; // 4px
  }

  .heading-option {
    font-size: 0.9rem;
  }

  .arrow-down-icon {
    width: 1rem;
    height: 1rem;
  }
`;

const PostOptionCard: React.FC = () => {
  return (
    <Base>
      <div className="heading-option-dropdown">
        <span className="heading-option">H1</span>
        <KeyboardArrowDownIcon className="arrow-down-icon" />
      </div>
      <Divider orientation="vertical" />
      <FormatBoldIcon />
      <FormatListBulletedOutlinedIcon />
      <Divider orientation="vertical" />
      <ImageOutlinedIcon />
    </Base>
  );
};

export default PostOptionCard;
