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

// router.get("/", (req, res) => {
//   console.log(req);
//   try {
//     res.send({ test: val.toString() + "님 접속을 환영합니다." });
//   } catch (errr) {
//     console.log("Response Error is " + errr);
//   }
// });

router.post("/login", (req, res, next) => {
  let user_table = [req.body.name, req.body.password];

  var sql =
    "select exists (select * from tb_user where user_name = $1 and user_pw = $2)";

  var result;

  db.query(sql, user_table, (err, row) => {
    result = row.rows[0].exists;

    console.log("result = " + result);

    if (result === true) {
      return res.status(200).json({ result: req.body.name });
    } else {
      return res.status(200).json({ result: "loginError" });
    }
  });
});

router.post("/register", (req, res, next) => {
  var user_email = [req.body.email];

  var sql = "select exists (select * from tb_user where user_email = $1)";

  var result;

  db.query(sql, user_email, (err, row) => {
    result = row.rows[0].exists;

    if (result === true) {
      return res.status(200).json({ result: "alreadyEmail" });
    } else {
      var sql = "select exists (select * from tb_user where user_name = $1)";

      var user_name = [req.body.name];

      db.query(sql, user_name, (err, row) => {
        result = row.rows[0].exists;
        if (result === true) {
          return res.status(200).json({ result: "alreadyName" });
        } else {
          const user_table = [req.body.name, req.body.password, req.body.email];

          var sql = `INSERT INTO "tb_user" ("user_name", "user_pw", "user_email") VALUES ($1, $2, $3)`;

          db.query(sql, user_table, (err, row) => {
            if (err) console.log(err);
          });
          return res.status(200).json({ result: "ok" });
        }
      });
    }

    if (err) console.log(err);
  });
});

module.exports = router;
