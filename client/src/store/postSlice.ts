import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface postState {
  title: string;
  contents: string;
  community: string;
}

const initialState: postState = {
  title: "",
  contents: "",
  community: "",
};

export const postSlice = createSlice({
  name: "theme",
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
  },
});

export const postActions = { ...postSlice.actions };

export default postSlice;
