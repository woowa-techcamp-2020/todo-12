const mysql = require("mysql2");

// create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DB,
  password: process.env.DB_PW,
});

const promisePool = pool.promise();

module.exports = promisePool;
