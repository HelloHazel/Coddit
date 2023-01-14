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

router.get("/topic", (req, res) => {
  var sql = "select * from tb_topic";

  var result;

  db.query(sql, (err, row) => {
    result = row.rows;
    // console.log(result);
    res.send(result);
  });
});

router.get("/sub", (req, res) => {
  var sql = "select * from tb_subtopic";

  var result;

  db.query(sql, (err, row) => {
    result = row.rows;

    res.send(result);
  });
});

module.exports = router;
