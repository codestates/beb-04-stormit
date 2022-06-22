import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isLoggedIn: boolean;
  userId: number;
  nickname: string;
  email: string;
  passwordHash: string;
}

const initialState: userState = {
  isLoggedIn: false,
  userId: 0,
  nickname: "",
  email: "",
  passwordHash: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 닉네임 변경 시 사용
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    },
    setLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
      state.nickname = "";
      state.email = "";
      state.userId = 0;
      state.passwordHash = "";
    },
    // 로그인 시 같이 호출해야함
    setUserInfo(
      state,
      action: PayloadAction<{
        email: string;
        nickname: string;
        passwordHash: string;
        userId: number;
      }>
    ) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.passwordHash = action.payload.passwordHash;
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice;
