// import {
//   Box,
//   Stack,
//   FormControl,
//   FormErrorMessage,
//   Input,
//   Textarea,
//   RadioGroup,
//   Radio,
//   Select,
//   Button,
//   Alert,
//   AlertIcon,
// } from "@chakra-ui/react";
import Header from "./Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Redirect } from "react-router-dom";
import ClickOutHandler from "react-clickout-handler";
import PostFormModalContext from "./PostFormModalContext";
import AuthModalContext from "./AuthModalContext";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "../../Layout/Button";

export default function CreatePost() {
  const navigate = useNavigate();
  const [post_title, setPostTitle] = useState("");
  const [post_content, setPostContent] = useState("");
  const [sub_id, setSubID] = useState(-1);

  const modalContext = useContext(PostFormModalContext);
  const authModalContext = useContext(AuthModalContext);

  const visibleClass = modalContext.show ? "hidden" : "block";

  const onPostTitleHandler = (event) => {
    setPostTitle(event.currentTarget.value);
  };

  const onPostContentHandler = (event) => {
    setPostContent(event.currentTarget.value);
  };
  const onSubIDHandler = (event) => {
    setSubID(event.currentTarget.value);
  };

  function writePost(e) {
    let body = {
      post_title: post_title,
      post_content: post_content,
      sub_id: 1,
    };

    axios.post("/api/write", body).then((res) => {
      if (res.data.result === "ok") {
        navigate("/");
      }

      console.log(res.data);
    });
  }

  return (
    <div>
      <Header />
      <div
        className={
          "w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass
        }
        style={{ backgroundColor: "rgba(0,0,0,.8)" }}
      >
        <ClickOutHandler onClickOut={() => {}}>
          <div className=" w-3/4 md:w-2/4 bg-reddit_dark p-5 self-center mx-auto rounded-md">
            <h1 className="text-2xl mb-5">Create a post</h1>
            <Input
              value={post_title}
              type="text"
              placeholder="title"
              onChange={onPostTitleHandler}
            />

            <Textarea
              className={"w-full mb-3"}
              placeholder="text(optional)"
              rows={10}
              value={post_content}
              onChange={onPostContentHandler}
            />
            <div className={"text-right"}>
              <Button
                onClick={() => modalContext.setShow(false)}
                className={"px-4 py-2 mr-3"}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={(e) => writePost()}>
                Submit
              </Button>
            </div>
          </div>
        </ClickOutHandler>
      </div>
    </div>
    // <Box w="100%" m="auto" className=" bg-reddit_gray">
    //   <Header />
    //   <Box w={["100%", "90%", "80%", "70%"]} m="auto">
    //     <form>
    //       Create a post
    //       <Stack spacing={3}>
    //         <FormControl>
    //           <RadioGroup>
    //             <Stack direction="row" spacing={3}>
    //               <Radio value="text">Post</Radio>
    //               <Radio value="link">Link</Radio>
    //             </Stack>
    //           </RadioGroup>
    //         </FormControl>
    //         <FormControl>
    //           <Input
    //             value={post_title}
    //             type="text"
    //             placeholder="title"
    //             onChange={onPostTitleHandler}
    //           />
    //         </FormControl>
    //         <FormControl>
    //           <Textarea
    //             placeholder="text(optional)"
    //             rows={10}
    //             value={post_content}
    //             onChange={onPostContentHandler}
    //           />
    //         </FormControl>
    //         <Button type="submit" onClick={(e) => writePost()}>
    //           Submit
    //         </Button>
    //       </Stack>
    //     </form>
    //   </Box>
    // </Box>
  );
}
