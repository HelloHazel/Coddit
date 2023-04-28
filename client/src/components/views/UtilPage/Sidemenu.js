import React, { useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncTopic,
  asyncSub,
  getPost,
  currentSub,
} from "../../../store/store";
import { Link } from "react-router-dom";

export default function Sidemenu() {
  const dispatch = useDispatch();

  const topic_list = useSelector((state) => state.topicSlice.list);
  const sub_list = useSelector((state) => state.subSlice.list);

  useEffect(() => {
    dispatch(asyncTopic());
    dispatch(asyncSub());
  }, []);

  const changePost = (subid) => {
    dispatch(getPost(subid));
    dispatch(currentSub.actions.setCurrentSub(subid));
    window.scrollTo(0, 0);
  };

  return (
    <div className="fixed sticky top-12">
      <div>
        <Sidebar className="hidden sm:block">
          <Menu>
            {topic_list.map((tp, i) => (
              <SubMenu key={i} label={tp.topic_name}>
                {sub_list.map((sub, j) => {
                  if (tp.topic_id === sub.topic_id) {
                    return (
                      <MenuItem
                        onClick={() => {
                          changePost(sub.sub_id);
                        }}
                        key={j}
                      >
                        {sub.sub_name}
                      </MenuItem>
                    );
                  }
                })}
              </SubMenu>
            ))}
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
}
