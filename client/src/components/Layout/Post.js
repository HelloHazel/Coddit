import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../store/store";
import PostContent from "../views/UtilPage/PostContent";
import TimeAgo from "timeago-react";
export default function Post(props) {
  const dispatch = useDispatch();

  const sub_list = useSelector((state) => state.subSlice.list);

  const post_list = useSelector((state) => state.postSlice.list);
  useEffect(() => {
    dispatch(getPost(-1));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div className="px-6 bg-reddit_gray">
        {post_list.map((item, index) => (
          <div
            className="border border-reddit_border bg-white p-2 rounded-md"
            key={index}
          >
            {/* <PostContent /> */}
            <div className=" flex mb-1">
              {sub_list.map((sub, j) => {
                if (item.sub_id === sub.sub_id) {
                  return <h5 key={j}>{sub.sub_name}</h5>;
                }
              })}
              <p className="text-reddit_text text-sm ">
                • Posted by u/{item.user_name}{" "}
                <TimeAgo datetime={item.post_date} />
              </p>
            </div>
            <h2 className="text-xl mb-3"> {item.post_title}</h2>
            <div className="text-sm leading-6 text-gray-700">
              <p>{item.post_content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    // <div>
    //   {post_list.map((item, index) => (
    //     <div key={index} className="post">
    //       {/* POST TOP */}
    //       <div className="post__top">
    //         <div className="post__topInfo">
    //           <div>
    //             <h3>{item.user_name}</h3>
    //
    //           </div>
    //         </div>
    //       </div>

    //       {/* POST BOTTOM */}
    //       <div className="post__bottom">
    //         <p>{item.post_content}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );

  // return (
  //   <div className="post">
  //     <body>
  //       <div className="post__top">
  //         <div className="post__topInfo">
  //           {post_list.map((item, index) => (
  //             <div key={index}>
  //               <h3>{item.user_name}</h3>
  //               <p>{item.post_date}</p>
  //             </div>
  //           ))}
  //           {/* <h3>{post_info.user_name}</h3>
  //           <p>{post_info.post_date}</p> */}
  //         </div>
  //       </div>

  //       {post_list.map((item, index) => (
  //         <div key={index} className="post__bottom">
  //           <p>{item.post_content}</p>
  //         </div>
  //       ))}

  //       <div className="post__image">
  //         <img src="post_image" alt="" />
  //       </div>

  //       <div className="post__options">
  //         <div className="post__option">
  //           {/* 좋아요 */}
  //           <p>Like</p>
  //         </div>

  //         <div className="post__option">
  //           {/* 댓글창 */}
  //           <p>Comment</p>
  //         </div>
  //       </div>
  //     </body>
  //   </div>
  // );
}
