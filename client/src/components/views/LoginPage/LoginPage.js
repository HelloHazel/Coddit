import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");


  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Name", Name);
    console.log("Password", Password);

    let body = {
      name: Name,
      password: Password,
    };
    // dispatch(loginUser(body));
    axios.post("/api/login", body).then((res) => {
      if (res.data.result === "loginError") {
        //로그인 실패 시 디자인 수정
        alert("잘못된 정보 입력");
      } else if (res.data.result === "ok") {
        navigate("/");
      }

      console.log(res.data);
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
        <label>Name</label>
        <input type="name" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}
