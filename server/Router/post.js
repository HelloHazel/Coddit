const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

const { Client } = require("pg");
const db = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "RedditClone",
  password: "1234",
  port: 5432,
});
db.connect();

router.get("/post", (req, res) => {
  var subId = req.query.subId;
  if (subId == -1) {
    var sql = "select * from tb_post order by post_date asc";
  } else {
    var sql =
      "select * from tb_post where sub_id = " +
      subId +
      " order by post_date asc";
  }
  var result;

  db.query(sql, (err, row) => {
    result = row.rows;
    // console.log(result);
    res.send(result);
  });
});

router.post("/write", (req, res, next) => {
  var sql = "select max(post_id) from tb_post";

  var post_id;

  db.query(sql, (err, row) => {
    post_id = row.rows[0].max + 1;

    console.log("post_id = " + post_id);

    var post_title = req.body.post_title;

    var post_content = req.body.post_content;

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    var post_date =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    var user_name = "abc";
    var sub_id = req.body.sub_id;

    var postTable = [
      post_id,
      post_title,
      post_content,
      null,
      null,
      post_date,
      user_name,
      sub_id,
    ];

    console.log(postTable);
    var postSql = "insert into tb_post values ($1,$2,$3,$4,$5,$6,$7,$8)";

    db.query(postSql, postTable, (err, row) => {
      if (err) console.log(err);
    });
    return res.status(200).json({ result: "ok" });
  });
});

module.exports = router;
