import { createSlice } from "@reduxjs/toolkit";

interface snackbarState {
  loginSnackbarOpen: boolean;
}

const initialState: snackbarState = {
  loginSnackbarOpen: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openLoginSnackbar(state) {
      state.loginSnackbarOpen = true;
    },
    closeLoginSnackbar(state) {
      state.loginSnackbarOpen = false;
    },
  },
});

export const snackbarActions = { ...snackbarSlice.actions };

export default snackbarSlice;
