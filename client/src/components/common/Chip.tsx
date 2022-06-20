import React from "react";
import styled, { css } from "styled-components";
import theme from "../../styles/theme";

const getChipSize = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return css`
        font-size: 0.75rem; // 12px
        // width: 3.75rem; // 60px
        height: 1.5rem; // 24px
      `;
    case "medium":
      return css`
        font-size: 0.875rem; // 14px
        // width: 5rem; // 80px
        height: 2rem; // 32px
      `;
    case "large":
      return css`
        font-size: 1rem; // 16px
        // width: 6.25rem; // 100px
        height: 2.5rem; // 40px
      `;
  }
};

interface BaseProps {
  size?: "small" | "medium" | "large";
}

const Base = styled.div<BaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem; // 14px
  // width: 5rem; // 80px
  height: 2rem; // 32px
  padding: 0.25rem 0.75rem; // 4px 12px
  border-radius: 1.5rem; // 24px
  background-color: ${theme.primary};
  color: white;

  ${({ size }) => getChipSize(size)}
`;

interface Props {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const Chip: React.FC<Props> = ({ children, size, ...props }) => {
  return (
    <Base size={size} {...props}>
      {children}
    </Base>
  );
};

export default Chip;
