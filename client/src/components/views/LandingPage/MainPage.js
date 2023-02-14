import React, { useState, useEffect } from "react";
import Post from "../../Layout/Post";
import "../../../index.css";
import Header from "../UtilPage/Header";
import Sidemenu from "../UtilPage/Sidemenu";
import AuthModal from "../UtilPage/AuthModal";
import AuthModalContext from "../UtilPage/AuthModalContext";
import PostPage from "../../Layout/PostPage";
import PostPageModalContext from "../../Layout/PostPageModalContext";
import { useCookies } from "react-cookie";
import SideMenutoggle from "../../Layout/SideMenutoggle";

export default function MainPage() {
  const [showAuthModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userName"]);
  const [postState, setPostState] = useState({});
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
            className=" bg-reddit_gray px-6 flex-auto 2xl:flex items-start justify-center	  
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
