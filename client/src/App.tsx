import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import MyPage from "./pages/MyPage";
import { useSelector } from "./store";
import GlobalStyle from "./styles/GlobalStyle";

const App: React.FC = () => {
  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);

  return (
    <>
      <GlobalStyle
        menuModalOpen={menuModalOpen}
        profileModalOpen={profileModalOpen}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
