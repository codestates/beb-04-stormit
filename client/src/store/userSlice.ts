import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isLoggedIn: boolean;
  nickname: string;
  email: string;
  password: string;
  userId: number;
}

const initialState: userState = {
  isLoggedIn: false,
  nickname: "",
  email: "",
  password: "",
  userId: 0,
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
    },
    // 로그인 시 같이 호출해야함
    setUserInfo(
      state,
      action: PayloadAction<{
        email: string;
        nickname: string;
        password: string;
        userId: number;
      }>
    ) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.password = action.payload.password;
      state.userId = action.payload.userId;
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice;
