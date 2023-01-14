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
    var sql = "select * from tb_post";
  } else {
    var sql = "select * from tb_post where sub_id = " + subId;
  }
  var result;

  db.query(sql, (err, row) => {
    result = row.rows;
    // console.log(result);
    res.send(result);
  });
});

router.get("/wirte", (req, res) => {});

module.exports = router;
