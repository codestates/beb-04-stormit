import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isLoggedIn: boolean;
  name: string;
}

const initialState: userState = {
  isLoggedIn: true,
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice;
