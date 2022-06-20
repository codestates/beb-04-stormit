import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "./common/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  padding: 1rem; // 16px
  background-color: ${theme.primary};
  height: 3.5rem; // 56px

  .header-left {
    cursor: pointer;
  }

  .header-right {
    display: flex;
    gap: 1rem; // 16px
    cursor: pointer;
  }
`;

const Header: React.FC = () => {
  return (
    <Base>
      <div className="header-left">
        <MenuIcon />
      </div>
      <div className="header-right">
        <SearchIcon />
        <PermIdentityIcon />
      </div>
    </Base>
  );
};

export default Header;
