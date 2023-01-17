import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userName: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload;
      console.log(action.payload);
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

export default configureStore({
  reducer: {
    topicSlice: topicSlice.reducer,
    subSlice: subSlice.reducer,
    postSlice: postSlice.reducer,
    userSlice: userSlice.reducer,
  },
});

export { asyncTopic, asyncSub, getPost, postSlice, userSlice };
