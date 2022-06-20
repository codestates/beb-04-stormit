import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "../store";
import { userActions } from "../store/userSlice";

const Base = styled.section``;

const Home: React.FC = () => {
  const name = useSelector((state) => state.user.name);

  const dispatch = useDispatch();

  dispatch(userActions.setName("hi"));

  return (
    <Base>
      <Button variant="contained">{name}</Button>
    </Base>
  );
};

export default Home;
