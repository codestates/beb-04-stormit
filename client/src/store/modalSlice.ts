import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  menuModalOpen: boolean;
  profileModalOpen: boolean;
  searchInputModalOpen: boolean;
}

const initialState: modalState = {
  menuModalOpen: false,
  profileModalOpen: false,
  searchInputModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openMenuModal(state) {
      state.profileModalOpen = false;
      state.menuModalOpen = true;
    },
    closeMenuModal(state) {
      state.menuModalOpen = false;
    },
    openProfileModal(state) {
      state.menuModalOpen = false;
      state.profileModalOpen = true;
    },
    closeProfileModal(state) {
      state.profileModalOpen = false;
    },
    openSearchInputModal(state) {
      state.searchInputModalOpen = true;
    },
    closeSearchInputModal(state) {
      state.searchInputModalOpen = false;
    },
  },
});

export const modalActions = { ...modalSlice.actions };

export default modalSlice;
