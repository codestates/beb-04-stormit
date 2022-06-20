import React from "react";
import { useDispatch, useSelector } from "../store";
import { userActions } from "../store/userSlice";

const Home: React.FC = () => {
  const name = useSelector((state) => state.user.name);

  const dispatch = useDispatch();

  dispatch(userActions.setName("hi"));

  return <div>{name}</div>;
};

export default Home;
