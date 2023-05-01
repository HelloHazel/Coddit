const { DB } = require("pg");
const db = new DB({
  user: "postgres",
  host: "127.0.0.1",
  database: "redditclone",
  password: "1234",
  port: 5432,
});

db.connect();
db.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  db.end();
});
