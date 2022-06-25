import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  menuModalOpen: boolean;
  profileModalOpen: boolean;
  searchInputModalOpen: boolean;
  createAccountOpen: boolean;
}

const initialState: modalState = {
  menuModalOpen: false,
  profileModalOpen: false,
  searchInputModalOpen: false,
  createAccountOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openMenuModal(state) {
      state.menuModalOpen = true;
    },
    closeMenuModal(state) {
      state.menuModalOpen = false;
    },
    openProfileModal(state) {
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
    closeAllModal(state) {
      state.menuModalOpen = false;
      state.profileModalOpen = false;
      state.searchInputModalOpen = false;
    },
    openCreateAccountModal(state) {
      state.createAccountOpen = true;
    },
    closeCreateAccountModal(state) {
      state.createAccountOpen = false;
    },
  },
});

export const modalActions = { ...modalSlice.actions };

export default modalSlice;
