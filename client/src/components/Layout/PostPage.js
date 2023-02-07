import { ChatBubbleLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  React,
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
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
  getCurrentPost,
  asyncMyVotePost,
  asyncMyVoteComment,
  myVoteComment,
} from "../../store/store";
import Button from "./Button";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../../img/avatar.png";
import axios from "axios";
import PostPageModalContext from "./PostPageModalContext";
import Input from "../views/UtilPage/Input";
import Textarea from "../views/UtilPage/Textarea";
import { useDropzone } from "react-dropzone";

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [file, setFile] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [post_title, setPostTitle] = useState("");
  const [post_content, setPostContent] = useState("");
  const [post_imgpath, setPostImgPath] = useState("");
  const [post_link, setPostLink] = useState("");
  const [sub_id, setSubID] = useState(-1);

  const modalContext = useContext(PostPageModalContext);

  const visibleClass = modalContext.showPost !== false ? "block" : "hidden";

  const sub_list = useSelector((state) => state.subSlice.list);

  const sub = useSelector((state) => state.currentSub.currentSub);

  const user = useSelector((state) => state.userSlice.userName);

  const myvotepost = useSelector((state) => state.myVotePost.list);

  const myvotecomment = useSelector((state) => state.myVoteComment.list);

  const currentPost = useSelector((state) => state.currentPost.list);

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
      setIsEdit(false);
      modalContext.setShowPost(false);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    const blob = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);

      setFile(base64data);
      setPostImgPath(base64data);
    };
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onPostTitleHandler = (event) => {
    setPostTitle(event.currentTarget.value);
  };

  const onPostContentHandler = (event) => {
    setPostContent(event.currentTarget.value);
  };

  const onPostLinkHandler = (event) => {
    setPostLink(event.currentTarget.value);
  };

  const [t, setTab] = useState(0);

  const Tab = [
    {
      title: "Post",
      index: 0,
    },
    {
      title: "Image",
      index: 1,
    },
    {
      title: "Link",
      index: 2,
    },
  ];

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
      user_name: user,
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

    axios.post("/api/deletecomment", body).then((res) => {
      if (res.data.result === "ok") {
        dispatch(asyncComment(modalContext.state.post_id));
      }
    });
  }

  function votePost(vote_kind, post_id, comment_id, username) {
    console.log(username);

    let body = {
      vote_kind: vote_kind,
      post_id: post_id,
      comment_id: comment_id,
      username: username,
    };

    axios.post("/api/vote", body).then((res) => {
      if (res.data.result === "ok") {
        dispatch(asyncMyVotePost(user));
        dispatch(asyncMyVoteComment(user));
        dispatch(asyncComment(modalContext.state.post_id));
        dispatch(getPost(sub)).then(() => {
          dispatch(getCurrentPost(modalContext.state.post_id)).then(() => {
            console.log(currentPost[0]);
            modalContext.setState(currentPost[0]);
          });
        });
      }
    });
  }

  const isVote = (post_id, user_name) => {
    if (user_name === "" || user_name === null || user_name === undefined) {
      return 0;
    } else {
      if (
        myvotepost === null ||
        myvotepost === undefined ||
        myvotepost.length <= 0
      ) {
        return 0;
      } else {
        for (var i = 0; i < myvotepost.length; i++) {
          if (myvotepost[i].post_id === post_id) {
            return myvotepost[i].vote_kind;
          }
        }
      }
    }
    return 0;
  };

  const isVoteComment = (comment_id, user_name) => {
    if (user_name === "" || user_name === null || user_name === undefined) {
      return 0;
    } else {
      if (
        myvotecomment === null ||
        myvotecomment === undefined ||
        myvotecomment.length <= 0
      ) {
        return 0;
      } else {
        for (var i = 0; i < myvotecomment.length; i++) {
          if (myvotecomment[i].comment_id === comment_id) {
            return myvotecomment[i].vote_kind;
          }
        }
      }
    }
    return 0;
  };

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
      <div className="2xl:w-3/4 2xl:ml-36">
        <nav className="bg-black text-white h-10 mx-20 ">
          <button className="flex mt-2 mx-10 float-right">
            <XMarkIcon className="h-7 " /> Close
          </button>
        </nav>
        <div
          className="bg-reddit_gray h-screen mx-20 px-4 py-3 overflow-auto"
          ref={refOne}
        >
          <div className="  w-5/6 m-auto p-6 bg-white flex flex-row">
            {isVote(modalContext.state.post_id, user) === 0 ? (
              <div className="my-3 ">
                <HandThumbUpIcon
                  className="h-4"
                  onClick={() => {
                    votePost(1, modalContext.state.post_id, null, user);
                  }}
                />
                <p>{modalContext.state.vote_sum}</p>
                <HandThumbDownIcon
                  className="h-4"
                  onClick={() => {
                    votePost(-1, modalContext.state.post_id, null, user);
                  }}
                />
              </div>
            ) : isVote(modalContext.state.post_id, user) === 1 ? (
              <div className="my-3 ">
                <HandThumbUpIcon
                  className="h-4 fill-orange-400 "
                  onClick={() => {
                    votePost(1, modalContext.state.post_id, null, user);
                  }}
                />
                <p>{modalContext.state.vote_sum}</p>
                <HandThumbDownIcon
                  className="h-4"
                  onClick={() => {
                    votePost(-1, modalContext.state.post_id, null, user);
                  }}
                />
              </div>
            ) : (
              <div className="my-3 ">
                <HandThumbUpIcon
                  className="h-4 "
                  onClick={() => {
                    votePost(1, modalContext.state.post_id, null, user);
                  }}
                />
                <p>{modalContext.state.vote_sum}</p>
                <HandThumbDownIcon
                  className="h-4 fill-blue-300"
                  onClick={() => {
                    votePost(-1, modalContext.state.post_id, null, user);
                  }}
                />
              </div>
            )}
            <div className="mx-3 w-full">
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
                {isEdit === false && (
                  <div className="text-sm leading-6 text-gray-700 ">
                    <h2 className="text-xl mb-3">
                      {modalContext.state.post_title}
                    </h2>
                    <p>{modalContext.state.post_content}</p>
                  </div>
                )}
                {isEdit === true && (
                  <section>
                    <Textarea
                      className={"w-full mb-3"}
                      placeholder="text(optional)"
                      rows={10}
                      value={post_content}
                      onChange={onPostContentHandler}
                    />

                    <div className={"text-right"}>
                      <Button
                        className={"px-4 py-2 mr-3"}
                        onClick={() => setIsEdit(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save</Button>
                    </div>
                  </section>
                )}
                <nav className="flex">
                  <div className="text-center float-left text-sm text-gray-400 my-3.5	flex space-x-5 font-bold">
                    <button className="flex">
                      <ChatBubbleLeftIcon className="text-gray-400 w-5 h-5 mr-1" />
                      Comments
                    </button>
                    {/* user login 시 해당 버튼 보이도록 함 */}{" "}
                    {user === modalContext.state.user_name && (
                      <button onClick={() => setIsEdit(true)}>Edit</button>
                    )}
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
                            onClick={() =>
                              dispatch(
                                commentSlice.actions.changeEdit(comment, i)
                              )
                            }
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
                    {isVoteComment(comment.comment_id, user) === 0 ? (
                      <div className="my-3 ">
                        <HandThumbUpIcon
                          className="h-4"
                          onClick={() => {
                            votePost(1, null, comment.comment_id, user);
                          }}
                        />
                        <p>{comment.vote_sum}</p>
                        <HandThumbDownIcon
                          className="h-4"
                          onClick={() => {
                            votePost(-1, null, comment.comment_id, user);
                          }}
                        />
                      </div>
                    ) : isVoteComment(comment.comment_id, user) === 1 ? (
                      <div className="my-3 ">
                        <HandThumbUpIcon
                          className="h-4 fill-orange-400 "
                          onClick={() => {
                            votePost(1, null, comment.comment_id, user);
                          }}
                        />
                        <p>{comment.vote_sum}</p>
                        <HandThumbDownIcon
                          className="h-4"
                          onClick={() => {
                            votePost(-1, null, comment.comment_id, user);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="my-3 ">
                        <HandThumbUpIcon
                          className="h-4 "
                          onClick={() => {
                            votePost(1, null, comment.comment_id, user);
                          }}
                        />
                        <p>{comment.vote_sum}</p>
                        <HandThumbDownIcon
                          className="h-4 fill-blue-300"
                          onClick={() => {
                            votePost(-1, null, comment.comment_id, user);
                          }}
                        />
                      </div>
                    )}
                    <div>
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
      </div>
    </div>
  );
}
