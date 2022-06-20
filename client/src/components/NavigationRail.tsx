import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import FloatingIconButton from "./common/FloatingIconButton";
import CreateIcon from "@mui/icons-material/Create";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

const Base = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  position: sticky;
  top: 0;
  width: 4.5rem; // 72px
  height: calc(100vh - 3.5rem);
  padding: 1rem; // 16px
  border-right: 1px solid ${palette.gray[200]};

  .navigation-logo-wrapper {
    display: flex;
    align-items: center;

    transform: translateX(-0.75rem);
    cursor: pointer;

    .navigation-logo {
      background-color: ${palette.gray[200]};
      width: 2rem; // 32px
      height: 2rem; // 32px
      border-radius: 50%;
    }
  }

  .navigation-icon {
    cursor: pointer;
  }
`;

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {}

const NavigationRail: React.FC<Props> = ({ ...props }) => {
  return (
    <Base {...props}>
      <div className="navigation-logo-wrapper">
        <ArrowRightIcon />
        <div className="navigation-logo" />
      </div>
      <FloatingIconButton>
        <CreateIcon />
      </FloatingIconButton>
      <MailIcon className="navigation-icon" />
      <SendIcon className="navigation-icon" />
      <SearchIcon className="navigation-icon" />
      <PersonIcon className="navigation-icon" />
    </Base>
  );
};

export default NavigationRail;
