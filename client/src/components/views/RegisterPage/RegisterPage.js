import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Email", Email);
    console.log("Name", Name);
    console.log("Password", Password);

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };
    // dispatch(loginUser(body));
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
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="name" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Sign up</button>
      </form>
    </div>
  );
}
