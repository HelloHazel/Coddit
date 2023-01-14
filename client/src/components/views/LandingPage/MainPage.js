import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import Post from "../../Layout/Post";
// import styled from "styled-components";
import PostForm from "../../Layout/PostForm";
import "../../../index.css";
import Header from "../UtilPage/Header";
import Sidemenu from "../UtilPage/Sidemenu";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import AuthModal from "../UtilPage/AuthModal";
import AuthModalContext from "../UtilPage/AuthModalContext";
import { ChakraProvider } from "@chakra-ui/react";

export default function MainPage() {
  //<POST></POST> 의 어디가 문제인지 알 수 없어서 여기에 명시
  //Warning:validateDOMNesting(...): <body> cannot appear as a child of <div></div> 이 에러 찾아서 해결해보기~
  const [showAuthModal, setShowModal] = useState(false);
  return (
    <ChakraProvider>
      <AuthModalContext.Provider
        value={{ show: showAuthModal, setShow: setShowModal }}
      >
        <Header />
        <div style={{ display: "flex", height: "100%" }}>
          <Sidemenu />
          <div>
            <PostForm />
            <AuthModal />
            <Post />
          </div>
        </div>
      </AuthModalContext.Provider>
    </ChakraProvider>
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
