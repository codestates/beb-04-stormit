import React, { useState } from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const getTooltipPosition = (position?: string) => {
  switch (position) {
    case "right":
      return css`
        right: -4.5rem;
        top: 50%;
        transform: translateY(-50%);
      `;
    case "bottom":
      return css`
        top: 3rem;
        right: -0.5rem;
      `;
  }
};

interface BaseProps {
  showTooltip: boolean;
  position?: string;
}

const Base = styled.div<BaseProps>`
  .tooltip {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 4rem;
    height: 2rem;
    background-color: ${palette.gray[600]};
    color: white;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    position: absolute;
    opacity: 0;
    animation: visible 0.2s;

    ${({ position }) => getTooltipPosition(position)};
  }

  .target {
    position: relative;
    display: flex;
  }

  ${({ showTooltip }) =>
    showTooltip &&
    css`
      .tooltip {
        opacity: 1;
      }
    `}

  @keyframes visible {
    from {
      opacity: 0;
    }
    to {
      opcaity: 1;
    }
  }
`;

interface Props {
  children: React.ReactNode;
  text: string;
  position?: string;
}

const Tooltip: React.FC<Props> = ({ children, text, position }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let timer: any;

  const onMouseEnter = () => {
    timer = setTimeout(() => {
      setShowTooltip(true);
    }, 500);
  };

  const onMouseLeave = () => {
    clearTimeout(timer);
    setShowTooltip(false);
  };

  return (
    <Base showTooltip={showTooltip} position={position}>
      <div
        className="target"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        {children}
        {showTooltip && <div className="tooltip">{text}</div>}
      </div>
    </Base>
  );
};

export default Tooltip;
