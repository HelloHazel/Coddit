import React from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useState, useEffect } from "react";
import Header from "../views/UtilPage/Header";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@chakra-ui/react";

export default function Comment() {
  const user = useSelector((state) => state.userSlice.userName);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [isValid, SetIsValid] = useState(false);

  function commentChange(e) {
    setComment(e.target.value);
  }

  let post = (e) => {
    const copyCommentsList = [...commentsList];
    copyCommentsList.push(comment);
    setCommentsList(copyCommentsList);
    setComment("");
  };

  const commentFeed = (props) => {
    return (
      <div>
        <div>
          <p>{props.user}</p>
          <div>userComment</div>
        </div>
        <HandThumbUpIcon /> <HandThumbDownIcon />
      </div>
    );
  };

  return (
    <div>
      <div>
        {user && <div>Comment as {user}</div>}
        <form>
          <textarea
            className="w-full "
            rows={5}
            placeholder="   What are your thoughts?"
            onChange={commentChange}
            onKeyUp={(e) => {
              e.target.value.length > 0 ? SetIsValid(true) : SetIsValid(false);
            }}
            value={comment}
          ></textarea>
          <div className="text-right">
            <Button
              className="mt-2 bg-gray-500 text-gray-300"
              onClick={post}
              disabled={isValid ? false : true}
            >
              Comment
            </Button>
          </div>
        </form>
      </div>
      {/* <commentFeed /> */}
    </div>
  );
}
