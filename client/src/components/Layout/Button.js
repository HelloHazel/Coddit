import React from "react";

export default function Button(props) {
  let classNames = " rounded-full px-3 text-sm font-bold h-8 ";
  if (props.outline) {
    classNames += "bg-reddit_orange text-white ";
  } else {
    classNames += "bg-reddit_gray text-reddit_dark ";
  }
  return <button {...props} className={classNames + props.className} />;
}
