import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface communityState {
  currentCommunity: string;
}

const initialState: communityState = {
  currentCommunity: "",
};

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setCurrentCommunity(state, action: PayloadAction<string>) {
      state.currentCommunity = action.payload;
    },
  },
});

export const communityActions = { ...communitySlice.actions };

export default communitySlice;
