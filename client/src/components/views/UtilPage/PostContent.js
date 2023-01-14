import React, { useEffect } from "react";
import TimeAgo from "timeago-react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../../store/store";

export default function PostContent(props) {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.postSlice.list);
  useEffect(() => {
    dispatch(getPost(-1));
  }, []);

  return (
    <div className="px-6 bg-reddit_gray">
      {post_list.map((item, index) => (
        <div
          className="border border-reddit_border bg-white p-2 rounded-md"
          key={index}
        >
          <h5 className="text-reddit_text-darker text-sm mb-1">
            Posted by u/{item.user_name} <TimeAgo datetime={item.post_date} />
          </h5>
          <h2 className="text-xl mb-3">포스트 제목</h2>
          <div className="text-sm leading-6">
            <ReactMarkdown plugins={[gfm]} children={item.post_content} />
          </div>
        </div>
      ))}
    </div>
  );
}
