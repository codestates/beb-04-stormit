import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import { useSelector } from "./store";
import GlobalStyle from "./styles/GlobalStyle";
import MenuModal from "./components/MenuModal";
import ProfileModal from "./components/ProfileModal";
import Account from "./pages/Account";
import Header from "./components/Header";
import Post from "./pages/Post";
import Community from "./pages/Community";

const App: React.FC = () => {
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);

  return (
    <>
      <GlobalStyle
        menuModalOpen={menuModalOpen}
        profileModalOpen={profileModalOpen}
      />
      {menuModalOpen && <MenuModal />}
      {profileModalOpen && <ProfileModal />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/post" element={<Post />} />
        <Route path="/community/:name" element={<Community />} />
      </Routes>
    </>
  );
};

export default App;
