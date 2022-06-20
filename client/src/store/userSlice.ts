import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  name: string;
}

const initialState: userState = {
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice;
