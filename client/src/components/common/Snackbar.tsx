import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import palette from "../../styles/palette";

interface BaseProps {
  color?: string;
  open: boolean;
  autoHideDuration?: number;
}

const Base = styled.div<BaseProps>`
  display: flex;
  visibility: hidden;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;

  ${({ open }) =>
    open &&
    css`
      visibility: visible;
      animation: fadein 0.5s;
    `}

  .snackbar-left-area {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem; // 8px
  }

  .snackbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: white;
    width: 15rem; // 240px
    height: 3.5rem; // 56px
    padding: 1rem; // 16px
    background-color: ${palette.green[500]};

    background-color: ${({ color }) => color};
  }

  .snackbar-close-icon {
    cursor: pointer;
  }

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 1rem;
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      bottom: 1rem;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  autoHideDuration?: number;
  open: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const Snackbar: React.FC<Props> = ({
  children,
  color,
  autoHideDuration,
  open,
  onClose,
  icon,
  ...props
}) => {
  // 수정 필요함
  useEffect(() => {
    if (autoHideDuration && onClose) {
      setTimeout(() => {
        onClose();
      }, autoHideDuration);
    }

    return () => clearTimeout();
  }, [autoHideDuration, onClose]);

  return (
    <Base color={color} open={open} {...props}>
      <div className="snackbar">
        <div className="snackbar-left-area">
          {icon && icon}
          <p className="snackbar-text">{children}</p>
        </div>
        <CloseIcon className="snackbar-close-icon" onClick={onClose} />
      </div>
    </Base>
  );
};

export default Snackbar;
