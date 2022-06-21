import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

interface BaseProps {
  width?: string;
  height?: string;
}

const Base = styled.textarea<BaseProps>`
  height: 2.5rem; // 40px
  border: 1px solid ${palette.gray[200]};
  outline: none;
  border-radius: 0.25rem; // 4px
  padding: 0.5rem; // 8px

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  height?: string;
}

const Textarea: React.FC<Props> = ({ width, height, ...props }) => {
  return <Base width={width} height={height} {...props} />;
};

export default Textarea;
