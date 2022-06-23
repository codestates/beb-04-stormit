import { css } from "styled-components";
import styled from "styled-components";
import React from "react";
import theme from "../../styles/theme";
import palette from "../../styles/palette";

const getButtonVariant = (variant?: "text" | "contained" | "outlined") => {
  switch (variant) {
    case "text":
      return css`
        color: ${theme.primary};

        &:hover {
          background-color: ${palette.blue[50]};
        }
      `;
    case "contained":
      return css`
        background-color: ${theme.primary};
        color: white;

        &:hover {
          background-color: ${palette.blue[600]};
        }
      `;
    case "outlined":
      return css`
        background-color: white;
        border: 1px solid ${theme.primary};
        color: ${theme.primary};

        &:hover {
          background-color: ${palette.blue[50]};
        }
      `;
  }
};

const getButtonDisabled = (disabled?: boolean) => {
  switch (disabled) {
    case true:
      return css`
        background-color: ${palette.gray[300]};
        color: ${palette.gray[400]};
        cursor: default;

        &:hover {
          background-color: ${palette.gray[300]};
        }
      `;
  }
};

const getButtonSize = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return css`
        height: 2rem; // 36px
        padding: 0.5rem 1.2rem; // 8px 19.2px
        font-size: 0.75rem; // 12px
      `;
    case "medium":
      return css`
        height: 2.5rem; // 40px
        padding: 0.625rem 1.5rem; // 10px 24px
        font-size: 0.875rem; // 14px
      `;
    case "large":
      return css`
        height: 3rem; // 48px
        padding: 0.75rem 1.8rem; // 12px 28.8px
        font-size: 1rem; // 16px
      `;
  }
};

interface BaseProps {
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Base = styled.button<BaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem; // 8px

  color: ${theme.primary};
  height: 2.5rem; // 40px
  padding: 0.625rem 1.5rem; // 10px 24px
  font-size: 0.875rem; // 14px
  font-weight: 500;
  border-radius: 10px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${palette.blue[100]};
  }

  // 아이콘이 있는 경우 버튼 사이즈에 따라 패딩이 달라져야함;

  ${({ startIcon }) =>
    startIcon &&
    css`
      padding-left: 1rem; // 16px
    `};

  ${({ endIcon }) =>
    endIcon &&
    css`
      padding-right: 1rem; // 16px
    `};

  ${({ variant }) => getButtonVariant(variant)};

  ${({ disabled }) => getButtonDisabled(disabled)};

  ${({ size }) => getButtonSize(size)};
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  children,
  variant,
  disabled,
  size,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <Base
      variant={variant}
      disabled={disabled}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {startIcon && startIcon}
      {children}
      {endIcon && endIcon}
    </Base>
  );
};

export default Button;
