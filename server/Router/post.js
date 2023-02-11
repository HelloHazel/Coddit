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

router.post("/myvotepost", (req, res, next) => {
  var user_name = req.body.user_name;

  var result;

  var sql =
    "select post_id,vote_kind from tb_vote where user_name = '" +
    user_name +
    "'";

  db.query(sql, (err, row) => {
    result = row.rows;

    console.log(result);

    res.send(result);
  });
});

router.post("/myvotecomment", (req, res, next) => {
  var user_name = req.body.user_name;

  var result;

  var sql =
    "select comment_id,vote_kind from tb_vote where user_name = '" +
    user_name +
    "'";

  db.query(sql, (err, row) => {
    result = row.rows;
    res.send(result);
  });
});

router.get("/post", (req, res) => {
  var subId = req.query.subId;
  if (subId == -1) {
    var sql = "select * from tb_post order by post_date desc";
  } else {
    var sql =
      "select * from tb_post where sub_id = " +
      subId +
      " order by post_date desc";
  }
  var result;

  db.query(sql, (err, row) => {
    result = row.rows;

    res.send(result);
  });
});

router.get("/search", (req, res) => {
  var searchContent = req.query.searchContent;

  var sql =
    "select * from tb_post where post_title like '%" +
    searchContent +
    "%' or post_content like '%" +
    searchContent +
    "%' order by post_date desc";
  var result;

  db.query(sql, (err, row) => {
    result = row.rows;

    res.send(result);
  });
});

router.get("/currpost", (req, res) => {
  var postid = req.query.postid;

  var sql = "select * from tb_post where post_id = " + postid;

  var result;

  db.query(sql, (err, row) => {
    result = row.rows;
    res.send(result);
  });
});

router.post("/write", (req, res, next) => {
  var sql = "select max(post_id) from tb_post";

  var post_id;

  db.query(sql, (err, row) => {
    post_id = row.rows[0].max + 1;

    var post_title = req.body.post_title;

    var post_content = req.body.post_content;

    var post_imgpath = req.body.post_imgpath;

    var post_link = req.body.post_link;

    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let date = ("0" + today.getDate()).slice(-2);
    let hours = ("0" + today.getHours()).slice(-2);
    let minutes = ("0" + today.getMinutes()).slice(-2);
    let seconds = ("0" + today.getSeconds()).slice(-2);

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

    var user_name = req.body.user_name;
    var sub_id = req.body.sub_id;

    if (sub_id === -1) {
      return res.status(200).json({ result: "subError" });
    }

    var postTable = [
      post_id,
      post_title,
      post_content,
      post_imgpath,
      post_link,
      post_date,
      user_name,
      sub_id,
    ];

    var postSql = "insert into tb_post values ($1,$2,$3,$4,$5,$6,$7,$8)";

    db.query(postSql, postTable, (err, row) => {
      if (err) console.log(err);
    });
    return res.status(200).json({ result: "ok" });
  });
});

router.post("/delete", (req, res, next) => {
  var post_id = req.body.post_id;

  var votedeletesql = "delete from tb_vote where post_id = " + post_id;

  db.query(votedeletesql, (err, row) => {
    if (err) console.log(err);
    var sql = "delete from tb_vote where post_id = " + post_id;

    db.query(sql, (err, row) => {
      if (err) console.log(err);

      var deleteCommentSql =
        "delete from tb_comment where post_id = " + post_id;

      db.query(deleteCommentSql, (err, row) => {
        if (err) console.log(err);

        var deletePostSql = "delete from tb_post where post_id = " + post_id;

        db.query(deletePostSql, (err, row) => {
          if (err) console.log(err);
        });
      });
    });
    return res.status(200).json({ result: "ok" });
  });
});

router.post("/comment", (req, res, next) => {
  var sql =
    "select * from tb_comment where post_id = " +
    req.body.postid +
    " order by comment_date asc";

  var result;

  db.query(sql, (err, row) => {
    result = row.rows;

    for (var i = 0; i < result.length; i++) {
      result[i].edit = false;
      result[i].edit_comment = result[i].comment_content;
    }
    res.send(result);
  });
});

router.post("/writecomment", (req, res, next) => {
  var sql = "select max(comment_id) from tb_comment";

  var comment_id;

  db.query(sql, (err, row) => {
    comment_id = row.rows[0].max + 1;

    var comment_content = req.body.comment_content;

    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let date = ("0" + today.getDate()).slice(-2);
    let hours = ("0" + today.getHours()).slice(-2);
    let minutes = ("0" + today.getMinutes()).slice(-2);
    let seconds = ("0" + today.getSeconds()).slice(-2);

    var comment_date =
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

    var user_name = req.body.user_name;
    var post_id = req.body.post_id;

    var commentTable = [
      comment_id,
      comment_content,
      post_id,
      user_name,
      comment_date,
    ];
    var postSql = "insert into tb_comment values ($1,$2,$3,$4,$5,0)";

    db.query(postSql, commentTable, (err, row) => {
      if (err) console.log(err);

      var updateSql =
        "update tb_post SET comment_count = (select count(*) from tb_comment where post_id = " +
        post_id +
        ") where post_id = " +
        post_id;

      db.query(updateSql, (err, row) => {
        if (err) console.log(err);
      });
    });

    return res.status(200).json({ result: "ok" });
  });
});

router.post("/editcontent", (req, res, next) => {
  var edit_content;
  var post_id;

  edit_content = req.body.post_content;
  post_id = req.body.post_id;

  var sql =
    "update tb_post set post_content = '" +
    edit_content +
    "' where post_id = " +
    post_id;

  db.query(sql, (err, row) => {
    if (err) console.log(err);

    return res.status(200).json({ result: "ok" });
  });
});

router.post("/editcomment", (req, res, next) => {
  var comment_id;
  var edit_comment;
  var post_id;

  comment_id = req.body.comment_id;
  edit_comment = req.body.comment_content;
  post_id = req.body.post_id;

  var sql =
    "update tb_comment set comment_content = '" +
    edit_comment +
    "' where comment_id = " +
    comment_id;

  db.query(sql, (err, row) => {
    if (err) console.log(err);

    var updateSql =
      "update tb_post SET comment_count = (select count(*) from tb_comment where post_id = " +
      post_id +
      ") where post_id = " +
      post_id;

    db.query(updateSql, (err, row) => {
      if (err) console.log(err);
    });

    return res.status(200).json({ result: "ok" });
  });
});

router.post("/deletecomment", (req, res, next) => {
  var comment_id;
  var post_id;

  comment_id = req.body.comment_id;
  post_id = req.body.post_id;

  var votedeletesql = "delete from tb_vote where comment_id = " + comment_id;

  db.query(votedeletesql, (err, row) => {
    var sql = "delete from tb_comment where comment_id = " + comment_id;
    if (err) console.log(err);

    db.query(sql, (err, row) => {
      if (err) console.log("에러 원인이 뭐야??" + err);

      var updateSql =
        "update tb_post SET comment_count = (select count(*) from tb_comment where post_id = " +
        post_id +
        ") where post_id = " +
        post_id;

      db.query(updateSql, (err, row) => {
        if (err) console.log(err);
      });
    });
    return res.status(200).json({ result: "ok" });
  });
});

router.post("/vote", (req, res, next) => {
  var vote_id;
  var vote_kind;
  var comment_id;
  var post_id;
  var user_name;

  var sql = "select max(vote_id) from tb_vote";

  db.query(sql, (err, row) => {
    vote_id = row.rows[0].max + 1;

    vote_kind = req.body.vote_kind;
    comment_id = req.body.comment_id;
    post_id = req.body.post_id;
    user_name = req.body.username;

    var voteTable = [vote_id, vote_kind, post_id, comment_id, user_name];

    if (comment_id === null) {
      var checksql =
        "select vote_id,vote_kind from tb_vote where post_id = " +
        post_id +
        " and user_name = '" +
        user_name +
        "'";
    } else {
      var checksql =
        "select vote_id,vote_kind from tb_vote where comment_id = " +
        comment_id +
        " and user_name = '" +
        user_name +
        "'";
    }

    db.query(checksql, (err, row) => {
      if (row.rows[0] === undefined) {
        var insertSql = "insert into tb_vote values ($1,$2,$3,$4,$5)";

        db.query(insertSql, voteTable, (err, row) => {
          if (err) console.log(err);

          if (comment_id === null) {
            var updateSql =
              "update tb_post SET vote_sum = (select sum(vote_kind) from tb_vote where post_id = " +
              post_id +
              ") where post_id = " +
              post_id;
          } else {
            var updateSql =
              "update tb_comment SET vote_sum = (select sum(vote_kind) from tb_vote where comment_id = " +
              comment_id +
              ") where comment_id = " +
              comment_id;
          }

          db.query(updateSql, (err, row) => {
            if (err) console.log(err);
          });
        });
      } else {
        vote_id = row.rows[0].vote_id;

        if (vote_kind === row.rows[0].vote_kind) {
          var modifysql = "delete from tb_vote where vote_id = " + vote_id;
          console.log("제거");
        } else {
          var modifysql =
            "update tb_vote set vote_kind = " +
            vote_kind +
            " where vote_id = " +
            vote_id;
        }

        db.query(modifysql, (err, row) => {
          if (err) console.log(err);
          var chk;

          if (comment_id === null) {
            var chksql =
              "select sum(vote_kind) from tb_vote where post_id = " + post_id;
            db.query(chksql, (err, row) => {
              if (err) console.log(err);

              if (row.rows[0].sum === null) {
                chk = 0;
              } else {
                chk = row.rows[0].sum;
              }

              var updateSql =
                "update tb_post SET vote_sum = " +
                chk +
                " where post_id = " +
                post_id;

              db.query(updateSql, (err, row) => {
                if (err) console.log(err);
              });
            });
          } else {
            var chksql =
              "select sum(vote_kind) from tb_vote where comment_id = " +
              comment_id;
            db.query(chksql, (err, row) => {
              if (err) console.log(err);

              if (row.rows[0].sum === null) {
                chk = 0;
              } else {
                chk = row.rows[0].sum;
              }

              var updateSql =
                "update tb_comment SET vote_sum = " +
                chk +
                " where comment_id = " +
                comment_id;

              db.query(updateSql, (err, row) => {
                if (err) console.log(err);
              });
            });
          }
        });
      }
    });
    return res.status(200).json({ result: "ok" });
  });
});

module.exports = router;
