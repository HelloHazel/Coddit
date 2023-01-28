import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const asyncComment = createAsyncThunk(
  "commentSlice/asyncComment",
  async (post_id) => {
    let body = {
      postid: post_id,
    };

    const resp = await axios.post("/api/comment", body);
    return resp.data;
  }
);

const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    list: [],
  },
  reducers: {
    changeEdit: (state, action) => {
      for (var i = 0; i < state.list.length; i++) {
        if (state.list[i].comment_id === action.payload.comment_id) {
          state.list[i].edit = !action.payload.edit;
        } else {
          state.list[i].edit = false;
        }
      }
    },
    changeEditComment: (state, action, comment) => {
      for (var i = 0; i < state.list.length; i++) {
        if (state.list[i].comment_id === action.payload.comment_id) {
          console.log(action.payload.edit_comment);
          state.list[i].edit_comment = action.payload.edit_comment;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncComment.pending, (state, action) => {
      // console.log("pending");
    });
    builder.addCase(asyncComment.fulfilled, (state, action) => {
      state.list = action.payload;
      // console.log("fulfilled");
    });
    builder.addCase(asyncComment.rejected, (state, action) => {
      // console.log("rejected");
    });
  },
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userName: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload;
      console.log(state.userName);
    },
    LogoutUser: (state) => {
      state.userName = "";
    },
  },
  extraReducers: {},
});

const asyncTopic = createAsyncThunk("communitySlice/asyncTopic", async () => {
  const resp = await axios.get("/api/topic");
  return resp.data;
});

const topicSlice = createSlice({
  name: "topicSlice",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder.addCase(asyncTopic.pending, (state, action) => {
      // console.log("pending");
    });
    builder.addCase(asyncTopic.fulfilled, (state, action) => {
      state.list = action.payload;
      // console.log("fulfilled");
    });
    builder.addCase(asyncTopic.rejected, (state, action) => {
      // console.log("rejected");
    });
  },
});

const asyncSub = createAsyncThunk("subSlice/asyncSub", async () => {
  const resp = await axios.get("/api/sub");
  return resp.data;
});

const subSlice = createSlice({
  name: "subSlice",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSub.pending, (state, action) => {
      // console.log("pending");
    });
    builder.addCase(asyncSub.fulfilled, (state, action) => {
      state.list = action.payload;
      // console.log("fulfilled");
    });
    builder.addCase(asyncSub.rejected, (state, action) => {
      // console.log("rejected");
    });
  },
});

const getPost = createAsyncThunk("postSlice/getPost", async (subid) => {
  const resp = await axios.get("/api/post", { params: { subId: subid } });
  return resp.data;
});

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    list: [],
  },
  reducers: {
    changeEdit: (state, action) => {
      for (var i = 0; i < state.list.length; i++) {
        if (state.list[i].comment_id === action.payload.post_id) {
          state.list[i].edit = !action.payload.edit;
        } else {
          state.list[i].edit = false;
        }
      }
    },
    changeEditPost: (state, action, post) => {
      for (var i = 0; i < state.list.length; i++) {
        if (state.list[i].post_id === action.payload.post_id) {
          console.log(action.payload.edit_post);
          state.list[i].edit_post = action.payload.edit_post;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state, action) => {
      // console.log("pending");
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.list = action.payload;
      // console.log(action.payload);
    });
    builder.addCase(getPost.rejected, (state, action) => {
      // console.log("rejected");
    });
  },
});

const currentSub = createSlice({
  name: "currentSub",
  initialState: {
    currentSub: -1,
  },
  reducers: {
    setCurrentSub: (state, action) => {
      state.currentSub = action.payload;
    },
  },
  extraReducers: {},
});

export default configureStore({
  reducer: {
    topicSlice: topicSlice.reducer,
    subSlice: subSlice.reducer,
    postSlice: postSlice.reducer,
    userSlice: userSlice.reducer,
    commentSlice: commentSlice.reducer,
    currentSub: currentSub.reducer,
  },
});

export {
  asyncTopic,
  asyncSub,
  getPost,
  postSlice,
  userSlice,
  asyncComment,
  commentSlice,
  currentSub,
};
