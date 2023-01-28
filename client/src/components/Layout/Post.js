import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncVoteSum,
  getPost,
  currentSub,
  asyncComment,
} from "../../store/store";
import PostContent from "../views/UtilPage/PostContent";
import TimeAgo from "timeago-react";
import PostForm from "./PostForm";
import {
  ChatBubbleLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostPageModalContext from "./PostPageModalContext";

export default function Post(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postModal = useContext(PostPageModalContext);

  const sub = useSelector((state) => state.currentSub.currentSub);

  const user = useSelector((state) => state.userSlice.userName);

  const sub_list = useSelector((state) => state.subSlice.list);

  const post_list = useSelector((state) => state.postSlice.list);
  useEffect(() => {
    dispatch(getPost(-1));
    dispatch(currentSub.actions.setCurrentSub(-1));
  }, []);

  function votePost(vote_kind, post_id, comment_id) {
    let body = {
      vote_kind: vote_kind,
      post_id: post_id,
      comment_id: comment_id,
    };

    axios.post("/api/vote", body).then((res) => {
      if (res.data.result === "ok") {
        dispatch(getPost(sub));
      }
    });
  }

  return (
    <div>
      <PostForm />
      <div className=" 2xl:place-content-center auto-rows-max	 	">
        {post_list.map((item, index) => (
          <div
            className="border border-gray-300 bg-white my-3 rounded-md flex  "
            key={index}
          >
            <div className="float-left bg-gray-100 p-2 text-center space-y-1  ">
              <HandThumbUpIcon
                className="h-4 text-gray-500"
                onClick={() => votePost(1, item.post_id, null)}
              />
              <p>{item.vote_sum}</p>
              <HandThumbDownIcon
                className="text-gray-500"
                onClick={() => votePost(-1, item.post_id, null, item.sub_id)}
              />
            </div>
            <div className="  p-2">
              {/* <PostContent /> */}
              <div
                onClick={() => {
                  // navigate("/PostPage", { state: item });
                  postModal.setState(item);
                  dispatch(asyncComment(item.post_id));
                  postModal.setShowPost(!postModal.showPost);
                }}
              >
                <div className=" flex mb-1 text-sm ">
                  {sub_list.map((sub, j) => {
                    if (item.sub_id === sub.sub_id) {
                      return (
                        <h5 className="font-bold" key={j}>
                          {sub.sub_name}
                        </h5>
                      );
                    }
                  })}
                  <p className="text-reddit_text text-sm ">
                    • Posted by u/{item.user_name}
                    <TimeAgo datetime={item.post_date} />
                  </p>
                </div>
                <h2 className="text-xl mb-3"> {item.post_title}</h2>
                <div className="text-sm leading-6 text-gray-700 ">
                  {item.post_imagepath !== null && (
                    <img src={item.post_imagepath}></img>
                  )}
                  <p>{item.post_content}</p>
                </div>
                <nav className="flex">
                  <div className="text-center float-left	flex">
                    <button className="flex text-gray-400 font-bold mt-2">
                      <ChatBubbleLeftIcon className=" w-5 h-5" />

                      <p className="px-1  text-sm">{item.comment_count}</p>
                      <p className=" text-sm">comments</p>
                    </button>
                  </div>
                  {/* <div className="text-center float-left text-sm text-gray-400 mt-3.5 flex	">
                  <p>1</p> Comments
                </div> */}
                </nav>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
