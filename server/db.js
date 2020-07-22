const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DB,
  password: process.env.DB_PW,
});

connection.connect((error) => {
  if (error) {
    console.error(`❌ ${error}`);
  } else {
    console.log("✅ Successfully connected to the database.");
  }
});

module.exports = connection;
