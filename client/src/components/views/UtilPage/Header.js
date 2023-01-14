import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import logoImg from "../../../img/logo.png";
import {
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../../../img/avatar.png";
import Button from "../../Layout/Button";
import { useState, useContext } from "react";
import AuthModalContext from "./AuthModalContext";
import Dropdown from "../../Dropdown";
import ClickOutHandler from "react-clickout-handler";

export default function Header() {
  const [userDropdownVisibilityClass, setUserDropdownVisibilityClass] =
    useState("hidden");

  function toggleUserDropdown() {
    if (userDropdownVisibilityClass === "hidden") {
      setUserDropdownVisibilityClass("block");
    } else {
      setUserDropdownVisibilityClass("hidden");
    }
  }

  const authModal = useContext(AuthModalContext);
  return (
    <header className="w-full bg-white p-2">
      <div className="mx-4 flex relative ">
        <img src={logoImg} alt="" className="w-8 h-8 mr-4" />

        <form
          action=""
          className="bg-reddit_gray-brighter px-3 flex rounded-md border border-reddit_gray-700 mx-4 flex-grow"
        >
          <MagnifyingGlassIcon className="text-gray-300 h-6 w-6 mt-1" />
          <input
            type="text"
            className="bg-reddit_gray-brighter text-sm p-1 pl-2 pr-0 block focus:outline-none text-black"
            placeholder="Search Reddit"
          />
        </form>
        {/* 
          <button className="px-2 py-1">
            <ChatBubbleOvalLeftEllipsisIcon className="text-gray  w-6 h-6 mx-2" />
          </button>
          <button className="px-2 py-1">
            <BellIcon className="text-gray  w-6 h-6 mx-2" />
          </button>
          <button className="px-2 py-1">
            <PlusIcon className="text-gray  w-6 h-6 mx-2" />
          </button> */}

        {/* 로그인 버튼 */}
        <div className="mx-2 hidden sm:block">
          <Button
            outline
            className="mr-1 h-8"
            onClick={() => authModal.setShow("login")}
          >
            Log In
          </Button>

          {/* 회원가입 버튼 */}
          <Button
            className=" h-8"
            onClick={() => authModal.setShow("register")}
          >
            Sign up
          </Button>
        </div>

        {/* 유저 아이콘 */}
        <ClickOutHandler
          onClickOut={() => setUserDropdownVisibilityClass("hidden")}
        >
          <button
            className="rounded-md flex ml-4 "
            onClick={() => toggleUserDropdown()}
          >
            <UserIcon className="w-6 h-6 text-gray-400 m-1 " />
            {/* <div className=" w-8 h-8 bg-gray-600 rounded-md">
              <img
                src={Avatar}
                alt=""
                style={{ filter: "invert(100%)" }}
                className="block"
              />
            </div> */}
            <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 m-1" />
          </button>
          <div
            className={
              "absolute right-0 top-8 bg-white border border-white z-10 rounded-md " +
              userDropdownVisibilityClass
            }
          >
            <button
              onClick={() => authModal.setShow(true)}
              // onClick={() => authModal.setShow("true")}
              className="block flex w-50 py-2 px-3 hover:bg-reddit_blue hover:text-white text-sm "
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" /> Log In /
              Sign up
            </button>
          </div>
        </ClickOutHandler>
      </div>
    </header>

    // <div className={styles.header}>
    //   <div className={styles.contents}>
    //     <div className={styles.logo}>
    //       <img src={logoImg} alt="React" className="App-logo"></img>Reddit
    //     </div>
    //     <nav className={styles.navigation}>
    //       <ul className={styles.ul}>
    //         <li className={styles.ul}>
    //           <Link to="/login">
    //             <button className={styles.button}>Log In</button>
    //           </Link>
    //         </li>
    //         <li className={styles.li}>
    //           <i className="fa-regular fa-user"></i>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </div>
  );
}
