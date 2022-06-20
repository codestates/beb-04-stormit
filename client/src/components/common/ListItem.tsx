import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Base = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3rem; // 48px
  padding: 0.5rem; // 8px
  font-size: 0.875rem; // 14px
  cursor: pointer;

  .contents {
    padding: 1rem 0.5rem; // 8px
    width: 100%;
    border-radius: 0.25rem; // 4px

    &:hover {
      background-color: ${palette.gray[100]};
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

const ListItem: React.FC<Props> = ({ children }) => {
  return (
    <Base>
      <div className="contents">{children}</div>
    </Base>
  );
};

export default ListItem;
