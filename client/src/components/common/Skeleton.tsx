import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const getSkeletonVariant = (variant?: "text" | "circular" | "rectangular") => {
  switch (variant) {
    case "text":
      return css`
        height: 0.875rem; // 14px
        border-radius: 0.25rem; // 4px
      `;
    case "circular":
      return css`
        border-radius: 50%;
      `;
    case "rectangular":
      return;
  }
};

interface BaseProps {
  width?: string;
  height?: string;
  variant?: "text" | "circular" | "rectangular";
}

const Base = styled.div<BaseProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${palette.gray[200]};

  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);

  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  ${({ variant }) => getSkeletonVariant(variant)};
`;

interface Props {
  width?: string;
  height?: string;
  variant?: "text" | "circular" | "rectangular";
}

const Skeleton: React.FC<Props> = ({ width, height, variant }) => {
  return <Base width={width} height={height} variant={variant} />;
};

export default Skeleton;
