import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const Base = styled.label`
  position: relative;
  display: inline-block;
  width: 3rem; // 48px
  height: 1.5rem; // 24px
  cursor: pointer;

  .input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  // 배경
  .slider {
    position: absolute;
    border-radius: 34px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;

    &:hover {
      background-color: #4c505c;
    }
  }

  // 움직이는 버튼
  .slider:before {
    position: absolute;
    border-radius: 50%;
    content: "";
    height: 0.875rem; // 14px
    width: 0.875rem; // 14px
    left: 6px;
    bottom: 5px;
    background-color: white;
    transition: 0.4s;
  }

  .input:checked + .slider {
    background-color: ${theme.primary};
  }

  .input:checked + .slider:before {
    transform: translateX(1.375rem); // 22px
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

const ToggleButton: React.FC<Props> = ({ checked, ...props }) => {
  return (
    <Base>
      <input
        className="input"
        type="checkbox"
        checked={checked}
        readOnly
        {...props}
      />
      <span className="slider" />
    </Base>
  );
};

export default ToggleButton;
