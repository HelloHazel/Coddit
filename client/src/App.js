import React from "react";

import { Routes, Route, Link } from "react-router-dom";
import PostPage from "./components/Layout/PostPage";
import MainPage from "./components/views/LandingPage/MainPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import CreatePost from "./components/views/UtilPage/CreatePost";

export default function App() {
  return (
    // <Router>
    //   <div>
    //     <Routes>
    //       <Route exact path="/login" element={<LoginPage />} />
    //       <Route exact path="/" element={<LandingPage />} />
    //     </Routes>
    //   </div>
    // </Router>
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/createPost" element={<CreatePost />}></Route>
      <Route path="/PostPage" element={<PostPage />}></Route>
    </Routes>
  );
}
