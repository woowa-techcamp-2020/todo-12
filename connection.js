const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PW
});

connection.connect(err => {
    if(err) {
        console.error(err);
    } else {
        console.log('Successfully connected to the database.');
    }
});

module.exports = connection;