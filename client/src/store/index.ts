import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useTypedDispatch,
  useSelector as useTypedSelector,
} from "react-redux";
import modalSlice from "./modalSlice";
import postSlice from "./postSlice";
import snackbarSlice from "./snackbarSlice";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";
// ...

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    theme: themeSlice.reducer,
    post: postSlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useTypedDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector;
