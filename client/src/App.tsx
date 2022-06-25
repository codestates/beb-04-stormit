import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "./store";
import GlobalStyle from "./styles/GlobalStyle";
import MenuModal from "./components/MenuModal";
import ProfileModal from "./components/ProfileModal";
import Account from "./pages/Account";
import Header from "./components/Header";
import Post from "./pages/Post";
import Community from "./pages/Community";
import PostDetail from "./pages/PostDetail";
import Edit from "./pages/Edit";
import { ThemeProvider } from "styled-components";
import { darkTheme, theme } from "./styles/theme";
import { themeActions } from "./store/themeSlice";
import Snackbar from "./components/common/Snackbar";
import { snackbarActions } from "./store/snackbarSlice";
import Agreement from "./pages/Agreement";
import Communities from "./pages/Communities";
import { authenticateAPI, refreshAccessTokenAPI } from "./lib/api/user";
import { userActions } from "./store/userSlice";
import { parseCookie, setCookie } from "./lib/utils";
import ErrorPage from "./pages/404";
import DeletedPost from "./pages/DeletedPost";
import SignUp from "./pages/SignUp";

const App: React.FC = () => {
  console.log("@@@ app render @@@");
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const loginSnackbarOpen = useSelector(
    (state) => state.snackbar.loginSnackbarOpen
  );
  const userId = useSelector((state) => state.user.userId);

  const dispatch = useDispatch();

  if (localStorage.getItem("darkMode") === "on") {
    dispatch(themeActions.setDarkMode(true));
  }

  const closeLoginSnackbar = () => {
    dispatch(snackbarActions.closeLoginSnackbar());
  };

  // 새로고침 시 로그인
  useEffect(() => {
    const authenticate = async () => {
      const accessToken = parseCookie(document.cookie).access_token;

      try {
        const response = await authenticateAPI(accessToken);

        // interceptor가 트리거되는 시점

        console.log("@@@ authenticate API response @@@");
        console.log(response);

        // userId가 클라이언트에 저장되는 시점
        const {
          user_id: userId,
          username: email,
          password: passwordHash,
          nickname,
        } = response.data;

        dispatch(userActions.setLoggedIn());

        dispatch(
          userActions.setUserInfo({
            email: email,
            nickname: nickname,
            passwordHash: passwordHash,
            userId: userId,
          })
        );

        console.log("logged in");
      } catch (error: any) {
        // silent refresh trggier
        // console.log(error.response.data.message);

        // if (error.response.data.message === "token expired") {
        //   const response = await refreshAccessTokenAPI(userId);

        //   const { accessToken } = response.data;

        //   setCookie("access_token", accessToken, "10");

        //   console.log("@@@ refresh API response @@@");
        //   console.log(response);

        //   const authResponse = await authenticateAPI(accessToken);

        //   console.log("@@@ auth response @@@");
        //   console.log(authResponse);

        //   const {
        //     user_id: responseUserId,
        //     username: responseEmail,
        //     password: responsePasswordHash,
        //     nickname: responseNickname,
        //   } = authResponse.data;

        //   dispatch(userActions.setLoggedIn());

        //   dispatch(
        //     userActions.setUserInfo({
        //       email: responseEmail,
        //       nickname: responseNickname,
        //       passwordHash: responsePasswordHash,
        //       userId: responseUserId,
        //     })
        //   );

        //   return;
        // }

        dispatch(userActions.setLoggedOut());
      }
    };

    authenticate();
  }, [dispatch, userId]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <GlobalStyle
        menuModalOpen={menuModalOpen}
        profileModalOpen={profileModalOpen}
      />
      {menuModalOpen && <MenuModal />}
      {profileModalOpen && <ProfileModal />}
      <Snackbar
        open={loginSnackbarOpen}
        autoHideDuration={5000}
        onClose={closeLoginSnackbar}
      >
        로그인되었습니다.
      </Snackbar>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
        <Route path="/post" element={<Post />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/community/:name" element={<Community />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/deleted" element={<DeletedPost />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
