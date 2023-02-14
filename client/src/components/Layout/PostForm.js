import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import Avatar from "../../img/avatar.png";

export default function PostForm() {
  const navigate = useNavigate();

  const navigateCreatePost = () => {
    navigate("/createPost");
  };

  return (
    <div className="bg-reddit_gray pt-4 text-white-400 2xl:place-content-center ">
      <div className="border border-gray-300 p-2 rounded-md flex bg-white">
        <div className="rounded-full bg-gray-600 overflow-hidden w-10 h-10">
          <img src={Avatar} alt="" className="invert-[1]" />
        </div>
        <form
          action=""
          className="flex-grow bg-reddit_gray-brighter border border-gray ml-4 mr-2 rounded-md"
        >
          <div></div>
          <input
            type="text"
            className=" bg-reddit_gray-brighter p-2 px-3 text-sm block w-full rounded-md"
            placeholder="Create Post"
            onClick={navigateCreatePost}
          />
        </form>
        <PlusIcon
          className="h-5 w-5 mt-2 text-gray-500 hover:text-gray-600 cursor-pointer"
          onClick={navigateCreatePost}
        />
      </div>
    </div>
  );
}
