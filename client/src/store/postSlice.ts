import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface postState {
  title: string;
  contents: string;
  community: string;
  vote: number;
}

const initialState: postState = {
  title: "",
  contents: "",
  community: "",
  vote: 0,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostState(
      state,
      action: PayloadAction<{
        title: string;
        contents: string;
        community: string;
      }>
    ) {
      state.title = action.payload.title;
      state.contents = action.payload.contents;
      state.community = action.payload.community;
    },
    clearPostState(state) {
      state.title = "";
      state.contents = "";
      state.community = "";
    },
    setVoteUp(state) {
      state.vote = state.vote + 1;
    },
    setVoteDown(state) {
      state.vote = state.vote - 1;
    },
  },
});

export const postActions = { ...postSlice.actions };

export default postSlice;
