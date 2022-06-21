import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

interface BaseProps {
  color?: string;
}

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid red;
  position: fixed;

  bottom: 1rem;
  left: 0;
  right: 0;

  .snackbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: white;
    width: 11.75rem; // 188px
    height: 3.5rem; // 56px
    padding: 1rem; // 16px
    background-color: #36a420;

    background-color: ${({ color }) => color};
  }
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
}

const Snackbar: React.FC<Props> = ({ children, color, ...props }) => {
  return (
    <Base color={color} {...props}>
      <div className="snackbar">
        <p className="snackbar-text">{children}</p>
        <CloseIcon />
      </div>
    </Base>
  );
};

export default Snackbar;
