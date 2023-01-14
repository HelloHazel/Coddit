import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { asyncCommunity, communitySlice } from "../../../store/store";

export default function LandingPage() {
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  let body = {
    name: "abc",
    password: "1234",
  };

  useEffect(() => {
    axios
      .post("/api/login", body)
      .then((res) => setMsg(res.data.result))
      .catch((err) => console.log(err));
  }, []);

  // const dispatch = useDispatch();
  // const msg = useSelector((state) => {
  //   return state.communitySlice.value;
  // });
  // const status = useSelector((state) => {
  //   return state.communitySlice.status;
  // });
  // const err = useSelector((state) => {
  //   return state.communitySlice.error;
  // });

  // dispatch(asyncCommunity());
  return (
    <div>
      <p>{msg}</p>
    </div>
    // <div>
    //   <p>
    //     {msg} | {status} | {err}
    //   </p>
    //   <button
    //     onClick={() => {
    //       dispatch(asyncCommunity());
    //     }}
    //   >
    //     abc
    //   </button>
    // </div>
  );
}
