import { ChatBubbleLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { React, useState, useEffect, useContext, useRef } from "react";
import Comment from "./Comment";
import TimeAgo from "timeago-react";
import Header from "../views/UtilPage/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncComment,
  commentSlice,
  currentSub,
  subSlice,
  getPost,
} from "../../store/store";
import Button from "./Button";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../../img/avatar.png";
import axios from "axios";
import PostPageModalContext from "./PostPageModalContext";

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const modalContext = useContext(PostPageModalContext);

  const visibleClass = modalContext.showPost !== false ? "block" : "hidden";

  const sub_list = useSelector((state) => state.subSlice.list);

  const sub = useSelector((state) => state.currentSub.currentSub);

  const user = useSelector((state) => state.userSlice.userName);
  // 댓글 기능
  const [comment, setComment] = useState("");
  const comment_list = useSelector((state) => state.commentSlice.list);
  const [edit_comment, setEditComment] = useState("");

  const [post, setPost] = useState("");
  const [edit_post, setEditPost] = useState("");
  const [isValid, SetIsValid] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const refOne = useRef(null);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      modalContext.setShowPost(false);
    }
  };

  function commentChange(e) {
    setComment(e.target.value);
  }

  function editCommentChange(e) {
    setEditComment(e.target.value);
  }

  function PostChange(e) {
    setPost(e.target.value);
  }

  function editPostChange(e) {
    setEditPost(e.target.value);
  }

  function deletePost() {
    let body = {
      post_id: modalContext.state.post_id,
    };

    axios.post("/api/delete", body).then((res) => {
      if (res.data.result === "ok") {
        // window.location.replace("/");
        dispatch(getPost(sub));
        modalContext.setShowPost(!modalContext.showPost);
      }
    });
  }

  function writeComment(e) {
    let body = {
      comment_content: comment,
      post_id: modalContext.state.post_id,
    };

    axios.post("/api/writecomment", body).then((res) => {
      if (res.data.result === "ok") {
        dispatch(asyncComment(modalContext.state.post_id));
      }
    });
  }

  function editComment(comment, comment_id) {
    let body = {
      comment_content: comment,
      comment_id: comment_id,
      post_id: modalContext.state.post_id,
    };

    axios.post("/api/editcomment", body).then((res) => {
      if (res.data.result === "ok") {
        dispatch(asyncComment(modalContext.state.post_id));
      }
    });
  }

  function deleteComment(comment_id) {
    let body = {
      comment_id: comment_id,
      post_id: modalContext.state.post_id,
    };

    console.log("CDE");
    axios.post("/api/deletecomment", body).then((res) => {
      if (res.data.result === "ok") {
        dispatch(asyncComment(modalContext.state.post_id));
      }
    });
  }

  function votePost(vote_kind, post_id, comment_id) {
    let body = {
      vote_kind: vote_kind,
      post_id: post_id,
      comment_id: comment_id,
    };

    axios.post("/api/vote", body).then((res) => {
      if (res.data.result === "ok") {
        dispatch(asyncComment(modalContext.state.post_id));
      }
    });
  }

  // useEffect(() => {
  //   dispatch(asyncComment(state.post_id));
  // }, []);

  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex-auto " + visibleClass
      }
      style={{ backgroundColor: "rgba(0,0,0,.8)" }}
    >
      <nav className="bg-black text-white h-10 mx-20">
        <button className="flex py-2 mx-10 float-right">
          <XMarkIcon className="h-7 " /> Close
        </button>
      </nav>
      <div className="bg-reddit_gray h-screen mx-20 px-4 py-3" ref={refOne}>
        <div className="  w-5/6 m-auto p-6 bg-white">
          <div className="border border-gray-300 bg-white p-2 pb-0 my-3 rounded-md">
            {/* <PostContent /> */}
            <div className=" flex mb-1">
              {sub_list.map((sub, j) => {
                if (modalContext.state.sub_id === sub.sub_id) {
                  return (
                    <h5 className="font-bold" key={j}>
                      {sub.sub_name}
                    </h5>
                  );
                }
              })}
              <p className="text-reddit_text text-sm ">
                • Posted by u/ {modalContext.state.user_name}
                <TimeAgo datetime={modalContext.state.post_date} />
              </p>
            </div>
            <h2 className="text-xl mb-3"> {modalContext.state.post_title}</h2>
            <div className="text-sm leading-6 text-gray-700 ">
              <p>{modalContext.state.post_content}</p>
            </div>
            <nav className="flex">
              <div className="text-center float-left text-sm text-gray-400 my-3.5	flex space-x-5 font-bold">
                <button className="flex">
                  <ChatBubbleLeftIcon className="text-gray-400 w-5 h-5 mr-1" />
                  Comments
                </button>
                {/* user login 시 해당 버튼 보이도록 함 */}
                {user === modalContext.state.user_name && <button>Edit</button>}
                {user === modalContext.state.user_name && (
                  <button onClick={() => deletePost()}>Delete</button>
                )}
              </div>
            </nav>
          </div>
          <div>
            <div>
              {user && <div>Comment as {user}</div>}
              <form className="border border-gray-300 ">
                <textarea
                  className="w-full "
                  rows={5}
                  placeholder="   What are your thoughts?"
                  onChange={commentChange}
                  // onKeyUp={(e) => {
                  //   e.target.value.length > 0
                  //     ? SetIsValid(true)
                  //     : SetIsValid(false);
                  // }}
                  value={comment}
                ></textarea>
              </form>
              <div className="text-right">
                <Button
                  className="h-5 mt-2 bg-gray-500 text-gray-300"
                  // disabled={isValid ? false : true}
                  onClick={(e) => {
                    setComment("");
                    writeComment();
                  }}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
          {comment_list.map((comment, i) => {
            function changeE() {
              dispatch(commentSlice.actions.changeEdit(comment, i));
            }

            return (
              <div className="py-3 space-y-2">
                <div className="flex space-x-2">
                  {" "}
                  <div className=" w-7 h-7 bg-gray-400 rounded-full">
                    <img
                      src={Avatar}
                      alt=""
                      style={{ filter: "invert(100%)" }}
                      className="block"
                    />
                  </div>
                  <p key={i}>{comment.user_name}</p>
                  <TimeAgo
                    className="text-gray-400"
                    datetime={comment.comment_date}
                  />
                </div>
                {comment.edit === false ? (
                  <p key={i}>{comment.comment_content}</p>
                ) : (
                  <div className="border border-gray-300 ">
                    <textarea
                      className="w-full "
                      rows={5}
                      placeholder="   What are your thoughts?"
                      onChange={editCommentChange}
                      value={edit_comment}
                    ></textarea>
                    <div className="bg-gray-100 text-right">
                      <Button
                        className="h-5 m-2  text-reddit_blue"
                        onClick={() => editComment(false)}
                      >
                        Cancle
                      </Button>
                      <Button
                        className="h-5 m-2 bg-reddit_blue text-gray-300"
                        // disabled={isValid ? false : true}
                        onClick={() =>
                          editComment(edit_comment, comment.comment_id)
                        }
                      >
                        Save Edits
                      </Button>
                    </div>
                  </div>
                )}
                <div className="flex space-x-2  text-gray-500">
                  <HandThumbUpIcon
                    className="h-5 w-5 "
                    onClick={() => votePost(1, null, comment.comment_id)}
                  />
                  {comment.vote_sum !== 0 && <p>{comment.vote_sum}</p>}
                  <HandThumbDownIcon
                    className="h-5 w-5"
                    onClick={() => votePost(-1, null, comment.comment_id)}
                  />
                  {user === comment.user_name && (
                    <button
                      onClick={() => {
                        setEditComment(comment.comment_content);
                        changeE();
                      }}
                    >
                      Edit
                    </button>
                  )}
                  {user === comment.user_name && (
                    <button
                      onClick={() => {
                        deleteComment(comment.comment_id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
