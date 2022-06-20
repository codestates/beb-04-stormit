import { createSlice } from "@reduxjs/toolkit";

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
    setDarkMode(state) {
      state.isDarkMode = true;
    },
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const themeActions = { ...themeSlice.actions };

export default themeSlice;
