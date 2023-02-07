import React, { useState, useEffect, useRef } from "react";
import Post from "../../Layout/Post";
// import styled from "styled-components";
import PostForm from "../../Layout/PostForm";
import "../../../index.css";
import Header from "../UtilPage/Header";
import Sidemenu from "../UtilPage/Sidemenu";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import AuthModal from "../UtilPage/AuthModal";
import AuthModalContext from "../UtilPage/AuthModalContext";
import PostPage from "../../Layout/PostPage";
import PostPageModalContext from "../../Layout/PostPageModalContext";
import { ChakraProvider, Container } from "@chakra-ui/react";
import axios from "axios";
import UserContext from "../../UserContext";
import Comment from "../../Layout/Comment";
import CommentModal from "../../Layout/CommentModal";
import { useCookies } from "react-cookie";
import { userSlice } from "../../../store/store";
import { useDispatch } from "react-redux";
import SideMenutoggle from "../../Layout/SideMenutoggle";

export default function MainPage() {
  //<POST></POST> 의 어디가 문제인지 알 수 없어서 여기에 명시
  //Warning:validateDOMNesting(...): <body> cannot appear as a child of <div></div> 이 에러 찾아서 해결해보기~
  const [showAuthModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userName"]);
  const [postState, setPostState] = useState({});

  const [navActive, setNavActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  const scrollFixed = () => {
    if (scrollY > 10) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", scrollFixed);
    };
    scrollListener();
    return () => {
      window.removeEventListener("scroll", scrollFixed);
    };
  });

  return (
    <AuthModalContext.Provider
      value={{
        show: showAuthModal,
        setShow: setShowModal,
        cookie: cookies,
        setCook: setCookie,
        removeCook: removeCookie,
      }}
    >
      <PostPageModalContext.Provider
        value={{
          state: postState,
          setState: setPostState,
          showPost: showPostModal,
          setShowPost: setShowPostModal,
        }}
      >
        <div className={`nav ${scrollActive ? "fixed sticky top-0" : ""}`}>
          <Header />
        </div>
        <div className="flex">
          <div>
            <Sidemenu />
          </div>
          <div
            className=" bg-reddit_gray px-6 flex-auto 2xl:flex items-center justify-center	  
          "
          >
            <AuthModal />
            {/* <SideMenutoggle /> */}
            <Post />

            <PostPage />
          </div>
        </div>
      </PostPageModalContext.Provider>
    </AuthModalContext.Provider>
  );
}

// const Container = styled.div`
//   min-height: 100vh;
//   padding: 100px 0;
//   display: grid;
//   justify-content: center;
//   background: #dbe0e6;
//   box-sizing: border-box;
// `;
