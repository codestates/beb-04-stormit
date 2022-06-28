import React from "react";
import styled from "styled-components";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 7.5rem;
  background-color: white;

  z-index: 999;

  position: absolute;

  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.16);
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose: () => void;
}

const Menu: React.FC<Props> = ({ children, onClose, ...props }) => {
  return (
    <Base {...props} onClick={onClose}>
      {children}
    </Base>
  );
};

export default Menu;
