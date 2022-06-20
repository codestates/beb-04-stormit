import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import GlobalStyle from "./styles/GlobalStyle";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;
