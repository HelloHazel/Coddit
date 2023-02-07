import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "../../Layout/Button";
import { asyncSub, getPost } from "../../../store/store";
import AuthModal from "./AuthModal";
import AuthModalContext from "./AuthModalContext";
import UserContext from "../../UserContext";
import { useDropzone } from "react-dropzone";
import { Box } from "@chakra-ui/react";
import { useCookies } from "react-cookie";

export default function CreatePost() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAuthModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [post_title, setPostTitle] = useState("");
  const [post_content, setPostContent] = useState("");
  const [post_imgpath, setPostImgPath] = useState("");
  const [post_link, setPostLink] = useState("");
  const [sub_id, setSubID] = useState(-1);
  const [value, setValue] = useState("default");
  const [cookies, setCookie, removeCookie] = useCookies(["userName"]);

  // const onDrop = useCallback((acceptedFiles) => {
  //   // Do something with the files
  //   // console.log(URL.createObjectURL(acceptedFiles[0]));
  //   // setFiles(URL.createObjectURL(acceptedFiles[0]));
  //   // getBase64(URL.createObjectURL(acceptedFiles[0]));
  //   setFile(URL.createObjectURL(acceptedFiles[0]));
  //   setPostImgPath(URL.createObjectURL(acceptedFiles[0]));
  // }, []);

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

  const sub_list = useSelector((state) => state.subSlice.list);

  const user_name = useSelector((state) => state.userSlice.userName);

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

  useEffect(() => {
    dispatch(asyncSub());
  }, []);

  const changePost = (subid) => {
    dispatch(getPost(subid, user_name));
  };

  const onPostTitleHandler = (event) => {
    setPostTitle(event.currentTarget.value);
  };

  const onPostContentHandler = (event) => {
    setPostContent(event.currentTarget.value);
  };
  const onPostLinkHandler = (event) => {
    setPostLink(event.currentTarget.value);
  };
  const onSubIDHandler = (event) => {
    setSubID(event.currentTarget.value);
  };

  function writePost(e) {
    let body = {
      post_title: post_title,
      post_content: post_content,
      post_imgpath: post_imgpath,
      post_link: post_link,
      sub_id: sub_id,
      user_name: user_name,
    };

    axios.post("/api/write", body).then((res) => {
      if (res.data.result === "ok") {
        navigate("/");
      } else if (res.data.result === "subError") {
        alert("커뮤니티를 설정해주세요");
      }

      console.log(res.data);
    });
  }

  return (
    <AuthModalContext.Provider
      value={{
        show: showAuthModal,
        setShow: setShowModal,
        cookie: cookies,
        setCook: setCookie,
        removeCook: removeCookie,
      }}
    >
      <div>
        <Header />
        <div className="w-screen h-screen fixed left-0 bg-reddit_gray overflow-auto">
          <AuthModal />
          <div className=" p-5 self-center mx-auto rounded-md">
            <div className=" p-5 self-center mx-auto rounded-md">
              <h1 className="text-xl mb-4">Create a post</h1>

              <select
                defaultValue={value}
                className="h-8 w-2/5 border border-gray-300 bg-white rounded-md"
                onChange={onSubIDHandler}
              >
                <option value="default" disabled hidden>
                  choose a community!
                </option>
                {sub_list.map((sub, i) => {
                  return (
                    <option key={i} value={sub.sub_id}>
                      {sub.sub_name}
                    </option>
                  );
                })}
              </select>

              <section>
                {Tab.map((e, index) => (
                  <button
                    className="relative bg-white text-sm font-bold w-32 h-10 mt-2 border border-gray-300 text-gray-300 focus:text-blue-500 focus:border-b-4 focus:border-b-blue-300"
                    key={index}
                    onClick={(e) => setTab(index)}
                  >
                    {e.title}
                  </button>
                ))}

                <div className="bg-white mb-2 px-8 py-4">
                  <Input
                    className="w-full  border border-gray"
                    value={post_title}
                    type="text"
                    placeholder="title"
                    onChange={onPostTitleHandler}
                  />
                  {t === 0 && (
                    <Textarea
                      className={"w-full mb-3"}
                      placeholder="text(optional)"
                      rows={10}
                      value={post_content}
                      onChange={onPostContentHandler}
                    />
                  )}
                  {t === 1 && (
                    <div>
                      <div className=" border border-gray mb-3 pt-20 p-3">
                        <img src={file}></img>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <div>
                              <Button>Open</Button>
                              <p>
                                Drag 'n' drop some files here, or click to
                                select files
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {t === 2 && (
                    <Textarea
                      className={"w-full mb-3"}
                      placeholder="Link 받기"
                      rows={10}
                      value={post_link}
                      onChange={onPostLinkHandler}
                    />
                  )}
                  <div className={"text-right"}>
                    <Button className={"px-4 py-2 mr-3"}>Cancel</Button>
                    <Button type="submit" onClick={(e) => writePost()}>
                      Submit
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthModalContext.Provider>
  );
}
