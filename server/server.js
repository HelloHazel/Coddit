const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./Router/auth");
const topic = require("./Router/topic");
const posts = require("./Router/post");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", auth);
app.use("/api", topic);
app.use("/api", posts);

const port = 5000;
app.listen(port, () =>
  console.log("Server Start and Server Port number is " + port)
);
