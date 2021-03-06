import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "../store";
import { modalActions } from "../store/modalSlice";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";

const Base = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  padding: 1rem; // 16px
  width: 100%;
  height: 3.5rem; // 56px
  color: black;

  z-index: 999;

  .search-input-left {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem; // 8px

    width: 100%;
  }

  .search-input {
    border: 1px solid red;
    width: 100%;
    outline: none;
    border: none;
    font-size: 1rem;
  }

  .search-input-close-icon {
    cursor: pointer;
  }
`;

const SearchInput: React.FC = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const closeSearchInputModal = () => {
    dispatch(modalActions.closeSearchInputModal());
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputModalRef = useRef<HTMLDivElement | null>(null);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      closeSearchInputModal();
      if (!inputRef.current) return;
      navigate(`/search?keyword=${input}`);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useOutsideClick(inputModalRef, closeSearchInputModal);

  return (
    <Base onKeyDown={onEnter} ref={inputModalRef}>
      <div className="search-input-left">
        <SearchIcon />
        <input
          value={input}
          onChange={onChangeInput}
          className="search-input"
          type="text"
          name="search"
          ref={inputRef}
        />
      </div>
      <CloseIcon
        className="search-input-close-icon"
        onClick={closeSearchInputModal}
      />
    </Base>
  );
};

export default SearchInput;
