import React, { useState, useContext, useRef, useEffect } from "react";
import Button from "../../Layout/Button";
import Input from "../LoginPage/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthModalContext from "./AuthModalContext";
import { useDispatch, useSelector } from "react-redux";
import {
  userSlice,
  asyncMyVoteComment,
  asyncMyVotePost,
} from "../../../store/store";
import { useCookies } from "react-cookie";

export default function AuthModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalContext = useContext(AuthModalContext);
  const { show, setShow, setCook, cookie } = modalContext;

  const [modalType, setModalType] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (cookie.userName) {
      const logincheck = async () => {
        const body = { token: cookie.userName };
        const res = await axios.post("api/logincheck", body);
        if (res.data.result === "ok") {
          dispatch(userSlice.actions.setUser(cookie.userName));
          setCook("userName", cookie.userName);
          dispatch(asyncMyVotePost(cookie.userName));
          dispatch(asyncMyVoteComment(cookie.userName));
        }
      };
      logincheck();
    }
  }, [cookie.userName]);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  function register(e) {
    const body = {
      email: email,
      name: username,
      password: password,
    };
    axios.post("/api/register", body).then((res) => {
      if (res.data.result === "alreadyEmail") {
        alert("이미 존재하는 이메일입니다");
      } else if (res.data.result === "alreadyName") {
        alert("이미 존재하는 이름입니다");
      } else if (res.data.result === "ok") {
        setShow(false);
      }
    });
  }

  function login(e) {
    const body = {
      name: username,
      password: password,
    };
    axios.post("/api/login", body).then((res) => {
      if (res.data.result === "loginError") {
        alert("잘못된 정보입니다");
      } else if (res.data.result === "ok") {
        setShow(false);
        dispatch(userSlice.actions.setUser(username));
        setCook("userName", username);
        dispatch(asyncMyVotePost(username));
        dispatch(asyncMyVoteComment(username));
        navigate("/");
      }
    });
  }

  function toggleModalType() {
    setModalType(modalType === "login" ? "register" : "login");
  }

  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 z-20  fixed inset-0 flex items-center justify-center  ${
        show !== false ? "block" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,.6)" }}
    >
      <div
        className="border-gray-700 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white p-5 mx-auto my-10 rounded-md"
        ref={refOne}
      >
        {modalType === "login" && <h1 className="text-2xl mb-5">Log In</h1>}
        {modalType === "register" && <h1 className="text-2xl mb-5">Sign Up</h1>}
        <p className="text-reddit_text text-sm mb-3">
          By continuing, you agree are setting up a Reddit account and agree to
          our
          <a
            href="https://www.redditinc.com/policies/user-agreement"
            className="text-reddit_blue mx-1"
          >
            User Agreement
          </a>
          and
          <a
            href="https://www.reddit.com/policies/privacy-policy"
            className="text-reddit_blue mx-1"
          >
            Privacy Policy
          </a>
          .
        </p>
        {modalType === "register" && (
          <Input
            type="email"
            placeholder="E-mail"
            className="mb-2 w-full text-sm"
            value={email}
            onChange={onEmailHandler}
          />
        )}
        <Input
          type="text"
          placeholder="username"
          className="mb-2 w-full text-sm"
          value={username}
          onChange={onUsernameHandler}
        />
        <Input
          type="password"
          placeholder="password"
          className="mb-2 w-full text-sm"
          value={password}
          onChange={onPasswordHandler}
        />
        {modalType === "register" && (
          <Button outline className="w-full mb-3" onClick={(e) => register()}>
            Sign Up
          </Button>
        )}
        {modalType === "login" && (
          <Button outline className="w-full mb-3" onClick={(e) => login()}>
            Log In
          </Button>
        )}
        {modalType === "login" && (
          <div className="text-sm">
            New to Reddit?
            <a href="#" className="text-reddit_blue" onClick={toggleModalType}>
              SIGN UP
            </a>
          </div>
        )}
        {modalType === "register" && (
          <div className="text-sm">
            Already have an account?{" "}
            <a href="#" className="text-reddit_blue" onClick={toggleModalType}>
              Log In
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
