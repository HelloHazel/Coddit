import React, { useState, useContext } from "react";
import Button from "../../Layout/Button";
import Input from "../LoginPage/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthModalContext from "./AuthModalContext";
import ClickOutHandler from "react-clickout-handler";

export default function AuthModal() {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const modalContext = useContext(AuthModalContext);
  if (modalContext.show && modalContext.show !== modalType) {
    setModalType(modalContext.show);
  }

  const visibleClass = modalContext.show !== false ? "block" : "hidden";

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
    //패스워드 bcrypt 요청
    // e.preventDefault();
    console.log("Name", username);
    console.log("Password", password);

    let body = {
      email: email,
      name: username,
      password: password,
    };
    axios.post("/api/register", body).then((res) => {
      if (res.data.result === "alreadyEmail") {
        //이메일 존재시 디자인 수정
        alert("이미 이메일 존재");
      } else if (res.data.result === "alreadyName") {
        //이름 중복시 디자인 수정
        alert("이미 이름 존재");
      } else if (res.data.result === "ok") {
        navigate("/login");
      }
      console.log(res.data.result);
    });
  }

  function login(e) {
    // e.preventDefault();
    console.log("Name", username);
    console.log("Password", password);

    let body = {
      name: username,
      password: password,
    };
    axios.post("/api/login", body).then((res) => {
      if (res.data.result === "loginError") {
        //로그인 실패 시 디자인 수정
        alert("잘못된 정보 입력");
      } else if (res.data.result === "ok") {
        navigate("/");
      }

      console.log(res.data);
    });
  }

  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass
      }
      style={{ backgroundColor: "rgba(0,0,0,.6)" }}
    >
      <ClickOutHandler onClickOut={() => modalContext.setShow(false)}>
        <div className="border-gray-700 w-1/4 sm:w-1/3 md:w-1/3 bg-white p-5 self-center mx-auto rounded-md">
          {modalType === "login" && <h1 className="text-2xl mb-5">Log In</h1>}
          {modalType === "register" && (
            <h1 className="text-2xl mb-5">Register</h1>
          )}
          <p className="text-reddit_text text-sm mb-3">
            By continuing, you agree are setting up a Reddit account and agree
            to our
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
          />{" "}
          {modalType === "register" && (
            <Button outline className="w-full mb-3" onClick={(e) => register()}>
              Sign Up
            </Button>
          )}{" "}
          {modalType === "login" && (
            <Button outline className="w-full mb-3" onClick={(e) => login()}>
              Log In
            </Button>
          )}
          {modalType === "login" && (
            <div className="text-sm">
              New to Reddit?{" "}
              <button
                className="text-reddit_blue"
                onClick={() => modalContext.setShow("register")}
              >
                SIGN UP
              </button>
            </div>
          )}
          {modalType === "register" && (
            <div className="text-sm">
              Already have an account?{" "}
              <button
                className="text-reddit_blue"
                onClick={() => modalContext.setShow("login")}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </ClickOutHandler>
    </div>
  );
}
