import React, { useState } from "react";
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

export default function MainPage() {
  //<POST></POST> 의 어디가 문제인지 알 수 없어서 여기에 명시
  //Warning:validateDOMNesting(...): <body> cannot appear as a child of <div></div> 이 에러 찾아서 해결해보기~
  const [showAuthModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userName"]);
  const [postState, setPostState] = useState({});
  const [user, setUser] = useState({});
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
        <UserContext.Provider value={user}>
          <Header />
          <div className="flex">
            <div className="flex-none">
              <Sidemenu />
            </div>
            <div
              className=" bg-reddit_gray px-6 flex-auto 
          "
            >
              <Post />
              <AuthModal />
              <PostPage />
            </div>
          </div>
        </UserContext.Provider>
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
