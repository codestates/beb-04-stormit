import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import FloatingIconButton from "../components/common/FloatingIconButton";
import Header from "../components/Header";
import MenuModal from "../components/MenuModal";
import ProfileModal from "../components/ProfileModal";
import { useSelector } from "../store";
import AddIcon from "@mui/icons-material/Add";
import PostCard from "../components/PostCard";

const FAKE_ARRAY = Array(10).fill(0);

const Base = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(FAKE_ARRAY);

  const menuModalOpen = useSelector((state) => state.modal.menuModalOpen);
  const profileModalOpen = useSelector((state) => state.modal.profileModalOpen);

  const targetRef = useRef<HTMLDivElement | null>(null);

  // 무한스크롤
  const observer = useMemo(() => {
    return new IntersectionObserver((entries) => {
      if (!targetRef?.current) return;

      if (entries[0].isIntersecting) {
        setLoading(true);

        console.log("fetch triggered");

        setTimeout(() => {
          const FAKE_FETCH_ARRAY = Array(10).fill(0);

          setPostData((postData) => [...postData, ...FAKE_FETCH_ARRAY]);
          setLoading(false);
        }, 1000);
      }
    });
  }, []);

  useEffect(() => {
    if (!targetRef?.current) return;

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [observer]);

  return (
    <Base>
      <Header />
      {menuModalOpen && <MenuModal />}
      {profileModalOpen && <ProfileModal />}
      <ul className="posts-wrapper">
        {postData.map((_, index) => (
          <PostCard key={index} />
        ))}
      </ul>
      <FloatingIconButton>
        <AddIcon />
      </FloatingIconButton>
      {loading && <div className="loading-spinner" />}
      <div className="observer" ref={targetRef} />
    </Base>
  );
};

export default Home;
