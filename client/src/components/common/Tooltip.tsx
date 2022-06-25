import React, { useState } from "react";
import styled, { css } from "styled-components";

interface BaseProps {
  showTooltip: boolean;
}

const Base = styled.div<BaseProps>`
  .tooltip {
    width: 50px;
    height: 50px;
    background-color: red;

    display: none;
  }

  ${({ showTooltip }) =>
    showTooltip &&
    css`
      .tooltip {
        display: flex;
      }
    `}
`;

interface Props {
  children: React.ReactNode;
}

const Tooltip = React.forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  const [showTooltip, setShowTooptip] = useState(false);

  return (
    <Base showTooltip={showTooltip}>
      {children}
      <div
        ref={ref}
        onMouseOver={() => setShowTooptip(true)}
        className="tooltip"
      >
        123
      </div>
    </Base>
  );
});

export default Tooltip;
