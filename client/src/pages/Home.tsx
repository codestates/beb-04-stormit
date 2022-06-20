import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Header from "../components/Header";
import { useDispatch, useSelector } from "../store";
import { userActions } from "../store/userSlice";

const Base = styled.section`
  display: flex;
  flex-direction: column;

  .contents {
    margin: 1rem; // 16px
  }
`;

const Home: React.FC = () => {
  const name = useSelector((state) => state.user.name);

  const dispatch = useDispatch();

  dispatch(userActions.setName("hi"));

  return (
    <Base>
      <Header />
      <div className="contents">
        <Button variant="contained">{name}</Button>
      </div>
    </Base>
  );
};

export default Home;
