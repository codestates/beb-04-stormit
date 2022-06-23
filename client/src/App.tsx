import React from "react";
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
import Communities from "./components/Communities";

const App: React.FC = () => {
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const loginSnackbarOpen = useSelector(
    (state) => state.snackbar.loginSnackbarOpen
  );

  const dispatch = useDispatch();

  document.cookie = "test=123";
  document.cookie = "test2=2222";

  console.log(document.cookie);

  if (localStorage.getItem("darkMode") === "on") {
    dispatch(themeActions.setDarkMode(true));
  }

  const closeLoginSnackbar = () => {
    dispatch(snackbarActions.closeLoginSnackbar());
  };

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
        <Route path="/account" element={<Account />} />
        <Route path="/post" element={<Post />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/community/:name" element={<Community />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/communities" element={<Communities />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
