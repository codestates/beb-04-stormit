import { snackbarActions } from "./store/snackbarSlice";
import useAuthenticate from "./hooks/useAuthenticate";
import ProfileModal from "./components/ProfileModal";
import Snackbar from "./components/common/Snackbar";
import { useDispatch, useSelector } from "./store";
import { ThemeProvider } from "styled-components";
import { themeActions } from "./store/themeSlice";
import { darkTheme, theme } from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import MenuModal from "./components/MenuModal";
import DeletedPost from "./pages/DeletedPost";
import Communities from "./pages/Communities";
import PostDetail from "./pages/PostDetail";
import Community from "./pages/Community";
import Agreement from "./pages/Agreement";
import React, { useEffect } from "react";
import Header from "./components/Header";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/404";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Post from "./pages/Post";
import Edit from "./pages/Edit";
import GoogleSuccess from "./pages/GoogleSuccess";
import Search from "./pages/Search";

const App: React.FC = () => {
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const loginSnackbarOpen = useSelector(
    (state) => state.snackbar.loginSnackbarOpen
  );

  const dispatch = useDispatch();

  const authenticate = useAuthenticate();

  if (localStorage.getItem("darkMode") === "on") {
    dispatch(themeActions.setDarkMode(true));
  }

  const closeLoginSnackbar = () => {
    dispatch(snackbarActions.closeLoginSnackbar());
  };

  // 새로고침 시 로그인
  useEffect(() => {
    console.log("@@@ authenticating @@@");
    authenticate();
  }, [authenticate]);

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
        <Route path="user/google/success" element={<GoogleSuccess />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
