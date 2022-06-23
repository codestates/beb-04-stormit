import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface themeState {
  isDarkMode: boolean;
}

const initialState: themeState = {
  isDarkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const themeActions = { ...themeSlice.actions };

export default themeSlice;
