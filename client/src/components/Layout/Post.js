import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  currentSub,
  asyncComment,
  asyncMyVotePost,
  getCurrentPost,
} from "../../store/store";
import TimeAgo from "timeago-react";
import PostForm from "./PostForm";
import {
  ChatBubbleLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
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
  const myvotepost = useSelector((state) => state.myVotePost.list);

  useEffect(() => {
    dispatch(getPost(-1));
    dispatch(currentSub.actions.setCurrentSub(-1));
  }, [dispatch]);

  const votePost = (vote_kind, post_id, comment_id, username) => {
    if (!username) {
      return;
    }

    const body = {
      vote_kind,
      post_id,
      comment_id,
      username,
    };

    axios.post("/api/vote", body).then((res) => {
      if (res.data.result === "ok") {
        dispatch(asyncMyVotePost(user));
        dispatch(getPost(sub));
      }
    });
  };

  const isVote = (post_id, user_name) => {
    if (!user_name) {
      return 0;
    }
    if (!myvotepost || !myvotepost.length) {
      return 0;
    }
    const vote = myvotepost.find((votePost) => votePost.post_id === post_id);
    return vote ? vote.vote_kind : 0;
  };

  return (
    <div className="2xl:w-2/3">
      {user && <PostForm />}
      <div className="auto-rows-max">
        {post_list.map((item, index) => (
          <div
            className="border border-gray-300 bg-white my-3 rounded-md flex"
            key={index}
          >
            {isVote(item.post_id, user) === 0 ? (
              <div className="float-left bg-gray-100 p-2 text-center space-y-1">
                <HandThumbUpIcon
                  className="h-4"
                  onClick={() => {
                    votePost(1, item.post_id, null, user);
                  }}
                />
                <p>{item.vote_sum}</p>
                <HandThumbDownIcon
                  className="h-4"
                  onClick={() => {
                    votePost(-1, item.post_id, null, user);
                  }}
                />
              </div>
            ) : isVote(item.post_id, user) === 1 ? (
              <div className="float-left bg-gray-100 p-2 text-center space-y-1">
                <HandThumbUpIcon
                  className="h-4 fill-orange-400"
                  onClick={() => {
                    votePost(1, item.post_id, null, user);
                  }}
                />
                <p>{item.vote_sum}</p>
                <HandThumbDownIcon
                  className="h-4"
                  onClick={() => {
                    votePost(-1, item.post_id, null, user);
                  }}
                />
              </div>
            ) : (
              <div className="float-left bg-gray-100 p-2 text-center space-y-1  ">
                <HandThumbUpIcon
                  className="h-4 "
                  onClick={() => {
                    votePost(1, item.post_id, null, user);
                  }}
                />
                <p>{item.vote_sum}</p>
                <HandThumbDownIcon
                  className="h-4 fill-blue-300"
                  onClick={() => {
                    votePost(-1, item.post_id, null, user);
                  }}
                />
              </div>
            )}
            <div className="  p-2">
              {/* <PostContent /> */}
              <div
                onClick={() => {
                  // navigate("/PostPage", { state: item });
                  dispatch(getCurrentPost(item.post_id));
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
                    • Posted by u/{item.user_name}{" "}
                    <TimeAgo datetime={item.post_date} />
                  </p>
                </div>
                <h2 className="text-xl mb-3"> {item.post_title}</h2>
                <div className="text-sm leading-6 text-gray-700 ">
                  {item.post_imagepath !== null && (
                    <img src={item.post_imagepath}></img>
                  )}
                  <p>{item.post_content}</p>
                  {item.post_link !== null && (
                    <a href={item.post_link}>{item.post_link}</a>
                  )}
                </div>
                <nav className="flex">
                  <div className="text-center float-left	flex">
                    <button className="flex text-gray-400 font-bold mt-2">
                      <ChatBubbleLeftIcon className=" w-5 h-5" />

                      <p className="px-1  text-sm">{item.comment_count}</p>
                      <p className=" text-sm">comments</p>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
