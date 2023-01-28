import React, { useEffect, useState } from "react";
import ClickOutHandler from "react-clickout-handler";
import Comment from "./Comment";

export default function CommentModal(props) {
  const [comment, setComment] = useState({});
  const visibleClass = props.open ? "block" : "hidden";

  function close() {
    setComment({});
    props.onClickOut();
  }

  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass
      }
      style={{ backgroundColor: "rgba(0,0,0,.8)" }}
    >
      <div className="block overflow-scroll">
        <ClickOutHandler onClickOut={() => close()}>
          <div className="border my-4 border-reddit_dark-brightest w-3/4 lg:w-1/2 bg-reddit_dark-brighter text-reddit_text self-center p-4 mx-auto rounded-md">
            <div className="">
              <Comment comment={comment} id={props.id} />
            </div>
          </div>
        </ClickOutHandler>
      </div>
    </div>
  );
}
