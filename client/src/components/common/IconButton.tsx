import { css } from "styled-components";
import styled from "styled-components";
import React from "react";
import palette from "../../styles/palette";
import theme from "../../styles/theme";

const getIconButtonColor = (color?: "default" | "primary") => {
  switch (color) {
    case "default":
      return css`
        color: ${palette.gray[500]};

        &:hover {
          background-color: ${palette.gray[100]};
        }
      `;
    case "primary":
      return css`
        color: ${theme.primary};

        &:hover {
          background-color: ${palette.blue[100]};
        }
      `;
  }
};

const getIconButtonDisabled = (disabled?: boolean) => {
  switch (disabled) {
    case true:
      return css`
        color: ${palette.gray[300]};
        cursor: default;

        &:hover {
          background-color: transparent;
        }
      `;
  }
};

interface BaseProps {
  color?: "default" | "primary";
  disabled?: boolean;
}

const Base = styled.button<BaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  color: ${palette.gray[500]};
  width: 2.5rem; // 40px
  height: 2.5rem; // 40px
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${palette.gray[100]};
  }

  ${({ color }) => getIconButtonColor(color)};

  ${({ disabled }) => getIconButtonDisabled(disabled)}
`;

interface Props {
  children: React.ReactNode;
  color?: "default" | "primary";
  disabled?: boolean;
}

const IconButton: React.FC<Props> = ({
  children,
  color,
  disabled,
  ...props
}) => {
  return (
    <Base color={color} disabled={disabled} {...props}>
      {children}
    </Base>
  );
};

export default IconButton;
