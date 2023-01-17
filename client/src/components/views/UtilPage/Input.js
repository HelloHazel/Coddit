import React from "react";

export default function Input(props) {
  return (
    <input
      {...props}
      className={
        "bg-reddit_dark-brighter text-reddit_text p-2 border rounded-md block " +
        props.className
      }
    />
  );
}
