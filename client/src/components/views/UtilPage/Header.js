import React, { useEffect, useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getSearchPost } from "../../../store/store";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Button from "../../Layout/Button";
import { userSlice, currentSub } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import AuthModalContext from "./AuthModalContext";
import logoImg from "../../../img/logo.png";
import title from "../../../img/titleLogo.png";
import Avatar from "../../../img/avatar.png";
import SideMenutoggle from "../../Layout/SideMenutoggle";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState("");
  const refOne = useRef(null);
  const user = useSelector((state) => state.userSlice.userName);
  const authModal = useContext(AuthModalContext);
  const [userDropdownVisibilityClass, setUserDropdownVisibilityClass] =
    useState("hidden");

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target))
      setUserDropdownVisibilityClass("hidden");
  };

  function toggleUserDropdown() {
    setUserDropdownVisibilityClass(
      userDropdownVisibilityClass === "hidden" ? "block" : "hidden"
    );
  }

  const changePost = (subid) => {
    dispatch(getPost(subid));
    dispatch(currentSub.actions.setCurrentSub(subid));
  };

  function logout() {
    authModal.removeCook("userName");
    dispatch(userSlice.actions.LogoutUser(user));
    navigate("/");
  }

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(getSearchPost(searchContent));
      setSearchContent("");
    }
  };

  return (
    <header className="w-full bg-white p-2">
      <div className="mx-4 flex relative">
        <button
          className="flex"
          onClick={() => {
            changePost(-1);
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logoImg} alt="" className="w-8 h-8 mr-1" />
          <img src={title} alt="" className="w-13 h-5 mr-4 mt-1" />
        </button>

        <Bars3Icon
          className="w-6 h-6 text-gray-400 my-1 block md:hidden"
          onClick={() => SideMenutoggle.setShow()}
        />

        <div className="bg-reddit_gray-brighter px-3 flex rounded-md border border-reddit_gray-700 mx-4 flex-grow">
          <MagnifyingGlassIcon
            className="text-gray-300 h-6 w-6 mt-1"
            onClick={() => {
              dispatch(getSearchPost(searchContent));
              setSearchContent("");
            }}
          />
          <input
            value={searchContent}
            type="text"
            onChange={(e) => setSearchContent(e.target.value)}
            onKeyDown={activeEnter}
            className="bg-reddit_gray-brighter text-sm p-1 pl-2 pr-0 block focus:outline-none text-black relative"
            placeholder="Search Reddit"
          />
        </div>

        <div className="mx-2 hidden sm:block">
          {user === "" && (
            <Button
              outline
              className="mr-1 h-8"
              onClick={() => authModal.setShow("login")}
            >
              Log In
            </Button>
          )}

          {/* 회원가입버튼 */}
          {user === "" && (
            <Button
              className=" h-8"
              onClick={() => authModal.setShow("register")}
            >
              Sign up
            </Button>
          )}
          {!(user === "") && (
            <span className="block w-50 py-2 px-3 text-sm">Hello, {user}!</span>
          )}
        </div>

        {/* 유저 아이콘 */}
        <button
          className="rounded-md flex ml-3 "
          onClick={() => toggleUserDropdown()}
        >
          {user === "" && <UserIcon className="w-6 h-6 text-gray-400 m-1" />}

          {!(user === "") && (
            <div className=" w-8 h-8 bg-gray-600 rounded-md">
              <img
                src={Avatar}
                alt=""
                style={{ filter: "invert(100%)" }}
                className="block"
              />
            </div>
          )}
          <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 m-1" />
        </button>
        <div
          className={
            "absolute right-0 top-8 bg-white border border-white z-10 rounded-md " +
            userDropdownVisibilityClass
          }
          ref={refOne}
        >
          {user === "" && (
            <button
              onClick={() => authModal.setShow("login")}
              className="block flex w-50 py-2 px-3 hover:bg-reddit_blue hover:text-white text-sm "
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" /> Log In /
              Sign up
            </button>
          )}
          {!(user === "") && (
            <button
              onClick={(e) => logout()}
              className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
