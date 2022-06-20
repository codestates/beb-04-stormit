import React from "react";
import styled from "styled-components";
import Dialog from "../components/common/Dialog";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ToggleButton from "../components/common/ToggleButton";
import SearchInput from "../components/SearchInput";

const Base = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px

  padding: 1rem; // 16px
`;

const Test: React.FC = () => {
  return (
    <Base>
      <Dialog>asdasdsd</Dialog>
      <SearchInput />
      <LoadingSpinner />
      <ToggleButton />
    </Base>
  );
};

export default Test;
